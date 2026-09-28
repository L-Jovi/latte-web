# Draft.js controlled editing

English | [简体中文](README.zh-Hans.md)

Type text, select it, click Bold and Save JSON. A class owns EditorState and returns each onChange result to Editor. Formatting changes content metadata; saving uses convertToRaw. This preserves the original controlled-editor lesson with a local state owner instead of putting editor internals into a global Todo store. Draft.js is archived. Its broad React peer range accepts React 19; the exact scenario is browser-tested here, but that is not a general compatibility or maintenance promise. Root overrides use upstream Immutable 3.8.4 to fix the vulnerable older transitive line. No HTML import, media, collaboration or server persistence is implemented. For new editor work, compare [Lexical](../rich-text-lexical/README.md). [Original upstream](https://github.com/facebookarchive/draft-js).

## Run and observe

From the repository root: `npm ci`, `npm run build -w @latte/rich-text-draft`, then `npm run dev`. Open `http://127.0.0.1:4173/examples/rich-text-draft/dist/index.html`.

## Where to start

[src/index.jsx](src/index.jsx).

## Verification

`npm run test:apps` runs current component and renderer tests. `npm run test:browser` exercises the visible behavior in Chromium, Firefox and WebKit after building. Historical files are not executed. The scope and deliberate limitations are described above.

## Sources and license

Original implementation and these explanations are MIT unless a local license states otherwise. See the [migration ledger](../../docs/migration.md) for the exact original revision and [NOTICE](../../NOTICE.md) for third-party attribution.

The Vite configuration maps the legacy fbjs `global` name to `globalThis` within this workspace. This build-time compatibility setting is specific to Draft; no third-party source is patched.
