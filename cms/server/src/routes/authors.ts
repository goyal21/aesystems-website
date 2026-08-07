import { Router } from "express";
import { db } from "../db.js";
import { requireAuth } from "../auth.js";

export const authorsRouter = Router();
authorsRouter.use(requireAuth);

interface AuthorRow {
  id: number;
  name: string;
  title: string;
}

authorsRouter.get("/", (_req, res) => {
  const authors = db.prepare("SELECT id, name, title FROM authors ORDER BY name").all();
  res.json(authors);
});

authorsRouter.post("/", (req, res) => {
  const { name, title } = req.body ?? {};
  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "name is required" });
  }
  const result = db
    .prepare("INSERT INTO authors (name, title) VALUES (?, ?)")
    .run(name.trim(), typeof title === "string" ? title.trim() : "");
  const author = db
    .prepare("SELECT id, name, title FROM authors WHERE id = ?")
    .get(result.lastInsertRowid) as unknown as AuthorRow;
  res.status(201).json(author);
});

authorsRouter.put("/:id", (req, res) => {
  const { name, title } = req.body ?? {};
  const existing = db.prepare("SELECT id FROM authors WHERE id = ?").get(req.params.id);
  if (!existing) return res.status(404).json({ error: "Author not found" });

  db.prepare("UPDATE authors SET name = COALESCE(?, name), title = COALESCE(?, title) WHERE id = ?").run(
    typeof name === "string" ? name.trim() : null,
    typeof title === "string" ? title.trim() : null,
    req.params.id
  );
  const author = db
    .prepare("SELECT id, name, title FROM authors WHERE id = ?")
    .get(req.params.id) as unknown as AuthorRow;
  res.json(author);
});

authorsRouter.delete("/:id", (req, res) => {
  const inUse = db.prepare("SELECT COUNT(*) as n FROM drafts WHERE author_id = ?").get(req.params.id) as {
    n: number;
  };
  if (inUse.n > 0) {
    return res.status(409).json({ error: "Author is referenced by existing drafts/posts" });
  }
  db.prepare("DELETE FROM authors WHERE id = ?").run(req.params.id);
  res.status(204).end();
});
