import fs from "node:fs";
import path from "node:path";
import express from "express";
import cors from "cors";
import { config } from "./config.js";
import { sessionMiddleware } from "./auth.js";
import { authRouter } from "./routes/auth.js";
import { authorsRouter } from "./routes/authors.js";
import { draftsRouter } from "./routes/drafts.js";
import { imagesRouter } from "./routes/images.js";
import { cleanupOrphanedUploads } from "./cleanup.js";
import "./db.js"; // ensures schema is created before routes are wired

const app = express();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(sessionMiddleware);

app.use("/api/auth", authRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/drafts", draftsRouter);
app.use("/api/images", imagesRouter);

app.get("/api/health", (_req, res) => res.json({ ok: true }));

// Phase 2 will populate cms/admin/dist - serve it if present, otherwise a
// placeholder so `npm run dev` here doesn't fail while the admin UI doesn't
// exist yet.
const adminDist = path.resolve(config.repoRoot, "cms/admin/dist");
if (fs.existsSync(adminDist)) {
  app.use(express.static(adminDist));
  app.get("*", (_req, res) => res.sendFile(path.join(adminDist, "index.html")));
} else {
  app.get("/", (_req, res) =>
    res.type("text/plain").send("AE Systems CMS API is running. Admin UI not built yet (Phase 2).")
  );
}

// Must be registered after all routes. Catches errors forwarded by
// asyncHandler (see asyncHandler.ts) so a failed request returns a clean
// JSON 500 instead of crashing the process - this is the fix for the crash
// found in testing (an uncaught rejection in an async route handler took
// the whole server down).
app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Unhandled route error:", err);
  const message = err instanceof Error ? err.message : "Internal server error";
  res.status(500).json({ error: message });
});

// Defense-in-depth: if something still slips through unwrapped, log and
// keep the process alive rather than let Node's default behavior kill it.
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled promise rejection:", reason);
});

cleanupOrphanedUploads().catch((err) => console.error("Startup cleanup failed:", err));
setInterval(() => {
  cleanupOrphanedUploads().catch((err) => console.error("Cleanup failed:", err));
}, 6 * 60 * 60 * 1000);

app.listen(config.port, () => {
  console.log(`AE Systems CMS server listening on :${config.port}`);
});
