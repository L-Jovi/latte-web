# Why timers drift, and how to correct them

English | [简体中文](README.zh-Hans.md)

Measure how late timer callbacks arrive and adjust the next deadline.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/utilities/timer/
```

Click **Start ten ticks**. Ten lines appear, one every 100 ms, each saying how late that tick ran, for example `3: 1.20 ms late`. The numbers change from run to run, but they do not keep growing. **Stop** cancels the next tick. No install or build is needed: `npm run dev` works right after cloning. You can also open the [live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/timer/index.html).

## How it works

A timer callback cannot run while other code is running, so it often runs a little late. If every tick schedules the next one a full `wait` later, each delay adds to the next, and the timer _drifts_ further and further behind.

[timer-delay-fix.js](timer-delay-fix.js) (16 lines) avoids that. `startDriftTimer(callback, wait)` remembers when it started, so tick number _n_ should run at `start + n × wait`. Each tick calls `callback({ count, drift })`, where `drift` is how many milliseconds late this tick is. Then it sets the timer for the next tick's ideal time, `start + (n + 1) × wait`, instead of a full `wait` from now. A late tick is followed by a shorter wait, so the delays do not add up. `startDriftTimer` returns a `stop()` function, which also works when called from inside the callback. The time comes from `performance.now()`, a clock that only moves forward.

[timer-delay.js](timer-delay.js) (8 lines) only measures, without correcting: a `setInterval` fires every second and logs the drift of ten ticks. Run it from the repository root with `node mechanisms/utilities/timer/timer-delay.js`; in Node, the drift usually grows a little with every tick. [timer-animation-frame.js](timer-animation-frame.js) (28 lines) counts from 0 to 100 and back, updating an element on every screen refresh with `requestAnimationFrame`; a `setInterval` version is left in a comment.

## Then and now

For anything visual, use `requestAnimationFrame`, which runs at most once per screen refresh, and work out the animation's progress from the time that has actually passed. A count of timer ticks is not a reliable clock.

## Limits

- The correction cannot make a timer exact, and it cannot undo a blocked page. If the page is busy for longer than one interval, the missed ticks then run back to back to catch up.
- `wait` must be a positive number; otherwise `startDriftTimer` throws a `RangeError`.
- No page loads `timer-delay.js` or `timer-animation-frame.js`; they are there to read. `timer-animation-frame.js` expects a page with an element whose id is `a`.

## Checks and credits

- `npm test` starts a drift timer with a 5 ms interval whose callback calls `stop()` on the first tick, and checks that the callback ran exactly once. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails if it throws an error or a file does not load; it does not click **Start ten ticks**.
- The original version made the page busy on purpose, with a loop that kept the processor working forever. That loop has been removed. The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
