# Deployment — Fullstack Template

pnpm monorepo:
- **`apps/api`** — Express + Prisma + JWT auth REST API (`/health`, `/api/auth`, `/api/posts`).
- **`apps/web`** — Next.js 15 frontend.
- **`packages/database`** — Prisma schema (PostgreSQL) + seed.
- **`packages/types`** — placeholder (currently only `src/`, no `package.json`; not yet a workspace package).

## Verified locally
- `pnpm install` ✅, `pnpm --filter database db:generate` ✅, `prisma db push` + seed ✅
- `pnpm typecheck` ✅, `pnpm build` (api tsc + web Next build) ✅
- API runtime: `/health` 200; login (seeded `admin@example.com`/`password123`) → JWT; **bad input → 400, wrong creds → 401, no token → 401** (error contract fixed) ✅
- `docker build -f apps/api/Dockerfile .` ✅; container healthy, `/health` 200, login 200 ✅

## Prerequisites
- Node 20+ and pnpm 9+ (`packageManager: pnpm@9.0.0`); PostgreSQL 16.

## Build / run
| Command | Purpose |
|---------|---------|
| `pnpm install` | Install all workspaces |
| `pnpm --filter database db:generate` | Generate Prisma Client |
| `pnpm --filter database exec prisma db push` | Sync schema (dev) |
| `pnpm --filter database db:seed` | Seed demo users + posts |
| `pnpm build` | Build api + web |
| `pnpm --filter api start` | Run API (`node dist/index.js`, port 8000, `/health`) |
| `pnpm --filter web start` | Run web (`next start`, port 3000) |

## Migrations
No `migrations/` dir yet (dev uses `db push`). For production:
1. Once, **against a local/disposable development PostgreSQL** (never production): `pnpm --filter database exec prisma migrate dev --name init`; commit `prisma/migrations/`.
2. In production run **`prisma migrate deploy`** only — never `db push`/`migrate dev` against production.
> `binaryTargets` include `debian-openssl-3.0.x`/`-1.1.x` so the engine resolves in Docker.

## Docker Compose (VPS / single-host)
`docker-compose.yml` runs **postgres + api + web** with healthchecks and ordered startup
(`api` waits for postgres healthy; `web` waits for api healthy). Build context is the repo root.
```bash
# .env at repo root must set at least JWT_SECRET (compose requires it):
echo "JWT_SECRET=$(openssl rand -hex 32)" >> .env
docker compose up --build -d
# api → http://localhost:8000/health   web → http://localhost:3000
```
If host port 5432 is busy, set `DB_PORT=5433` in `.env`. Run migrations once after first boot
(use the **pinned** Prisma CLI shipped in the image — not `npx prisma`, which would pull a newer
major that can mismatch the generated client):
```bash
docker compose exec api sh -c "cd /repo && packages/database/node_modules/.bin/prisma migrate deploy --schema=packages/database/prisma/schema.prisma"
```

(For the demo/non-migration path you can substitute `prisma db push`.)

## Recommended hosting (separate services)
| Component | Primary | Fallback |
|-----------|---------|----------|
| API (Express) | **Railway / Render** web service + managed Postgres (build `pnpm install && pnpm build`, start `pnpm --filter api start`) | Fly.io / VPS Docker (`apps/api/Dockerfile`) |
| Web (Next.js) | **Vercel** (root `apps/web`) | VPS Docker (`apps/web/Dockerfile`, runs `next start`) |
| DB | Managed Postgres (Neon/Supabase/RDS/Railway) | compose Postgres on VPS |

## Environment variables
**Server-only:** `DATABASE_URL`, `JWT_SECRET` (**required in prod, ≥32 chars; the API refuses to start on the `change-me` default**), `PORT`, `NODE_ENV`, `WEB_URL` (CORS allow-origin).
**Client-visible (web):** `NEXT_PUBLIC_API_URL` — baked into the browser bundle at build time; never put secrets in `NEXT_PUBLIC_*`.

## Fixes applied
- `packages/database` was missing its `bcryptjs` dependency (seed crashed under pnpm isolation) — added.
- `apps/api` imported `@prisma/client` without declaring it — added (+ workspace `database` dep).
- `apps/api` never compiled: pnpm `TS2742` on Express routers (disabled `.d.ts` emit for the app) and `exactOptionalPropertyTypes` vs Prisma inputs (disabled for the api workspace; `noUncheckedIndexedAccess` kept → route-param guards added).
- `errorHandler` now maps `ZodError` → **400** (was 500) — correct API error contract.
- Production JWT_SECRET guard + graceful SIGTERM/SIGINT shutdown.

## Release-pass hardening

- **ESLint actually runs.** Neither workspace had an ESLint config (web `next lint` prompted interactively, api errored), so `pnpm lint` failed in CI. Added flat configs (`apps/web/eslint.config.mjs` via `next/core-web-vitals`+`next/typescript`; `apps/api/eslint.config.mjs` via `typescript-eslint`) and switched scripts to `eslint .`.
- **Real test suite.** Added `supertest`-based API tests (health, 404 handler, auth/posts authz, validation→400, security headers, token round-trip). `test` no longer needs `--passWithNoTests`.
- **Env actually loads in local dev.** Per-package CWDs meant the documented root `.env`/`.env.local` was never read by the API or Prisma. API now loads the repo-root `.env` via `apps/api/src/env.ts`; DB scripts use `dotenv-cli` (`-e ../../.env`). Quick-start now copies to `.env` (root). Added `db:deploy`.
- **Security middleware.** `helmet` security headers, `express.json({ limit: "1mb" })`, and an `express-rate-limit` limiter on `/api/auth`. Added a JSON `404` handler.
- **Single Prisma client.** Replaced the two `new PrismaClient()` instances with a shared singleton (`apps/api/src/prisma.ts`); `/me` now uses the `requireAuth` middleware.
- **Dependency CVEs cleared.** Bumped `vitest`→3 and added pnpm `overrides` for `postcss`/`vite`/`esbuild`; `osv-scanner` now reports no issues.
- **CI workflow hardened** (zizmor): added least-privilege `permissions: contents: read` and `persist-credentials: false` on checkout.
- **Web image build fixed.** `apps/web/Dockerfile` copied a non-existent `public/` dir (build failed); added `apps/web/public/robots.txt` and an `app/icon.svg` (fixes the favicon 404). Added a branded `not-found.tsx`. Landing-page "Check API health" link now targets the API URL (was a broken same-origin `/api/health`).

## Security notes
- Seed creates demo users (`admin@example.com` / `user@example.com`, password `password123`) — **remove/change before public deploy**.
- Lock `WEB_URL` to the real frontend origin in production (CORS).
