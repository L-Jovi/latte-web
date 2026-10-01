# Throttle

English | [简体中文](README.zh-Hans.md)

Run at most once per interval; the first call goes through right away.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/utilities/throttle/
```

Click the button as fast as you can. The counter goes up at most once every 500 ms, however many times you click. You can also open the [live demo](https://latte.jovipro.com/mechanisms/utilities/throttle/index.html).

## How it works

[simple.js](simple.js) (11 lines) remembers when the wrapped function last ran. On each call it checks the clock: if at least `wait` milliseconds have passed, it runs the function and records the time; otherwise it ignores the call.

Two details matter:

- It reads the time from `performance.now()`, which only moves forward. `Date.now()` can jump when the computer's clock is adjusted.
- It keeps `this` and the arguments of the call that goes through, so it can wrap methods and event handlers.

Throttle and [debounce](../debounce/README.md) are easy to mix up. Throttle runs regularly _during_ a burst of events, which suits scrolling or dragging. Debounce waits until the burst _stops_, which suits a search box.

## Then and now

JavaScript still has no built-in throttle. Libraries such as lodash provide `throttle` with options for running on the first call, the last call, or both. For visual updates, `requestAnimationFrame` is often a better fit: it runs at most once per screen refresh.

## Limits

- Only the first call in each interval runs. The last call of a burst is dropped, so a drag that stops between two intervals would miss its final position.
- There is no `cancel` and no option for a trailing call.

## Checks and credits

- `npm test` checks that the first call runs, that a call just before the interval ends is ignored, and that a call made exactly when the interval ends runs. `npm run test:browser` opens the page in Chromium, Firefox and WebKit.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
