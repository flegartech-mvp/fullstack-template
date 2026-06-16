# API image. BUILD CONTEXT = repo root:
#   docker build -f apps/api/Dockerfile -t fst-api .
FROM node:22-bookworm-slim AS build
RUN corepack enable && apt-get update \
 && apt-get install -y --no-install-recommends openssl \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /repo

# Workspace manifests first (cache install layer).
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/api/package.json apps/api/package.json
COPY packages/database/package.json packages/database/package.json
RUN pnpm install --frozen-lockfile

# Source, then generate Prisma client and build the API.
COPY tsconfig.base.json ./
COPY packages packages
COPY apps/api apps/api
RUN pnpm --filter database db:generate && pnpm --filter api build

# ---- runtime ----
FROM node:22-bookworm-slim AS runtime
RUN apt-get update && apt-get install -y --no-install-recommends openssl curl \
 && rm -rf /var/lib/apt/lists/*
ENV NODE_ENV=production
WORKDIR /repo
COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/packages ./packages
COPY --from=build /repo/apps/api/dist ./apps/api/dist
COPY --from=build /repo/apps/api/node_modules ./apps/api/node_modules
COPY --from=build /repo/apps/api/package.json ./apps/api/package.json
RUN useradd --create-home --uid 10001 appuser && chown -R appuser:appuser /repo
USER appuser
WORKDIR /repo/apps/api
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=3s --start-period=15s --retries=3 \
  CMD curl -fsS http://127.0.0.1:${PORT:-8000}/health || exit 1
CMD ["node", "dist/index.js"]
