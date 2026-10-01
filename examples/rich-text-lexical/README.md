# Rich text with Lexical

English | [简体中文](README.zh-Hans.md)

The same type, bold and save steps with Draft.js's successor. The [Draft.js version](../rich-text-draft/README.md) does the same three steps, so the two can be compared.

## Try it

```sh
npm ci
npm run build -w @latte/rich-text-lexical
npm run dev
# open http://127.0.0.1:4173/examples/rich-text-lexical/dist/
```

Type a sentence, select part of it and click **Bold**: the selection turns bold. Click **Save JSON**, and the saved state appears between the buttons and the editor. The bold text shows up there as a text node whose `format` is `1`. You can also open the [live demo](https://latte.jovipro.com/examples/rich-text-lexical/dist/index.html).

## How it works

Everything is in [src/index.jsx](src/index.jsx) (62 lines). Lexical keeps the document inside the editor. React draws the page around it but does not hold the text, unlike the controlled Draft.js editor, which hands a new state back to React on every change.

1. `LexicalComposer` creates the editor from `initialConfig`: a `namespace`, a `theme` that gives bold text the CSS class `bold`, and an `onError` that rethrows errors instead of hiding them.
2. `RichTextPlugin` renders the editable area (`ContentEditable`) and adds rich-text editing, including the formatting commands. `HistoryPlugin` adds undo and redo, so Ctrl+Z or Cmd+Z works.
3. The toolbar gets the editor from `useLexicalComposerContext`. **Bold** sends a _command_, `FORMAT_TEXT_COMMAND` with `'bold'`, and the rich-text plugin applies it to the selection. The button cancels its own `mousedown`, so clicking it does not take the selection away from the editor.
4. **Save JSON** reads the state only when you click: `editor.getEditorState().toJSON()`, printed with `JSON.stringify`. The JSON is not copied into React state on every change.

In the saved JSON, each text node stores its styles in one number, `format`, with one bit per style. Bold is the bit worth 1, so a bold node has `"format": 1`.

The two editors side by side:

| Job                      | Lexical (this folder)                                 | [Draft.js](../rich-text-draft/README.md)           |
| ------------------------ | ----------------------------------------------------- | -------------------------------------------------- |
| Where the document lives | Inside the editor; React does not hold it             | In React state, handed back on every change        |
| Make the selection bold  | `editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')` | `RichUtils.toggleInlineStyle(editorState, 'BOLD')` |
| Save                     | `editor.getEditorState().toJSON()`                    | `convertToRaw(editorState.getCurrentContent())`    |
| Bold in the saved JSON   | The bold bit (1) of the text node's `format` number   | An `inlineStyleRanges` entry with the style `BOLD` |
| Undo                     | Added by `HistoryPlugin`                              | Part of `EditorState`                              |

## Then and now

Early web editors were built on `contenteditable` and `document.execCommand`, which is now deprecated. Draft.js (Facebook, 2016) added a structured editor state on top of React. Meta [archived Draft.js on 2023-02-06](https://github.com/facebookarchive/draft-js); its successor is [Lexical](https://lexical.dev/). As of 2026-09, editor frameworks such as Lexical, ProseMirror and TipTap handle selection, history and formatting for you. They all build on the browser's Selection and Range APIs, which [Cursors and selections in editable text](../../mechanisms/selection/README.md) shows directly.

Lexical has changed too. As of 2026-09, its documentation calls `LexicalComposer` legacy and recommends building editors from _extensions_ with `LexicalExtensionComposer` instead of plugins ([React plugins](https://lexical.dev/docs/react/plugins), [getting started with React](https://lexical.dev/docs/getting-started/react)). The version installed here, 0.51.0, marks `LexicalComposer` as deprecated and expected to be removed in a future major release. This example still uses it.

## Limits

- The saved JSON is Lexical's own format; Draft.js cannot read it without a conversion.
- It does not store documents or load a saved one back, and there is no collaboration.
- It uses the plugin components (`LexicalComposer`, `RichTextPlugin`, `HistoryPlugin`) that Lexical now calls legacy, not the newer extensions.

## Checks and credits

- After the build, `npm run test:browser` types `Readable text`, selects it, clicks **Bold** and **Save JSON** in Chromium, Firefox and WebKit. It checks that the JSON contains the text, that the first text node has the bold bit set in `format`, and that the page reported no errors. The same test runs on the [Draft.js version](../rich-text-draft/README.md).
- The Lexical version is new. The Draft.js editor it is compared with came from the original 2018 Todo app; the [migration ledger](../../docs/migration.md) links to that code.
- Lexical, like the other installed packages, keeps its own license. Original code is MIT; see [NOTICE.md](../../NOTICE.md).
