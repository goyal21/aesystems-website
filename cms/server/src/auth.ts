import type { NextFunction, Request, Response } from "express";
import session from "express-session";
import bcrypt from "bcryptjs";
import { config } from "./config.js";
import { SqliteSessionStore } from "./sessionStore.js";

declare module "express-session" {
  interface SessionData {
    loggedIn?: boolean;
    username?: string;
  }
}

export const sessionMiddleware = session({
  store: new SqliteSessionStore(),
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
  },
});

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.loggedIn) return next();
  res.status(401).json({ error: "Not authenticated" });
}

export async function verifyCredentials(username: string, password: string): Promise<boolean> {
  if (username !== config.adminUsername) return false;
  return bcrypt.compare(password, config.adminPasswordHash);
}
