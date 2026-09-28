# Property proxy and event delegation

English | [简体中文](README.zh-Hans.md)

Observe interception at an object boundary and at a DOM parent.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/design-patterns/proxy/index.html`.

## Read the mechanism

Start with [es6-proxy.js](es6-proxy.js), [event-proxy.js](event-proxy.js).

The set trap intentionally maps inputs to fixed demonstration values and returns true to satisfy the Proxy contract. Delegation reads the actual event target.

## Today and earlier approaches

Proxy and event delegation share indirection as an idea but expose different platform contracts.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
