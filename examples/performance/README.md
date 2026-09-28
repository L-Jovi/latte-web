# Observe browser performance

English | [简体中文](README.zh-Hans.md)

Measure the current visit with Navigation Timing, PerformanceObserver and the official web-vitals library. Keep raw API entries separate from the metrics derived from them.

Run root `npm ci`, `npm run build -w @latte/performance`, then `npm run dev`. Open http://127.0.0.1:4173/examples/performance/dist/. Click **Run 120 ms of work** to observe one bounded slow interaction, or **Insert late content** to cause a layout shift after 700 ms. No data leaves this page.

Read `main.js`: feature detection distinguishes unavailable metrics from values still awaiting an eligible event. Navigation Timing describes the document request/load sequence. PerformanceObserver collects paint, measure and supported long-task entries. web-vitals handles the lifecycle and aggregation rules for LCP (largest content paint), INP (interaction responsiveness) and CLS (unexpected layout movement). CLS is unitless; the other two use milliseconds. Values may change until the relevant lifecycle boundary.

One automated visit cannot establish field percentiles or prove an optimization. The output itself can influence a measurement; this is an observation lab. Browsers expose different entry types. Unsupported metrics remain `Unavailable`, never a fabricated zero. The historical `performance.timing` report is preserved in [the dated research](../../docs/history/performance/README.md), with its original screenshots and conclusions kept distinct.

Verify with `npx playwright test tests/browser/visuals.spec.js`: navigation values, a real measure entry, bounded work and delayed insertion in three engines. This validates instrumentation, not a performance budget. MIT. Sources: [Web Vitals definitions](https://web.dev/articles/vitals), [web-vitals lifecycle/API](https://github.com/GoogleChrome/web-vitals), [Navigation Timing](https://www.w3.org/TR/navigation-timing-2/).
