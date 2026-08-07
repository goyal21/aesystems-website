export interface Author {
  id: number;
  name: string;
  title: string;
}

export interface DraftSummary {
  id: number;
  slug: string;
  title: string;
  status: "draft" | "publishing" | "published" | "publish_failed";
  updated_at: string;
  author_name: string | null;
}

export interface Draft {
  id: number;
  slug: string;
  title: string;
  author_id: number | null;
  cover_image_path: string | null;
  categories: string;
  tags: string;
  excerpt: string;
  body: string;
  status: DraftSummary["status"];
  published_commit_sha: string | null;
  published_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface DeployStatus {
  status: Draft["status"];
  workflowStatus?: string | null;
  workflowConclusion?: string | null;
  workflowRunUrl?: string | null;
}

class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`/api${path}`, {
    credentials: "include",
    headers: init?.body instanceof FormData ? undefined : { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    let message = res.statusText;
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {
      // no JSON body
    }
    throw new ApiError(res.status, message);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export { ApiError };

export const api = {
  login: (username: string, password: string) =>
    request<{ ok: true }>("/auth/login", { method: "POST", body: JSON.stringify({ username, password }) }),
  logout: () => request<{ ok: true }>("/auth/logout", { method: "POST" }),
  me: () => request<{ username: string }>("/auth/me"),

  listAuthors: () => request<Author[]>("/authors"),
  createAuthor: (name: string, title: string) =>
    request<Author>("/authors", { method: "POST", body: JSON.stringify({ name, title }) }),
  updateAuthor: (id: number, name: string, title: string) =>
    request<Author>(`/authors/${id}`, { method: "PUT", body: JSON.stringify({ name, title }) }),
  deleteAuthor: (id: number) => request<void>(`/authors/${id}`, { method: "DELETE" }),

  listDrafts: () => request<DraftSummary[]>("/drafts"),
  getDraft: (id: number) => request<Draft>(`/drafts/${id}`),
  createDraft: (title: string) =>
    request<Draft>("/drafts", { method: "POST", body: JSON.stringify({ title }) }),
  updateDraft: (id: number, fields: Partial<Draft>) =>
    request<Draft>(`/drafts/${id}`, { method: "PUT", body: JSON.stringify(fields) }),
  deleteDraft: (id: number) => request<void>(`/drafts/${id}`, { method: "DELETE" }),
  publishDraft: (id: number) =>
    request<{ ok: true; commitSha: string }>(`/drafts/${id}/publish`, { method: "POST" }),
  unpublishDraft: (id: number) => request<{ ok: true }>(`/drafts/${id}/unpublish`, { method: "POST" }),
  deployStatus: (id: number) => request<DeployStatus>(`/drafts/${id}/deploy-status`),

  uploadImage: async (file: File) => {
    const form = new FormData();
    form.append("image", file);
    return request<{ tmpId: string; sizeBytes: number }>("/images/upload", {
      method: "POST",
      body: form,
    });
  },
};
