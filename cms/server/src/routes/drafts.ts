import fs from "node:fs";
import path from "node:path";
import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../auth.js";
import { config } from "../config.js";
import { asyncHandler } from "../asyncHandler.js";
import { buildMdxFile, slugify, parseCommaList, type BlogPostFrontmatter } from "../mdx.js";
import { commitFiles, listBlogSlugs, triggerDeploy, getLatestDeployRun } from "../github.js";

export const draftsRouter = Router();
draftsRouter.use(requireAuth);

interface DraftRow {
  id: number;
  slug: string;
  title: string;
  author_id: number | null;
  cover_image_path: string | null;
  categories: string;
  tags: string;
  excerpt: string;
  body: string;
  status: string;
  published_commit_sha: string | null;
  published_workflow_run_id: string | null;
  published_by: string | null;
  created_at: string;
  updated_at: string;
}

draftsRouter.get("/", (_req, res) => {
  const drafts = db
    .prepare(
      `SELECT d.id, d.slug, d.title, d.status, d.updated_at, a.name as author_name
       FROM drafts d LEFT JOIN authors a ON a.id = d.author_id
       ORDER BY d.updated_at DESC`
    )
    .all();
  res.json(drafts);
});

draftsRouter.get("/:id", (req, res) => {
  const draft = db.prepare("SELECT * FROM drafts WHERE id = ?").get(req.params.id) as
    | DraftRow
    | undefined;
  if (!draft) return res.status(404).json({ error: "Draft not found" });
  res.json(draft);
});

draftsRouter.post("/", (req, res) => {
  const { title } = req.body ?? {};
  const baseTitle = typeof title === "string" && title.trim() ? title.trim() : "Untitled post";
  let slug = slugify(baseTitle) || "untitled-post";

  const existingSlugs = new Set(
    (db.prepare("SELECT slug FROM drafts").all() as { slug: string }[]).map((r) => r.slug)
  );
  let candidate = slug;
  let n = 2;
  while (existingSlugs.has(candidate)) {
    candidate = `${slug}-${n}`;
    n += 1;
  }
  slug = candidate;

  const result = db
    .prepare("INSERT INTO drafts (slug, title) VALUES (?, ?)")
    .run(slug, baseTitle);
  const draft = db.prepare("SELECT * FROM drafts WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(draft);
});

const EDITABLE_FIELDS = new Set([
  "title",
  "slug",
  "author_id",
  "cover_image_path",
  "categories",
  "tags",
  "excerpt",
  "body",
]);

draftsRouter.put("/:id", (req, res) => {
  const draft = db.prepare("SELECT * FROM drafts WHERE id = ?").get(req.params.id) as
    | DraftRow
    | undefined;
  if (!draft) return res.status(404).json({ error: "Draft not found" });
  if (draft.status === "published") {
    return res.status(409).json({ error: "Published posts are edited via a new publish, not draft autosave" });
  }

  const updates: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(req.body ?? {})) {
    if (EDITABLE_FIELDS.has(key)) updates[key] = value;
  }
  if (updates.slug && typeof updates.slug === "string") {
    updates.slug = slugify(updates.slug);
  }

  if (Object.keys(updates).length > 0) {
    const setClause = Object.keys(updates)
      .map((k) => `${k} = @${k}`)
      .join(", ");
    db.prepare(`UPDATE drafts SET ${setClause}, updated_at = datetime('now') WHERE id = @id`).run({
      ...updates,
      id: req.params.id,
    });
  }

  const updated = db.prepare("SELECT * FROM drafts WHERE id = ?").get(req.params.id);
  res.json(updated);
});

draftsRouter.delete("/:id", (req, res) => {
  db.prepare("DELETE FROM drafts WHERE id = ? AND status != 'published'").run(req.params.id);
  res.status(204).end();
});

draftsRouter.post(
  "/:id/publish",
  asyncHandler(async (req, res) => {
    const draft = db.prepare("SELECT * FROM drafts WHERE id = ?").get(req.params.id) as
      | DraftRow
      | undefined;
    if (!draft) return res.status(404).json({ error: "Draft not found" });
    if (draft.status === "published") {
      return res.status(409).json({ error: "Already published" });
    }
    if (!draft.title.trim() || !draft.body.trim()) {
      return res.status(400).json({ error: "Title and body are required to publish" });
    }

    // Everything from here on can throw (network calls, filesystem, GitHub API) -
    // the whole publish attempt is wrapped so a failure marks the draft
    // publish_failed and returns a clean error instead of taking the process down.
    try {
      const author = draft.author_id
        ? (db.prepare("SELECT name FROM authors WHERE id = ?").get(draft.author_id) as
            | { name: string }
            | undefined)
        : undefined;

      // Slug uniqueness against what's actually live on GitHub, not just this DB.
      const liveSlugs = await listBlogSlugs();
      if (liveSlugs.includes(draft.slug)) {
        return res
          .status(409)
          .json({ error: `Slug "${draft.slug}" already exists on the published blog` });
      }

      db.prepare("UPDATE drafts SET status = 'publishing' WHERE id = ?").run(draft.id);

      const files: { path: string; content: Buffer }[] = [];

      let coverImagePublicPath = "";
      if (draft.cover_image_path) {
        const tmpFullPath = path.join(config.uploadTmpDir, draft.cover_image_path);
        const imageBuffer = await fs.promises.readFile(tmpFullPath);
        const ext = path.extname(draft.cover_image_path);
        coverImagePublicPath = `${config.allowedPublicPrefix}${draft.slug}/cover${ext}`;
        files.push({ path: coverImagePublicPath, content: imageBuffer });
      }

      const now = new Date().toISOString();
      const frontmatter: BlogPostFrontmatter = {
        title: draft.title,
        slug: draft.slug,
        excerpt: draft.excerpt,
        date: now,
        updated: now,
        author: author?.name ?? "AE Systems Team",
        categories: parseCommaList(draft.categories),
        tags: parseCommaList(draft.tags),
        coverImage: coverImagePublicPath ? `/${coverImagePublicPath}` : "",
      };

      const mdxContent = buildMdxFile(frontmatter, draft.body);
      files.push({
        path: `${config.allowedContentPrefix}${draft.slug}.mdx`,
        content: Buffer.from(mdxContent, "utf-8"),
      });

      const { commitSha } = await commitFiles(files, `Publish blog post: ${draft.title}`);
      await triggerDeploy();

      db.prepare(
        `UPDATE drafts SET status = 'published', published_commit_sha = ?, published_by = ?, updated_at = datetime('now')
         WHERE id = ?`
      ).run(commitSha, req.session.username ?? null, draft.id);

      if (draft.cover_image_path) {
        await fs.promises
          .unlink(path.join(config.uploadTmpDir, draft.cover_image_path))
          .catch(() => {});
      }

      res.json({ ok: true, commitSha });
    } catch (err) {
      db.prepare("UPDATE drafts SET status = 'publish_failed' WHERE id = ?").run(draft.id);
      const message = err instanceof Error ? err.message : "Unknown error";
      res.status(500).json({ error: `Publish failed: ${message}` });
    }
  })
);

draftsRouter.get(
  "/:id/deploy-status",
  asyncHandler(async (req, res) => {
    const draft = db.prepare("SELECT status FROM drafts WHERE id = ?").get(req.params.id) as
      | { status: string }
      | undefined;
    if (!draft) return res.status(404).json({ error: "Draft not found" });
    if (draft.status !== "published") {
      return res.json({ status: draft.status });
    }
    const run = await getLatestDeployRun();
    res.json({
      status: draft.status,
      workflowStatus: run?.status ?? null,
      workflowConclusion: run?.conclusion ?? null,
      workflowRunUrl: run?.html_url ?? null,
    });
  })
);
