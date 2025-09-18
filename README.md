# Supertodo

Full‑stack Todo app built with Next.js (App Router), Prisma + PostgreSQL for core data, and MongoDB (Mongoose) for request/activity logging. Includes OpenAPI docs generated from route annotations and rendered with Swagger UI.

## Features

- Next.js 15 (App Router) with server components
- Prisma ORM targeting PostgreSQL (custom client output at `app/generated/prisma`)
- Request logging pipeline via Edge middleware → Node API → MongoDB (TTL cleanup)
- Swagger/OpenAPI docs from JSDoc in `app/api/**` routes
- Tailwind CSS (v4) and TypeScript
- Biome for linting/formatting

## Tech Stack

- Framework: Next.js 15 (`app/` router)
- UI: Tailwind CSS 4, Geist fonts
- ORM: Prisma 6 (`prisma/`, client generated to `app/generated/prisma`)
- DBs: PostgreSQL (todos, users), MongoDB (logs)
- Docs: `next-swagger-doc` + `swagger-ui-react`

## Project Structure

```
app/
  api/                 # REST endpoints (todos, ingest)
  api-doc/             # Swagger UI page
  todos/               # Todos list page (server component)
  log/                 # Logs page (placeholder)
  page.tsx             # Home page – lists users
lib/
  prisma.ts            # Prisma client with Accelerate extension
  mongodb.ts           # Mongoose connection helper
  swagger.ts           # OpenAPI spec generator
models/
  Log.ts               # Mongoose Log model (with TTL index)
middleware.ts          # Edge middleware posting request logs to /api/ingest
prisma/
  schema.prisma        # User, Todo models (PostgreSQL)
  seed.ts              # Seed data
```

## Prerequisites

- Node.js 18+
- PostgreSQL database (connection URL)
- MongoDB database (connection URL)

## Environment

Create `.env` in the project root with at least:

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB?schema=public"
MONGODB_URI="mongodb://USER:PASSWORD@HOST:PORT/DB"
```

Notes:
- `DATABASE_URL` is used by Prisma (PostgreSQL).
- `MONGODB_URI` is used by Mongoose for the logging pipeline.

## Install & Generate

```bash
npm install

# Generate Prisma Client to app/generated/prisma
npx prisma generate

# Set up database schema and seed sample data
npx prisma migrate dev --name init
npx prisma db seed
```

## Run

```bash
# Dev (Turbopack)
npm run dev

# Production
npm run build
npm start
```

- App: http://localhost:3000
- Todos page: http://localhost:3000/todos
- API docs (Swagger UI): http://localhost:3000/api-doc

## API Overview

Todos (PostgreSQL via Prisma):
- `GET /api/todos` – list all todos (with author)
- `POST /api/todos` – create a todo (JSON body)
- `GET /api/todos/:id` – get a todo by id
- `PUT /api/todos/:id` – update a todo by id

Request/Activity Logging (MongoDB via Mongoose):
- `POST /api/ingest` – internal endpoint used by middleware to store logs
- Edge `middleware.ts` posts light‑weight request metadata for most paths
- `models/Log.ts` defines a TTL index to purge logs after ~30 days

OpenAPI/Swagger:
- JSDoc annotations live in `app/api/**/route.ts`
- Spec is generated via `lib/swagger.ts` and rendered at `/api-doc`

## NPM Scripts

- `dev`: Run Next.js dev server (Turbopack)
- `build`: Build the app
- `start`: Start production server
- `lint`: Run Biome checks
- `format`: Format with Biome

Helpful Prisma commands:
- `npx prisma generate` – generate client
- `npx prisma migrate dev` – apply dev migrations
- `npx prisma db seed` – run `prisma/seed.ts`

## Notes

- Prisma Client output path is customized to `app/generated/prisma` in `prisma/schema.prisma`. Ensure you run `npx prisma generate` after installing dependencies or changing the schema.
- The logging pipeline requires a reachable MongoDB. If `MONGODB_URI` is missing, `/api/ingest` will fail and middleware logs will be dropped (but requests still succeed).
- Paths use the alias `@/*` (see `tsconfig.json`).

## License

MIT (or project default). Update as needed.

