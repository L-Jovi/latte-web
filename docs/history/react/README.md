# React architecture notes from 2018

English | [简体中文](README.zh-Hans.md)

The original notes (in Chinese) on domain-driven structure, sagas and routing. They explain how the repository's React and Redux Todo app was organized, and they are kept for reading, not as advice for today.

## Try it

Nothing needs to be installed or run. Read the notes on GitHub, where the Markdown and the screenshots render, or in any Markdown viewer. They are in Chinese. This order works well:

1. [notes/Domain-driven-design.md](notes/Domain-driven-design.md) (28 lines): why the business logic moves out of the views and actions into separate services.
2. [notes/structure.md](notes/structure.md) (73 lines): the folder layout, plus three extra steps: two kinds of actions, redux-saga for complex asynchronous work, and Immutable.js for cheap comparisons.
3. [notes/routes.md](notes/routes.md) (16 lines): keeping the router's location in an Immutable.js store with react-router-redux.
4. [notes/optimize-scene.md](notes/optimize-scene.md) (71 lines): cached selectors with Reselect, why the app used axios instead of `fetch`, and a middleware that runs before every action.

The notes were written in May and June 2018. Their last change, on 2019-11-15 (commit `2c6aeb0`), only moved them to a new folder.

## How it works

The notes describe one design for a React and Redux app. That app lives on, repaired, as the [2018-style Todo app](../../../examples/react-classic/README.md). In short:

- **Thin views and actions.** In plain React and Redux, the notes argue, the views carry too much: they dispatch actions and read state, and the actions end up holding most of the asynchronous and data logic. So actions are split into two kinds: _pure_ actions, which only tell a reducer what to change, and actions with side effects, which middleware handles.
- **A service per business area.** Business logic moves into separate `services` modules, one for each area of the business. This borrows the _bounded context_ from domain-driven design: every area gets clear edges.
- **Sagas for side effects.** Requests, debouncing, and races between a timeout and a response run in redux-saga, a Redux middleware in which each flow is written as a generator function. The notes compare it with RxJS and choose redux-saga.
- **Immutable state.** State is kept in Immutable.js structures. A change always creates a new object, so `shouldComponentUpdate` can compare references instead of walking through deep objects.
- **Routing and selectors.** The router's location is copied into the store with react-router-redux, and Reselect caches values computed from the state until their inputs change.

## Then and now

Most of these choices have since been replaced:

| The notes (2018)                                       | As of 2026-09                                                                                                                                                                                |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Actions, reducers and sagas written by hand            | [Redux Toolkit](https://redux.js.org/introduction/why-rtk-is-redux-today) is the official way to write Redux: `createSlice` writes the actions, and RTK Query fetches and caches server data |
| Immutable.js, so that every change makes a new object  | Immer, inside Redux Toolkit: reducers look like plain changes and still produce new objects                                                                                                  |
| Router state copied into Redux with react-router-redux | The URL belongs to the router; [React Router 7](https://remix.run/blog/react-router-v7) (2024-11-22) also loads the data for each route                                                      |
| axios, because `fetch` could not be cancelled          | A `fetch` request is cancelled with `AbortController`; a timeout still needs its own rule from the caller                                                                                    |
| `shouldComponentUpdate` in class components            | Function components and Hooks, available since [React 16.8 (2019-02-06)](https://legacy.reactjs.org/blog/2019/02/06/react-v16.8.0.html)                                                      |

The runnable apps already follow these changes. The [2018-style Todo app](../../../examples/react-classic/README.md) keeps classes, sagas and Immutable.js, but drops react-router-redux, the deprecated lifecycle methods and the before-every-action middleware. [Today's Todo app](../../../examples/react-modern/README.md) uses Hooks and Redux Toolkit. [How the ecosystem changed](../../ecosystem.md) tells the longer story.

## Limits

- These are arguments from their time, not measurements. Nothing in them is a current performance result or framework recommendation.
- The text is unchanged apart from three things: a short header at the top of each note, added in 2026 (optimize-scene.md also gets a correction about cancelling `fetch`); the link to the demo app, which now points to the baseline commit; and a stray tab removed from one image link.
- The original folder also held a copy of the Create React App manual, which is not kept.

## Checks and credits

- Nothing here is run or tested, but the apps that replaced this design are. `npm run test:apps` runs the current component and renderer tests, including the same Todo steps on both Todo apps. After `npm run build`, `npm run test:browser` runs both apps in Chromium, Firefox and WebKit.
- The notes are original material under the MIT license; see [NOTICE.md](../../../NOTICE.md). The [migration ledger](../../migration.md) links to the exact original revision, in `react/react-practice/docs`.
