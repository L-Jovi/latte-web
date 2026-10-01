# Image effects with canvas pixels

English | [简体中文](README.zh-Hans.md)

Scale, watermark, magnify and filter an image by reading and writing its pixels.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/examples/visuals/canvas-image/
```

It works right after cloning; no `npm ci` or build step is needed. The canvas shows a small landscape, and the text under it says `none; scale 1`. Things to try:

- Click **Grayscale**, **Threshold**, **Invert**, **Blur** or **Mosaic** to change the pixels, and **Reset** to go back. **Procedural colors** replaces the picture with colours computed from each pixel's angle around the centre.
- Drag the **Scale** slider, or focus it and press the arrow keys: the picture grows or shrinks around its centre, and the text shows `scale 1.1`, `scale 1.2` and so on.
- Tick **Watermark** to write `latte-web` near the bottom-right corner.
- Tick **Magnifier** and move the pointer over the canvas. A round lens shows the original, unfiltered picture at twice the current scale. You can also focus the canvas with the Tab key and move the lens with the arrow keys.

You can also open the [live demo](https://latte.jovipro.com/examples/visuals/canvas-image/index.html).

## How it works

Read [pixels.js](pixels.js) (66 lines), then [app.js](app.js) (84 lines).

Every change redraws from scratch. `app.js` draws the picture at the chosen scale, reads the canvas back with `getImageData`, passes the pixels through a filter and writes the result back with `putImageData`. The pixels arrive as one long list with four numbers per pixel: red, green, blue and alpha (opacity), each from 0 to 255.

`filterPixels` in `pixels.js` has one readable loop per effect:

- **Grayscale** mixes the three colours as `0.3 × red + 0.59 × green + 0.11 × blue`, because green looks brightest to the eye and blue darkest.
- **Threshold** turns that grey value into pure black or white: above 125 becomes white.
- **Invert** replaces each colour value with 255 minus the value.
- **Blur** gives each pixel the average colour of the 3 × 3 square around it.
- **Mosaic** fills each 12 × 12 block with the block's average colour.

Three details keep the results right:

- The filter never changes its input; it writes to a copy. That matters for blur: it must average the original pixels, not ones it has already blurred (the comment in `pixels.js` says so).
- Alpha is never changed, so transparent parts stay transparent.
- At the edges, the blur square and the last mosaic blocks shrink to fit inside the picture instead of reading past it.

`procedural` builds its colours from each pixel's angle around the centre, with no picture at all.

The pointer position arrives in CSS pixels, while the canvas has its own size of 480 × 300; the `pointermove` handler converts one into the other, so the lens stays under the pointer even when the page shrinks the canvas.

## Then and now

The original was six separate pages, one per exercise, and most of them used photographs of uncertain origin. Here the six exercises share one page, and a self-made SVG, [source.svg](source.svg), replaces the photos.

Today, if an image only needs to look different on screen, the CSS [`filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/filter) property does it without JavaScript, for example `filter: grayscale(1)`. Pixel loops are still the way to see the arithmetic, to build an effect CSS does not offer, or to keep the changed pixels, for example to save them as a new image.

## Limits

- The filters run on the page's main thread, once per change, on a small 480 × 300 canvas. There is no colour management and no attempt to make large images fast.
- There is one built-in picture; you cannot load your own.

## Checks and credits

- `npm run test:browser` checks, in Chromium, Firefox and WebKit, that **Invert** changes a real pixel to 255 minus each colour value with alpha unchanged, that **Grayscale** makes its red, green and blue equal, and that the arrow keys move the **Scale** slider. It also turns on the magnifier and the watermark and picks **Mosaic**, but only checks that the text reports `mosaic`, not what is drawn. `npx playwright test tests/browser/visuals.spec.js` runs the visual tests on their own.
- `npm test` checks the filter maths in Node on a two-pixel image: exact results for invert, blur and mosaic, alpha kept, the input left unchanged, equal channels after grayscale, and four values per pixel from `procedural`.
- The [original image exercises](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/canvas-image) referenced liuyubobobo.com in their watermark text.
- This folder keeps the original's GPL-2.0 [LICENSE](LICENSE); see [NOTICE.md](../../../NOTICE.md). The landscape is self-made, and no photos or fonts are bundled.
