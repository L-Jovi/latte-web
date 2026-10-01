# CSS layout: BFC, Grid and centering

English | [简体中文](README.zh-Hans.md)

Block formatting contexts, grid placement and several ways to center an element. Four small pages show one idea each, with fixed-size colored boxes that are easy to measure.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/fundamentals/css/bfc/bfc.html
```

No install or build is needed: `npm run dev` works right after cloning. The pages run no scripts, so there is nothing to see in the console. Inspect the boxes in the Elements panel of DevTools instead.

- [bfc/bfc.html](bfc/bfc.html) stacks pairs of light-blue squares. The first pair is 100 px apart. In the second pair, each square sits inside a box with `overflow: hidden`, and they are 200 px apart. Untick `overflow: hidden` in DevTools and the gap shrinks to 100 px. Further down, floated boxes show the same property at work.
- [vertical-center/index.html](vertical-center/index.html) centers a blue box inside a light-blue one in five different ways.
- [grid/index.html](grid/index.html) places nine numbered cells in three rows and three columns.
- [basic/index.html](basic/index.html) shows a grey box whose width comes from a second stylesheet.

You can also open the live demos: [BFC](https://l-jovi.github.io/latte-web/fundamentals/css/bfc/bfc.html), [basic](https://l-jovi.github.io/latte-web/fundamentals/css/basic/index.html), [centering](https://l-jovi.github.io/latte-web/fundamentals/css/vertical-center/index.html) and [grid](https://l-jovi.github.io/latte-web/fundamentals/css/grid/index.html).

## How it works

**Block formatting contexts.** Block boxes are laid out one after another, from top to bottom, inside a _block formatting context_ (BFC). Inside one BFC, the vertical margins of neighboring boxes _collapse_: they overlap, so two 100 px margins leave a 100 px gap, not 200 px. An element that starts its own BFC keeps its children's margins inside, contains its floated children, and does not overlap floats next to it ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_formatting_context)). `overflow` with any value other than `visible` or `clip` starts one, and so does `display: flow-root`. [bfc/bfc.html](bfc/bfc.html) has six parts, from top to bottom:

1. Two squares with `margin: 100px`. Their margins collapse, so they are 100 px apart.
2. The same squares, each inside a `div` with `overflow: hidden`. Each `div` is its own BFC and keeps the margins inside, so the squares are 200 px apart.
3. Two squares with `box-sizing: border-box`. They have no padding or border, so they look exactly like the first pair.
4. A bordered box with `overflow: hidden` around a 100 px float. The BFC makes the box grow around the float. Without it, the box would have no height, and its border would show as a thin line.
5. A 200 px grey box with `overflow: hidden` next to a floated square. Because it is a BFC, it sits beside the float. Without `overflow: hidden`, it would start under the float, and its text would wrap around it.
6. `display: flow-root` holds a float the way part 4 does, without `overflow`.

**Centering.** [vertical-center/index.html](vertical-center/index.html) puts a 100 × 240 px blue box inside a 500 × 300 px light-blue one, five times:

1. The box is `position: absolute` with `top: 50%`, which puts its top edge at the middle. `transform: translateY(-50%)` then moves it up by half its own height.
2. The parent is `display: flex` with `align-items: center`.
3. The parent is `display: grid`, and the box has `align-self: center` and `justify-self: center`.
4. Two `inline-block` elements share one line: an empty `::before` as tall as the parent, and the box. Both have `vertical-align: middle`, so their middles line up. The parent's `font-size: 0` stops the space between them from taking up room.
5. The parent is `display: table-cell`, with `vertical-align: middle` and `text-align: center`, like a cell in a table.

Methods 1 and 2 only center vertically, so the box stays on the left. Methods 3, 4 and 5 center it in both directions.

**Grid.** In [grid/index.html](grid/index.html), `grid-template-columns: repeat(1, 100px 1fr 2fr)` makes three columns: 100 px, then one share and two shares of the width that is left. `grid-template-rows: repeat(3, 1fr)` makes three equal rows, and `grid-gap: 20px 15px` leaves 20 px between rows and 15 px between columns. `grid-auto-flow: column` fills each column from top to bottom before it moves on, so cells 1, 2 and 3 stand in the first column, and cells 7, 8 and 9 in the widest one.

**Basic.** In [basic/index.html](basic/index.html), `@import` pulls in [basic/global.css](basic/global.css), which makes `.container` 500 px wide. The page's own rules add the grey background and the 300 px height. The four small black bars inside are `inline-block`, so they sit on one line like words, with small gaps that come from the spaces and line breaks between the tags.

## Then and now

The older examples on the BFC page use `overflow: hidden` to create a BFC. That works, but `overflow` is really about what to do with content that does not fit, so using it this way can bring unwanted scrollbars or clipped shadows. `display: flow-root`, in the last part of the page, creates a BFC and does nothing else ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Display/Block_formatting_context)).

For everyday alignment, use flexbox or grid. The `table-cell` and `inline-block` methods are still worth knowing, because you will meet them in existing code.

The grid page writes `grid-gap`, the property's name in early versions of the grid specification. Today it is called `gap`, and browsers still accept the old name ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/gap)).

## Limits

- Every box has a fixed size in pixels, so each effect is easy to measure. A responsive page would not normally be sized this way.
- On the grid page, `grid-template-areas` names areas, but no cell is placed by name, so the names change nothing.
- In centering method 5, the box ends up a few pixels above the exact middle. It is an `inline-block` sitting on a line of text, and the line keeps some room below it for the tails of letters such as g and p.

## Checks and credits

- `npm run test:browser` opens all four pages in Chromium, Firefox and WebKit and checks that each one loads without errors. No test measures the layouts.
- The [migration ledger](../../docs/migration.md) links to the original version, in the `style/layout` folder.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
