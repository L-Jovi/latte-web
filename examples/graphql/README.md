# Full-stack GraphQL: Apollo, subscriptions and SQLite

English | [简体中文](README.zh-Hans.md)

A small link feed with sign-up, voting, pagination and live updates. It updates the How to GraphQL tutorial app by Graphcool and keeps what you could do in it: sign up and log in, publish links, vote, search, page through the feed and watch updates arrive.

## Try it

This example needs its local API server, so there is no live demo. From the repository root, set it up once:

```sh
npm ci
npm run build
npm run db:setup -w @latte/graphql-server
```

Then start the API, and the page server in a second terminal:

```sh
npm run dev -w @latte/graphql-server
npm run dev
```

Open http://127.0.0.1:4173/examples/graphql/client/dist/. The feed shows three of the four links from the seed, newest first, with **Previous** and **Next** buttons. Then:

- Click **Log in**. The form is already filled in with the made-up account `reader@example.test` / `Learning-only-123!`. You can also sign up with another made-up account.
- Type in **Search** to filter the links by description or URL.
- Publish a link with an `http` or `https` URL, and vote. Voting twice for the same link shows `Already voted`.
- Open the page in a second tab and log in there too. When one tab publishes or votes, the other one updates right away and says `New link: …` or `New vote: …`.

## How it works

The app has two halves, and each has its own page:

- [The server](server/README.md): Apollo Server 5 with a GraphQL schema and resolvers, login with JSON Web Tokens, and a SQLite database used through Prisma 7.
- [The client](client/README.md): a Vite app with Apollo Client 4. It sends queries and mutations over HTTP, and subscriptions over a WebSocket.

A _subscription_ is a GraphQL operation that stays open: the server pushes an event whenever something happens, here `newLink` and `newVote`. The client then fetches the current page of the feed again.

What the app promises:

- A login token lives only in the page's memory and expires after one hour. The server checks it on every HTTP request and when a WebSocket opens, and closes the socket when the token expires.
- Logging out closes the WebSocket and throws away the client's cache.
- Only a logged-in user can publish or vote. The database allows one vote per user per link, even when two votes arrive at the same moment.
- An event goes out only after the database write has finished, so subscribers always receive the saved row.

## Then and now

The original app followed the How to GraphQL React and Apollo tutorial: a Create React App client, and an Apollo Server 2 backend whose subscriptions used the older subscriptions-transport-ws protocol. As of 2026-09, this version uses Apollo Server 5, Apollo Client 4, GraphQL 16, graphql-ws 6 and Prisma 7, and builds the client with Vite. Apollo Server now leaves subscriptions to the graphql-ws library ([Apollo docs](https://www.apollographql.com/docs/apollo-server/data/subscriptions)). Apollo Server 4 reached end of life on 2026-01-26, and [Apollo Server 5](https://www.apollographql.com/docs/apollo-server/migration) requires Node.js 20 or later. [How the ecosystem changed](../../docs/ecosystem.md) tells the longer story.

## Limits

- It is a small service that runs as a single process. It has no email verification, no password recovery, no rate limiting, no durable event log and no deployment setup.
- Events travel through memory inside the server process, so they do not reach other server processes and are lost on restart.
- It listens only on 127.0.0.1 and is meant for made-up data.

## Checks and credits

- After `npm run build`, `npm run test:api` checks a migration and seed on a fresh database, the limits on feed queries, login, that writes without login are refused, that two votes sent at once give one vote and one `ALREADY_VOTED` error, and that a subscription really receives the vote. Each test creates its own temporary database and removes it afterwards, so your local data is not touched.
- After the build, `npx playwright test tests/browser/graphql.spec.js` runs the built client in Chromium, Firefox and WebKit: paging, login, search, publishing from a second page, voting, `Already voted` and logout. The test run starts its own servers, so stop yours first. Install the browsers once with `npx playwright install chromium firefox webkit`.
- Exact versions of every dependency are pinned in the root `package-lock.json`.
- The app is derived from Graphcool's tutorial code, which keeps its [MIT license](LICENSE.txt); the changes are also MIT. See [NOTICE.md](../../NOTICE.md).
- Sources: [Apollo Server subscriptions](https://www.apollographql.com/docs/apollo-server/data/subscriptions), [Apollo Client GraphQLWsLink](https://www.apollographql.com/docs/react/api/link/apollo-link-subscriptions), [Prisma 7 with SQLite](https://www.prisma.io/docs/v7/prisma-orm/quickstart/sqlite).
