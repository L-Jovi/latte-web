# Modern React and Redux Toolkit

English | [简体中文](README.zh-Hans.md)

Both versions start with Use Redux and support add, edit, delete, toggle, filter, toggle-all, clear-completed, asynchronous import and About routing. Editing to an empty string deletes the item. Imports use fictional local todos.json, allocate fresh IDs and expose failures with a retry. Reloading resets all state; there is no persistence or remote user account. Hash routing lets both builds run on a simple static server. Function components use typed hooks. A slice owns serializable local Todo state; RTK Query owns request/cache state. The code intentionally imports the retrieved titles into local editable todos rather than treating the remote response as the editable store. Immer permits concise reducer updates while producing immutable results. Saga remains useful for longer multi-step workflows; RTK Query removes manual request lifecycle code for this small read operation. See [the classic version](../react-classic/README.md) and the [Redux migration guide](https://redux.js.org/usage/migrating-to-modern-redux).

## Run and observe

From the repository root: `npm ci`, `npm run build -w @latte/react-modern`, then `npm run dev`. Open `http://127.0.0.1:4173/examples/react-modern/dist/index.html`.

## Where to start

[src/App.tsx](src/App.tsx), [src/store.ts](src/store.ts).

## Verification

`npm run test:apps` runs current component and renderer tests. `npm run test:browser` exercises the visible behavior in Chromium, Firefox and WebKit after building. Historical files are not executed. The scope and deliberate limitations are described above.

## Sources and license

Original implementation and these explanations are MIT unless a local license states otherwise. See the [migration ledger](../../docs/migration.md) for the exact original revision and [NOTICE](../../NOTICE.md) for third-party attribution.
