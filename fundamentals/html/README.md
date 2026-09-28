# Semantic HTML

English | [简体中文](README.zh-Hans.md)

Read a page as meaningful sections rather than a collection of generic boxes.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/fundamentals/html/semantic.html`.

## Read the mechanism

Start with [semantic.html](semantic.html).

The original article layout demonstrates headings, sections and related content. It is a structural exercise, not a full accessibility certification.

## Today and earlier approaches

Native headings, buttons and links carry behavior and meaning that must otherwise be rebuilt.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../NOTICE.md).
