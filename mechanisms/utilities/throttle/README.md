# Leading throttling

English | [简体中文](README.zh-Hans.md)

Limit calls while keeping the first event responsive.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/utilities/throttle/index.html`.

## Read the mechanism

Start with [simple.js](simple.js).

Click repeatedly: the count increases at most once per 500 ms. No trailing call is queued, so the final pointer position would need separate handling in a real drag interaction.

## Today and earlier approaches

A monotonic clock avoids wall-clock adjustments; throttling and debouncing solve different interaction requirements.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
