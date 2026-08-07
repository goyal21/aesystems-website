import fs from "node:fs";
import path from "node:path";
import { config } from "./config.js";
import { db } from "./db.js";

const MAX_AGE_MS = 48 * 60 * 60 * 1000; // 2 days

/** Deletes uploaded-but-never-published images that are older than MAX_AGE_MS and not referenced by any draft. */
export async function cleanupOrphanedUploads(): Promise<void> {
  let files: string[];
  try {
    files = await fs.promises.readdir(config.uploadTmpDir);
  } catch {
    return;
  }

  const referenced = new Set(
    (db.prepare("SELECT cover_image_path FROM drafts WHERE cover_image_path IS NOT NULL").all() as {
      cover_image_path: string;
    }[]).map((r) => r.cover_image_path)
  );

  const now = Date.now();
  for (const file of files) {
    if (referenced.has(file)) continue;
    const fullPath = path.join(config.uploadTmpDir, file);
    try {
      const stat = await fs.promises.stat(fullPath);
      if (now - stat.mtimeMs > MAX_AGE_MS) {
        await fs.promises.unlink(fullPath);
      }
    } catch {
      // file removed concurrently, ignore
    }
  }
}
