# Layout and transform

English | [简体中文](README.zh-Hans.md)

Compare two ways of moving the same element.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/fundamentals/browser/render.html`.

## Read the mechanism

Start with [render.html](render.html).

Record a browser Performance trace and click each button. top changes layout position; transform preserves layout flow. Actual compositing depends on the browser and page.

## Today and earlier approaches

There is no hard-coded benchmark or claim that one property is always free.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../NOTICE.md).
