# SAFE_PUBLIC_CLAIMS.md — fullstack-template

---

## SAFE TO CLAIM

These statements are accurate and directly verifiable from the codebase.

1. **"Next.js 15, React 19, Express 4, PostgreSQL 16, Prisma ORM, TypeScript strict, Zod validation, JWT auth, pnpm workspaces, Docker Compose, Vitest"** — the full stack is verifiable from `package.json` files and configuration.
2. **"Working user authentication out of the box: register, login, /me endpoints with JWT"** — auth routes exist and are functional.
3. **"Posts CRUD with user ownership checks"** — create, read, update, delete endpoints exist with ownership validation.
4. **"Prisma schema with seed data included"** — `schema.prisma` and seed script are present in the repo.
5. **"Docker Compose configuration for postgres, api, and web services"** — `docker-compose.yml` is present and tested.
6. **"pnpm workspace monorepo with shared TypeScript configuration"** — `pnpm-workspace.yaml` and shared tsconfig are present.
7. **"Production-ready starter kit — not a demo, a foundation to build on"** — TypeScript strict mode, error handling middleware, and Zod validation demonstrate production intent.
8. **"Clone, configure, and ship in under 10 minutes"** — verifiable by following the README setup steps end to end.

---

## DO NOT CLAIM

These statements would be misleading or unverifiable.

1. **"Battle-tested in production" or "used by X companies"** — this is an open-source starter template; make no claims about its production usage record unless you have documented evidence.
2. **"Infinitely scalable" or "enterprise-ready"** — the template is a solid foundation but makes no architectural guarantees about scale; claiming enterprise-readiness without evidence overpromises.
3. **"Best full-stack template" or "#1 starter kit"** — comparative superlatives require evidence. Stick to describing what the template actually does.
4. **Any specific performance benchmarks** — no load testing has been documented; do not claim response times or throughput numbers.
