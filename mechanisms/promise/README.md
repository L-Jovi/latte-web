# Promise: three steps

English | [简体中文](README.zh-Hans.md)

Start with a state machine, then add chaining, then examine aggregation.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/promise/index.html`.

## Read the mechanism

Start with [simple.js](simple.js), [promise-a+.js](promise-a+.js), [index.js](index.js).

simple.js is intentionally not Promise/A+ compliant: then subscribes without creating a chain. promise-a+.js implements the resolution procedure and runs the official A+ suite. index.js keeps the original class/callback style and adds all, race and finally. None is a replacement for native Promise in production.

## Today and earlier approaches

Run npm run test:aplus. Page output is 1,2. Read why a handler is queued, a then getter is read once and only the first resolution wins.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../NOTICE.md).

The official A+ suite is unchanged. Root npm overrides select Mocha 12.0.2 and Underscore 1.13.8 to remove known vulnerabilities in its old runner dependencies; `npm run test:aplus` checks this compatibility. The adapter evaluates the classic script in the test runner’s realm so its `TypeError` identity matches the specification assertions.
