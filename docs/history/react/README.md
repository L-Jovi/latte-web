# Historical React architecture notes

English | [简体中文](README.zh-Hans.md)

These Chinese notes were present in the original repository at 1be029e; Domain-driven-design.md was last changed on 2019-11-15 (2c6aeb0). They preserve how responsibilities were separated then. They are historical arguments, not current performance measurements or framework recommendations. Today fetch supports cancellation with AbortController; react-router-redux and deprecated lifecycle examples are replaced in the runnable apps. The dated note bodies and images remain, with explicit context headers.

## Run and observe

From the repository root: `npm ci`, `npm run build`, then `npm run dev`. This entry is reading material; no historical dependency installation is required.

## Where to start

[notes/Domain-driven-design.md](notes/Domain-driven-design.md), [notes/structure.md](notes/structure.md), [notes/routes.md](notes/routes.md), [notes/optimize-scene.md](notes/optimize-scene.md).

## Verification

`npm run test:apps` runs current component and renderer tests. `npm run test:browser` exercises the visible behavior in Chromium, Firefox and WebKit after building. Historical files are not executed. The scope and deliberate limitations are described above.

## Sources and license

Original implementation and these explanations are MIT unless a local license states otherwise. See the [migration ledger](../../../docs/migration.md) for the exact original revision and [NOTICE](../../../NOTICE.md) for third-party attribution.
