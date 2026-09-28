# Chained addition

English | [简体中文](README.zh-Hans.md)

Accumulate values in a closure and observe primitive coercion.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/utilities/add/index.html`.

## Read the mechanism

Start with [add-mutiply.js](add-mutiply.js).

Inspect String(addMutiplyParams(1,2)(3)) rather than relying on a console to coerce a function. Empty input sums to zero. Numeric inputs are assumed.

## Today and earlier approaches

Explicit functions are clearer for application arithmetic; this exercise teaches coercion and retained state.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
