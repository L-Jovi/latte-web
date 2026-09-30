# The GraphQL server and database

English | [简体中文](README.zh-Hans.md)

Apollo Server, Prisma and SQLite, rebuilt from migrations and a fictional seed. This is the API behind the [link feed](../README.md).

## Try it

Set up and start the server as in the [application quick start](../README.md#try-it). It listens only on 127.0.0.1, port 4000, and answers both HTTP and WebSocket requests at `/graphql`. From another terminal, send it a query:

```sh
curl -s http://127.0.0.1:4000/graphql -H 'Content-Type: application/json' -d '{"query":"{ info feed { count } }"}'
```

The answer is `{"data":{"info":"A local learning feed","feed":{"count":4}}}`: the four links from the seed.

## How it works

Read [src/schema.graphql](src/schema.graphql) first, then [src/server.ts](src/server.ts), [src/db.ts](src/db.ts) and [prisma/seed.ts](prisma/seed.ts).

- **Schema.** A `User` has only an `id` and a `name`. The email address and the password hash are stored in the database but are not part of the public schema, so no query can ask for them.
- **Feed.** `feed` sorts by `createdAt` and then by `id`, so links created at the same moment always come back in the same order. `skip` must be 0 or more, `take` from 1 to 50, and the search text at most 200 characters.
- **Accounts.** A new password needs at least 12 characters, and it is stored as a bcrypt hash. bcrypt reads only the first 72 bytes of a password, so longer passwords are refused instead of being silently cut short. A login returns a JSON Web Token (JWT) that expires after one hour. The server checks the token's algorithm, issuer and audience, and an invalid token makes the request fail instead of continuing as a guest.
- **Writes.** Publishing and voting need a logged-in user. A unique index on link and user in the database allows one vote per user per link, even when two votes arrive at the same moment; the second one gets an `ALREADY_VOTED` error.
- **Live updates.** Subscriptions run over a WebSocket, with the `graphql-transport-ws` protocol of the graphql-ws library. The server publishes an event only after the database write has finished, and closes a socket when its token expires.
- **Database.** [src/db.ts](src/db.ts) (5 lines) opens SQLite through Prisma's better-sqlite3 adapter. [prisma7.config.ts](prisma7.config.ts) holds the database address, outside the Prisma schema.

`npm run db:setup -w @latte/graphql-server` prepares everything, and never overwrites what is already there:

1. [setup.mjs](setup.mjs) writes `.env` with a random local secret, only if `.env` does not exist yet. It then creates the empty SQLite file, without truncating an existing one.
2. `prisma migrate deploy` applies the SQL migration in [prisma/migrations](prisma/migrations).
3. [prisma/seed.ts](prisma/seed.ts) adds a made-up user and four links. Running it again changes nothing.

For a separate, fresh database, set `DATABASE_URL=file:/absolute/path/to/new-demo.db` (a new path) for both `db:setup` and `dev`. Existing data is never reset silently.

## Then and now

The original server, from the How to GraphQL tutorial, ran on Apollo Server 2, whose subscriptions used the older subscriptions-transport-ws protocol. It used Prisma 3 and kept its database file in the repository. This version uses Apollo Server 5 on Express 5, graphql-ws 6 and Prisma 7. Apollo Server now leaves subscriptions to the graphql-ws library ([Apollo docs](https://www.apollographql.com/docs/apollo-server/data/subscriptions)), and Prisma 7 connects to SQLite through a driver adapter ([Prisma docs](https://www.prisma.io/docs/v7/prisma-orm/quickstart/sqlite)).

The old database file is not used, and nothing is migrated from it. The schema starts again from one baseline migration and made-up data, so no personal data from the old app is carried over.

## Limits

- Events travel through an in-memory publisher, `PubSub` from graphql-subscriptions. They are lost when the server restarts, and they do not reach other server processes.
- No email verification, no password recovery and no rate limiting.

## Checks and credits

- `npm run typecheck -w @latte/graphql-server` generates the Prisma client and type-checks the server.
- After `npm run build`, `npm run test:api` builds fresh temporary databases from the migration and the seed, and checks login, paging, the rules for URLs, the one-vote rule and real delivery over graphql-ws.
- Git ignores the generated client, `.env`, the database and its journal files.
- `setup.mjs` creates the empty database file on purpose: on the macOS machine where this was tested, that step made the first migration with Prisma 7.10 reliable.
- Prisma 7.10 asks for exact older versions of `deepmerge-ts` (used to load the config) and `mysql2`, which have known security problems. The root `package.json` overrides them to `deepmerge-ts` 8.0.2 and `mysql2` 3.24.4. The config is made of plain objects, so the [changes in deepmerge-ts v8](https://github.com/RebeccaStevens/deepmerge-ts/releases/tag/v8.0.0) around `Map`s and custom types do not affect it, and `npm run check` runs the real generation, config loading and migrations. This SQLite app never uses MySQL. A plain `npm ci` installs everything, without `--force` and without relaxing peer-dependency checks.
- The server is derived from Graphcool's tutorial code, which keeps its [MIT license](../LICENSE.txt); the changes are also MIT. See [NOTICE.md](../../../NOTICE.md).
