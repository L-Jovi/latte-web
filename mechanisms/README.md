# Build it yourself

English | [简体中文](README.zh-Hans.md)

Small, tested versions of tools you use every day.

| Topic | What you'll see | Try it |
| --- | --- | --- |
| [Promise from scratch](promise/README.md) | Grow a Promise in three steps, from a tiny state machine to a version that passes all 872 official Promises/A+ tests. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/promise/index.html) |
| [How generators pause and resume](generator/README.md) | See the state machine that Babel turns `yield` into, and how values flow in and out. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/generator/index.html) |
| [Design patterns in small examples](design-patterns/README.md) | Singleton, factory, adapter, proxy and publish/subscribe, each in a few lines. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/design-patterns/index.html) |
| [Prototype inheritance, including the mistakes](design-patterns/inherit/README.md) | Compare shared prototypes, borrowed constructors and `Object.create`, and see what each one gets wrong. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/design-patterns/inherit/index.html) |
| [Proxy traps and event delegation](design-patterns/proxy/README.md) | Intercept property access with `Proxy`, and handle many clicks from one parent element. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/design-patterns/proxy/index.html) |
| [Publish and subscribe](design-patterns/pub-sub/README.md) | A minimal `on` / `emit` / `off` event hub; senders never need to know who is listening. | — |
| [Everyday utilities by hand](utilities/README.md) | Debounce, throttle, deep clone and more, written as short algorithms with clear limits. | — |
| [Shallow copy vs deep clone](utilities/clone/README.md) | Copy an object graph while keeping shared references and cycles, then compare with `structuredClone`. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/clone/index.html) |
| [Detecting circular references](utilities/circle-ref/README.md) | Tell a real cycle apart from an object that is simply referenced twice. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/circle-ref/index.html) |
| [Debounce](utilities/debounce/README.md) | Wait until a burst of calls stops, then run once. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/debounce/index.html) |
| [Throttle](utilities/throttle/README.md) | Run at most once per interval; the first call goes through right away. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/throttle/index.html) |
| [Why timers drift, and how to correct them](utilities/timer/README.md) | Measure how late timer callbacks arrive and adjust the next deadline. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/timer/index.html) |
| [Thousands separators without losing precision](utilities/format/README.md) | Group the digits of a number string without converting it to `Number`; compare with `Intl.NumberFormat`. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/format/index.html) |
| [add(1)(2)(3): currying and type coercion](utilities/add/README.md) | Keep a running total in a closure, and see how a function turns into a number. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/add/index.html) |
| [Build your own bundler, two ways](bundlers/README.md) | Parse imports, build a dependency graph and emit one file: first as plain functions, then as a small compiler. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/bundlers/dist/index.html) |
| [Build your own React-style renderer](mini-react/README.md) | createElement, mount and setState in a few files; two counters keep their own state. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/mini-react/index.html) |
| [Build your own router](router/README.md) | A small router on the History API: links, back and forward, all without a page reload. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/router/dist/index.html) |
| [Function composition (compose)](compose/README.md) | The `compose` helper behind Redux middleware, written by hand. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/compose/index.html) |
| [Cursors and selections in editable text](selection/README.md) | Save the cursor before focus leaves, insert text at it, and restore it after re-rendering. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/selection/index.html) |

[Back to the learning path](../README.md#learning-path)
