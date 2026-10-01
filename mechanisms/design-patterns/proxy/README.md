# Proxy traps and event delegation

English | [简体中文](README.zh-Hans.md)

Intercept property access with `Proxy`, and handle many clicks from one parent element.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/design-patterns/proxy/
```

It works right after cloning; no `npm ci` or build step is needed. Open the browser console. Reading `proxy.name` runs the `get` trap, which logs the target object, the key (`name string`) and the proxy, and then `king saber` appears. After `proxy.name = 'foobar'`, the next read gives `king archer`. Now click a number in the list: the console logs that number, although only the list itself has a click listener. You can also open the [live demo](https://latte.jovipro.com/mechanisms/design-patterns/proxy/index.html).

## How it works

Both examples put something in between. A proxy stands between your code and an object. A delegated listener sits on a parent element and handles events for its children. They share this idea, but they are different browser features.

[es6-proxy.js](es6-proxy.js) (29 lines) wraps an object with `new Proxy(target, handler)`. The handler's functions, called _traps_, run instead of the normal behavior:

- The `get` trap runs on every property read. It logs its arguments and returns `'king ' + target[key]`.
- The `set` trap ignores the value on purpose: assigning `name` stores `'archer'`, and assigning any other property stores `'ea'` in `weapon`. It returns `true` to report that the assignment worked. If a `set` trap returns `false`, the assignment throws a `TypeError` in strict mode ([MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy/set)).

[event-proxy.js](event-proxy.js) (2 lines) adds one click listener to the `<ul>`. A click on an `<li>` bubbles up to the list, and `event.target` says which item was clicked. This is _event delegation_: one listener serves many children, including children added later. [Event propagation and the event loop](../../../fundamentals/events/README.md) shows bubbling in more detail.

## Then and now

JavaScript has two ways to intercept property access: getters and setters, which are defined for one property at a time, and `Proxy`, which ES2015 added ([specification](https://262.ecma-international.org/6.0/)). Vue shows the change: Vue 2 used only getters and setters because of browser support, and Vue 3 uses proxies for reactive objects ([Vue docs](https://vuejs.org/guide/extras/reactivity-in-depth.html)).

Frameworks delegate events too. React used to attach most of its listeners to `document`; React 17 moved them to the root container of your app ([React blog](https://legacy.reactjs.org/blog/2020/08/10/react-v17-rc.html)).

## Limits

- The traps are rigged for the demo: `get` changes every value it returns, and `set` throws away the value you assign.
- The listener uses `event.target` directly. If an item contained other elements, the target could be one of those; `event.target.closest('li')` would still find the item.

## Checks and credits

- No automated test checks these two files. `npm run test:browser` loads the page in Chromium, Firefox and WebKit and fails if it throws an error.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md). The [migration ledger](../../../docs/migration.md) links to the original version.
