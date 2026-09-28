# Selection, Range and cursor restoration

English | [简体中文](README.zh-Hans.md)

The first page saves a Range before focus leaves the editable area, then replaces the selection or inserts at its cursor. A stale selection falls back to the end. The second page highlights #tags# by building text/mark nodes and restores anchor/focus using UTF-16 offsets. It skips changes during IME composition. These are plain-text, single-paragraph mechanisms, not complete rich-text editors: block structure, undo integration, pasted rich HTML and collaborative edits need an editor model. Automated checks cover insertion and literal markup; IME behavior still needs manual testing with your input method. Compare the controlled Draft EditorState with Lexical’s editor/plugin model.

## Run and observe

From the repository root: `npm ci`, `npm run build`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/selection/index.html`.

## Where to start

[cursor.js](cursor.js), [highlight.js](highlight.js), [ec-richtext.html](ec-richtext.html).

## Verification

`npm run test:apps` runs current component and renderer tests. `npm run test:browser` exercises the visible behavior in Chromium, Firefox and WebKit after building. Historical files are not executed. The scope and deliberate limitations are described above.

## Sources and license

Original implementation and these explanations are MIT unless a local license states otherwise. See the [migration ledger](../../docs/migration.md) for the exact original revision and [NOTICE](../../NOTICE.md) for third-party attribution.
