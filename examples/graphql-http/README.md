# GraphQL from scratch over HTTP

English | [简体中文](README.zh-Hans.md)

Schema, resolvers and a JSON response: the smallest complete GraphQL request. The server keeps the hello, dice and message exercises of the original version.

## Try it

This example needs two local servers, so there is no live demo. From the repository root:

```sh
npm ci
npm run dev -w @latte/graphql-http
# in a second terminal:
npm run dev
```

Open http://127.0.0.1:4173/examples/graphql-http/ and click **Run query**. The JSON answer appears below the button: `"foo": "Hello world!"`, `"bar": ["bar", "baz"]` and three dice rolls from 1 to 6. The API itself answers at http://127.0.0.1:4001/graphql.

Then replace the query with a _mutation_, an operation that changes data:

```graphql
mutation {
  createMessage(input: { author: "Reader", content: "Hello" }) {
    id
  }
}
```

Use the `id` it returns with `getMessage` or `updateMessage`, for example `{ getMessage(id: "…") { author content } }`. Restarting the server clears every message.

## How it works

GraphQL is a query language for APIs: the client sends one request that names exactly the fields it wants, and the server answers with JSON in the same shape. Everything happens in [server.js](server.js) (90 lines). Read it from top to bottom:

1. `buildSchema` reads a schema written in GraphQL's own schema language (SDL). It lists the types, and the queries and mutations that a client may send.
2. `RandomDie` is a class. When a query asks for a `RandomDie`, GraphQL calls its methods, such as `roll`, to fill in the fields the client asked for.
3. `rootValue` has one function for each top-level query and mutation. These functions are the _resolvers_: they produce the data. Messages are kept in a `Map` in memory.
4. `createHandler` from graphql-http turns the schema and the resolvers into an HTTP handler: it reads the JSON request, runs it and writes the JSON response.

The page (port 4173) and the API (port 4001) are different origins, so the server sends CORS headers that let the page's address, and no other, read its answers. [client.js](client.js) (25 lines) sends the text of the box as `{ "query": … }` in a `POST` request with `fetch`, and prints the answer.

Inputs are checked. A die has 1 to 1000 sides, you can roll it 1 to 100 times, a message has at most 1000 characters and an author at most 100, and the server keeps at most 100 messages. A bad value comes back as a GraphQL error, such as `Expected an integer from 1 to 100`. Asking for a message that does not exist returns `null`; trying to update one is an error.

## Then and now

The original version served the same schema with express-graphql on an Express server. The GraphQL Foundation [adopted graphql-http](https://graphql.org/blog/2022-11-07-graphql-http/) as its reference server, and express-graphql was archived in 2023. This version uses graphql-http with Node's own `http` module, and the schema and resolvers still follow the [GraphQL.js tutorial](https://www.graphql-js.org/docs/). The [full-stack example](../graphql/README.md) shows what a bigger server adds, with Apollo Server 5. [How the ecosystem changed](../../docs/ecosystem.md) tells the longer story.

## Limits

- No login, no database and no live updates (subscriptions). The [full-stack example](../graphql/README.md) has all three.
- Messages live in memory, so restarting the server clears them.
- The page is a plain text box, not a GraphQL IDE.
- The dice use `Math.random()`, which is fine for a game but not for anything that must be unpredictable, such as security tokens.

## Checks and credits

- After `npm run build`, `npm run test:api` starts this server on a free port. It checks the `hello` answer, that a one-sided die rolled three times gives `[1, 1, 1]`, that 101 dice are refused, and that a message can be created, updated and read back.
- After the build, `npx playwright test tests/browser/network.spec.js` clicks **Run query** in Chromium, Firefox and WebKit and checks that `Hello world!` appears. The same file also tests [JSONP vs fetch](../network/README.md) and [offline pages](../service-worker/README.md). The test run starts its own servers (see [scripts/test-services.ts](../../scripts/test-services.ts)), so stop the ones from Try it first. Install the browsers once with `npx playwright install chromium firefox webkit`.
- Both commands need the build because they also load the [full-stack example](../graphql/README.md), whose database client `npm run build` generates.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md). The schema and resolver exercises follow the [GraphQL.js tutorial](https://www.graphql-js.org/docs/), and [graphql-http](https://github.com/graphql/graphql-http) provides the HTTP handler.
