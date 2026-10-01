# Latte Web

English | [简体中文](README.zh-Hans.md)

A collection of hands-on web exercises and experiments. Like a latte—one part espresso, two parts milk, and one part foam—a familiar, approachable blend for everyday learning.

[![CI](https://github.com/L-Jovi/latte-web/actions/workflows/ci.yml/badge.svg)](https://github.com/L-Jovi/latte-web/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

Learn how the web works by building small versions of it: Promise/A+, mini React, a router, a bundler and more. Every example is small enough to read in one sitting. Run it, watch what happens, read the code, then see how the same problem is solved today.

**[Open the live demos →](https://l-jovi.github.io/latte-web/)**

## What's inside

| Highlight                  | In short                                                                                                                                     |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Promise from scratch**   | A Promise in under 60 lines that passes all 872 official [Promises/A+](https://promisesaplus.com/) tests.                                    |
| **A bundler**              | Follow `import` statements, build a dependency graph and emit one file, in about 60 lines.                                                   |
| **A React-style renderer** | `createElement`, mounting and `setState` in about 100 lines.                                                                                 |
| **A router**               | Links, back and forward on the History API, in about 70 lines.                                                                               |
| **The event loop**         | Predict the order of tasks, microtasks and timers, then run the page and check.                                                              |
| **Old and new**            | The same Todo app written 2018-style (classes, Redux-Saga, Immutable.js) and today's style (Hooks, TypeScript, Redux Toolkit), side by side. |
| **Rust in the browser**    | Compile a Rust function to WebAssembly and call it from a button.                                                                            |

There are also everyday utilities (debounce, throttle, deep clone), design patterns, a webpack feature tour, full-stack GraphQL and a set of canvas and CSS experiments.

## Try it

**In your browser:** open the [live demos](https://l-jovi.github.io/latte-web/). Most demos have a guide beside them: it walks through the page step by step and shows what the page's scripts print, in English or Chinese, so you do not need the browser console. A few examples need a local server (GraphQL and the network lab); their READMEs show how to run them.

**On your computer** (Node 24 LTS):

```sh
git clone https://github.com/L-Jovi/latte-web.git
cd latte-web
npm run dev
# open http://127.0.0.1:4173
```

Most pages are plain HTML and JavaScript, so `npm run dev` works right after cloning, with nothing to install. The applications and build-tool examples need their dependencies and a build first:

```sh
npm ci
npm run build
npm run dev
```

Rust is only needed for the WebAssembly example.

## How to read this repository

Every topic has its own folder and a README in English and Chinese. Each README follows the same order:

1. **Try it**: what to run and what you should see.
2. **How it works**: the idea in plain words, and the file to start reading.
3. **Then and now**: how people solved the problem before, and what they use today.
4. **Limits**: what the small version deliberately leaves out.

New to the browser? Start with **Fundamentals**. Curious how familiar tools work inside? Jump to **Build it yourself**.

## Learning path

<!-- catalog:start -->
<!-- prettier-ignore-start -->
<!-- Generated from docs/catalog.json by `npm run docs:generate`. Edit the catalog, not this block. -->

### Fundamentals

How JavaScript and the browser behave, one small page at a time.

| Topic | What you'll see | Try it |
| --- | --- | --- |
| [JavaScript basics: closures, this and new](fundamentals/javascript/README.md) | Short scripts that show how closures, `this` and object construction really work. | [Live demo](https://l-jovi.github.io/latte-web/fundamentals/javascript/index.html) |
| [call, apply and bind by hand](fundamentals/javascript/context/README.md) | Rebuild call, apply and bind to see how a function decides what `this` is. | [Live demo](https://l-jovi.github.io/latte-web/fundamentals/javascript/context/index.html) |
| [new and instanceof by hand](fundamentals/javascript/instance/README.md) | Rebuild `new` and `instanceof`: create the object, run the constructor, walk the prototype chain. | [Live demo](https://l-jovi.github.io/latte-web/fundamentals/javascript/instance/index.html) |
| [What class extends does under the hood](fundamentals/javascript/classes/README.md) | Compare `class extends` with old-style function inheritance, including why static members are inherited too. | [Live demo](https://l-jovi.github.io/latte-web/fundamentals/javascript/classes/index.html) |
| [Promise chains vs async/await](fundamentals/javascript/async-await/README.md) | The same two-step calculation written with `.then()` and with `await`. | [Live demo](https://l-jovi.github.io/latte-web/fundamentals/javascript/async-await/index.html) |
| [Event propagation and the event loop](fundamentals/events/README.md) | Watch events bubble, then predict and check the order of tasks, microtasks and timers. | [Live demo](https://l-jovi.github.io/latte-web/fundamentals/events/dom-event/index.html) |
| [Moving an element: layout vs transform](fundamentals/browser/README.md) | Move the same box with `top` and with `transform`, and see which one makes the browser redo layout. | [Live demo](https://l-jovi.github.io/latte-web/fundamentals/browser/render.html) |
| [CSS layout: BFC, Grid and centering](fundamentals/css/README.md) | Block formatting contexts, grid placement and several ways to center an element. | [Live demo](https://l-jovi.github.io/latte-web/fundamentals/css/bfc/bfc.html) |
| [Semantic HTML](fundamentals/html/README.md) | Build a page from meaningful sections instead of anonymous boxes. | [Live demo](https://l-jovi.github.io/latte-web/fundamentals/html/semantic.html) |
| [TypeScript: typed actions and reducers](fundamentals/typescript/README.md) | A discriminated union tells the compiler which action each branch of a reducer handles. | — |

### Build it yourself

Small, tested versions of tools you use every day.

| Topic | What you'll see | Try it |
| --- | --- | --- |
| [Promise from scratch](mechanisms/promise/README.md) | Grow a Promise in three steps, from a tiny state machine to a version that passes all 872 official Promises/A+ tests. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/promise/index.html) |
| [How generators pause and resume](mechanisms/generator/README.md) | See the state machine that Babel turns `yield` into, and how values flow in and out. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/generator/index.html) |
| [Design patterns in small examples](mechanisms/design-patterns/README.md) | Singleton, factory, adapter, proxy and publish/subscribe, each in a few lines. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/design-patterns/index.html) |
| [Prototype inheritance, including the mistakes](mechanisms/design-patterns/inherit/README.md) | See what goes wrong with a shared prototype or a borrowed constructor, and how `Object.create` fixes it. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/design-patterns/inherit/index.html) |
| [Proxy traps and event delegation](mechanisms/design-patterns/proxy/README.md) | Intercept property access with `Proxy`, and handle many clicks from one parent element. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/design-patterns/proxy/index.html) |
| [Publish and subscribe](mechanisms/design-patterns/pub-sub/README.md) | A minimal `on` / `emit` / `off` event hub; senders never need to know who is listening. | — |
| [Everyday utilities by hand](mechanisms/utilities/README.md) | Debounce, throttle, deep clone and more, written as short algorithms with clear limits. | — |
| [Shallow copy vs deep clone](mechanisms/utilities/clone/README.md) | Copy an object graph while keeping shared references and cycles, then compare with `structuredClone`. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/clone/index.html) |
| [Detecting circular references](mechanisms/utilities/circle-ref/README.md) | Tell a real cycle apart from an object that is referenced twice. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/circle-ref/index.html) |
| [Debounce](mechanisms/utilities/debounce/README.md) | Wait until a burst of calls stops, then run once. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/debounce/index.html) |
| [Throttle](mechanisms/utilities/throttle/README.md) | Run at most once per interval; the first call goes through right away. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/throttle/index.html) |
| [Why timers drift, and how to correct them](mechanisms/utilities/timer/README.md) | Measure how late timer callbacks arrive and adjust the next deadline. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/timer/index.html) |
| [Thousands separators without losing precision](mechanisms/utilities/format/README.md) | Group the digits of a number string without converting it to `Number`; compare with `Intl.NumberFormat`. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/format/index.html) |
| [add(1)(2)(3): currying and type coercion](mechanisms/utilities/add/README.md) | Keep a running total in a closure, and see how a function turns into a number. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/add/index.html) |
| [Build your own bundler, two ways](mechanisms/bundlers/README.md) | Parse imports, build a dependency graph and emit one file: first as plain functions, then as a small compiler. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/bundlers/dist/index.html) |
| [Build your own React-style renderer](mechanisms/mini-react/README.md) | createElement, mount and setState in a few files; two counters keep their own state. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/mini-react/index.html) |
| [Build your own router](mechanisms/router/README.md) | A small router on the History API: links, back and forward, all without a page reload. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/router/dist/index.html) |
| [Function composition (compose)](mechanisms/compose/README.md) | The `compose` helper behind Redux middleware, written by hand. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/compose/index.html) |
| [Cursors and selections in editable text](mechanisms/selection/README.md) | Save the cursor before focus leaves, insert text at it, and restore it after re-rendering. | [Live demo](https://l-jovi.github.io/latte-web/mechanisms/selection/index.html) |

### Build tools

How source files become something a browser can load.

| Topic | What you'll see | Try it |
| --- | --- | --- |
| [webpack, one feature at a time](tooling/webpack/README.md) | A set of small builds, each changing one thing: entries, loaders, source maps, hot reload, splitting, caching and more. | — |
| [Your first webpack build](tooling/webpack/getting-started/README.md) | One entry file becomes one bundle; follow the dependency graph in between. | [Live demo](https://l-jovi.github.io/latte-web/tooling/webpack/getting-started/dist/index.html) |
| [Loading CSS, images and data](tooling/webpack/asset-management/README.md) | Import CSS, an SVG and an XML file, and see which loader or asset type handles each one. | [Live demo](https://l-jovi.github.io/latte-web/tooling/webpack/asset-management/dist/index.html) |
| [Multiple entry points](tooling/webpack/output-management/README.md) | Two entries produce two named files, and the HTML plugin adds their script tags for you. | [Live demo](https://l-jovi.github.io/latte-web/tooling/webpack/output-management/dist/index.html) |
| [Source maps for debugging](tooling/webpack/development/README.md) | Build in development mode and read your original source in DevTools. | [Live demo](https://l-jovi.github.io/latte-web/tooling/webpack/development/dist/index.html) |
| [Hot module replacement](tooling/webpack/hot-module-replacement/README.md) | Edit a module while the dev server runs, and the page updates without a reload. | [Live demo](https://l-jovi.github.io/latte-web/tooling/webpack/hot-module-replacement/dist/index.html) |
| [Lazy loading with import()](tooling/webpack/lazy-loading/README.md) | A module is downloaded only when you click the button. | [Live demo](https://l-jovi.github.io/latte-web/tooling/webpack/lazy-loading/dist/index.html) |
| [Sharing code between entries](tooling/webpack/code-splitting/README.md) | Two entries share one copy of Lodash instead of bundling it twice. | [Live demo](https://l-jovi.github.io/latte-web/tooling/webpack/code-splitting/dist/index.html) |
| [Content hashes for long-term caching](tooling/webpack/caching/README.md) | File names change only when their content changes, so browsers can cache them safely. | [Live demo](https://l-jovi.github.io/latte-web/tooling/webpack/caching/dist/index.html) |
| [Development vs production builds](tooling/webpack/production/README.md) | One project, two configs: readable output for debugging, optimized output for users. | [Live demo](https://l-jovi.github.io/latte-web/tooling/webpack/production/dist/index.html) |
| [Tree shaking: dropping unused exports](tooling/webpack/tree-shaking/README.md) | Import one function and watch the unused one disappear from the production bundle. | [Live demo](https://l-jovi.github.io/latte-web/tooling/webpack/tree-shaking/dist/index.html) |
| [Shimming old global-style code](tooling/webpack/shimming/README.md) | Give legacy code the global it expects, even though it never imports it. | [Live demo](https://l-jovi.github.io/latte-web/tooling/webpack/shimming/dist/index.html) |
| [Writing a webpack plugin](tooling/webpack/plugins/README.md) | A plugin that hooks into the build and writes a list of every output file. | [Live demo](https://l-jovi.github.io/latte-web/tooling/webpack/plugins/dist/index.html) |
| [Publishing a library with webpack](tooling/webpack/library/README.md) | Package a tiny number-to-word converter as a library and load it from a separate Node program. | — |
| [Grunt: task-based builds](tooling/grunt/README.md) | A clean-then-copy build, the way many projects worked before bundlers. | [Live demo](https://l-jovi.github.io/latte-web/tooling/grunt/dist/index.html) |
| [Less, and what native CSS can do today](tooling/less/README.md) | Variables, mixins and guards in Less, and why native CSS variables can change at runtime while Less variables cannot. | [Live demo](https://l-jovi.github.io/latte-web/tooling/less/modern.html) |
| [Template compiling and HTML escaping](tooling/handlebars/README.md) | Compile a Handlebars template and see why `{{value}}` is escaped while `{{{value}}}` is not. | [Live demo](https://l-jovi.github.io/latte-web/tooling/handlebars/dist/index.html) |
| [Gulp: running tasks in order](tooling/gulp-typescript/README.md) | Clean, compile TypeScript and copy HTML as a small Gulp pipeline. | [Live demo](https://l-jovi.github.io/latte-web/tooling/gulp-typescript/dist/index.html) |
| [TypeScript and React through webpack](tooling/webpack-typescript/README.md) | See why Babel strips types without checking them, and where `tsc` still fits in. | [Live demo](https://l-jovi.github.io/latte-web/tooling/webpack-typescript/dist/index.html) |

### Applications and experiments

Complete applications with old and new versions side by side, plus visual experiments.

| Topic | What you'll see | Try it |
| --- | --- | --- |
| [One component library, three builds](examples/components/README.md) | Ship the same Card and Button with Vite, webpack and Babel, and load each output. | [Live demo](https://l-jovi.github.io/latte-web/examples/components/dist/demo/index.html) |
| [Todo app, 2018 style: classes, Redux, Saga, Immutable](examples/react-classic/README.md) | The original architecture, repaired and running on React 19. | [Live demo](https://l-jovi.github.io/latte-web/examples/react-classic/dist/index.html) |
| [Todo app, today's style: Hooks, TypeScript, Redux Toolkit](examples/react-modern/README.md) | The same features as the 2018 version, so the two can be compared side by side. | [Live demo](https://l-jovi.github.io/latte-web/examples/react-modern/dist/index.html) |
| [Rich text with Draft.js (archived)](examples/rich-text-draft/README.md) | Type, bold and save as JSON with the editor Meta archived in 2023. | [Live demo](https://l-jovi.github.io/latte-web/examples/rich-text-draft/dist/index.html) |
| [Rich text with Lexical](examples/rich-text-lexical/README.md) | The same type, bold and save steps with Draft.js's successor. | [Live demo](https://l-jovi.github.io/latte-web/examples/rich-text-lexical/dist/index.html) |
| [JSONP vs fetch with CORS](examples/network/README.md) | Read the same cross-origin data two ways, and cancel a request with `AbortController`. | Run locally |
| [Offline pages with a service worker](examples/service-worker/README.md) | Register, cache, serve offline and clean up, without a framework. | [Live demo](https://l-jovi.github.io/latte-web/examples/service-worker/index.html) |
| [GraphQL from scratch over HTTP](examples/graphql-http/README.md) | Schema, resolvers and a JSON response: the smallest complete GraphQL request. | Run locally |
| [Full-stack GraphQL: Apollo, subscriptions and SQLite](examples/graphql/README.md) | A small link feed with sign-up, voting, pagination and live updates. | Run locally |
| [The GraphQL server and database](examples/graphql/server/README.md) | Apollo Server, Prisma and SQLite, rebuilt from migrations and a fictional seed. | — |
| [The Apollo Client app](examples/graphql/client/README.md) | Queries, mutations and live subscriptions from a Vite app. | — |
| [Rust to WebAssembly in the browser](examples/wasm/README.md) | Compile a Rust function to `.wasm` and call it from a button. | [Live demo](https://l-jovi.github.io/latte-web/examples/wasm/dist/index.html) |
| [Dot-matrix countdown on canvas](examples/visuals/clock/README.md) | Digits drawn from a grid of dots; when a digit changes, its dots fall away as particles. | [Live demo](https://l-jovi.github.io/latte-web/examples/visuals/clock/index.html) |
| [Image effects with canvas pixels](examples/visuals/canvas-image/README.md) | Scale, watermark, magnify and filter an image by reading and writing its pixels. | [Live demo](https://l-jovi.github.io/latte-web/examples/visuals/canvas-image/index.html) |
| [Dragging with mouse events and Pointer Events](examples/visuals/drag/README.md) | The same drag written twice; Pointer Events also cover touch and pen. | [Live demo](https://l-jovi.github.io/latte-web/examples/visuals/drag/index.html) |
| [Swipe to change pages](examples/visuals/paging/README.md) | Turn a swipe into a page change using distance and speed thresholds, with touch events and with Pointer Events. | [Live demo](https://l-jovi.github.io/latte-web/examples/visuals/paging/index.html) |
| [3D carousel and CSS Scroll Snap](examples/visuals/carousel/README.md) | Place layered slides with geometry, then let CSS Scroll Snap do similar work natively. | [Live demo](https://l-jovi.github.io/latte-web/examples/visuals/carousel/index.html) |
| [Photo wall with CSS transforms](examples/visuals/photo-wall/README.md) | Scattered, tilted cards that straighten and zoom in on hover. | [Live demo](https://l-jovi.github.io/latte-web/examples/visuals/photo-wall/index.html) |
| [Search suggestions with the keyboard](examples/visuals/search/README.md) | Filter suggestions as you type and choose one with the arrow keys, using accessible combobox markup. | [Live demo](https://l-jovi.github.io/latte-web/examples/visuals/search/index.html) |
| [Menu, step bar and progress ring](examples/visuals/motion/README.md) | An expanding menu (JavaScript tween vs CSS transition), a step bar and a `conic-gradient` progress ring. | [Live demo](https://l-jovi.github.io/latte-web/examples/visuals/motion/index.html) |
| [Prize wheel](examples/visuals/lottery/README.md) | Spin a wheel that always stops on the sector it reports, using the Web Animations API. | [Live demo](https://l-jovi.github.io/latte-web/examples/visuals/lottery/index.html) |
| [Visual experiments](examples/visuals/README.md) | Canvas, CSS and pointer experiments that run straight in the browser. | — |
| [Measuring page speed today](examples/performance/README.md) | Navigation Timing, PerformanceObserver and Core Web Vitals, measured on your own visit. | [Live demo](https://l-jovi.github.io/latte-web/examples/performance/dist/index.html) |

### History

Notes kept from earlier years. Read them for context; they are not current advice.

| Topic | What you'll see | Try it |
| --- | --- | --- |
| [React architecture notes from 2018](docs/history/react/README.md) | The original notes (in Chinese) on domain-driven structure, sagas and routing. | — |
| [React testing the old way: TestUtils and Enzyme](docs/history/testing/README.md) | Shallow rendering and DOM tests from an older tutorial, kept for comparison with Testing Library. | — |
| [Measuring page speed in 2019](docs/history/performance/README.md) | How page speed was measured with `performance.timing`, and why those numbers are read differently now. | — |

<!-- prettier-ignore-end -->
<!-- catalog:end -->

## Then and now

Many examples here were first written between 2018 and 2022, and the tools around them have changed a lot since. [How the ecosystem changed](docs/ecosystem.md) tells that story: from callbacks to `async`/`await`, from script tags to Vite, from Create React App to today's tools, and why the older code is still worth reading.

## Why "latte"?

A latte is one part espresso, two parts milk and one part foam: the most common coffee, and the one almost everyone enjoys. Among the author's coffee-named repositories, the web plays that role: the everyday, widely loved blend.

The rest of the series: [espresso-algorithm](https://github.com/L-Jovi/espresso-algorithm) (algorithms, pure concentration), [roaster-linux](https://github.com/L-Jovi/roaster-linux) (Linux tools, where the beans are roasted), [barista-services](https://github.com/L-Jovi/barista-services) (services, the barista) and [cappuccino-ios](https://github.com/L-Jovi/cappuccino-ios) (iOS apps, lighter than a latte).

## Status

A personal learning collection maintained by [@L-Jovi](https://github.com/L-Jovi). It is not a product: there are no releases and no npm packages. Every example outside **History** is checked in CI on every change, including type checks, builds, unit tests, the Promises/A+ suite and browser tests in Chromium, Firefox and WebKit. The live demos are deployed from `main`. [What the checks cover, and what they don't](docs/verification.md).

The repository was reorganized in September 2026. The [migration ledger](docs/migration.md) maps every old path to its new home.

## Contributing

Issues and pull requests are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) first, and report security problems privately as described in [SECURITY.md](SECURITY.md). Everyone taking part follows the [code of conduct](CODE_OF_CONDUCT.md).

## License

Original code and documentation are [MIT](LICENSE). A few folders keep their original licenses or credits; [NOTICE.md](NOTICE.md) lists them.
