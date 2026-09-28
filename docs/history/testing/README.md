# Historical TestUtils and Enzyme cases

English | [简体中文](README.zh-Hans.md)

The retained cases come from Ruan Yifeng’s MIT-licensed react-testing-demo, itself crediting Jack Franklin’s Testing React Applications. They show shallow rendering, TestUtils and Enzyme assertions about the same Todo behaviors: heading, initial completion, add, toggle and delete. These files are historical excerpts; imports point to the old app available at the fixed baseline, and no old dependencies are installed. Current equivalents are [Testing Library tests](../../../tests/apps/react.test.jsx) and [browser tests](../../../tests/browser/react.spec.js). The duplicated tutorial text and React 0.14 scaffold are retired. [Upstream](https://github.com/ruanyf/react-testing-demo).

## Run and observe

From the repository root: `npm ci`, `npm run build`, then `npm run dev`. This entry is reading material; no historical dependency installation is required.

## Where to start

[cases/enzyme1.test.js](cases/enzyme1.test.js), [cases/dom1.test.js](cases/dom1.test.js), [LICENSE](LICENSE).

## Verification

`npm run test:apps` runs current component and renderer tests. `npm run test:browser` exercises the visible behavior in Chromium, Firefox and WebKit after building. Historical files are not executed. The scope and deliberate limitations are described above.

## Sources and license

Original implementation and these explanations are MIT unless a local license states otherwise. See the [migration ledger](../../../docs/migration.md) for the exact original revision and [NOTICE](../../../NOTICE.md) for third-party attribution.
