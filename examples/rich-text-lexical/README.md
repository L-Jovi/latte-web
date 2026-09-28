# Lexical editor state and plugins

English | [简体中文](README.zh-Hans.md)

Use the same type → select → Bold → Save JSON scenario as Draft. LexicalComposer creates an editor, RichTextPlugin renders editable content, HistoryPlugin manages undo, and a toolbar dispatches a formatting command. JSON is read from the editor when requested; it is not continuously fed back as controlled React state. The saved JSON is Lexical-specific and cannot be read as Draft data without a migration. This small example adds no document storage or collaboration. [Official React guide](https://lexical.dev/docs/getting-started/react).

## Run and observe

From the repository root: `npm ci`, `npm run build -w @latte/rich-text-lexical`, then `npm run dev`. Open `http://127.0.0.1:4173/examples/rich-text-lexical/dist/index.html`.

## Where to start

[src/index.jsx](src/index.jsx).

## Verification

`npm run test:apps` runs current component and renderer tests. `npm run test:browser` exercises the visible behavior in Chromium, Firefox and WebKit after building. Historical files are not executed. The scope and deliberate limitations are described above.

## Sources and license

Original implementation and these explanations are MIT unless a local license states otherwise. See the [migration ledger](../../docs/migration.md) for the exact original revision and [NOTICE](../../NOTICE.md) for third-party attribution.
