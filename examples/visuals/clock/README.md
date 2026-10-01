# Dot-matrix countdown on canvas

English | [简体中文](README.zh-Hans.md)

Digits drawn from a grid of dots; when a digit changes, its dots fall away as particles.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/examples/visuals/clock/
```

It works right after cloning; no `npm ci` or build step is needed. The canvas shows `00:00:10` in blue dots. Click **Start 10-second countdown**: the text under the canvas says `10 seconds remaining` and counts down once a second. Each time a digit changes, the dots of the old digit become coloured particles that jump, fall and bounce along the bottom. Click the button again at any time to start over. You can also open the [live demo](https://l-jovi.github.io/latte-web/examples/visuals/clock/index.html).

## How it works

Read [digit.js](digit.js) (134 lines), then [app.js](app.js) (94 lines).

1. `digit.js` stores each digit as a grid of 0s and 1s, 10 rows by 7 columns (the colon is 4 columns wide). `app.js` draws a circle for every 1.
2. The time left comes from a deadline. The click sets `end` to 10 seconds from now, and every frame works out `Math.ceil((end - now) / 1000)`, so the count stays on time even when frames are skipped.
3. When the text changes, every dot of a digit that changed becomes a particle with a random sideways speed and an upward speed. Each frame adds gravity and moves the particle by its speed times the time since the last frame. At the bottom it bounces back with 65% of its speed.
4. `requestAnimationFrame` calls `tick` once per screen refresh and passes it a timestamp. The time step is capped at 0.05 seconds, so a long pause, such as a tab in the background, cannot throw the particles across the canvas.
5. Particles are removed after 4 seconds or when they leave the sides, and at most 400 are kept, so repeated restarts cannot pile them up.
6. The button cancels the running loop before it starts a new one, so two loops never run at once. The loop stops by itself when the count reaches zero and the last particle is gone.

## Then and now

The original sample counted down to a fixed date in 2018; once that date had passed, it showed only zeros. It drew on a `setInterval` timer and moved every particle by the same fixed step on each tick, so the motion depended on how regularly the timer fired.

Today, script animations use [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame): the browser calls it before each repaint, and its timestamp lets the code compute motion from the real time that has passed. [Why timers drift, and how to correct them](../../../mechanisms/utilities/timer/README.md) shows how late timer callbacks can arrive.

## Limits

- It is a visual effect, not a physics engine: one gravity value, one bounce factor, and the particles never collide.
- It only counts down 10 seconds; you cannot set another time.

## Checks and credits

- `npm run test:browser` opens the page in Chromium, Firefox and WebKit, checks that the canvas is not blank, clicks the button and waits for `10 seconds remaining` and then `9 seconds remaining`. The particles are not tested. `npx playwright test tests/browser/visuals.spec.js` runs the visual tests on their own.
- The [original canvas clock](https://github.com/L-Jovi/latte-web/tree/1be029e8f4fdc38a0c62ec2a9569187c1659875f/vision-samples/canvas-clock) followed an imooc course. Its digit grids and its particle idea are kept here.
- This folder keeps the original's GPL-2.0 [LICENSE](LICENSE); see [NOTICE.md](../../../NOTICE.md). Everything is drawn with code, so no fonts or images are bundled.
