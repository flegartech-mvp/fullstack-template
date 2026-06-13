# SHORT_VIDEO_SCRIPT.md — fullstack-template

**Format:** 30-second screen recording, split between terminal and browser
**Setup:** VS Code terminal on the left half, browser on the right half (or full-screen alternating)

---

## Hook — 0 to 5 seconds

**Screen:** Empty terminal. Cursor blinks.

**Voiceover:**
"Every new project wastes hours on the same setup. Here's how I skip all of it."

---

## Show — 5 to 20 seconds

**Screen (5–9s):** Terminal — three commands typed fast:
```
git clone https://github.com/[username]/fullstack-template
cd fullstack-template
docker compose up --build
```
Docker build output scrolls. Fast-forward or cut to completion.

**Screen (9–13s):** Browser opens to `http://localhost:3000` — the landing page appears. Clean UI visible: headline, CTA buttons.

**Screen (13–17s):** Click "Register" — form appears. Fill in an email and password, submit. Redirected to dashboard. Name visible in the nav.

**Screen (17–20s):** Click "New Post" — fill in title and body, submit. Post appears in the list. Quick cut to the terminal showing the API request log confirming the POST to `/api/posts`.

**Voiceover (5–20s):**
"One command spins up Postgres, the Express API, and the Next.js frontend. Working auth, database, and CRUD — already wired together. Next.js 15, Prisma, TypeScript strict, Docker Compose."

---

## Close — 20 to 30 seconds

**Screen:** GitHub repo page — file tree visible: `web/`, `api/`, `docker-compose.yml`, `README.md`.

**Voiceover:**
"Full-stack monorepo. Clone it, configure it, ship something real. Free on GitHub — link in bio."

**On-screen text overlay:**
```
Next.js 15 · Express · PostgreSQL · Prisma · TypeScript
Clone → Configure → Ship
github.com/[your-username]/fullstack-template
```
