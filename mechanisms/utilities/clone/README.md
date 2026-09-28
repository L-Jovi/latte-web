# Shallow and graph cloning

English | [简体中文](README.zh-Hans.md)

Compare copying properties with rebuilding a graph while preserving its shape.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/utilities/clone/index.html`.

## Read the mechanism

Start with [clone.js](clone.js), [clone-deep.js](clone-deep.js).

The deep version handles plain objects, arrays, Map, Set, Date and RegExp, including cycles and shared references. It preserves property descriptors without invoking getters. Functions and unsupported host/class instances keep their identity.

## Today and earlier approaches

Compare structuredClone for platform-supported values; its supported types and descriptor behavior are different.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
