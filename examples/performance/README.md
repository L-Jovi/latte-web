# Measuring page speed today

English | [简体中文](README.zh-Hans.md)

Navigation Timing, PerformanceObserver and Core Web Vitals, measured on your own visit. The raw records from the browser stay separate from the metrics worked out from them.

## Try it

```sh
npm ci
npm run build -w @latte/performance
npm run dev
# open http://127.0.0.1:4173/examples/performance/dist/
```

The table shows the three Core Web Vitals for this visit, numbers for what a visitor feels: LCP (how soon the main content appears), INP (how quickly the page responds to input) and CLS (how much the layout jumps). In a browser that supports them, LCP gets a value soon after loading, and INP says `Waiting for an eligible event` until you interact; a metric the browser cannot measure says `Unavailable in this browser`.

Below the table, Navigation Timing, the browser's own timings for loading this page, prints `type`, `ttfb`, `domContentLoaded` and `load`. A list under it shows the most recent raw entries, such as `navigation` and `paint`. Then:

- Click **Run 120 ms of work**. The page freezes for 120 ms, the text says `Measured work:` followed by about 120 ms, a `measure: controlled-work` entry appears, and INP gets a value.
- Click **Insert late content**. 700 ms later a green block appears at the top and pushes everything down, and the CLS number goes up.

CLS may already show a small value before you click anything: the page's own output changes size after loading and moves what is below it. No data leaves the page. You can also open the [live demo](https://l-jovi.github.io/latte-web/examples/performance/dist/index.html).

## How it works

Everything is in [main.js](main.js) (122 lines).

1. **Feature detection first.** `PerformanceObserver.supportedEntryTypes` lists what this browser can report. Each metric row starts as `Waiting for an eligible event` if the browser supports it, or `Unavailable in this browser` if not, so "not supported" and "nothing has happened yet" never look the same, and a missing value is never shown as zero.
2. **Core Web Vitals.** The official web-vitals library turns raw entries into the three metrics and applies their rules for when an event counts and when a value is final. `onLCP` reports _Largest Contentful Paint_, when the main content appeared; `onINP` reports _Interaction to Next Paint_, how quickly the page responded to input; `onCLS` reports _Cumulative Layout Shift_, how much the layout jumped unexpectedly. With `reportAllChanges: true`, the table updates whenever a value changes, so the numbers can keep moving while you use the page. LCP and INP are in milliseconds; CLS has no unit.
3. **Navigation Timing.** `performance.getEntriesByType('navigation')[0]` describes how this document was requested and loaded. The page prints four of its fields: `type`, `ttfb` (time to first byte, from `responseStart`), `domContentLoaded` and `load`, in milliseconds from the start of the navigation. It waits until right after the `load` event, because `loadEventEnd` is only final once the load handler has returned; the comment in `main.js` says so.
4. **Raw entries.** Separate `PerformanceObserver`s, objects that receive the browser's performance records as they happen, collect `navigation`, `paint` and `measure` entries, and `longtask` entries (tasks that keep the page busy for 50 ms or more) where the browser supports them. The page lists the last eight, each with its type, its name, when it started and how long it lasted. A paint entry marks a single moment: its start time says when the browser painted, and its duration is always 0. An observer created before the page has loaded can be handed the navigation entry twice, as Chromium 152 does, so the page lists each entry only once.
5. **The buttons.** **Run 120 ms of work** keeps the main thread busy in a loop for 120 ms between two `performance.mark` calls, then measures the gap with `performance.measure`. **Insert late content** waits 700 ms before inserting its block. CLS leaves out layout shifts that come right after an input, so waiting makes this shift count; that is why the text then says `Inserted after the recent-input window`.

## Then and now

Around 2019, teams read timestamps from `performance.timing` and invented their own "white-screen" and "first-screen" times. [Navigation Timing Level 2](https://www.w3.org/TR/navigation-timing-2/) and `PerformanceObserver` replaced `performance.timing`, and [Core Web Vitals](https://web.dev/articles/vitals) (2020) measure what visitors feel. [INP replaced FID](https://web.dev/blog/inp-cwv-launch) as the responsiveness metric on 2024-03-12. [Measuring page speed in 2019](../../docs/history/performance/README.md) is a short summary of how it used to be done, and why those numbers were hard to act on.

## Limits

- It measures your one visit in one browser. It cannot show what most visitors experience, which needs many real visits and a percentile such as the 75th, and it cannot prove that an optimization worked.
- The page's own output can change the numbers it reports, as the early CLS value shows. It is a place to watch the APIs at work, not a benchmark.
- Browsers support different entry types, so some rows or entries may stay empty or show `Unavailable in this browser`.

## Checks and credits

- After the build, `npm run test:browser` opens the page in Chromium, Firefox and WebKit. It checks that Navigation Timing shows a `ttfb` value; clicks **Run 120 ms of work** and expects `Measured work:` and a `measure: controlled-work` entry; checks that each of the three metric rows shows something, a value or a status; and clicks **Insert late content** and waits for the new block. It checks that the measurements are reported, not that the page is fast: there is no performance budget. `npx playwright test tests/browser/visuals.spec.js` runs this test together with the visual experiments.
- Sources: [Web Vitals](https://web.dev/articles/vitals) for the definitions, the [web-vitals library](https://github.com/GoogleChrome/web-vitals) for when values are reported, and [Navigation Timing Level 2](https://www.w3.org/TR/navigation-timing-2/).
- The web-vitals package keeps its own license. Original code is MIT; see [NOTICE.md](../../NOTICE.md).
