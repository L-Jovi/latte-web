# Small design patterns

English | [简体中文](README.zh-Hans.md)

Use small examples to distinguish construction, adaptation, indirection and notifications.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/design-patterns/index.html`.

## Read the mechanism

Start with [factory/simple-factory.js](factory/simple-factory.js), [factory/factory-method.js](factory/factory-method.js), [plug.js](plug.js), [singleton.js](singleton.js), [descriptor.js](descriptor.js).

These are local mechanisms, not a recommendation to introduce every pattern into an application. The descriptor example replaces a non-runnable legacy field decorator: old decorator signatures differ from current proposals.

## Today and earlier approaches

Choose a pattern only when it removes an actual coupling. Property descriptors need no decorator toolchain.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../NOTICE.md).
