# Prize wheel

English | [简体中文](README.zh-Hans.md)

Spin a wheel that always stops on the sector it reports, using the Web Animations API.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/examples/visuals/lottery/
```

Click **Spin**. The wheel turns three full times and stops with one sector over the fixed pointer, and the text below says the same letter. No build step is needed. You can also open the [live demo](https://l-jovi.github.io/latte-web/examples/visuals/lottery/index.html).

## How it works

Everything is in [app.js](app.js) (44 lines):

1. Pick a sector at random, then work out the angle that puts its centre over the pointer.
2. Add three full turns (1080°) on top of the current angle, so the wheel always spins forward.
3. Animate with `element.animate()`. The button stays disabled until the animation's `finished` promise resolves, so a second click cannot interrupt a spin.
4. When the system asks for reduced motion, the spin finishes almost instantly.

The wheel itself is a single `conic-gradient`, so there are no images to load.

## Then and now

The original version rotated an image with jQuery and the jQueryRotate plugin. Today CSS transitions and the Web Animations API, supported by all major browsers, do the same job without a library, and give you a promise that tells you exactly when the motion ends.

## Limits

- The result comes from `Math.random()` in the browser, with made-up labels. A real prize draw must be decided on a server, where users cannot change it.
- There is no sound, no easing editor and no way to choose the number of sectors.

## Checks and credits

- `npm run test:browser` spins the wheel in Chromium, Firefox and WebKit and checks that a letter is reported and the button unlocks again. The angle calculation itself is not tested; the comment above it in [app.js](app.js) explains the math.
- The colored sectors are drawn in CSS and replace the borrowed images of the original. Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
