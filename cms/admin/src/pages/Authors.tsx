import { useEffect, useState, type FormEvent } from "react";
import { api, ApiError, type Author } from "../lib/api";

export function Authors() {
  const [authors, setAuthors] = useState<Author[] | null>(null);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  function reload() {
    api.listAuthors().then(setAuthors);
  }

  useEffect(reload, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      if (editingId) {
        await api.updateAuthor(editingId, name, title);
      } else {
        await api.createAuthor(name, title);
      }
      setName("");
      setTitle("");
      setEditingId(null);
      reload();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to save author");
    }
  }

  async function handleDelete(id: number) {
    setError(null);
    try {
      await api.deleteAuthor(id);
      reload();
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Failed to delete author");
    }
  }

  return (
    <div>
      <h1 style={{ margin: "0 0 4px", fontSize: "1.3rem" }}>Authors</h1>
      <p style={{ color: "var(--color-muted)", margin: "0 0 20px", fontSize: "0.85rem" }}>
        Manage the author list shown when writing a post.
      </p>

      <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <div className="field" style={{ flex: 1, marginBottom: 0 }}>
            <label htmlFor="author-name">Name</label>
            <input id="author-name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="field" style={{ flex: 1, marginBottom: 0 }}>
            <label htmlFor="author-title">Title</label>
            <input id="author-title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Head of Technology" />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
            <button type="submit" className="btn btn-primary">
              {editingId ? "Save" : "Add author"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditingId(null);
                  setName("");
                  setTitle("");
                }}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        {error && <p style={{ color: "var(--color-danger)", fontSize: "0.85rem", marginTop: 12 }}>{error}</p>}
      </form>

      <div className="card" style={{ padding: 0 }}>
        {authors === null && <div style={{ padding: 20, color: "var(--color-muted)" }}>Loading…</div>}
        {authors?.map((author, i) => (
          <div
            key={author.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "12px 20px",
              borderTop: i === 0 ? "none" : "1px solid var(--color-border)",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{author.name}</div>
              {author.title && (
                <div style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>{author.title}</div>
              )}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setEditingId(author.id);
                  setName(author.name);
                  setTitle(author.title);
                }}
              >
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => handleDelete(author.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
