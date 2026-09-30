# JavaScript basics: closures, this and new

English | [简体中文](README.zh-Hans.md)

Short scripts that show how closures, `this` and object construction really work. This folder has a closure example and an overview; each of its four sub-folders rebuilds one piece of the language by hand.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/fundamentals/javascript/
```

No install or build is needed: `npm run dev` works right after cloning. Open the browser console. The page builds an object with `forgeNew`, the hand-written `new` from [instance](instance/README.md), and logs it between two `=== forge new ===` lines; its `name` is `'saber'`. You can also open the [live demo](https://l-jovi.github.io/latte-web/fundamentals/javascript/index.html).

The closure example has no page. Run it with Node from the repository root:

```sh
node fundamentals/javascript/closure.js
```

It prints `0`, `1`, `2`, `3` and `4`, one number per second.

## How it works

A _closure_ is a function that keeps access to the variables around it, even after the code that created them has finished. In [closure.js](closure.js) (13 lines), a loop starts five timers, and each timer's callback remembers its own `i`. The loop uses two ways to give every callback its own copy: `let` creates a new `i` for each turn of the loop, and the wrapper `(function (i) { … })(i)`, a function that is called immediately, copies `i` into a parameter. Either one alone is enough. With `var` and no wrapper, all five callbacks share one `i` and print `5` five times.

Each sub-folder rebuilds one piece, so you can see the steps the language normally hides:

- [new and instanceof by hand](instance/README.md): create the object, run the constructor, walk the prototype chain. It also shows why a constructor that returns `null` still gives you the new object, while one that returns another object replaces it.
- [call, apply and bind by hand](context/README.md): how a function call decides what `this` is.
- [What class extends does under the hood](classes/README.md): `class extends` next to old-style function inheritance.
- [Promise chains vs async/await](async-await/README.md): the same two-step calculation written both ways.

Start with [closure.js](closure.js), [instance/new.js](instance/new.js) and [context/bind.js](context/bind.js).

## Then and now

ES2015 added [`let`](https://262.ecma-international.org/6.0/#sec-let-and-const-declarations) and [`class`](https://262.ecma-international.org/6.0/#sec-class-definitions). With `let`, the wrapper function in closure.js is no longer needed, and `class` gives construction and inheritance a shorter syntax. Neither replaced the object model underneath: a class still builds objects from prototypes, and the `this` of an ordinary function still depends on how it is called. That is why these small rebuilds still explain the code you write today.

## Limits

- closure.js runs only in Node or the browser console: no page loads it, and no test checks it.
- The versions in the sub-folders are small on purpose. Each README lists what its version leaves out.

## Checks and credits

- `npm test` checks the hand-written `new`, `instanceof`, `call`, `apply` and `bind`; each sub-folder's README says exactly what. `npm run test:browser` opens every page in Chromium, Firefox and WebKit and checks that it loads without errors.
- Source links sit next to the code they credit, such as the article behind [context/bind.js](context/bind.js). The [migration ledger](../../docs/migration.md) links to the original version of this folder, which was called `syntax`.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
