# Inheritance and counterexamples

English | [简体中文](README.zh-Hans.md)

Contrast shared prototypes, constructor stealing and Object.create.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/design-patterns/inherit/index.html`.

## Read the mechanism

Start with [prototype.js](prototype.js), [combination.js](combination.js), [prototype-obj.js](prototype-obj.js).

prototype.js intentionally aliases the parent prototype and demonstrates the resulting coupling. combination.js retains the corrected parasitic-combination pattern. The examples run in separate module scopes.

## Today and earlier approaches

Modern class syntax is a useful surface, but it still relies on prototype relationships.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
