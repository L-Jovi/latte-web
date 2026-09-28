# Timer drift

English | [简体中文](README.zh-Hans.md)

Measure late callbacks and compensate the following deadline.

## Run and observe

From the repository root: `npm ci`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/utilities/timer/index.html`.

## Read the mechanism

Start with [timer-delay.js](timer-delay.js), [timer-delay-fix.js](timer-delay-fix.js), [timer-animation-frame.js](timer-animation-frame.js).

The start button logs ten ticks and stops. Stop cancels the scheduled callback. Compensation cannot guarantee exact timing; long blocking work can cause catch-up calls. The old unbounded busy loop is removed.

## Today and earlier approaches

Use requestAnimationFrame for visual frames and elapsed time for animation progress; timer counts are not a reliable clock.

## Verification and sources

`npm test` covers mechanism contracts. Browser entries are exercised by `npm run test:browser`. Preserve the source links in code; the [migration map](../../../docs/migration.md) links to the original revision.

## License

MIT for original code; see [third-party notices](../../../NOTICE.md).
