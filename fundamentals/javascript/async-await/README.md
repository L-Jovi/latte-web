# Promise chains and await

English | [简体中文](README.zh-Hans.md)

Express the same two-step calculation with then and await.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/fundamentals/javascript/async-await/index.html`.

## Read the mechanism

Start with [index.html](index.html).

Both functions return a Promise and display 6 = 6. Await suspends the current async function; it does not make CPU work non-blocking.

## Today and earlier approaches

Use the syntax that makes the sequence clearest; connect this example to the event-loop experiments.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
