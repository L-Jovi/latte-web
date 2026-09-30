# Measuring page speed in 2019

English | [简体中文](README.zh-Hans.md)

How page speed was measured with `performance.timing`, and why those numbers are read differently now. This is a short, company-neutral summary of how it was usually done around 2019. The original 2019 report described one specific product and has been withdrawn from this repository.

## What people measured

The usual starting point was `performance.timing` (Navigation Timing Level 1). It stores one timestamp for each step of loading a page. Subtracting two timestamps gives the length of a step:

| Step                   | Calculation                           | What it tells you                            |
| ---------------------- | ------------------------------------- | -------------------------------------------- |
| Redirects              | `redirectEnd - redirectStart`         | Time spent following redirects               |
| DNS lookup             | `domainLookupEnd - domainLookupStart` | Time to turn the host name into an address   |
| Connection             | `connectEnd - connectStart`           | Time to open the connection, including TLS   |
| Waiting for the server | `responseStart - requestStart`        | Time to first byte (TTFB)                    |
| Downloading the HTML   | `responseEnd - responseStart`         | Time to receive the document                 |
| Parsing the HTML       | `domInteractive - responseEnd`        | Time to turn the HTML into a DOM             |
| Full load              | `loadEventEnd - navigationStart`      | Time until the `load` event finished running |

Teams usually combined three sources:

- **Lab tools** load a page under controlled conditions: WebPageTest, Lighthouse, PageSpeed Insights, GTmetrix.
- **Real-user monitoring** sends the same timestamps from real visitors' browsers to a collection service.
- **Custom marks** time the moments a product cares about, such as "the list is visible".

## Why those numbers were hard to act on

- A "full load" timestamp does not say when the page _looked_ ready or _felt_ responsive.
- Single-page apps change views without loading a new page, so `performance.timing` never sees those changes.
- "White-screen time" and "first-screen time" were home-made rules. Every team defined them differently, so their numbers could not be compared.
- Averages hide slow visits. A percentile, such as the 75th, describes what most visitors actually experience.

## What changed

- **Navigation Timing Level 2** replaced `performance.timing`. Read `performance.getEntriesByType('navigation')[0]` instead: its times are high-resolution and measured from the start of the navigation. `performance.timing` is deprecated.
- **`PerformanceObserver`** delivers performance entries as they happen, so a page no longer needs to poll.
- **Core Web Vitals** (Google, 2020) measure what visitors feel: LCP (when the main content appears), CLS (how much the layout jumps) and INP (how quickly the page responds to input). INP replaced FID on 2024-03-12.

The [performance observation lab](../../../examples/performance/README.md) shows these APIs in working code, including what to do when a browser does not support one of them.

## Sources

- [MDN: `performance.timing` (deprecated)](https://developer.mozilla.org/en-US/docs/Web/API/Performance/timing)
- [MDN: Navigation timing](https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Navigation_timing)
- [web.dev: Web Vitals](https://web.dev/articles/vitals)
- [web.dev: INP is officially a Core Web Vital](https://web.dev/blog/inp-cwv-launch)

Written on 2026-09-28 to replace the withdrawn report. No figures from the original report are reproduced.
