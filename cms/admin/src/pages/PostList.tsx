import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, type DraftSummary } from "../lib/api";

const STATUS_LABEL: Record<DraftSummary["status"], string> = {
  draft: "Draft",
  publishing: "Publishing…",
  published: "Published",
  publish_failed: "Publish failed",
};

export function PostList() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<DraftSummary[] | null>(null);
  const [creating, setCreating] = useState(false);

  function reload() {
    api.listDrafts().then(setPosts);
  }

  useEffect(reload, []);

  async function handleNewPost() {
    setCreating(true);
    try {
      const draft = await api.createDraft("Untitled post");
      navigate(`/posts/${draft.id}`);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.3rem" }}>Posts</h1>
          <p style={{ color: "var(--color-muted)", margin: "4px 0 0", fontSize: "0.85rem" }}>
            Draft now, publish when ready. Published posts appear on the public blog.
          </p>
        </div>
        <button className="btn btn-primary" onClick={handleNewPost} disabled={creating}>
          + Write a new post
        </button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        {posts === null && <div style={{ padding: 20, color: "var(--color-muted)" }}>Loading…</div>}
        {posts !== null && posts.length === 0 && (
          <div style={{ padding: 20, color: "var(--color-muted)" }}>
            No posts yet — click "Write a new post" to start.
          </div>
        )}
        {posts?.map((post, i) => (
          <div
            key={post.id}
            onClick={() => navigate(`/posts/${post.id}`)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderTop: i === 0 ? "none" : "1px solid var(--color-border)",
              cursor: "pointer",
            }}
          >
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.92rem" }}>{post.title}</div>
              <div style={{ fontSize: "0.78rem", color: "var(--color-muted)", marginTop: 2 }}>
                /{post.slug} {post.author_name ? `· ${post.author_name}` : ""}
              </div>
            </div>
            <span className={`badge badge-${post.status}`}>{STATUS_LABEL[post.status]}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
