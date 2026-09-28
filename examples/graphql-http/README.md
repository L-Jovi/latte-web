# GraphQL over HTTP

English | [简体中文](README.zh-Hans.md)

Start with the smallest complete request path: SDL schema → root/class resolver → JSON HTTP response. This keeps the original hello, dice and in-memory message exercises.

After root `npm ci`, run `npm run dev -w @latte/graphql-http` and `npm run dev` in separate terminals. Open http://127.0.0.1:4173/examples/graphql-http/ and click **Run query**. Expect `Hello world!` and three dice results. The API is http://127.0.0.1:4001/graphql.

Read `server.js` from `buildSchema` through `RandomDie` and `rootValue` to `createHandler`. Try `mutation { createMessage(input: {author: "Reader", content: "Hello"}) { id } }`, then use that ID with `getMessage` or `updateMessage`. Restarting the process clears the Map. Dice counts and message lengths are bounded to keep failures understandable; randomness is not cryptographic.

`graphql-http` replaces the unmaintained Express GraphQL adapter. This example deliberately has no login, persistent database or subscriptions; see [the full feed](../graphql/README.md) for those boundaries. Missing messages return null, invalid mutation IDs return GraphQL errors. The GUI is a plain textarea, not an embedded IDE dependency.

Verify with `npm run test:api` and `npx playwright test tests/browser/network.spec.js`. Original additions are MIT; the retained schema/resolver exercise follows the [GraphQL.js tutorial](https://www.graphql-js.org/docs/). [graphql-http](https://github.com/graphql/graphql-http) defines the HTTP adapter.
