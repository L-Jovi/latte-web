# Apollo, subscriptions and SQLite

English | [简体中文](README.zh-Hans.md)

A local link feed teaches queries, signup/login, publication, voting, pagination and live events. It updates the original Graphcool/How to GraphQL exercise while keeping those observable behaviors.

From the repository root:

```sh
npm ci
npm run build
npm run db:setup -w @latte/graphql-server
npm run dev -w @latte/graphql-server
# In another terminal:
npm run dev
```

Open http://127.0.0.1:4173/examples/graphql/client/dist/. Log in as `reader@example.test` / `Learning-only-123!`, or sign up with a fictional account. The seed has four public documentation links. Open another tab and sign in to observe live posts/votes. Filter, change pages, post an HTTPS URL, and vote once; voting again reports `Already voted`.

Read [the server](server/README.md) for schema/resolvers, authentication, migration and seed; read [the client](client/README.md) for Apollo's HTTP/WebSocket split and cache. Server 5, Client 4, GraphQL 16, graphql-ws 6 and Prisma 7 replace the old CRA, Apollo built-in subscription transport and Prisma client setup. Dependencies are pinned in the root lockfile.

Tokens live in client memory and expire after one hour. HTTP and WebSocket operations validate them; logout closes the socket and discards the client cache. Publication requires a user; the database enforces one vote per user/link, even for concurrent requests. Events are published after awaited writes. This single-process teaching service has no email verification, password recovery, rate limiting, distributed pub/sub, durable event log or deployment setup; keep it on loopback with fictional data.

Run `npm run test:api` for fresh migration/seed, query bounds, login, unauthorized writes, concurrent duplicate votes and actual subscription delivery. Run `npx playwright test tests/browser/graphql.spec.js` for the built client in all three engines. Tests create separate temporary databases and do not reset your local database. See the [Graphcool MIT license](LICENSE.txt); original changes also use MIT.

Sources: [Apollo Server subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions), [Apollo Client GraphQLWsLink](https://www.apollographql.com/docs/react/api/link/apollo-link-subscriptions), [Prisma 7 SQLite](https://www.prisma.io/docs/v7/prisma-orm/quickstart/sqlite).
