# How the ecosystem changed

English | [简体中文](ecosystem.zh-Hans.md)

Most examples in this repository were first written between 2018 and 2022. The tools around them have changed a lot since then. This page tells that story one topic at a time: how people worked then, what hurt, what the community built, what we use today, and what the older code still teaches.

Dates are first stable releases or official announcements. Checked on 2026-09-28.

## At a glance

| Topic             | Then                                                 | Now                                                         | See it here                                                                                                     |
| ----------------- | ---------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Async code        | Callbacks, promise libraries                         | Native `Promise`, `async`/`await`                           | [Promise from scratch](../mechanisms/promise/README.md)                                                         |
| Bundling          | Script tags, Grunt, Gulp, hand-written webpack setup | Native ES modules, Vite                                     | [Build your own bundler](../mechanisms/bundlers/README.md), [webpack tour](../tooling/webpack/README.md)        |
| Starting an app   | Create React App                                     | Vite or a framework                                         | [Todo app, today's style](../examples/react-modern/README.md)                                                   |
| App state         | Redux with hand-written actions, Saga, Immutable.js  | Redux Toolkit, RTK Query, Immer                             | [2018 Todo](../examples/react-classic/README.md) ↔ [today's Todo](../examples/react-modern/README.md)           |
| Components        | Classes and lifecycle methods                        | Function components and Hooks                               | [React-style renderer](../mechanisms/mini-react/README.md)                                                      |
| Routing           | Router state copied into Redux                       | Router-owned data loading (React Router 7)                  | [Build your own router](../mechanisms/router/README.md)                                                         |
| Testing           | Enzyme, shallow rendering                            | Testing Library, Vitest, Playwright                         | [Old React tests](history/testing/README.md)                                                                    |
| Rich text         | `contenteditable` by hand, Draft.js                  | Lexical and similar editor frameworks                       | [Draft.js](../examples/rich-text-draft/README.md) ↔ [Lexical](../examples/rich-text-lexical/README.md)          |
| Cross-origin data | JSONP                                                | CORS, `fetch`, `AbortController`                            | [JSONP vs fetch](../examples/network/README.md)                                                                 |
| Styling           | Less and Sass for variables and nesting              | Native CSS variables, nesting, `color-mix()`                | [Less and native CSS](../tooling/less/README.md)                                                                |
| Copying objects   | `JSON.parse(JSON.stringify(x))`, lodash              | `structuredClone`                                           | [Shallow copy vs deep clone](../mechanisms/utilities/clone/README.md)                                           |
| GraphQL servers   | express-graphql, Apollo Server 2                     | graphql-http, Apollo Server 5, graphql-ws                   | [GraphQL from scratch](../examples/graphql-http/README.md), [full-stack GraphQL](../examples/graphql/README.md) |
| Rust on the web   | The Rust and WebAssembly working group's tools       | wasm-bindgen in its own organization, wasm-pack             | [Rust to WebAssembly](../examples/wasm/README.md)                                                               |
| Page speed        | `performance.timing`, home-made "white-screen" times | Navigation Timing 2, `PerformanceObserver`, Core Web Vitals | [2019](history/performance/README.md) ↔ [today](../examples/performance/README.md)                              |

## Async code: callbacks → promises → `async`/`await`

**Then.** Asynchronous work was written as callbacks. Each step nested inside the previous one, and every step had to remember to pass errors along by hand.

**What hurt.** Deeply nested code, errors that silently disappeared, and callbacks that ran twice or never.

**What the community built.** Promise libraries such as Q and Bluebird, and a shared community specification, [Promises/A+](https://promisesaplus.com/), that defined exactly how `then` must behave so libraries could work together.

**Now.** `Promise` became part of JavaScript in ES2015, and `async`/`await` followed in ES2017. Application code should use them.

**What the old code still teaches.** Writing a promise yourself shows why callbacks always run asynchronously, why a promise settles only once, and how one promise can adopt the result of another. [Promise from scratch](../mechanisms/promise/README.md) passes the same 872 tests that libraries used to prove compliance.

## Bundling: script tags → task runners → bundlers → native modules

**Then.** Pages loaded many `<script>` tags in a careful order. In the early 2010s, task runners such as Grunt and Gulp copied, concatenated and minified those files. Browserify and then webpack went further: they read `require`/`import` statements and built a dependency graph.

**What hurt.** Large configuration files, slow rebuilds, and a toolchain that had to be set up before writing any code.

**What the community built.** ES modules were standardized in ES2015, and all major browsers could load them natively by 2018. Vite (2020) used native modules during development and a bundler only for production. Vite 8, released on 2026-03-12, uses a single Rust-based bundler, Rolldown.

**Now.** Start small projects with Vite. webpack 5 is still widely used and still the clearest place to see loaders, chunks and plugins at work.

**What the old code still teaches.** Every bundler does the same three things: parse imports, build a graph and emit files. [Build your own bundler](../mechanisms/bundlers/README.md) does all three in about 60 lines; the [webpack tour](../tooling/webpack/README.md), [Grunt](../tooling/grunt/README.md) and [Gulp](../tooling/gulp-typescript/README.md) examples show how the same jobs used to be configured.

## Starting a React app: Create React App → Vite and frameworks

**Then.** From 2016, Create React App (CRA) was the standard way to start a React project: one command produced a working setup.

**What hurt.** The setup was hidden. Changing it meant "ejecting" into a large webpack configuration, and CRA itself fell behind newer, faster tools.

**Now.** The React team [deprecated CRA on 2025-02-14](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) and recommends a framework or a build tool such as Vite. The React applications here now run on Vite (the webpack examples keep webpack on purpose), and the old CRA shells were retired.

**What the old code still teaches.** An ejected CRA configuration is a real-world webpack setup; the webpack examples keep those lessons in smaller pieces.

## App state: hand-written Redux → Redux Toolkit

**Then.** Redux (2015) made state changes predictable: every change was an action, handled by a pure reducer. Teams wrote action types, action creators and reducers by hand, added Redux-Saga for side effects and Immutable.js to avoid accidental mutation.

**What hurt.** A lot of repeated code for each feature, and a steep learning curve.

**Now.** [Redux Toolkit](https://redux.js.org/introduction/why-rtk-is-redux-today) is the official way to write Redux. `createSlice` writes the actions for you, Immer lets reducers look like plain mutations, and RTK Query handles fetching and caching server data.

**What the old code still teaches.** The [2018-style Todo app](../examples/react-classic/README.md) keeps actions, reducers, sagas and Immutable.js visible, so you can see exactly what Redux Toolkit now does for you. The [modern version](../examples/react-modern/README.md) has the same features, and both pass the same tests.

## Components: classes → Hooks

**Then.** Components that needed state were classes, with lifecycle methods such as `componentDidMount`.

**What hurt.** Related logic was split across several lifecycle methods, and sharing stateful logic between components was awkward.

**Now.** Hooks arrived in React 16.8 (2019-02-06). React 18 (2022) batched state updates automatically, and React 19 (2024-12-05) removed long-deprecated APIs such as `ReactDOM.render`. Class components still work, but new code uses functions and Hooks.

**What the old code still teaches.** [The React-style renderer](../mechanisms/mini-react/README.md) builds `createElement`, mounting and `setState` by hand, which makes it clear what "rendering" and "updating" actually do.

## Routing: router state in Redux → router-owned data

**Then.** Apps copied the current URL into the Redux store (with libraries such as react-router-redux) so that everything lived in one place.

**What hurt.** Two sources of truth that could disagree, and extra code to keep them in sync.

**Now.** The router owns the URL. [React Router 7](https://remix.run/blog/react-router-v7) (2024-11-22) also loads data for each route.

**What the old code still teaches.** Underneath, every client-side router listens to the History API and decides what to render. [Build your own router](../mechanisms/router/README.md) shows that in about 70 lines.

## Testing: Enzyme → Testing Library

**Then.** Enzyme let tests render a component "shallowly" and inspect its internal state and structure.

**What hurt.** Tests broke whenever the implementation changed, even when the page still worked. Enzyme's official adapters stopped at React 16. [React 19](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) removed `react-test-renderer/shallow` and deprecated `react-test-renderer`, which, in the React team's words, "promotes testing implementation details".

**Now.** Testing Library (2018) tests what a user sees and does. Vitest runs unit tests, and Playwright drives real browsers.

**What the old code still teaches.** The [old test cases](history/testing/README.md) are kept next to the current ones, so the difference in approach is easy to compare.

## Rich text: `contenteditable` → editor frameworks

**Then.** Editors were built on `contenteditable` and `document.execCommand`, which is now deprecated. Draft.js (Facebook, 2016) added a structured editor state on top of React.

**Now.** Meta [archived Draft.js on 2023-02-06](https://github.com/facebookarchive/draft-js); its successor is [Lexical](https://lexical.dev/). Editor frameworks such as Lexical, ProseMirror and TipTap handle selection, history and formatting for you.

**What the old code still teaches.** Every editor still depends on the browser's Selection and Range APIs. [Cursors and selections](../mechanisms/selection/README.md) shows them directly, and the [Draft.js](../examples/rich-text-draft/README.md) and [Lexical](../examples/rich-text-lexical/README.md) examples do the same task side by side.

## Cross-origin data: JSONP → CORS and `fetch`

**Then.** Browsers blocked scripts from reading responses from other origins, but a `<script>` tag could load code from anywhere. JSONP used that loophole: the server wrapped data in a function call, and the page defined the function.

**What hurt.** JSONP runs the remote response as code with the page's full permissions, supports only GET, and has poor error handling.

**Now.** [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) lets a server state who may read its responses. `fetch` (2015) reads them, and `AbortController` cancels a request that is no longer needed.

**What the old code still teaches.** [JSONP vs fetch](../examples/network/README.md) makes the difference in trust visible: one approach executes the response, the other only reads it.

## Styling: preprocessors → native CSS

**Then.** CSS had no variables and no nesting, so teams used preprocessors such as Less and Sass to get them.

**Now.** CSS custom properties are supported everywhere, native nesting has worked in all major browsers since 2023, and functions such as `color-mix()` cover much of what preprocessor color helpers did.

**What the old code still teaches.** Less variables disappear when the file is compiled; CSS variables stay alive and can change at runtime. [Less and native CSS](../tooling/less/README.md) shows both.

## Copying objects: JSON tricks → `structuredClone`

**Then.** Deep copies were made with `JSON.parse(JSON.stringify(x))`, which turns dates into strings and `Map`s and `Set`s into empty objects, and throws on circular references, or with a library.

**Now.** [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) has been available in all major browsers since 2022 and in Node.js since version 17.

**What the old code still teaches.** Writing a deep clone yourself forces you to handle shared references and cycles. [Shallow copy vs deep clone](../mechanisms/utilities/clone/README.md) does that, then compares the result with `structuredClone`.

## GraphQL servers: express-graphql → graphql-http and Apollo Server 5

**Then.** express-graphql was the reference way to serve GraphQL over HTTP. Apollo Server 2 and the subscriptions-transport-ws protocol powered many tutorials.

**Now.** The GraphQL Foundation [adopted graphql-http](https://graphql.org/blog/2022-11-07-graphql-http/) as its reference server, and express-graphql was archived in 2023. Apollo Server 4 reached end of life on 2026-01-26; [Apollo Server 5](https://www.apollographql.com/docs/apollo-server/migration) requires Node.js 20 or later. Live updates use the graphql-ws protocol.

**What the old code still teaches.** [GraphQL from scratch](../examples/graphql-http/README.md) shows the smallest complete request: a schema, resolvers and a JSON response. The [full-stack example](../examples/graphql/README.md) adds login, voting and live updates.

## Rust on the web: the working group's tools → community maintainers

**Then.** The Rust and WebAssembly working group maintained the main tools, including wasm-bindgen and wasm-pack.

**Now.** The working group [archived its GitHub organization in 2025](https://blog.rust-lang.org/inside-rust/2025/07/21/sunsetting-the-rustwasm-github-org). wasm-bindgen moved to a new wasm-bindgen organization with new maintainers, and wasm-pack now lives there too (as of 2026-09). WebAssembly itself has run in all major browsers since 2017.

**What the old code still teaches.** [Rust to WebAssembly](../examples/wasm/README.md) follows one function from Rust source to a `.wasm` file to a button click.

## Measuring page speed: `performance.timing` → Core Web Vitals

**Then.** Teams read timestamps from `performance.timing` and invented their own "white-screen" and "first-screen" times.

**Now.** Navigation Timing Level 2 and `PerformanceObserver` replaced `performance.timing`, and Core Web Vitals (2020) measure what visitors feel. INP replaced FID as the responsiveness metric on 2024-03-12.

**What the old code still teaches.** [Measuring page speed in 2019](history/performance/README.md) explains why the old numbers were hard to act on; [measuring page speed today](../examples/performance/README.md) shows the current APIs in working code.

## Why keep the old code at all?

Tools change every few years; the problems they solve change much more slowly. Reading an older approach next to a modern one shows what the new tool is doing for you, and helps when you meet the older style in an existing codebase. Where a dependency is no longer maintained, the example says so and pairs it with a current alternative; see each README for details.
