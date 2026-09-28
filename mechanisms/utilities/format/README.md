# Decimal string formatting

English | [简体中文](README.zh-Hans.md)

Group digits without losing precision by converting to Number.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/utilities/format/index.html`.

## Read the mechanism

Start with [format-number.js](format-number.js).

The input contract is a signed decimal string. Scientific notation and locale parsing are deliberately excluded.

## Today and earlier approaches

Use Intl.NumberFormat for locale-sensitive presentation of numeric values.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
