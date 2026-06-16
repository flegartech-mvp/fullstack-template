# Web (Next.js) image. BUILD CONTEXT = repo root:
#   docker build -f apps/web/Dockerfile -t fst-web .
# (Vercel is the recommended host for the web app; this image is for VPS/compose.)
FROM node:22-bookworm-slim AS build
RUN corepack enable
WORKDIR /repo
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
RUN pnpm install --frozen-lockfile
COPY tsconfig.base.json ./
COPY packages packages
COPY apps/web apps/web
# NEXT_PUBLIC_* is baked into the client bundle at build time.
ARG NEXT_PUBLIC_API_URL=http://localhost:8000
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
RUN pnpm --filter web build

# ---- runtime ----
FROM node:22-bookworm-slim AS runtime
RUN corepack enable
ENV NODE_ENV=production
WORKDIR /repo
COPY --from=build /repo/node_modules ./node_modules
COPY --from=build /repo/apps/web/node_modules ./apps/web/node_modules
COPY --from=build /repo/package.json /repo/pnpm-workspace.yaml ./
COPY --from=build /repo/apps/web/.next ./apps/web/.next
COPY --from=build /repo/apps/web/public ./apps/web/public
COPY --from=build /repo/apps/web/package.json ./apps/web/package.json
COPY --from=build /repo/apps/web/next.config.mjs ./apps/web/next.config.mjs
RUN useradd --create-home --uid 10001 appuser && chown -R appuser:appuser /repo
USER appuser
WORKDIR /repo/apps/web
EXPOSE 3000
CMD ["pnpm", "start"]
