# Verification scope and limits

English | [简体中文](verification.zh-Hans.md)

The maintained baseline is Node 24 and npm 11, validated on macOS arm64 and GitHub Actions Ubuntu 24.04. Runnable entries come from `catalog.json`; historical coverage comes from `migration.json` / `baseline-disposition.json`, not a hand-picked passing subset.

| Check                                     | Actual boundary                                                                                                                                                                                  |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `npm run check`                           | Types, every workspace build, mechanisms, Promise/A+, packaged consumers, component behavior, real API/database/subscription checks and local document links.                                    |
| `npm run test:browser`                    | Every registered runnable page plus classic/modern Todo, updates, history navigation, rich text, network, offline, GraphQL and visual behavior. Every case runs in Chromium, Firefox and WebKit. |
| `npm run build:wasm`, `npm run test:wasm` | Tests the Rust export, compiles actual Wasm and calls it in all three engines. Ordinary JavaScript installation needs no Rust.                                                                   |
| GitHub `verify`                           | Aggregates `checks`, `browser` and `wasm`; failure, cancellation or skipping any job blocks merging.                                                                                             |

Remaining limits:

- mini React synchronously replaces a local subtree; nested state and focus can be rebuilt. It does not implement React reconciliation. The minimal Promise explains a state machine; a separate A+ version accepts the standard suite.
- Draft.js is an unmaintained historical route; this example promises only the tested editing, bold formatting and serialization. Real IME composition and physical mobile gestures remain manual checks. Touch sequences are synthetic; mouse/pointer and keyboard actions use real browser input.
- WebKit 1.63's [offline emulator issue](https://github.com/microsoft/playwright/issues/42775) reproduces here. All three engines reload from cache after the actual origin is stopped, with a no-worker negative control. Chromium/Firefox additionally use offline emulation for the connection indicator.
- Web Vitals depend on browser support and visit lifecycle. Missing metrics stay unavailable or waiting, never zero. Tests prove instrumentation, not an optimization, population percentile or reproduction of historical measurements.
- GraphQL is a loopback, single-process teaching service with fictional accounts, bounded pagination and in-memory events. It has no production deployment, password recovery, rate limiting or durable subscription guarantee.
- Prisma's config/unused MySQL transitive fixes have documented scope in [the server README](../examples/graphql/server/README.md). Installation follows root `allowScripts` without ignoring peer compatibility checks.
- Under the local filesystem sandbox, Storybook may report EPERM while attempting a user-level settings file. Build success and rendered stories are checked separately. Telemetry is disabled; user-level configuration is not changed to suppress the warning.
- Documentation checks cover repository links, images, entry paths and README language pairs. Availability of external historical sites is not guaranteed.

Retired source is recoverable at the ledger's fixed commit. Removing databases and generated files changes the current tree, not history. There is no single product version, npm publication or website deployment step.
