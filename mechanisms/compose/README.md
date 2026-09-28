# Function composition

English | [简体中文](README.zh-Hans.md)

The original redux-scratch actually demonstrated compose. Functions run from right to left; the innermost receives all arguments. With no functions, composition is the identity function. The page shows 10 × 10 + 10 − 2 = 108. This is not a store, dispatch loop or middleware implementation. Read the Redux documentation for how composition participates in an enhancer chain.

## Run and observe

From the repository root: `npm ci`, `npm run build`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/compose/index.html`.

## Where to start

[index.js](index.js).

## Verification

`npm run test:apps` runs current component and renderer tests. `npm run test:browser` exercises the visible behavior in Chromium, Firefox and WebKit after building. Historical files are not executed. The scope and deliberate limitations are described above.

## Sources and license

Original implementation and these explanations are MIT unless a local license states otherwise. See the [migration ledger](../../docs/migration.md) for the exact original revision and [NOTICE](../../NOTICE.md) for third-party attribution.
