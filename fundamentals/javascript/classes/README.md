# Class and function inheritance

English | [简体中文](README.zh-Hans.md)

Compare constructor inheritance with the instance prototype chain.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/fundamentals/javascript/classes/index.html`.

## Read the mechanism

Start with [extends.js](extends.js).

Assigning Sub.prototype alone does not establish the constructor inheritance that class extends supplies. The console intentionally prints different comparisons.

## Today and earlier approaches

Read Object.getPrototypeOf as the modern explicit spelling of prototype inspection.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
