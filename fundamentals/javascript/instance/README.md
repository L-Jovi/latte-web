# Construction and prototype lookup

English | [简体中文](README.zh-Hans.md)

Separate instance allocation, constructor execution and prototype traversal.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/fundamentals/javascript/instance/index.html`.

## Read the mechanism

Start with [new.js](new.js), [instanceof.js](instanceof.js).

forgeNew covers ordinary constructors. forgeInstanceof excludes Symbol.hasInstance and bound functions; primitive left operands return false.

## Today and earlier approaches

Use new and instanceof in application code. These functions expose the steps normally hidden by the operators.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
