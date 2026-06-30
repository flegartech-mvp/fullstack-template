import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}

const TOKEN_TTL = "7d";

// Read the secret at call time (not module load) so tests and `dotenv/config`
// can set it before the first request. index.ts refuses to boot in production
// with a missing/weak secret, so the dev fallback never reaches prod.
export function getJwtSecret(): string {
  return process.env.JWT_SECRET ?? "dev-secret";
}

export function signToken(userId: string): string {
  return jwt.sign({ userId }, getJwtSecret(), { expiresIn: TOKEN_TTL });
}

export function verifyToken(token: string): { userId: string } {
  return jwt.verify(token, getJwtSecret()) as { userId: string };
}

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    req.userId = verifyToken(token).userId;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
