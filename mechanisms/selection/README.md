# Cursors and selections in editable text

English | [简体中文](README.zh-Hans.md)

Save the cursor before focus leaves, insert text at it, and restore it after re-rendering. Two small pages use the browser's Selection and Range APIs directly, without an editor library.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/selection/
```

Click inside **Hello world**, for example right after `Hello`, then click **Insert at saved cursor**. The ✨ from the text field appears where the cursor was, and the cursor ends up right after it, so you can keep typing. If you select some text first, it is replaced. If you never put the cursor in the editor, the text goes at the end.

Then open `http://127.0.0.1:4173/mechanisms/selection/ec-richtext.html` and type `A #tag# B`. As you type, `#tag#` is highlighted and the cursor stays where it was.

No install or build is needed: `npm run dev` works right after cloning. You can also open the live demos of the [cursor page](https://l-jovi.github.io/latte-web/mechanisms/selection/index.html) and the [highlight page](https://l-jovi.github.io/latte-web/mechanisms/selection/ec-richtext.html).

## How it works

The _selection_ is the text the user has highlighted; when nothing is highlighted, it shrinks to the blinking cursor. The browser describes it with a _Range_: a start and an end, each given as a node plus an offset inside that node.

[cursor.js](cursor.js) (38 lines): clicking the button moves focus out of the editor, and the cursor would be lost. So every time you click, type or change something in the editor, the script saves a copy of the current Range with `cloneRange()`. When you click the button, it puts focus back in the editor, deletes whatever the saved Range covers, inserts a new text node there and moves the cursor right after it. If there is no saved Range, or it is no longer inside the editor, it uses the end of the editor instead.

[highlight.js](highlight.js) (50 lines), used by [ec-richtext.html](ec-richtext.html): after each input, it rebuilds the editor's content as text nodes, wrapping every `#tag#` (one to six characters between two `#` signs) in a `<mark>` element. Replacing the nodes breaks the selection, because it pointed into nodes that no longer exist. So before rebuilding, the script turns both ends of the selection, the _anchor_ (where it started) and the _focus_ (where it ends), into character counts from the start of the text. Afterwards it walks through the new text nodes to find the same counts again. The counts are in UTF-16 code units, the same unit that Range offsets and JavaScript string lengths use.

The new content is built from text nodes, never from an HTML string, so typing `<img>` shows those five characters instead of creating an image. While an input method is still composing text, for example when you type Chinese with pinyin, the script waits and rebuilds only when composition ends.

## Then and now

Editors used to be built directly on `contenteditable` and [`document.execCommand`](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand), which is now deprecated. Draft.js, from Facebook, added a structured editor state on top of React; Meta [archived it on 2023-02-06](https://github.com/facebookarchive/draft-js), and its successor is [Lexical](https://lexical.dev/). Editor frameworks such as Lexical, ProseMirror and TipTap now handle selection, history and formatting for you, but underneath they still rely on the Selection and Range APIs shown here.

Two examples do the same task with a framework. [Draft.js](../../examples/rich-text-draft/README.md) uses a _controlled_ `EditorState`: your component stores it and passes it back on every change. [Lexical](../../examples/rich-text-lexical/README.md) keeps the state inside an editor object and adds features through plugins.

## Limits

- Plain text in a single paragraph only. Block structure, undo, pasting rich HTML and collaborative editing need an editor with its own content model.
- Typing with an input method is not tested automatically; try it with your own input method.

## Checks and credits

- `npm run test:browser` runs two checks in Chromium, Firefox and WebKit. On the cursor page, it places the cursor after `Hello`, inserts ✨ and expects `Hello✨ world`; typing `!` then gives `Hello✨! world`, which shows the cursor landed after the inserted text. On the highlight page, it types `A #tag# B` and expects `#tag#` inside a `<mark>`. It puts the cursor after `A ` and types `xy`: each letter rebuilds the editor, and getting `A xy#tag# B` shows the cursor was restored in between. Then it types `<img>` and expects that text with no image element.
- The [migration ledger](../../docs/migration.md) links to the original version, the `rich-text` folder.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
