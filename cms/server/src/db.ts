import fs from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { config } from "./config.js";

fs.mkdirSync(config.dataDir, { recursive: true });

export const db = new DatabaseSync(path.join(config.dataDir, "cms.sqlite"));
db.exec("PRAGMA journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    title TEXT NOT NULL DEFAULT '',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS drafts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT NOT NULL UNIQUE,
    title TEXT NOT NULL DEFAULT '',
    author_id INTEGER REFERENCES authors(id),
    cover_image_path TEXT,
    categories TEXT NOT NULL DEFAULT '',
    tags TEXT NOT NULL DEFAULT '',
    excerpt TEXT NOT NULL DEFAULT '',
    body TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'publishing', 'published', 'publish_failed')),
    published_commit_sha TEXT,
    published_workflow_run_id TEXT,
    published_by TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sessions (
    sid TEXT PRIMARY KEY,
    data TEXT NOT NULL,
    expires_at INTEGER NOT NULL
  );
`);

// Seed one author row so the dropdown isn't empty on a fresh install.
const authorCount = db.prepare("SELECT COUNT(*) as n FROM authors").get() as { n: number };
if (authorCount.n === 0) {
  db.prepare("INSERT INTO authors (name, title) VALUES (?, ?)").run(
    "AE Systems Team",
    "Editorial"
  );
}
