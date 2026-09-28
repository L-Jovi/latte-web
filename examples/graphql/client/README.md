# Apollo Client operations

English | [简体中文](README.zh-Hans.md)

Use [the full quick start](../README.md). `npm run build -w @latte/graphql-client` emits a Vite app at `/examples/graphql/client/dist/`. For live development, stop the root static server and run `npm run dev -w @latte/graphql-client` on port 4173; keep the API running separately.

Read `src/client.js`: a split link sends subscriptions through GraphQLWsLink and other operations through HttpLink. `src/main.jsx` owns an in-memory session and creates/disposes a client when identity changes. `src/App.jsx` uses Apollo 4's React entry point, query variables for filtering/pagination, mutations for writes and subscriptions to refetch the current view.

The endpoint defaults to `http://127.0.0.1:4000/graphql`. An optional `VITE_GRAPHQL_URL` changes it at build time; Vite variables are public and must never contain secrets. The server's explicit CORS origins must agree. Token memory resets on reload; there is no persistence, offline queue or automatic reconnection after session expiry. Reload and sign in again.

The same feed actions are checked by `npx playwright test tests/browser/graphql.spec.js`; API failures and concurrent duplicate votes have separate server tests. The UI renders descriptions as text and the server accepts only HTTP/HTTPS links. License: [Graphcool MIT](../LICENSE.txt) plus original MIT changes. [Apollo React API](https://www.apollographql.com/docs/react/api/react/hooks).
