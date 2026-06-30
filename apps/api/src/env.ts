import { config } from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Load the monorepo-root `.env` for local development regardless of the
// process working directory (pnpm runs each workspace script from its own
// package dir, so `dotenv/config` alone would miss the root file).
//
// Resolves to repo root from both `apps/api/src` (tsx dev) and
// `apps/api/dist` (compiled). In production the platform injects env vars
// directly and `config()` will not override them, so a missing file is fine.
const here = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(here, "../../../.env") });
