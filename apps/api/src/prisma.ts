import { PrismaClient } from "@prisma/client";

// A single PrismaClient per process. Without this, every router that did
// `new PrismaClient()` opened its own connection pool, and `tsx watch`
// hot-reloads would leak pools until the database refused new connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
