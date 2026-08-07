import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/AuthContext";

export function Layout() {
  const { username, loading, logout } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;
  if (!username) return <Navigate to="/login" replace />;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside
        style={{
          width: 220,
          background: "var(--color-ink)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "20px 14px",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 28, paddingLeft: 8 }}>
          AE Systems <span style={{ color: "var(--color-teal)" }}>CMS</span>
        </div>
        <nav style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <SidebarLink to="/posts" label="Blogs" />
          <div
            style={{
              fontSize: "0.7rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#7387a3",
              margin: "18px 8px 6px",
            }}
          >
            Master Data
          </div>
          <SidebarLink to="/authors" label="Authors" />
        </nav>
        <div style={{ marginTop: "auto", paddingTop: 20 }}>
          <div style={{ fontSize: "0.75rem", color: "#7387a3", padding: "0 8px 8px" }}>{username}</div>
          <button
            className="btn btn-secondary"
            style={{ width: "100%", background: "transparent", color: "#fff", borderColor: "#233650" }}
            onClick={async () => {
              await logout();
              navigate("/login");
            }}
          >
            Sign out
          </button>
        </div>
      </aside>
      <main style={{ flex: 1, padding: "32px 40px", maxWidth: 900 }}>
        <Outlet />
      </main>
    </div>
  );
}

function SidebarLink({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        display: "block",
        padding: "9px 12px",
        borderRadius: 8,
        fontSize: "0.88rem",
        fontWeight: 600,
        color: isActive ? "#fff" : "#b7c4d6",
        background: isActive ? "var(--color-teal-dark)" : "transparent",
        textDecoration: "none",
      })}
    >
      {label}
    </NavLink>
  );
}
