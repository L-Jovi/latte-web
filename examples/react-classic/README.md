# Classic React and Redux

English | [简体中文](README.zh-Hans.md)

Both versions start with Use Redux and support add, edit, delete, toggle, filter, toggle-all, clear-completed, asynchronous import and About routing. Editing to an empty string deletes the item. Imports use fictional local todos.json, allocate fresh IDs and expose failures with a retry. Reloading resets all state; there is no persistence or remote user account. Hash routing lets both builds run on a simple static server. Class components and connect isolate view state from an Immutable Map/List store. Explicit action creators feed a reducer; Saga orchestrates import and catches errors. This keeps the original architecture readable on React 19 without deprecated lifecycles or router-in-Redux synchronization. React still supports class components. The old generic recursive action-binding helper and BEFORE_ fan-out are unnecessary for this small scenario and remain recoverable in Git. Draft EditorState has its own rich-text example. Compare [the modern version](../react-modern/README.md) and [historical architecture notes](../../docs/history/react/README.md).

## Run and observe

From the repository root: `npm ci`, `npm run build -w @latte/react-classic`, then `npm run dev`. Open `http://127.0.0.1:4173/examples/react-classic/dist/index.html`.

## Where to start

[src/App.jsx](src/App.jsx), [src/actions.js](src/actions.js), [src/reducer.js](src/reducer.js), [src/sagas.js](src/sagas.js), [src/store.js](src/store.js).

## Verification

`npm run test:apps` runs current component and renderer tests. `npm run test:browser` exercises the visible behavior in Chromium, Firefox and WebKit after building. Historical files are not executed. The scope and deliberate limitations are described above.

## Sources and license

Original implementation and these explanations are MIT unless a local license states otherwise. See the [migration ledger](../../docs/migration.md) for the exact original revision and [NOTICE](../../NOTICE.md) for third-party attribution.
