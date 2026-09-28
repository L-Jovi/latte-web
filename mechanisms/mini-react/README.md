# A minimal element/component renderer

English | [简体中文](README.zh-Hans.md)

Read createElement → mount → commit → setState. Each class instance owns its state and update callback; two counters must remain independent. Mount hooks run after DOM insertion and unmount releases callbacks. Updates synchronously replace the component’s subtree. That intentionally resets nested component state, focus and selection; there is no keyed diff, batching, hooks, fragments, error boundary, concurrency or full React lifecycle. Components must return one element. This limit makes the basic ownership mechanism visible rather than implying production compatibility.

## Run and observe

From the repository root: `npm ci`, `npm run build`, then `npm run dev`. Open `http://127.0.0.1:4173/mechanisms/mini-react/index.html`.

## Where to start

[src/react.js](src/react.js), [src/component.js](src/component.js), [src/react-dom.js](src/react-dom.js), [src/index.js](src/index.js).

## Verification

`npm run test:apps` runs current component and renderer tests. `npm run test:browser` exercises the visible behavior in Chromium, Firefox and WebKit after building. Historical files are not executed. The scope and deliberate limitations are described above.

## Sources and license

Original implementation and these explanations are MIT unless a local license states otherwise. See the [migration ledger](../../docs/migration.md) for the exact original revision and [NOTICE](../../NOTICE.md) for third-party attribution.
