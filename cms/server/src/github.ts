import { Octokit } from "@octokit/rest";
import { config } from "./config.js";

const octokit = new Octokit({ auth: config.github.token });
const { owner, repo, branch } = config.github;

export interface CommitFile {
  /** Repo-relative path, e.g. "content/blog/my-post.mdx" */
  path: string;
  content: Buffer;
}

function assertPathAllowed(filePath: string) {
  const normalized = filePath.replace(/^\/+/, "");
  const allowed =
    normalized.startsWith(config.allowedContentPrefix) ||
    normalized.startsWith(config.allowedPublicPrefix);
  if (!allowed) {
    throw new Error(
      `Refusing to commit "${filePath}": CMS may only write under ` +
        `${config.allowedContentPrefix} or ${config.allowedPublicPrefix}`
    );
  }
}

/**
 * Commits one or more files to `branch` as a single atomic commit via the
 * Git Data API (blob -> tree -> commit -> update ref), with a
 * fetch-latest-and-retry loop in case the ref moved between our read and
 * write (e.g. two publishes racing). Every file path is checked against the
 * CMS's write allow-list regardless of what the caller passes in - this is
 * the application-level safety rail described in the CMS plan, since the
 * PAT itself has repo-wide contents:write and can't be path-scoped by GitHub.
 */
export async function commitFiles(
  files: CommitFile[],
  message: string,
  maxRetries = 3
): Promise<{ commitSha: string }> {
  if (files.length === 0) throw new Error("commitFiles called with no files");
  for (const file of files) assertPathAllowed(file.path);

  let attempt = 0;
  for (;;) {
    attempt += 1;
    try {
      const { data: refData } = await octokit.git.getRef({
        owner,
        repo,
        ref: `heads/${branch}`,
      });
      const baseCommitSha = refData.object.sha;

      const { data: baseCommit } = await octokit.git.getCommit({
        owner,
        repo,
        commit_sha: baseCommitSha,
      });
      const baseTreeSha = baseCommit.tree.sha;

      const blobs = await Promise.all(
        files.map(async (file) => {
          const { data: blob } = await octokit.git.createBlob({
            owner,
            repo,
            content: file.content.toString("base64"),
            encoding: "base64",
          });
          return { path: file.path, sha: blob.sha };
        })
      );

      const { data: newTree } = await octokit.git.createTree({
        owner,
        repo,
        base_tree: baseTreeSha,
        tree: blobs.map((b) => ({
          path: b.path,
          mode: "100644" as const,
          type: "blob" as const,
          sha: b.sha,
        })),
      });

      const { data: newCommit } = await octokit.git.createCommit({
        owner,
        repo,
        message,
        tree: newTree.sha,
        parents: [baseCommitSha],
      });

      await octokit.git.updateRef({
        owner,
        repo,
        ref: `heads/${branch}`,
        sha: newCommit.sha,
      });

      return { commitSha: newCommit.sha };
    } catch (err) {
      const isRefConflict =
        typeof err === "object" &&
        err !== null &&
        "status" in err &&
        (err as { status?: number }).status === 422;
      if (isRefConflict && attempt < maxRetries) continue;
      throw err;
    }
  }
}

/** Returns the raw content + blob sha of an existing file on `branch`, or null if it doesn't exist. */
export async function getFile(
  filePath: string
): Promise<{ content: string; sha: string } | null> {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: filePath,
      ref: branch,
    });
    if (Array.isArray(data) || data.type !== "file" || !data.content) return null;
    return {
      content: Buffer.from(data.content, "base64").toString("utf-8"),
      sha: data.sha,
    };
  } catch (err) {
    if (typeof err === "object" && err !== null && "status" in err && (err as { status?: number }).status === 404) {
      return null;
    }
    throw err;
  }
}

/** Lists slugs already present under content/blog/ on `branch`, for uniqueness checks. */
export async function listBlogSlugs(): Promise<string[]> {
  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path: config.allowedContentPrefix.replace(/\/$/, ""),
      ref: branch,
    });
    if (!Array.isArray(data)) return [];
    return data
      .filter((entry) => entry.type === "file" && entry.name.endsWith(".mdx"))
      .map((entry) => entry.name.replace(/\.mdx$/, ""));
  } catch (err) {
    if (typeof err === "object" && err !== null && "status" in err && (err as { status?: number }).status === 404) {
      return [];
    }
    throw err;
  }
}

/** Triggers the existing deploy-production.yml workflow_dispatch run. */
export async function triggerDeploy(): Promise<void> {
  await octokit.actions.createWorkflowDispatch({
    owner,
    repo,
    workflow_id: config.github.deployWorkflowFile,
    ref: branch,
  });
}

/** Finds the most recent workflow run for the deploy workflow, for status polling. */
export async function getLatestDeployRun() {
  const { data } = await octokit.actions.listWorkflowRuns({
    owner,
    repo,
    workflow_id: config.github.deployWorkflowFile,
    branch,
    per_page: 1,
  });
  return data.workflow_runs[0] ?? null;
}
