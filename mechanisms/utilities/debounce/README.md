# Debouncing

English | [简体中文](README.zh-Hans.md)

Delay work until a burst of calls has settled.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/utilities/debounce/index.html`.

## Read the mechanism

Start with [simple.js](simple.js), [lodash-debounce.js](lodash-debounce.js).

The short version is trailing-only and supports cancel. The attributed Lodash adaptation adds leading, trailing and maxWait as a separate reading exercise.

## Today and earlier approaches

Use the short version to understand timer replacement; use a maintained library when the broader contract is needed.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
