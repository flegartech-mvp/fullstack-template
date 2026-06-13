# Commands

## Install
pnpm install

## Dev (all apps)
pnpm dev

## Dev (single app)
pnpm --filter web dev
pnpm --filter api dev

## Typecheck
pnpm typecheck

## Test
pnpm test

## Build
pnpm build

## Database
pnpm prisma generate
pnpm prisma migrate dev
pnpm prisma studio

## Docker
docker compose up -d      # start all services
docker compose down       # stop all
docker compose logs -f    # tail logs
docker compose up --build # rebuild and start
