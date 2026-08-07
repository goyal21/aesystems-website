import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";
import { ApiError } from "../lib/api";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(username, password);
      navigate("/posts");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-ink)",
      }}
    >
      <form onSubmit={handleSubmit} className="card" style={{ width: 340 }}>
        <h1 style={{ fontSize: "1.1rem", margin: "0 0 4px" }}>AE Systems CMS</h1>
        <p style={{ color: "var(--color-muted)", fontSize: "0.85rem", margin: "0 0 20px" }}>
          Sign in to write and publish posts.
        </p>
        <div className="field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
            required
          />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && (
          <p style={{ color: "var(--color-danger)", fontSize: "0.85rem", marginBottom: 12 }}>{error}</p>
        )}
        <button type="submit" className="btn btn-primary" style={{ width: "100%" }} disabled={submitting}>
          {submitting ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
