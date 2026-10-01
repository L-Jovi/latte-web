# Photo wall with CSS transforms

English | [简体中文](README.zh-Hans.md)

Scattered, tilted cards that straighten and zoom in on hover.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/examples/visuals/photo-wall/
```

It works right after cloning; no `npm ci` or build step is needed. Six cards, each a small landscape drawn in CSS, lie at different angles. Hover over a card, or move to it with the Tab key: it straightens, grows a little and rises above its neighbours. Make the window narrower and the wall uses fewer columns. You can also open the [live demo](https://l-jovi.github.io/latte-web/examples/visuals/photo-wall/index.html).

## How it works

Everything is in [index.html](index.html) (57 lines); there is no JavaScript.

- Each card is a `<button>`, so it can take keyboard focus. Its `style` attribute sets two custom properties (CSS variables): `--angle`, its tilt, and `--hue`, the colour of its hill.
- `.photo` rotates every card by `var(--angle)`. On `:hover` or `:focus-visible` the transform becomes `rotate(0deg) scale(1.08)`, `z-index: 2` lifts the card above the others, and `transition: transform 0.3s` animates the change.
- The rotation and the scale sit in one `transform` value. In the original, `rotate` and `scale` were two separate `transform` declarations, so the second one replaced the first.
- The grid uses `repeat(auto-fit, minmax(180px, 1fr))`: as many columns as fit, each at least 180 pixels wide.
- Each landscape is two `linear-gradient` layers with hard edges, which read as hills against a pale sky.
- When your system's "reduce motion" setting is on, the shared stylesheet shortens the transition to almost nothing.

## Then and now

The original placed each photo by hand, with its own class and a fixed pixel position. Today CSS Grid places the cards and adapts to the width of the screen, and one custom property per card replaces one class per card.

## Limits

- The cards are CSS drawings, not photos: there is no photo service, no upload and no image processing.
- The angles are fixed in the HTML; nothing shuffles the cards.
- Clicking a card does nothing.

## Checks and credits

- `npm run test:browser` turns on reduced motion, focuses the first card in Chromium, Firefox and WebKit, and checks that its computed transform ends at a scale of 1.08 with the tilt removed. Hover is not tested. `npx playwright test tests/browser/visuals.spec.js` runs the visual tests on their own.
- Source: the [original photo wall](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/photo-wall).
- This folder keeps the original's GPL-2.0 [LICENSE](LICENSE); see [NOTICE.md](../../../NOTICE.md). The six landscapes are self-made in CSS and replace the original photos, so no photos or fonts are bundled.
