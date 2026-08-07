import { Router } from "express";
import { verifyCredentials } from "../auth.js";
import { asyncHandler } from "../asyncHandler.js";

export const authRouter = Router();

// Minimal brute-force throttle: a shared password with no MFA is the accepted
// v1 tradeoff, but leaving login fully unthrottled would make it guessable.
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000;
const failedAttempts = new Map<string, { count: number; windowStart: number }>();

authRouter.post("/login", asyncHandler(async (req, res) => {
  const { username, password } = req.body ?? {};
  if (typeof username !== "string" || typeof password !== "string") {
    return res.status(400).json({ error: "Username and password required" });
  }

  const ip = req.ip ?? "unknown";
  const entry = failedAttempts.get(ip);
  const now = Date.now();
  if (entry && now - entry.windowStart < WINDOW_MS && entry.count >= MAX_ATTEMPTS) {
    return res.status(429).json({ error: "Too many attempts, try again later" });
  }

  const ok = await verifyCredentials(username, password);
  if (!ok) {
    if (!entry || now - entry.windowStart >= WINDOW_MS) {
      failedAttempts.set(ip, { count: 1, windowStart: now });
    } else {
      entry.count += 1;
    }
    return res.status(401).json({ error: "Invalid credentials" });
  }

  failedAttempts.delete(ip);
  req.session.loggedIn = true;
  req.session.username = username;
  res.json({ ok: true });
}));

authRouter.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

authRouter.get("/me", (req, res) => {
  if (!req.session.loggedIn) return res.status(401).json({ error: "Not authenticated" });
  res.json({ username: req.session.username });
});
