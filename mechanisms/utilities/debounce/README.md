# Debounce

English | [简体中文](README.zh-Hans.md)

Wait until a burst of calls stops, then run once.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/utilities/debounce/
```

Open the browser console and click **Test Debounce** several times in quick succession. Nothing is logged while you keep clicking; half a second after the last click, the console shows `1 2` once. No install or build is needed: `npm run dev` works right after cloning. You can also open the [live demo](https://latte.jovipro.com/mechanisms/utilities/debounce/index.html).

## How it works

[simple.js](simple.js) (9 lines): every call cancels the timer started by the previous call and starts a new one. Only when `wait` milliseconds (500 by default) pass without another call does the timer fire, and the function runs once, with the `this` and the arguments of the last call. `debounced.cancel()` drops a call that is still waiting.

Debounce and [throttle](../throttle/README.md) are easy to mix up. Debounce waits until a burst of events _stops_, which suits a search box. Throttle runs regularly _during_ the burst, which suits scrolling or dragging.

[lodash-debounce.js](lodash-debounce.js) (132 lines) is an adaptation of lodash's `debounce`, kept as a separate reading exercise. It has options to run on the first call (`leading`), after the last call (`trailing`, on by default) and at least once every `maxWait` milliseconds during a long burst. It also adds `flush()`, which runs a waiting call right away, and `pending()`, which tells you whether a call is waiting. The page loads this file but does not call it.

## Then and now

JavaScript still has no built-in debounce (as of 2026-09). Libraries such as lodash provide [`debounce`](https://lodash.com/docs/#debounce) with the options above. The short version shows how replacing the timer works; use a maintained library when you need those options.

## Limits

- `simple.js` only runs after the burst ends. There is no option to run on the first call, no `maxWait` and no `flush`.
- Calls that keep coming faster than `wait` postpone the function again and again, possibly forever. lodash's `maxWait` exists for this case.
- The debounced function returns `undefined`: the real call happens later, so its result is lost.

## Checks and credits

- `npm test` calls a debounced method twice in a row and checks that it runs once, with the object as `this` and the second call's argument. Then it checks that `cancel()` stops a waiting call. `npm run test:browser` triple-clicks the button in Chromium, Firefox and WebKit and checks that `1 2` is logged exactly once.
- `lodash-debounce.js` is adapted from lodash's `debounce` and keeps its MIT license, copyright JS Foundation and other contributors; see [LICENSE.lodash](LICENSE.lodash) and [NOTICE.md](../../../NOTICE.md). The rest is original code under MIT.
- The [migration ledger](../../../docs/migration.md) links to the original version.
