# PRODUCT_PITCH.md — fullstack-template

## One-Sentence Pitch

A production-ready full-stack monorepo starter kit — Next.js 15, Express 4, PostgreSQL 16, Prisma, TypeScript strict, Docker Compose — so you can clone it, configure it, and ship in under 10 minutes.

---

## Product Description

**fullstack-template** is a zero-compromise starting point for modern full-stack web applications. It wires together the exact stack most production teams actually use — Next.js 15 frontend, Express 4 API backend, PostgreSQL 16 database with Prisma ORM — into a single pnpm workspace monorepo. Every piece is pre-configured: TypeScript strict mode, Zod validation, JWT authentication, Docker Compose for local development, and Vitest for testing. You get working user auth (register, login, /me) and a posts CRUD API with ownership checks out of the box.

The goal is simple: eliminate the 2–4 hours every new project wastes on boilerplate. Instead of copy-pasting auth flows, configuring Docker Compose, wiring up Prisma, and setting up shared TypeScript configs, you clone this template and start writing features immediately. It is designed to be opinionated enough to save time but structured enough to be extended — not a throwaway demo, but a foundation you would actually build on.

---

## Best 5 Features

- **Complete working auth out of the box** — register, login, and `/me` endpoints with JWT, fully wired to the Next.js frontend
- **Prisma + PostgreSQL 16 with seed data** — schema, migrations, and seed script included; `docker compose up` gives you a running database with data in seconds
- **pnpm workspaces monorepo** — shared TypeScript config and types across `web/` and `api/` packages; no config drift between frontend and backend
- **Docker Compose for the full stack** — postgres, api, and web services configured and networked; local dev environment is one command
- **Posts CRUD with ownership** — working example of a protected resource endpoint (create, read, update, delete with user ownership checks) — a real pattern to extend from

---

## 30-Second Demo Flow

1. Clone the repo: `git clone https://github.com/[username]/fullstack-template && cd fullstack-template`
2. Copy the environment file: `cp .env.example .env`
3. Start the full stack: `docker compose up --build`
4. Open `http://localhost:3000` — the landing page loads immediately
5. Register a new account, log in, create a post — the full auth and CRUD flow works end to end with zero additional configuration

---

## Target Audience

- Developers starting a new SaaS, side project, or client project who want to skip boilerplate
- Engineers who want a reference implementation of a modern TypeScript full-stack monorepo
- Teams who need a shared starting point that enforces type safety across frontend and backend
- Developers learning Next.js 15 / React 19 / Prisma who want a production-structured example to study
