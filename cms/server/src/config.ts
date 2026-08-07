import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverRoot = path.resolve(__dirname, ".."); // cms/server/src -> cms/server
const repoRoot = path.resolve(serverRoot, "../.."); // cms/server -> repo root

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const config = {
  port: Number(process.env.PORT ?? 4000),

  adminUsername: required("ADMIN_USERNAME"),
  adminPasswordHash: required("ADMIN_PASSWORD_HASH"),
  sessionSecret: required("SESSION_SECRET"),

  github: {
    token: required("GITHUB_TOKEN"),
    owner: required("GITHUB_OWNER"),
    repo: required("GITHUB_REPO"),
    branch: process.env.GITHUB_BRANCH ?? "preprod",
    deployWorkflowFile: "deploy-production.yml",
  },

  // Paths the CMS is ever allowed to write to via the Git Data API.
  allowedContentPrefix: "content/blog/",
  allowedPublicPrefix: "public/blog/",

  dataDir: path.resolve(serverRoot, "data"),
  // Relative paths here resolve against cms/server (not the repo root), matching
  // where UPLOAD_TMP_DIR's default in .env.example ("./data/uploads-tmp") expects.
  uploadTmpDir: path.resolve(serverRoot, process.env.UPLOAD_TMP_DIR ?? "data/uploads-tmp"),

  repoRoot,
};
