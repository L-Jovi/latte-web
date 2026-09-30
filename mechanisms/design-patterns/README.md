# Design patterns in small examples

English | [简体中文](README.zh-Hans.md)

Singleton, factory, adapter, proxy and publish/subscribe, each in a few lines.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/design-patterns/
```

It works right after cloning; no `npm ci` or build step is needed. Open the browser console. It shows `true` (the singleton), `saber and archer` (the adapter) and `yck false` (the read-only property). You can also open the [live demo](https://l-jovi.github.io/latte-web/mechanisms/design-patterns/index.html).

The page doesn't load the two factory examples. Run them with Node from the repository root instead: `node mechanisms/design-patterns/factory/simple-factory.js` prints `yck`.

## How it works

Each file here shows one pattern:

- **Singleton**, [singleton.js](singleton.js) (21 lines): one shared instance of a class. `Singleton.getInstance()` creates it on the first call and keeps it in a closure, so every later call returns the same object and `s1 === s2` is `true`.
- **Factory**, [factory/simple-factory.js](factory/simple-factory.js) (22 lines): callers ask `Factory.create(name)` for an object instead of calling `new Man(name)` themselves.
- **Factory method**, [factory/factory-method.js](factory/factory-method.js) (25 lines): `Factory(type, item)` calls the method named `type` (`saber` or `archer`) on `Factory.prototype`. A new kind of object means a new method on the prototype; the `Factory` function itself stays the same. It also works without `new`: called as a plain function, it calls itself with `new`.
- **Adapter**, [plug.js](plug.js) (20 lines): `Target` holds a `Plug` and offers the `getName()` its callers expect, built on the plug's own answer. Callers talk to `Target` and never touch `Plug`.
- **Read-only property**, [descriptor.js](descriptor.js) (4 lines): `Object.defineProperty` with `writable: false` makes `name` read-only, so `Reflect.set` returns `false` and the value stays `'yck'`.

Three more patterns have their own folders:

- [Prototype inheritance, including the mistakes](inherit/README.md): compare shared prototypes, borrowed constructors and `Object.create`.
- [Proxy traps and event delegation](proxy/README.md): intercept property access with `Proxy`, and handle many clicks from one parent element.
- [Publish and subscribe](pub-sub/README.md): a minimal `on` / `emit` / `off` event hub.

## Then and now

Use a pattern only when it removes a real dependency between two parts of your code. Some patterns now come with the language: an ES module runs only once, so every file that imports it shares the same objects, and a module-level object often does the job of a singleton.

The read-only example used to be a decorator, `@readonly`, that could not run as written. Decorators are still a proposal (as of 2026-09). The old example used the legacy signature `(target, key, descriptor)`, while the [current proposal](https://github.com/tc39/proposal-decorators) calls a decorator with `(value, context)`. Property descriptors are standard JavaScript and need no build tools.

## Limits

- These are sketches of each idea, not advice to add every pattern to an app.
- Nothing stops `new Singleton()` from creating a second instance; the pattern relies on callers using `getInstance()`.
- `Factory('unknown')` throws a `TypeError`, because the prototype has no method with that name.

## Checks and credits

- No automated test checks the five pattern files above. `npm run test:browser` loads the page in Chromium, Firefox and WebKit and fails if it throws an error. The publish/subscribe hub has its own unit test; see [its README](pub-sub/README.md).
- Original code is MIT; see [NOTICE.md](../../NOTICE.md). The [migration ledger](../../docs/migration.md) links to the original version, the `design-mode` folder.
