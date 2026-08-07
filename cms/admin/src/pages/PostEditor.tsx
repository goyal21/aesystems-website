import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { marked } from "marked";
import { api, ApiError, type Author, type Draft } from "../lib/api";
import { slugify } from "../lib/slugify";

type SaveState = "idle" | "saving" | "saved" | "error";

export function PostEditor() {
  const { id } = useParams<{ id: string }>();
  const draftId = Number(id);
  const navigate = useNavigate();

  const [draft, setDraft] = useState<Draft | null>(null);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [slugTouched, setSlugTouched] = useState(false);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [publishError, setPublishError] = useState<string | null>(null);
  const [deployProgress, setDeployProgress] = useState<string | null>(null);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    isFirstLoad.current = true;
    Promise.all([api.getDraft(draftId), api.listAuthors()]).then(([d, a]) => {
      setDraft(d);
      setAuthors(a);
      setSlugTouched(true); // existing slug was deliberately chosen already, don't auto-overwrite
      isFirstLoad.current = false;
    });
  }, [draftId]);

  const scheduleSave = useCallback(
    (fields: Partial<Draft>) => {
      if (isFirstLoad.current) return;
      setSaveState("saving");
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(async () => {
        try {
          await api.updateDraft(draftId, fields);
          setSaveState("saved");
        } catch {
          setSaveState("error");
        }
      }, 700);
    },
    [draftId]
  );

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((prev) => (prev ? { ...prev, [key]: value } : prev));
    scheduleSave({ [key]: value });
  }

  function handleTitleChange(title: string) {
    setDraft((prev) => (prev ? { ...prev, title } : prev));
    const fields: Partial<Draft> = { title };
    if (!slugTouched) {
      const newSlug = slugify(title);
      setDraft((prev) => (prev ? { ...prev, title, slug: newSlug } : prev));
      fields.slug = newSlug;
    }
    scheduleSave(fields);
  }

  async function handleCoverUpload(file: File) {
    setUploadingCover(true);
    setCoverPreviewUrl(URL.createObjectURL(file));
    try {
      const { tmpId } = await api.uploadImage(file);
      update("cover_image_path", tmpId);
    } catch (err) {
      alert(err instanceof ApiError ? err.message : "Image upload failed");
      setCoverPreviewUrl(null);
    } finally {
      setUploadingCover(false);
    }
  }

  async function handlePublish() {
    setPublishError(null);
    setDeployProgress("Publishing…");
    try {
      await api.publishDraft(draftId);
      pollDeployStatus();
    } catch (err) {
      setDeployProgress(null);
      setPublishError(err instanceof ApiError ? err.message : "Publish failed");
    }
  }

  function pollDeployStatus() {
    const interval = setInterval(async () => {
      try {
        const status = await api.deployStatus(draftId);
        if (status.workflowStatus === "completed") {
          clearInterval(interval);
          setDeployProgress(
            status.workflowConclusion === "success" ? "Live ✓" : `Deploy finished: ${status.workflowConclusion}`
          );
          const updated = await api.getDraft(draftId);
          setDraft(updated);
        } else {
          setDeployProgress("Deploying… (build + deploy takes a few minutes)");
        }
      } catch {
        clearInterval(interval);
      }
    }, 5000);
  }

  if (!draft) return <p style={{ color: "var(--color-muted)" }}>Loading…</p>;

  const isPublished = draft.status === "published";

  return (
    <div>
      <button className="btn btn-secondary" style={{ marginBottom: 16 }} onClick={() => navigate("/posts")}>
        ← Back to posts
      </button>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "1.3rem" }}>{isPublished ? "Edit post" : "Write a new post"}</h1>
          <p style={{ color: "var(--color-muted)", margin: "4px 0 0", fontSize: "0.85rem" }}>
            Draft now, publish when ready. Published posts appear on the public blog.
          </p>
        </div>
        <div style={{ textAlign: "right" }}>
          <SaveIndicator state={saveState} />
        </div>
      </div>

      <div className="card">
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 0 }}>
          <div style={{ display: "flex", gap: 16 }}>
            <div className="field" style={{ flex: 2 }}>
              <label htmlFor="title">Title</label>
              <input id="title" value={draft.title} onChange={(e) => handleTitleChange(e.target.value)} />
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label htmlFor="author">Author</label>
              <select
                id="author"
                value={draft.author_id ?? ""}
                onChange={(e) => update("author_id", e.target.value ? Number(e.target.value) : null)}
              >
                <option value="">Select author…</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                    {a.title ? ` · ${a.title}` : ""}
                  </option>
                ))}
              </select>
              <div className="field-hint">
                Manage the list under Master Data → Authors.
              </div>
            </div>
          </div>

          <div className="field">
            <label htmlFor="slug">URL slug</label>
            <input
              id="slug"
              value={draft.slug}
              onChange={(e) => {
                setSlugTouched(true);
                update("slug", slugify(e.target.value));
              }}
            />
            <div className="field-hint">Used in the public URL: /blog/{draft.slug || "…"}</div>
          </div>

          <div className="field">
            <label>Cover image</label>
            <CoverImageInput
              previewUrl={coverPreviewUrl}
              uploading={uploadingCover}
              hasExisting={Boolean(draft.cover_image_path)}
              onFile={handleCoverUpload}
            />
          </div>

          <div style={{ display: "flex", gap: 16 }}>
            <div className="field" style={{ flex: 1 }}>
              <label htmlFor="categories">Categories (comma-separated)</label>
              <input
                id="categories"
                value={draft.categories}
                onChange={(e) => update("categories", e.target.value)}
                placeholder="Operations, Customer Stories"
              />
              <div className="field-hint">Primary grouping shown on the post card. The first one leads.</div>
            </div>
            <div className="field" style={{ flex: 1 }}>
              <label htmlFor="tags">Tags (comma-separated)</label>
              <input
                id="tags"
                value={draft.tags}
                onChange={(e) => update("tags", e.target.value)}
                placeholder="HVAC, Energy Savings"
              />
            </div>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid var(--color-border)", margin: "8px 0 20px" }} />
          <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "var(--color-muted)", marginBottom: 14 }}>
            Content
          </div>

          <div className="field">
            <label htmlFor="excerpt">Excerpt (shown on the blog list)</label>
            <textarea
              id="excerpt"
              rows={2}
              value={draft.excerpt}
              onChange={(e) => update("excerpt", e.target.value)}
              placeholder="A one or two sentence summary that hooks the reader."
            />
          </div>

          <div className="field">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label htmlFor="body" style={{ marginBottom: 0 }}>
                Body
              </label>
              <button type="button" className="btn btn-secondary" onClick={() => setShowPreview((s) => !s)}>
                {showPreview ? "Edit" : "Preview"}
              </button>
            </div>
            {showPreview ? (
              <div
                className="card"
                style={{ minHeight: 300, marginTop: 8 }}
                dangerouslySetInnerHTML={{ __html: marked.parse(draft.body || "*Nothing to preview yet.*") as string }}
              />
            ) : (
              <textarea
                id="body"
                rows={16}
                value={draft.body}
                onChange={(e) => update("body", e.target.value)}
                placeholder="Markdown - headings, lists, links, bold/italic, images all work."
                style={{ marginTop: 8, fontFamily: "ui-monospace, monospace", fontSize: "0.85rem" }}
              />
            )}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 20 }}>
        {isPublished ? (
          <span className="badge badge-published">Published</span>
        ) : (
          <button className="btn btn-primary" onClick={handlePublish} disabled={Boolean(deployProgress)}>
            Publish
          </button>
        )}
        {deployProgress && <span style={{ fontSize: "0.85rem", color: "var(--color-muted)" }}>{deployProgress}</span>}
        {publishError && <span style={{ fontSize: "0.85rem", color: "var(--color-danger)" }}>{publishError}</span>}
      </div>
    </div>
  );
}

function SaveIndicator({ state }: { state: SaveState }) {
  const text: Record<SaveState, string> = {
    idle: "",
    saving: "Saving…",
    saved: "Saved",
    error: "Save failed",
  };
  if (!text[state]) return null;
  return (
    <span style={{ fontSize: "0.78rem", color: state === "error" ? "var(--color-danger)" : "var(--color-muted)" }}>
      {text[state]}
    </span>
  );
}

function CoverImageInput({
  previewUrl,
  uploading,
  hasExisting,
  onFile,
}: {
  previewUrl: string | null;
  uploading: boolean;
  hasExisting: boolean;
  onFile: (file: File) => void;
}) {
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) onFile(file);
      }}
      onClick={() => inputRef.current?.click()}
      style={{
        border: `2px dashed ${dragOver ? "var(--color-teal)" : "var(--color-border)"}`,
        borderRadius: 8,
        padding: previewUrl ? 12 : 28,
        textAlign: "center",
        cursor: "pointer",
        background: dragOver ? "#f0faf8" : "transparent",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp,image/gif,image/avif"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFile(file);
        }}
      />
      {previewUrl ? (
        <img src={previewUrl} alt="Cover preview" style={{ maxHeight: 160, borderRadius: 6 }} />
      ) : (
        <>
          <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>
            {uploading ? "Uploading…" : hasExisting ? "Click to replace image" : "Click to upload an image"}
          </div>
          <div style={{ fontSize: "0.78rem", color: "var(--color-muted)", marginTop: 4 }}>
            PNG, JPG, WebP, GIF or AVIF — up to 8MB
          </div>
        </>
      )}
    </div>
  );
}
