# GraphQL service and database

English | [简体中文](README.zh-Hans.md)

Follow [the application quick start](../README.md). The API uses port 4000 and `/graphql` for HTTP and the `graphql-transport-ws` subprotocol. `npm run dev -w @latte/graphql-server` binds only to 127.0.0.1.

Read `src/schema.graphql`, then `src/server.ts`, `src/db.ts` and `prisma/seed.ts`. Feed ordering uses createdAt plus id for a stable tie-break; skip must be nonnegative and take is 1–50. Private email/password fields are absent from the public schema. Passwords use bcrypt, with a 72-byte maximum to prevent silent truncation. JWT verification fixes the algorithm, issuer and audience; invalid tokens fail closed. Sockets close at token expiry.

`npm run db:setup -w @latte/graphql-server` creates a random local secret in `.env` only when that file is absent, initializes an empty SQLite file without truncating an existing file, applies checked-in SQL migrations, and adds an idempotent fictional seed. `prisma7.config.ts` carries the URL outside the Prisma schema; the runtime uses the supported better-sqlite3 adapter. The explicit empty-file step also makes first migration deterministic with Prisma 7.10 on this macOS host. The generated client, `.env`, database and journal files are ignored.

For a completely separate rebuild, set `DATABASE_URL=file:/absolute/path/to/new-demo.db` for both `db:setup` and `dev`; use a new path. Existing data is never silently reset. The old checked-in database is retired, not used as a migration source. This schema is a new learning baseline and does not promise migration of historical personal data.

`npm run typecheck -w @latte/graphql-server` generates and checks the client; `npm run test:api` exercises migration, seed, auth, pagination, URL validation, uniqueness and real graphql-ws delivery. In-process PubSub loses events on restart and is not a multi-server design.

Prisma 7.10 pins vulnerable tooling dependencies upstream. Root overrides use `deepmerge-ts` 8.0.2 for config loading and `mysql2` 3.24.4. The config uses plain records (none of v8's changed Map/custom type behavior); generation, config loading and real migrations are tested. MySQL is unused by this SQLite app. See [deepmerge v8 changes](https://github.com/RebeccaStevens/deepmerge-ts/releases/tag/v8.0.0). Do not use `--force` or ignore peer compatibility checks. License: [Graphcool MIT](../LICENSE.txt) and original MIT changes.
