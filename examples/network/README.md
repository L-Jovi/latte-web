# JSONP vs fetch with CORS

English | [简体中文](README.zh-Hans.md)

Read the same cross-origin data two ways, and cancel a request with `AbortController`. JSONP runs the answer as a script; `fetch` only reads it, and only because the server allows that with CORS.

## Try it

This example needs a second local server, so there is no live demo. No install is needed: both servers work right after cloning. From the repository root:

```sh
node examples/network/server.js
# in a second terminal:
npm run dev
```

Open http://127.0.0.1:4173/examples/network/. The page comes from port 4173 and the data from port 4002, so they have different _origins_ (the scheme, host and port together), and the browser keeps them apart.

- **Request with JSONP** and **Request with Fetch** both show the message `Hello from the second origin`. The `transport` field tells you which way it came: `jsonp` or `data`.
- **Start slow Fetch** shows `Waiting`, and the server takes 2 seconds to answer. Click **Cancel request** before then, and the output becomes `Request cancelled`. If you let it finish, the message appears with `transport` set to `slow`.

## How it works

A page may load a script from any origin, but its code may not read a response from another origin unless that origin allows it.

- **JSONP** uses the first rule. [jsonp.js](jsonp.js) (22 lines) makes up a unique function name, adds it to the URL as `?callback=…`, and inserts a `<script>` tag. The server answers with JavaScript that calls that function with the data, such as `latte_…({…});`. When the call arrives, after a 3-second timeout, or if the script fails to load, the code removes the tag and deletes the function.
- **CORS** handles the second. [server.js](server.js) (51 lines) adds an `Access-Control-Allow-Origin` header only for the page's two exact addresses, `http://127.0.0.1:4173` and `http://localhost:4173`, so the browser lets `fetch` read the JSON. For JSONP, it accepts only a callback name that is a plain identifier, never other code.
- **Cancelling.** [app.js](app.js) (37 lines) gives each slow request its own `AbortController`. Calling `abort()` makes that `fetch` fail with an `AbortError`, which the page shows as `Request cancelled`. Starting a new slow request cancels the one before, and an older request can never overwrite the output of a newer one.

## Then and now

JSONP used a loophole: browsers blocked scripts from reading responses from other origins, but a `<script>` tag could load code from anywhere, so the server wrapped its data in a function call. The price is trust. JSONP runs the remote answer as code with the page's full permissions, supports only GET, and handles errors poorly. Today [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) lets a server say who may read its responses, `fetch` (2015) reads them, and [`AbortController`](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) cancels a request that is no longer needed. Early `fetch` could not be cancelled at all; the [React architecture notes](../../docs/history/react/README.md) chose axios partly for that reason. [How the ecosystem changed](../../docs/ecosystem.md) tells the longer story.

## Limits

- JSONP is only safe with a provider you fully trust, because the answer runs as code in your page. It also works only for GET-style loading.
- Removing the `<script>` tag tidies up the page, but it is not a reliable way to cancel a JSONP request.
- CORS decides which web pages may read a response in the browser. It does not check who is asking: other programs, such as `curl`, can still read the data.
- Everything runs on your machine, and nothing depends on an outside or private server.

## Checks and credits

- `npx playwright test tests/browser/network.spec.js` clicks all four buttons in Chromium, Firefox and WebKit. It checks both answers, that no `latte_…` callback is left on `window` after JSONP, and that cancelling shows `Request cancelled`. The same file also tests [offline pages](../service-worker/README.md) and [GraphQL from scratch](../graphql-http/README.md).
- That test run starts its own servers, so stop the ones from Try it first. It needs `npm ci` and `npm run build` beforehand, because its servers include the full-stack GraphQL example, and the browsers installed once with `npx playwright install chromium firefox webkit`.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md). References: [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController), [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS).
