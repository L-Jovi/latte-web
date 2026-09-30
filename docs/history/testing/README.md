# React testing the old way: TestUtils and Enzyme

English | [简体中文](README.zh-Hans.md)

Shallow rendering and DOM tests from an older tutorial, kept for comparison with Testing Library. They come from Ruan Yifeng's react-testing-demo, which tested a small Todo app written for React 0.14.

## Try it

These tests cannot run: they import a Todo app that is no longer in the repository, and their old dependencies are not installed. Read them instead, next to today's tests. Each file checks some of the same five things: the title is "Todos", items start out not done, clicking an item toggles it between done and not done, the delete button removes an item, and the add button adds one.

1. [cases/shallow1.test.js](cases/shallow1.test.js) and [cases/shallow2.test.js](cases/shallow2.test.js) (19 lines each) use _shallow rendering_: React runs the component one level deep, and the test inspects the elements it returns, as in `app.props.children[0].type`.
2. [cases/dom1.test.js](cases/dom1.test.js), [cases/dom2.test.js](cases/dom2.test.js) and [cases/dom3.test.js](cases/dom3.test.js) (17 to 21 lines) render the app into a DOM with TestUtils, fake clicks with `TestUtils.Simulate.click`, then count the items or check a CSS class.
3. [cases/enzyme1.test.js](cases/enzyme1.test.js) (43 lines) makes the same checks with Enzyme.
4. [cases/setup.js](cases/setup.js) (7 lines) creates a fake `document` with jsdom, so that DOM tests can run in Node.

Then open today's versions: [tests/apps/react.test.jsx](../../../tests/apps/react.test.jsx) and [tests/browser/react.spec.js](../../../tests/browser/react.spec.js).

## How it works

The cases rely on these tools from the React 0.14 days:

- **TestUtils** (`react-addons-test-utils`) was React's own low-level testing helper. `createRenderer` renders shallowly, without child components and without a DOM. `renderIntoDocument` renders into a DOM, and `Simulate.click` sends a click through React's event system, without a real browser event.
- **Enzyme**, from Airbnb, wraps those helpers in an API modelled on jQuery: `find('h1')`, `.text()`, `.simulate('click')`, `.hasClass()`. It offers three ways to render: `shallow`, `render` (to static HTML) and `mount` (into a full DOM). [cases/enzyme1.test.js](cases/enzyme1.test.js) uses all three.
- **Mocha** runs the tests, and **Chai** provides `expect`.

All of them look at the app from the inside: its element tree, tag names such as `li`, CSS classes such as `todo-done` and selectors such as `.add-todo button`. Change the markup, and these tests break, even if the app still works.

## Then and now

Enzyme let tests render a component shallowly and inspect its internal structure. Such tests broke whenever the implementation changed, even when the page still worked. Enzyme's official adapters stopped at React 16. [React 19](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) removed `react-test-renderer/shallow` and deprecated `react-test-renderer`, which, in the React team's words, "promotes testing implementation details".

Testing Library (2018) tests what a user sees and does instead. This repository uses it with Vitest for component tests, and Playwright to drive real browsers:

| Job             | Old cases (this folder)                                     | Today ([react.test.jsx](../../../tests/apps/react.test.jsx))                                                                    |
| --------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Find the title  | `app.props.children[0].type`, or Enzyme's `find('h1')`      | `getByRole('heading', { name: 'Todos' })`                                                                                       |
| Click something | `TestUtils.Simulate.click`, or Enzyme's `simulate('click')` | `user.click(…)` from `@testing-library/user-event`                                                                              |
| Add a todo      | Set `input.value`, then click the add button                | `user.type(…)` into the box named "New todo", then click **Add**                                                                |
| Where it runs   | Mocha, with a `document` made by hand in `setup.js`         | Vitest with jsdom; [react.spec.js](../../../tests/browser/react.spec.js) runs a longer scenario in Chromium, Firefox and WebKit |

[How the ecosystem changed](../../ecosystem.md) tells the longer story.

## Limits

- The cases need their original setup (React 0.14, Enzyme, Mocha and Babel) and the app they import from `../app/components/App`. None of that is here, so they are for reading only.
- Only the test files are kept, unchanged. The tutorial text and the React 0.14 app were removed; the [migration ledger](../../migration.md) links to the last version of both.

## Checks and credits

- No test runs these files. The same Todo behaviors are checked today: `npm run test:apps` runs the current component and renderer tests, including Testing Library on both Todo apps, and after `npm run build`, `npm run test:browser` runs Playwright in Chromium, Firefox and WebKit.
- The cases come from [Ruan Yifeng's react-testing-demo](https://github.com/ruanyf/react-testing-demo), which is loosely based on Jack Franklin's article "Testing React Applications". They keep Ruan Yifeng's MIT license in [LICENSE](LICENSE); see also [NOTICE.md](../../../NOTICE.md).
- This page is original and MIT. The [migration ledger](../../migration.md) links to the exact original revision.
