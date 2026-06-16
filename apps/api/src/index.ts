import "dotenv/config";
import express from "express";
import cors from "cors";
import { authRouter } from "./routes/auth.js";
import { postsRouter } from "./routes/posts.js";
import { errorHandler } from "./middleware/errorHandler.js";

// Fail fast in production on a missing/placeholder JWT secret.
if (
  process.env.NODE_ENV === "production" &&
  (!process.env.JWT_SECRET || process.env.JWT_SECRET.includes("change-me") || process.env.JWT_SECRET.length < 32)
) {
  console.error("JWT_SECRET must be a strong (>=32 char) non-default value in production.");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT ?? 8000;

app.use(cors({ origin: process.env.WEB_URL ?? "http://localhost:3000" }));
app.use(express.json());

// Health check
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});

// Graceful shutdown for containers/PaaS.
for (const signal of ["SIGTERM", "SIGINT"] as const) {
  process.on(signal, () => {
    console.log(`${signal} received — closing server...`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10_000).unref();
  });
}
