# The Apollo Client app

English | [简体中文](README.zh-Hans.md)

Queries, mutations and live subscriptions from a Vite app. This is the page of the [link feed](../README.md): it shows the links, logs you in, and updates itself when someone else publishes or votes.

## Try it

Start the API and the page as in the [application quick start](../README.md#try-it). `npm run build -w @latte/graphql-client` builds this app into `examples/graphql/client/dist/`, which the root `npm run dev` serves.

To work on the code with live reloading instead, stop the root `npm run dev` (both use port 4173), keep the API running, and start Vite:

```sh
npm run dev -w @latte/graphql-client
```

Then open the address that Vite prints.

## How it works

Read the three files in [src](src) in this order:

1. [src/client.js](src/client.js) (32 lines) creates the Apollo Client. A `split` link looks at each operation: subscriptions go over a WebSocket through `GraphQLWsLink`, and queries and mutations go over HTTP through `HttpLink`. Both send the login token, if there is one.
2. [src/main.jsx](src/main.jsx) (34 lines) keeps the session, the token and the user's name, in React state, so only in memory. When the session changes, at login or logout, it closes the old client and its WebSocket and creates a new one, with an empty cache.
3. [src/App.jsx](src/App.jsx) (284 lines) uses Apollo Client 4's React hooks, imported from `@apollo/client/react`. `useQuery` fetches three links at a time, with the search text and the page offset as variables. `useMutation` logs in, signs up, publishes and votes. Two `useSubscription` hooks, active only while you are logged in, listen for `newLink` and `newVote`, and fetch the current page again when an event arrives.

The endpoint is `http://127.0.0.1:4000/graphql`, unless `VITE_GRAPHQL_URL` sets another one at build time. Vite writes such variables into the page, where anyone can read them, so they must never hold secrets. The server's list of allowed origins (CORS) has to match the page's address. Descriptions are shown as text, never as HTML, and the server accepts only `http` and `https` links.

## Then and now

The original client was a Create React App project with Apollo Client 3, and its subscriptions used the older subscriptions-transport-ws protocol. This version is built with Vite and uses Apollo Client 4 with graphql-ws. In Apollo Client 4, the React hooks come from their own entry point, `@apollo/client/react`. See [GraphQLWsLink](https://www.apollographql.com/docs/react/api/link/apollo-link-subscriptions) and the [Apollo React API](https://www.apollographql.com/docs/react/api/react/hooks).

## Limits

- The token lives only in memory, so reloading the page logs you out.
- Nothing is saved in the browser, there is no offline queue, and the client does not reconnect by itself after the session expires: reload and log in again.

## Checks and credits

- After `npm run build`, `npx playwright test tests/browser/graphql.spec.js` runs this app in Chromium, Firefox and WebKit: paging, login, search, publishing from a second page, voting, `Already voted` and logout. The test run starts its own servers, so stop yours first.
- API errors and two votes at once are checked by the server tests, `npm run test:api`.
- The app is derived from Graphcool's tutorial code, which keeps its [MIT license](../LICENSE.txt); the changes are also MIT. See [NOTICE.md](../../../NOTICE.md).
