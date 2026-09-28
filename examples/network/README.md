# JSONP, Fetch and cancellation

English | [简体中文](README.zh-Hans.md)

Compare two ways to read the same local cross-origin response. JSONP loads executable script; Fetch reads a response after the server grants CORS access.

From the root run `node examples/network/server.js` and, in a second terminal, `npm run dev`. Open http://127.0.0.1:4173/examples/network/. JSONP and Fetch show the same message. Start a slow request, then cancel it: the output becomes `Request cancelled`.

Read `jsonp.js` for callback lifetime and `server.js` for callback validation and the exact origin allowlist. `app.js` uses an AbortController per Fetch request and prevents an older request from overwriting newer output. Removing a JSONP script cleans up the demo but is not a reliable transport cancellation primitive.

JSONP only supports trusted script providers and GET-like loading; it does not protect the page from a malicious provider. CORS controls browser response access, not server authentication. This loopback server has no private backend or external request dependency. The old claim that Fetch cannot be cancelled describes early Fetch: AbortController is the current cancellation mechanism.

Verify with `npx playwright test tests/browser/network.spec.js`. It checks response rendering, callback cleanup, cancellation, and the separate offline example in Chromium, Firefox and WebKit. Original implementation: MIT. References: [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController), [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).
