# Types and an explicit Redux-style reducer

English | [简体中文](README.zh-Hans.md)

A discriminated union makes success/error narrowing visible. The enthusiasm reducer preserves the original increment/decrement scenario without the duplicate CRA app; it never drops below one. TypeScript checks the action shape, but callers outside TypeScript still need validation at their input boundary. Modern Redux Toolkit reduces action/reducer ceremony; the explicit version shows what it generates.

## Run and observe

From the repository root, run `npm ci`, then `npm run build -w @latte/typescript`. Inspect the generated `dist/` output described below.

## Read and compare

Start at [types/narrowing.ts](types/narrowing.ts), [actions/index.ts](actions/index.ts), [reducers/index.ts](reducers/index.ts). Build tools organize files; they do not make application logic correct. This is a bounded teaching example, not a production starter.

## Verify

`npm run check` checks types, builds workspace outputs, tests mechanisms and loads library artifacts. `npm run test:browser` opens built pages in Chromium, Firefox and WebKit. Install browser engines once with `npx playwright install chromium firefox webkit`.

## Sources and license

MIT. [Migration and original revision](../../docs/migration.md); [attribution](../../NOTICE.md). Generated build outputs are ignored and regenerated locally.
