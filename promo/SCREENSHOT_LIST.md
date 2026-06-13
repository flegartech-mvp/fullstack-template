# SCREENSHOT_LIST.md — fullstack-template

Run `pnpm dev` (or `docker compose up`) before capturing. Use a browser at 1440px wide for desktop screenshots. Use browser DevTools device emulation for any responsive/mobile checks.

---

## Screenshot 1

**Filename:** `screenshot_landing_page.png`

**What to show:** The landing page at `http://localhost:3000` — full above-the-fold view at 1440px wide. Headline, subheadline, and CTA buttons visible.

**What to highlight:** Clean, polished UI — shows this is not a "hello world" template. The headline and CTA communicate the project purpose immediately.

**Why it matters:** The first image viewers see should look finished and credible. A clean landing page signals production quality.

---

## Screenshot 2

**Filename:** `screenshot_register_login.png`

**What to show:** The register or login form — browser at full width. Form fields (email, password), submit button, and any validation states visible. Optionally show a validation error on an empty submit to demonstrate Zod validation.

**What to highlight:** The form itself and any real-time validation feedback — shows auth is wired and working, not mocked.

**Why it matters:** Auth is the most-asked-about feature in any starter kit. Showing it working immediately answers the biggest developer question.

---

## Screenshot 3

**Filename:** `screenshot_dashboard_post_list.png`

**What to show:** The authenticated dashboard view after login — user name visible in the nav, list of posts rendered from the database, "New Post" button visible.

**What to highlight:** The authenticated state (username in nav) and the populated post list — confirms the full login → fetch → render flow is working end to end.

**Why it matters:** Shows the complete auth and data flow in one screenshot — the most impressive single view of the template working.

---

## Screenshot 4

**Filename:** `screenshot_docker_compose_up.png`

**What to show:** Terminal output of `docker compose up --build` completing successfully — all three services (postgres, api, web) showing healthy/ready status.

**What to highlight:** The three service names in the output (postgres, api, web) and the final "ready" or "listening" log lines from both the API and web server.

**Why it matters:** Developers evaluating starter kits want to know local setup is painless. One terminal screenshot proving it works is more convincing than any description.

---

## Screenshot 5

**Filename:** `screenshot_prisma_studio_or_schema.png`

**What to show:** Either (a) Prisma Studio open in the browser showing the User and Post tables populated with seed data, OR (b) the `schema.prisma` file open in VS Code with the User and Post models visible.

**What to highlight:** (If Studio) the seed data rows in both tables. (If VS Code) the clean model definitions and relations between User and Post.

**Why it matters:** Demonstrates the database layer is real, seeded, and queryable — not just a placeholder. Appeals directly to developers who care about the data model.
