# fullstack-template — Promo Pack

**Tagline:** Clone, configure, ship.

A production-ready full-stack monorepo you can build on in minutes.

Built by FlegarTech.

## Assets in this folder

| File | Size |
| ---- | ---- |
| `01-instagram-square.png` | 1080×1080 |
| `02-instagram-story.png` | 1080×1920 |
| `03-instagram-reel-cover.png` | 1080×1920 |
| `04-facebook-post.png` | 1200×630 |
| `05-x-post.png` | 1600×900 |
| `06-linkedin-post.png` | 1200×1200 |
| `07-linkedin-banner.png` | 1584×396 |
| `08-github-social-preview.png` | 1280×640 |
| `09-portfolio-hero.png` | 1600×900 |
| `10-app-showcase.png` | 1920×1080 |

Source screenshots used to build these images are in [`source-screenshots/`](./source-screenshots/).

## Recommended use per platform

| Asset | Where to post |
| ----- | ------------- |
| `01-instagram-square.png` | Instagram feed, Facebook feed |
| `02-instagram-story.png` | Instagram / Facebook Stories |
| `03-instagram-reel-cover.png` | Instagram Reel / TikTok cover |
| `04-facebook-post.png` | Facebook link card, Open Graph image |
| `05-x-post.png` | X / Twitter post, link preview |
| `06-linkedin-post.png` | LinkedIn feed post |
| `07-linkedin-banner.png` | LinkedIn personal / company banner |
| `08-github-social-preview.png` | GitHub repo → Settings → Social preview |
| `09-portfolio-hero.png` | Portfolio / case-study hero, blog header |
| `10-app-showcase.png` | Product Hunt, press kit, README hero, slides |

## Suggested captions

**Instagram**
> fullstack-template ⚡ — clone, configure, ship. A production-ready full-stack monorepo: Next.js 15 + Express + PostgreSQL + Prisma, with auth, validation and Docker already wired.

**LinkedIn**
> Open-sourced fullstack-template — a production-ready monorepo so you can skip the boilerplate. Next.js 15 + Express + PostgreSQL + Prisma, JWT auth, Zod validation, Docker and Vitest in pnpm workspaces.

**X / Twitter**
> fullstack-template — clone, configure, ship. Next.js 15 + Express + Postgres + Prisma, auth & Docker wired.

**Facebook**
> fullstack-template is a production-ready monorepo starter so you can start building features, not boilerplate.

**GitHub (repo description / social preview alt)**
> fullstack-template — Next.js 15 + Express + Prisma + PostgreSQL monorepo. JWT auth, Zod, Docker, Vitest.

## Source screenshots

- Synthetic terminal mockup (this project has no GUI screenshot; the real `pnpm dev` boot output is rendered as a code frame).

*All visuals use real product screenshots. No UI was mocked or invented.*

## Promo videos

Silent, real-screenshot motion demos (no audio track — license-safe). Built from the same real
captures as the images, animated with smooth Ken Burns motion + crossfades and a title / CTA card.

| File | Size | Duration | Platform |
| ---- | ---- | -------- | -------- |
| `videos/01-instagram-reel.mp4` | 1080×1920 | 00:00:18.90 | Instagram Reels |
| `videos/02-tiktok.mp4` | 1080×1920 | 00:00:18.90 | TikTok |
| `videos/03-youtube-short.mp4` | 1080×1920 | 00:00:18.90 | YouTube Shorts |
| `videos/04-linkedin-demo.mp4` | 1920×1080 | 00:00:30.00 | LinkedIn (longer demo) |
| `videos/05-x-demo.mp4` | 1600×900 | 00:00:27.40 | X / Twitter |
| `videos/06-facebook-demo.mp4` | 1920×1080 | 00:00:27.40 | Facebook |
| `videos/07-github-readme-demo.mp4` | 1280×720 | 00:00:27.40 | GitHub README embed |
| `videos/08-portfolio-hero.mp4` | 1920×1080 | 00:00:27.40 | Portfolio / case-study hero |

GIF fallbacks in [`videos/gifs/`](./videos/gifs/): `github-readme-demo.gif` (README embeds) and `short-demo.gif` (quick previews / chat).

**Structure:** title card → main UI reveal → 3 feature callouts → second screen → CTA card (“Built by FlegarTech · Demo-ready product · github.com/flegartech/fullstack-template”).
**Audio:** none (silent by default). Add royalty-free music in an editor if desired.

**Suggested video caption (Reels / TikTok / Shorts):**
> fullstack-template ⚡ — clone, configure, ship. Next.js 15 + Express + Postgres + Prisma, auth & Docker wired.

To rebuild: `node build-videos.mjs fullstack-template-main` (or `promo/scripts/build-video.sh`).
