# Fullstack Template

**Production-ready full-stack monorepo starter kit.**
Next.js 15 + Express API + PostgreSQL + Prisma + TypeScript. Clone it, rename it, ship it.

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, Tailwind CSS 4, TypeScript |
| Backend | Express 4, TypeScript, Zod, JWT auth |
| Database | PostgreSQL 16, Prisma ORM, type-safe seed |
| Infra | Docker Compose, pnpm workspaces |
| Quality | ESLint, Vitest, TypeScript strict mode |

---

## What's included

- **Auth** — register, login, `/api/auth/me` with JWT
- **Posts CRUD** — create, read, update, delete with ownership checks
- **Prisma schema** — `User` + `Post` models with roles and relations
- **Seed data** — admin + demo user, sample posts, one command to load
- **Error handling** — central middleware, Zod validation at API boundaries
- **Next.js app** — App Router, Server Components, landing page
- **Docker Compose** — postgres + api + web, zero local setup needed
- **pnpm workspaces** — shared TypeScript base config, unified scripts

---

## Quick start

```bash
# 1. Clone
git clone <repo-url> my-app && cd my-app

# 2. Configure (root .env is read by the API, Prisma, and Docker Compose)
cp .env.example .env

# 3. Install
pnpm install

# 4. Start database
pnpm docker:up

# 5. Run migrations + seed
pnpm db:migrate
pnpm db:seed

# 6. Start dev servers
pnpm dev
```

| Service | URL |
|---------|-----|
| Web | http://localhost:3000 |
| API | http://localhost:8000 |
| API health | http://localhost:8000/health |

**Demo accounts** (after seed):
- `admin@example.com` / `password123`
- `user@example.com` / `password123`

---

## Project structure

```
fullstack-template/
├── apps/
│   ├── web/                   Next.js 15 frontend
│   │   └── src/app/           App Router pages + layouts
│   └── api/                   Express REST API
│       └── src/
│           ├── routes/        auth.ts, posts.ts
│           └── middleware/    auth.ts, errorHandler.ts
├── packages/
│   └── database/              Prisma client + schema + seed
│       └── prisma/schema.prisma
├── docker-compose.yml         postgres + api + web
├── package.json               pnpm workspace root
├── tsconfig.base.json         shared TS config
└── .env.example               all env vars documented
```

---

## Commands

```bash
pnpm dev              # start web + api in parallel
pnpm build            # build all apps
pnpm typecheck        # check types across the monorepo
pnpm lint             # lint all apps
pnpm test             # run all tests

pnpm db:generate      # regenerate Prisma client
pnpm db:migrate       # run migrations
pnpm db:seed          # seed the database
pnpm db:studio        # open Prisma Studio at :5555

pnpm docker:up        # start all Docker services
pnpm docker:down      # stop all Docker services
pnpm docker:build     # rebuild and start
```

---

## API reference

### Auth
```
POST /api/auth/register   { email, name, password }
POST /api/auth/login      { email, password }
GET  /api/auth/me         Authorization: Bearer <token>
```

### Posts
```
GET    /api/posts          list published posts (public)
POST   /api/posts          create post (auth required)
GET    /api/posts/:id      get single post
PATCH  /api/posts/:id      update own post (auth required)
DELETE /api/posts/:id      delete own post (auth required)
```

---

## Deployment

This template is Vercel + Railway ready out of the box.

1. Deploy the `apps/api` to Railway or Render — add env vars from `.env.example`
2. Create a PostgreSQL database, set `DATABASE_URL`
3. Run `pnpm db:migrate` in the deploy pipeline
4. Deploy `apps/web` to Vercel — set `NEXT_PUBLIC_API_URL` to your API URL

---

## Customise

1. **Rename** — find/replace `fullstack-template` and `appdb` with your project name
2. **Schema** — edit `packages/database/prisma/schema.prisma`, run `pnpm db:migrate`
3. **Routes** — add new routers in `apps/api/src/routes/`, register in `apps/api/src/index.ts`
4. **Pages** — add new pages in `apps/web/src/app/`
5. **Deploy** — see the deployment section above

---

## License

MIT

---

Made by FlegarTech. If this project helped you, you can [support development](https://paypal.me/TiniFlegar).
