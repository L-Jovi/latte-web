# CSS layout

English | [简体中文](README.zh-Hans.md)

See formatting contexts, grid placement and several centering methods.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/fundamentals/css/grid/index.html`.

## Read the mechanism

Start with [bfc/bfc.html](bfc/bfc.html), [vertical-center/index.html](vertical-center/index.html), [grid/index.html](grid/index.html).

The older overflow-based BFC examples remain useful, but clipping is a side effect. flow-root creates a formatting context without using overflow as a workaround. Fixed dimensions keep these demonstrations easy to inspect.

## Today and earlier approaches

Use flex/grid for ordinary alignment; retain table-cell and inline-block variants to understand existing code.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../NOTICE.md).
