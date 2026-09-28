# Small JavaScript utilities

English | [简体中文](README.zh-Hans.md)

Read common utilities as explicit algorithms with bounded contracts.

## Run and observe

From the repository root: `npm ci`, then `npm test`. Read the small implementation beside the regression cases.

## Read the mechanism

Start with [check-type.js](check-type.js), [read-array.js](read-array.js).

Prototype augmentation in read-array.js is retained as a historical exercise; production code should prefer a separate reader object. JSON serialization failure is not proof of a cycle.

## Today and earlier approaches

Subdirectories distinguish graph cloning, timing and formatting rather than pretending to be one production utility package.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../NOTICE.md).

`read-array.js` keeps a cursor in a closure without changing Array.prototype. `createArrayReader(array)` returns `read(count)`; positive integer counts return up to that many items, then `[]` at the end. It reads the current array, so mutate input only when that behavior is intentional. Native array iterators are usually sufficient for one-at-a-time consumption.
