import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

export interface AppError extends Error {
  statusCode?: number;
}

export function errorHandler(
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  // Validation errors are client errors (400), not server errors (500).
  if (err instanceof ZodError) {
    res.status(400).json({ error: "Validation failed", issues: err.issues });
    return;
  }

  const statusCode = err.statusCode ?? 500;
  const message = statusCode === 500 ? "Internal server error" : err.message;

  if (statusCode === 500) {
    console.error(err);
  }

  res.status(statusCode).json({ error: message });
}
