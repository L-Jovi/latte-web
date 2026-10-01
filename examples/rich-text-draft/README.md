# Rich text with Draft.js (archived)

English | [简体中文](README.zh-Hans.md)

Type, bold and save as JSON with the editor Meta archived in 2023. The [Lexical version](../rich-text-lexical/README.md) does the same three steps, so the two can be compared.

## Try it

```sh
npm ci
npm run build -w @latte/rich-text-draft
npm run dev
# open http://127.0.0.1:4173/examples/rich-text-draft/dist/
```

Type a sentence, select part of it and click **Bold**: the selection turns bold. Click **Save JSON**, and the saved state appears below the editor. The bold text shows up there as an entry in `inlineStyleRanges` with the style `BOLD`. You can also open the [live demo](https://latte.jovipro.com/examples/rich-text-draft/dist/index.html).

## How it works

Everything is in [src/index.jsx](src/index.jsx) (54 lines). Draft.js is a _controlled_ editor, like a React `<input>` with `value` and `onChange`:

1. A class component keeps an `EditorState` in its `state`. It is an immutable object with the text, the selection and the undo history.
2. `<Editor>` receives that state. On every change it calls `onChange` with a new `EditorState`, and the component stores it with `setState`.
3. **Bold** calls `RichUtils.toggleInlineStyle(editorState, 'BOLD')`. The formatting is stored as data about ranges of characters, not as HTML tags. The button cancels its own `mousedown`, so clicking it does not take the selection away from the editor.
4. **Save JSON** calls `convertToRaw` on the current content and prints the result with `JSON.stringify`.

The editor state belongs to this one component. In the original Todo app it was kept in the global Redux store, next to the todos.

The two editors side by side:

| Job                        | Draft.js (this folder)                               | [Lexical](../rich-text-lexical/README.md)                     |
| -------------------------- | ---------------------------------------------------- | ------------------------------------------------------------- |
| Where the document lives   | In React state, handed back on every change          | Inside the editor; React does not hold it                     |
| Make the selection bold    | `RichUtils.toggleInlineStyle(editorState, 'BOLD')`   | `editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')`         |
| Save                       | `convertToRaw(editorState.getCurrentContent())`      | `editor.getEditorState().toJSON()`                            |
| Bold in the saved JSON     | An `inlineStyleRanges` entry with the style `BOLD`   | The bold bit (1) of the text node's `format` number           |
| Undo                       | Part of `EditorState`                                | Added by `HistoryPlugin`                                      |

## Then and now

Early web editors were built on `contenteditable` and `document.execCommand`, which is now deprecated. Draft.js (Facebook, 2016) added a structured editor state on top of React. Meta [archived Draft.js on 2023-02-06](https://github.com/facebookarchive/draft-js); its successor is [Lexical](https://lexical.dev/). As of 2026-09, editor frameworks such as Lexical, ProseMirror and TipTap handle selection, history and formatting for you. They all build on the browser's Selection and Range APIs, which [Cursors and selections in editable text](../../mechanisms/selection/README.md) shows directly. For a new editor, start from the [Lexical version](../rich-text-lexical/README.md).

## Limits

- Draft.js is archived. Its React peer range (`>=0.14.0`) accepts React 19, and the steps above are tested here, but that is no promise that everything else works or will be maintained.
- No HTML import, no images or other media, no collaboration and no saving to a server.

## Checks and credits

- After the build, `npm run test:browser` types `Readable text`, selects it, clicks **Bold** and **Save JSON** in Chromium, Firefox and WebKit. It checks that the JSON contains the text, that the first block has a `BOLD` style range, and that the page reported no errors.
- Draft.js depends on fbjs, whose browser code expects the Node.js global name `global`. [vite.config.js](vite.config.js) maps it to `globalThis` for this folder only; no third-party code is patched.
- Draft.js asks for Immutable 3.7, an older release with a known security problem. The root `package.json` overrides it to Immutable 3.8.4.
- Draft.js ([archived on GitHub](https://github.com/facebookarchive/draft-js)) keeps its own license. Original code is MIT; see [NOTICE.md](../../NOTICE.md).
