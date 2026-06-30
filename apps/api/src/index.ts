import "./env.js";
import { createApp } from "./app.js";

// Fail fast in production on a missing/placeholder JWT secret.
if (
  process.env.NODE_ENV === "production" &&
  (!process.env.JWT_SECRET ||
    process.env.JWT_SECRET.includes("change-me") ||
    process.env.JWT_SECRET.length < 32)
) {
  console.error("JWT_SECRET must be a strong (>=32 char) non-default value in production.");
  process.exit(1);
}

const app = createApp();
const PORT = process.env.PORT ?? 8000;

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
