import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { authRouter } from "./routes/auth.js";
import { postsRouter } from "./routes/posts.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Limit credential-stuffing / brute-force against the auth endpoints.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 50,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});

export function createApp() {
  const app = express();

  // Behind a single PaaS/reverse proxy: trust one hop so rate-limit and
  // protocol detection use the real client IP, not the proxy's.
  app.set("trust proxy", 1);

  app.use(helmet());
  app.use(cors({ origin: process.env.WEB_URL ?? "http://localhost:3000" }));
  app.use(express.json({ limit: "1mb" }));

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.use("/api/auth", authLimiter, authRouter);
  app.use("/api/posts", postsRouter);

  // 404 for unknown routes (before the error handler).
  app.use((_req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  app.use(errorHandler);

  return app;
}
