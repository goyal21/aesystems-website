import session from "express-session";
import { db } from "./db.js";

/**
 * Minimal SQLite-backed session store using node:sqlite, avoiding the
 * native node-gyp dependency that connect-sqlite3 (via the `sqlite3`
 * package) would pull in.
 */
export class SqliteSessionStore extends session.Store {
  constructor() {
    super();
    // Best-effort sweep of expired sessions on startup.
    db.prepare("DELETE FROM sessions WHERE expires_at < ?").run(Date.now());
  }

  get(sid: string, callback: (err: unknown, session?: session.SessionData | null) => void): void {
    try {
      const row = db
        .prepare("SELECT data, expires_at FROM sessions WHERE sid = ?")
        .get(sid) as { data: string; expires_at: number } | undefined;
      if (!row || row.expires_at < Date.now()) return callback(null, null);
      callback(null, JSON.parse(row.data));
    } catch (err) {
      callback(err);
    }
  }

  set(sid: string, sessionData: session.SessionData, callback?: (err?: unknown) => void): void {
    try {
      const maxAge = sessionData.cookie?.maxAge ?? 1000 * 60 * 60 * 24 * 7;
      const expiresAt = Date.now() + maxAge;
      db.prepare(
        `INSERT INTO sessions (sid, data, expires_at) VALUES (@sid, @data, @expiresAt)
         ON CONFLICT(sid) DO UPDATE SET data = @data, expires_at = @expiresAt`
      ).run({ sid, data: JSON.stringify(sessionData), expiresAt });
      callback?.();
    } catch (err) {
      callback?.(err);
    }
  }

  destroy(sid: string, callback?: (err?: unknown) => void): void {
    try {
      db.prepare("DELETE FROM sessions WHERE sid = ?").run(sid);
      callback?.();
    } catch (err) {
      callback?.(err);
    }
  }

  touch(sid: string, sessionData: session.SessionData, callback?: () => void): void {
    try {
      const maxAge = sessionData.cookie?.maxAge ?? 1000 * 60 * 60 * 24 * 7;
      db.prepare("UPDATE sessions SET expires_at = ? WHERE sid = ?").run(Date.now() + maxAge, sid);
    } finally {
      callback?.();
    }
  }
}
