# Build your own router

English | [简体中文](README.zh-Hans.md)

A small router on the History API: links, back and forward, all without a page reload. The router itself is 72 lines of React class components.

## Try it

```sh
npm ci
npm run build -w @latte/router
npm run dev
# open http://127.0.0.1:4173/mechanisms/router/dist/
```

The page shows **Home view**. Click **About**: the address changes to end in `/about` and **About view** appears, without a page reload. The browser's back and forward buttons switch between the two views. Reloading on `/about` works here too, because the local server answers that address with the app's `index.html`. You can also open the [live demo](https://latte.jovipro.com/mechanisms/router/dist/index.html); reloading behaves differently there (see Limits).

## How it works

[src/router.jsx](src/router.jsx) has three components, and [src/index.jsx](src/index.jsx) (15 lines) puts them on the page:

- `BrowserRouter` keeps the current path in its state and shares it with everything inside it through React _Context_, a way to hand a value to nested components without passing it down by hand.
- `Route` shows its content only when the current path equals its `path` exactly. A trailing `/` or `/index.html` in the address does not count.
- `Link` renders an ordinary `<a>`. On a plain left click, it stops the browser from loading a new page, changes the address with `history.pushState`, and tells the router to update.

That last step is needed because `pushState` changes the URL without firing a `popstate` event. The browser fires `popstate` only when you go back or forward, and `BrowserRouter` listens for it to show the matching view.

The listener, `onChangeView`, is created once, as a class field. So `removeEventListener` receives the same function that `addEventListener` did, and the listener is really removed when the router unmounts. Calling `bind` in both places would create two different functions, and nothing would be removed.

`Link` leaves some clicks to the browser: clicks with Ctrl, Cmd, Shift or Alt held down, clicks with a button other than the left one, links with a `target` other than `_self` or with a `download` attribute, and links to another origin.

All paths start with the folder the app is served from. Vite's `base` option in [vite.config.js](vite.config.js) provides it. To publish the site under a sub-path, such as `/latte-web/`, build with `LATTE_PAGES_BASE` set to that path; the live demo is served from the root of its domain and needs none.

## Then and now

Apps used to copy the current URL into the Redux store, with libraries such as react-router-redux, so that all state lived in one place; the two copies could then disagree. Today the router owns the URL, and [React Router 7](https://remix.run/blog/react-router-v7) (2024-11-22) also loads data for each route. Both Todo apps use react-router-dom, so you can compare it with this version: the [2018-style Todo](../../examples/react-classic/README.md) and [today's Todo](../../examples/react-modern/README.md). Underneath, every client-side router does what this one does: it listens to the History API and decides what to render.

## Limits

- On the live demo, reloading the page while the About view is showing brings up GitHub's 404 page. GitHub Pages cannot answer that address with `index.html` the way the local server does; clicking links and going back and forward still work. Locally, the dev server ([scripts/serve.mjs](../../scripts/serve.mjs)) has a special rule that answers `/about` with `index.html`, so reloading works there.
- Only exact paths match. There are no nested routes, no route parameters (such as `/users/:id`), no data loaders and no way to block navigation, for example to warn about unsaved changes.

## Checks and credits

- `npm run test:browser` clicks **About**, goes back and forward, then reloads, in Chromium, Firefox and WebKit, and checks that **About view** still shows after the reload. That reload relies on the local server's special rule.
- `npm run test:pages` serves the built GitHub Pages site without that rule, as GitHub Pages does. It checks in Chromium that **About** leads to `/mechanisms/router/dist/about` and that going back shows **Home view**. It does not reload.
- The first version passed a freshly bound function to `removeEventListener`, and called it before mounting instead of at unmount, so its `popstate` listener was never removed. The [migration ledger](../../docs/migration.md) links to it, the `router-scratch` folder.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
