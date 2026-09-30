# Build your own React-style renderer

English | [简体中文](README.zh-Hans.md)

`createElement`, mount and `setState` in a few files; two counters keep their own state. The three files that make up the renderer total 106 lines.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/mini-react/
```

Two buttons appear, **First: 0** and **Second: 0**. Click **First** a few times: only its own count goes up. The browser console shows `mounted after insertion First true` and `mounted after insertion Second true`, logged when each counter is first added to the page. No install or build is needed: `npm run dev` works right after cloning. You can also open the [live demo](https://l-jovi.github.io/latte-web/mechanisms/mini-react/index.html).

## How it works

Read the files in the order the work happens:

1. [src/react.js](src/react.js) (21 lines): `createElement(type, props, ...children)` returns a plain object that describes an element, with its children inside its props. Strings and numbers become text elements; `null`, `undefined`, `true` and `false` are dropped.
2. [src/react-dom.js](src/react-dom.js) (71 lines): `render(element, container)` _mounts_ that description. It creates real DOM nodes, sets their attributes and event listeners, and puts them in the container. A function component is called with its props; a class component, one that extends `Component`, is created with `new` and its `render` method is called. A second step, _commit_, then calls each component's `componentDidMount`, so that method always runs after the component's DOM is on the page.
3. [src/component.js](src/component.js) (14 lines): the `Component` base class. `setState` merges the change into `this.state` (the change can be an object, or a function that receives the previous state) and calls the instance's own update function.

[src/index.js](src/index.js) is the demo: one `Counter` class, rendered twice.

Each component instance gets its own update function when it is mounted, which is why the two counters never mix up their state. An update runs at once: it renders the component again, builds new DOM nodes, swaps them in for the old ones, unmounts the old subtree and then calls `componentDidUpdate` if the component defines it. Unmounting calls `componentWillUnmount` and disconnects the instance from its update function, so a later `setState` does nothing.

## Then and now

Components that needed state used to be classes with lifecycle methods such as `componentDidMount`, like `Counter` here. [React 16.8](https://legacy.reactjs.org/blog/2019/02/06/react-v16.8.0.html) (2019-02-06) added Hooks, and new code now uses function components and Hooks; class components still work. This renderer's `render(element, container)` has the shape of the old `ReactDOM.render`, which React 19 removed: apps now call `createRoot(container).render(element)` ([upgrade guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)). [How the ecosystem changed](../../docs/ecosystem.md) tells the longer story.

## Limits

- An update rebuilds the component's whole subtree instead of comparing it with the previous one, as React does. Nested components start again with fresh state, and focus and text selection inside are lost: after a click, the button you clicked has been replaced by a new element.
- It has no matching of list items by `key`, no batching of several updates into one render, no Hooks, no fragments, no error boundaries and no concurrent rendering, and only part of the React lifecycle.
- A component must return exactly one element.
- The renderer is kept small so you can see which instance owns which state; it is not meant to be compatible with React.

## Checks and credits

- `npm run test:apps` renders two counters with Vitest in jsdom, a simulated DOM. It clicks the first counter twice and checks that the labels read `a2` and `b0`, that `componentDidMount` ran once per counter after both buttons were in place, and that `render(null, container)` calls `componentWillUnmount` for both and empties the container.
- `npm run test:browser` clicks **First: 0** in Chromium, Firefox and WebKit and checks that it becomes **First: 1** while **Second: 0** stays the same.
- The first version kept a single instance per component class and re-rendered the page from global variables, so two counters could not keep separate state. The [migration ledger](../../docs/migration.md) links to it, the `react-scratch` folder.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
