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
1. `pnpm --filter database exec prisma migrate dev --name init` (once; commit `prisma/migrations/`).
2. In production run **`prisma migrate deploy`** (never `db push`/`migrate dev`).
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
If host port 5432 is busy, set `DB_PORT=5433` in `.env`. Run migrations once after first boot:
`docker compose exec api sh -c "cd /repo && npx prisma migrate deploy --schema=packages/database/prisma/schema.prisma"` (or `db push` for demo).

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
- `test` script `--passWithNoTests` (empty suite no longer fails CI).
- Production JWT_SECRET guard + graceful SIGTERM/SIGINT shutdown.

## Security notes
- Seed creates demo users (`admin@example.com` / `user@example.com`, password `password123`) — **remove/change before public deploy**.
- Lock `WEB_URL` to the real frontend origin in production (CORS).
