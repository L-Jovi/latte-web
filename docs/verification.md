# What the checks cover

English | [简体中文](verification.zh-Hans.md)

Every example outside **History** is checked automatically. This page lists what each check proves, and what it does not.

The checks run on Node 24 and npm 11, on macOS (Apple silicon) and on Ubuntu 24.04 in GitHub Actions. The list of examples comes from `docs/catalog.json`, so an example cannot be added without also being checked.

| Command                                    | What it proves                                                                                                                                                                                                                   |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run check`                            | Type checks, every build, the handmade mechanisms, the Promises/A+ suite, packaged libraries loaded by a real consumer, component behavior, the GraphQL API with a real database and live updates, and every documentation link. |
| `npm run test:browser`                     | Every example page loads without errors, plus the Todo apps, routing, rich text, network, offline and visual interactions. Each test runs in Chromium, Firefox and WebKit.                                                       |
| `npm run build:wasm` / `npm run test:wasm` | Runs the Rust tests, compiles the WebAssembly module and calls it in all three browsers. Only this example needs Rust.                                                                                                           |
| `verify` on GitHub                         | Combines the three jobs above. If any job fails, is cancelled or is skipped, the pull request cannot be merged.                                                                                                                  |

## What the checks don't prove

- **The small versions are small on purpose.** The React-style renderer rebuilds a component's DOM instead of comparing it with the previous version, so nested state and focus can be lost; it does not implement React's reconciliation. The simplest Promise is a teaching state machine; only `promise-a+.js` is meant to pass the full test suite.
- **Draft.js is no longer maintained.** Its example promises only what is tested: typing, bold text and saving as JSON.
- **Some input is simulated.** Mouse, pointer and keyboard actions use real browser input, but touch gestures are synthetic. Typing with an input method (for example Chinese) and real phones still need a manual check.
- **Offline tests in WebKit** stop a real server instead of using Playwright's offline switch, because of a known [Playwright issue](https://github.com/microsoft/playwright/issues/42775). A control page without a service worker must fail to reload. Chromium and Firefox also use the offline switch for the connection indicator.
- **Core Web Vitals depend on the browser and the visit.** A missing metric is shown as unavailable or waiting, never as zero. The tests prove that the measuring code works; they are not a benchmark and do not reproduce historical measurements.
- **The GraphQL app is a local teaching service** with fictional accounts, bounded pagination and in-memory events. It has no password recovery, rate limiting, durable subscriptions or production deployment.
- **Links to external sites** are not checked, and older sites may disappear.

Two details only matter if you maintain the repository. Prisma's pinned transitive fixes are explained in the [server README](../examples/graphql/server/README.md); installation follows the root `allowScripts` list and keeps peer-dependency checks on. Inside a sandbox, Storybook may print an `EPERM` warning about its user settings file. That does not affect the build: successful builds and rendered stories are checked separately, and Storybook telemetry is turned off.

## Releases and history

There are no versioned releases and no npm packages. The live demos are deployed to GitHub Pages from `main` after CI passes. Retired files can be recovered from the fixed commit linked in the [migration ledger](migration.md). Material withdrawn for privacy or rights reasons was also removed from Git history.
