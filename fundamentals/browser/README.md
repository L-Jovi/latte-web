# Moving an element: layout vs transform

English | [简体中文](README.zh-Hans.md)

Move the same box with `top` and with `transform`, and see which one makes the browser redo layout. On screen the two moves look the same; the difference shows up in DevTools.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/fundamentals/browser/render.html
```

No install or build is needed: `npm run dev` works right after cloning. Click **Move with top**: the box moves 100 px down, and a second click moves it back. **Move with transform** does the same. You can also open the [live demo](https://latte.jovipro.com/fundamentals/browser/render.html).

To see the difference, open DevTools:

- In the console, type `box.offsetTop` after each click. It is `100` after **Move with top**, but stays `0` after **Move with transform**, even though the box is drawn in the same place.
- In the **Performance** panel, record while you click one button a few times, then stop. Clicks on **Move with top** include a _Layout_ step; clicks on **Move with transform** should not.

## How it works

A browser turns HTML and CSS into pixels in steps: work out the styles, lay out the boxes (their sizes and positions), paint them, and composite the painted layers on screen. A change to a property re-runs the steps from the first one it affects.

- `top` is part of layout. Changing it gives the box a new layout position, as `offsetTop` shows, so the browser must lay out again before it can paint.
- `transform` is applied after layout. The box keeps its layout position and only its painted picture moves, so layout is skipped. If the box has its own layer, painting can be skipped too, and the move happens while compositing ([MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate)). Whether the browser gives it a layer depends on the browser and the page.

In [render.html](render.html) (5 lines), each button first resets the other property (`transform` to `none`, or `top` to `0px`) and then toggles its own.

## Then and now

The first version of this page moved the box with `top` once, one second after loading, with a comment saying that this causes a reflow, another name for layout. The page now puts both ways side by side. MDN's guide to animation performance explains why: changing a position property such as `left` means style, layout and paint work, while `transform` and `opacity` on an element with its own layer need only a style update ([MDN](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate)).

## Limits

- The page measures nothing and gives no numbers. On a page this small, both buttons are fast, and it makes no claim that `transform` is always free.
- The box is absolutely positioned, so moving it with `top` does not push other content around.

## Checks and credits

- `npm run test:browser` clicks both buttons in Chromium, Firefox and WebKit and checks that each moves the box 100 px down, and that a second click on **Move with transform** brings it back. It does not measure layout or painting.
- The [migration ledger](../../docs/migration.md) links to the original version, in the `browser` folder.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
