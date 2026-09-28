# Repeatable offline cache

English | [简体中文](README.zh-Hans.md)

Learn registration, installation, activation, fetch interception and explicit cleanup without an application framework.

Run `npm run dev` at the root and open http://127.0.0.1:4173/examples/service-worker/. Click **Enable offline cache**, wait for `Offline cache ready`, enable offline mode in DevTools, then reload. The heading and `Offline` indicator still render. Return online, click **Clear this experiment**, and reload to release the current controller.

Read `app.js` for `navigator.serviceWorker.register`, scope and controller changes; read `service-worker.js` for `event.respondWith` and cache lifetime. Installation precaches three static URLs. A network-first strategy refreshes successful responses and falls back to cached bytes when fetching fails. Activation removes older caches with this experiment's prefix.

The worker only handles its own known GET assets. There is no caching of credentials or API data, general offline routing, conflict resolution or background sync. Localhost is a secure-context exception; an ordinary remote origin requires HTTPS. Changing the cache name demonstrates an update. Cleanup only touches this experiment's registration and cache prefix.

`npx playwright test tests/browser/network.spec.js` stops the actual origin server, reloads from the worker and verifies a no-worker negative control in all three engines, then restores the server and checks cleanup. Chromium/Firefox also use offline emulation. WebKit 1.63 has a [confirmed offline-emulation issue](https://github.com/microsoft/playwright/issues/42775), so its cache proof uses the stopped origin; `navigator.onLine` stays true in that case. Original code MIT. [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API).
