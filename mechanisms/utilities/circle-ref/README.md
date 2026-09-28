# Cycles versus repeated references

English | [简体中文](README.zh-Hans.md)

Track the active traversal path to detect a back edge.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/utilities/circle-ref/index.html`.

## Read the mechanism

Start with [check-by-iterator.js](check-by-iterator.js), [check-by-json-parser.js](check-by-json-parser.js).

The traversal reads data descriptors, Map and Set entries. It skips accessors to avoid executing arbitrary getters. JSON also fails for BigInt or a throwing toJSON, so its result is only a serialization probe.

## Today and earlier approaches

A global visited set alone would falsely label shared siblings as a cycle.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
