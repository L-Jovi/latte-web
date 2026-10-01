# 3D carousel and CSS Scroll Snap

English | [简体中文](README.zh-Hans.md)

Place layered slides with geometry, then let CSS Scroll Snap do similar work natively.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/examples/visuals/carousel/
```

It works right after cloning; no `npm ci` or build step is needed. The page has two carousels of five cards:

- **Handwritten slot geometry**: the front card is full size, and the others sit to its sides, smaller, fainter and further back, which looks like depth. Click **Next layered card**, or focus the carousel and press the right arrow key: every card slides one place and the text below says `Card 2`. It wraps around, so Card 1 follows Card 5.
- **Native Scroll Snap**: a strip that the browser scrolls. Swipe it, scroll it sideways, press the arrow keys or click **Next snap card**: it always comes to rest on a whole card, and the text follows. It stops at the ends, where the matching button is disabled.

You can also open the [live demo](https://l-jovi.github.io/latte-web/examples/visuals/carousel/index.html).

## How it works

Read [geometry.js](geometry.js) (13 lines), then [app.js](app.js) (61 lines).

`slots(count, current)` works out every card's place from a single number: `current`, the index of the front card. For each card it takes the distance from the front card, wrapped so that it is never more than half the ring away (with five cards, from −2 to 2). Then:

- the sideways position is 90 pixels per step: `x = distance * 90`;
- the size shrinks by 22% per step: `scale = 0.78 ** |distance|`;
- the opacity is `1 / (|distance| + 1)`;
- the `z-index` is highest for the front card, so nearer cards cover the ones behind.

`app.js` applies these values as `transform`, `opacity` and `z-index`, and a CSS transition animates the change. Every click recomputes all five cards from `current` and never reads positions back from the page, so fast clicks cannot get the cards out of order, and no lock is needed while an animation runs. The front card also gets `aria-current="true"`, which tells assistive technology such as screen readers which card is current.

The Scroll Snap strip needs very little code. `scroll-snap-type: x mandatory` on the strip and `scroll-snap-align: start` on each card make the browser stop on a card. The buttons and arrow keys call `scrollTo`, and a `scroll` listener reads `scrollLeft` to work out which card is showing. When your system's "reduce motion" setting is on, the buttons jump instead of scrolling smoothly, and the shared stylesheet makes the layered cards move almost instantly.

## Then and now

The original sample came from an imooc video course. It had two copies of the code, the course's version and the author's own, both built on jQuery and decorated with photos. To move a card, it read the neighbouring card's current styles and animated towards them, and it ignored clicks while an animation was running.

Today, for a plain row of slides, [CSS Scroll Snap](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Scroll_snap) lets the browser handle swiping, scrolling and stopping on each slide. Hand-written geometry is still useful for layouts that are not a straight scrolling row, such as this layered stack.

## Limits

- No autoplay. All five cards are always in the page, so it is not built for very long lists.
- The cards hold text only; the original's photos are gone.
- The layered carousel does not respond to swipes; use its buttons or the arrow keys.

## Checks and credits

- `npm run test:browser` clicks **Next layered card** in Chromium, Firefox and WebKit and checks that the text and the card marked with `aria-current` both say `Card 2`. It then clicks **Next snap card** and **Previous snap card** and expects `Card 2` and then `Card 1`. `npx playwright test tests/browser/visuals.spec.js` runs the visual tests on their own.
- `npm test` checks `slots` in Node: for each of the five positions, the front card sits in the middle at full size, exactly one card is on top, and no two cards share a place.
- The [original carousel](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/slider/whirligig) followed an imooc video course.
- This folder keeps the original's GPL-2.0 [LICENSE](LICENSE); see [NOTICE.md](../../../NOTICE.md). The cards are plain CSS, so no photos or fonts are bundled.
