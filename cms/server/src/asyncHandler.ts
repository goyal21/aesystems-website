import type { NextFunction, Request, RequestHandler, Response } from "express";

/**
 * Express 4 does not catch rejected promises from async route handlers -
 * an uncaught rejection there crashes the whole process (confirmed: a bad
 * GitHub token during testing took the server down). Wrap every async
 * handler with this so errors reach the error-handling middleware instead.
 */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
): RequestHandler {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
}
