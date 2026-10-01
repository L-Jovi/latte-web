# Swipe to change pages

English | [简体中文](README.zh-Hans.md)

Turn a swipe into a page change using distance and speed thresholds, with touch events and with Pointer Events.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/examples/visuals/paging/
```

It works right after cloning; no `npm ci` or build step is needed. The page has two _tracks_, each a strip of three pages that slides inside a frame:

- The **Touch Events** track moves sideways and only reacts to a finger. On a computer, use **Next touch page**, or focus the track and press the arrow keys.
- The **Pointer Events** track moves up and down and also follows a mouse: drag it upwards to go to the next page.

When a swipe goes far enough, the next page slides in and the text below changes to `Page 2 of 3`. A quick flick needs less distance than a slow drag; if the swipe falls short, the track springs back. On the third page, that track's **Next** button is disabled. You can also open the [live demo](https://latte.jovipro.com/examples/visuals/paging/index.html).

## How it works

Everything is in [app.js](app.js) (95 lines). One `pager` function drives both tracks; only the direction and the events differ.

1. When a gesture starts, it records the position and the time, and turns off the CSS transition so the pages follow the finger directly.
2. While the finger moves, the track moves by the same distance.
3. When the gesture ends, it decides. A quick gesture (under 300 ms) only has to travel 50 pixels; a slower one has to travel a sixth of the track. These numbers come from the original hand-written slider. If the gesture went far enough, the page changes by one; otherwise the track slides back. The transition is turned back on, so either way the move is animated.
4. The page number stays between 1 and 3, and the buttons are disabled at the ends.
5. A cancelled gesture (`touchcancel`, `pointercancel` or lost capture) always slides back.
6. A `ResizeObserver` recomputes the position whenever the visible area changes size, so resizing the window never leaves you between two pages.

The touch version listens for `touchstart`, `touchmove` and `touchend` and follows one finger. The Pointer version uses `pointerdown`, `pointermove` and `pointerup` with `setPointerCapture`, as in [Dragging with mouse events and Pointer Events](../drag/README.md). CSS `touch-action` says which direction the browser may still scroll by itself: `pan-y` (up and down) on the sideways track, `pan-x` (sideways) on the vertical one.

## Then and now

The original samples were a full-screen phone page that changed screens on a swipe, a hand-written sideways slider and a vertical slider built with jQuery. The first two used touch events; the vertical slider moved on button clicks and on a timer. Between them they loaded photos, fonts and helper libraries.

Today [CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap) can let the browser do the scrolling and stop on each page, as [3D carousel and CSS Scroll Snap](../carousel/README.md) shows. Writing the gesture yourself is still useful when you need to decide exactly what counts as a swipe.

## Limits

- Three fixed pages per track. The original's full-page navigation, its orientation lock and its images and fonts are gone.
- No momentum, no autoplay, and no wrapping from the last page back to the first.

## Checks and credits

- `npm run test:browser` runs in Chromium, Firefox and WebKit. On the sideways track it sends a made-up swipe of touch events, 150 pixels to the left, from a script and expects `Page 2 of 3`; then it presses the right arrow key and expects `Page 3 of 3` with **Next touch page** disabled. On the vertical track it drags 120 pixels upwards with real mouse input and expects `Page 2 of 3`. Because the touch events are simulated, try the swipe on a real phone or tablet too. `npx playwright test tests/browser/visuals.spec.js` runs the visual tests on their own.
- Sources: the [original full-screen sample](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/huamao), plus the two sliders; the vertical one named [a CodePen by sterion](https://codepen.io/sterion/pen/YxNjdz) as its reference. The [migration ledger](../../../docs/migration.md) links to all three.
- This folder keeps the original's GPL-2.0 [LICENSE](LICENSE); see [NOTICE.md](../../../NOTICE.md). The pages are coloured boxes, so no images or fonts are bundled.
