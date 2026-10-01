# Offline pages with a service worker

English | [简体中文](README.zh-Hans.md)

Register, cache, serve offline and clean up, without a framework. A _service worker_ is a script that the browser runs alongside a page; it can answer the page's requests itself, even when there is no network.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/examples/service-worker/
```

It works right after cloning; no `npm ci` or build step is needed. The page says `Online` and `Not registered`.

1. Click **Enable offline cache** and wait for `Offline cache ready`.
2. In the browser's developer tools, switch the network to offline, then reload. The page still appears, with its heading **Offline notebook** and the word `Offline`.
3. Switch the network back on, click **Clear this experiment** and reload. The page says `Not registered` again: the worker no longer controls it.

You can also open the [live demo](https://l-jovi.github.io/latte-web/examples/service-worker/index.html).

## How it works

Read [app.js](app.js) (80 lines), the page's side, then [service-worker.js](service-worker.js) (42 lines), the worker itself.

1. **Register.** `navigator.serviceWorker.register('./service-worker.js', { scope: './' })` installs the worker for this folder only. Once the worker controls the page, the `controllerchange` event fires and the page shows `Offline cache ready`.
2. **Install.** The worker's `install` handler stores three files in a cache named `latte-offline-v1`: the folder's address, `index.html` and `app.js`. `skipWaiting()` lets a new worker take over at once instead of waiting for old tabs to close.
3. **Activate.** The `activate` handler deletes older caches whose names start with `latte-offline-`, then `clients.claim()` takes control of the open page without a reload.
4. **Fetch.** For those three files, and only for `GET` requests, `event.respondWith` answers network first: it tries the network, keeps a fresh copy when the response is OK, and falls back to the cached copy when the network fails. If a file is in neither place, the worker answers with an error (status `503`). Every other request goes to the network as usual.
5. **Clean up.** **Clear this experiment** unregisters this folder's worker and deletes this experiment's caches. The page stays under the old worker's control until you reload.

To see an update, change `CACHE` to `latte-offline-v2` in `service-worker.js` and reload. The browser installs the changed worker, and its `activate` step deletes the old cache.

Service workers only run in a _secure context_: a page served over HTTPS, or from your own machine. That is why the local server works on plain `http://127.0.0.1`; anywhere else the page needs HTTPS.

## Then and now

The original sample in this repository could not run as written. It called `navigator.serviceWorkerContainer.register` instead of `navigator.serviceWorker.register`, used `e.responseWith` instead of `event.respondWith`, and relied on a separate server. Today the [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API) is how a page keeps working offline. This example writes the worker by hand, without a framework, so every step stays visible.

## Limits

- The worker only handles its own three files, and only `GET` requests. It never caches credentials or API data, and there is no general offline routing, no conflict resolution and no background sync.
- Cleanup only touches this folder's registration and the caches whose names start with `latte-offline-`.

## Checks and credits

- `npm run test:browser` serves the page from its own small test server in Chromium, Firefox and WebKit. It enables the cache, stops that server and reloads, and the heading must still appear. In Chromium and Firefox it also switches the browser offline and expects `Offline`. As a control, a separate browser session with service workers blocked must fail to load the page. Finally it starts the server again, clicks **Clear this experiment**, and checks that no caches are left and that a reload is no longer controlled by the worker.
- WebKit is not switched offline because of an [open Playwright issue](https://github.com/microsoft/playwright/issues/42775) (as of 2026-09): with Playwright 1.63, WebKit's offline mode rejects page loads that a service worker could answer. Stopping the server shows that the cache works there too. `navigator.onLine` stays `true` in that case, so WebKit still says `Online`.
- The [migration ledger](../../docs/migration.md) links to the original sample, the `storage` folder. Original code is MIT; see [NOTICE.md](../../NOTICE.md).
