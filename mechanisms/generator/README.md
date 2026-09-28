# Generator state machines

English | [简体中文](README.zh-Hans.md)

Make the saved program counter behind yield visible.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/generator/index.html`.

## Read the mechanism

Start with [forge.js](forge.js), [index.js](index.js), [transform-generator.js](transform-generator.js).

The manual iterator supports next and sent values; it does not implement generator throw, return or finally semantics. transformed.html runs the preserved historical Babel output and attributed runtime for comparison.

## Today and earlier approaches

Native generators avoid carrying this runtime on current browsers. The transformed switch still explains how older targets represented suspended execution.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../NOTICE.md).
