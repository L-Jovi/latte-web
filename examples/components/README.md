# One component library, three builds

English | [简体中文](README.zh-Hans.md)

Ship the same `Card` and `Button` with Vite, webpack and Babel, and load each output. Putting the three side by side shows what each build tool does to the same source files.

## Try it

```sh
npm ci
npm run build -w @latte/components
npm run dev
# open http://127.0.0.1:4173/examples/components/dist/demo/
```

A card with a **Count: 0** button appears, and each click adds one. The page `dist/consumer/consumer.html` loads the Babel output instead and shows a **Babel package loaded** button in the same card. You can also open the [live demo](https://latte.jovipro.com/examples/components/dist/demo/index.html) and the [live Babel page](https://latte.jovipro.com/examples/components/dist/consumer/consumer.html).

To browse the two Storybook stories, run `npm run storybook -w @latte/components` and open http://127.0.0.1:6006.

## How it works

The components are tiny on purpose. [src/Card.jsx](src/Card.jsx) wraps its children in a `div` styled by [src/card.css](src/card.css). [src/Button.jsx](src/Button.jsx) shows a `message` and passes every other prop, such as `onClick`, on to the native `<button>`. [src/index.js](src/index.js) exports both.

[build.mjs](build.mjs) (44 lines) runs the tools one after another, and each one writes its own folder under `dist/`:

| Folder           | Tool and config                                                         | What comes out                                                                                  |
| ---------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `dist/demo/`     | Vite, [vite.config.js](vite.config.js)                                  | The counter page, bundled as an app                                                             |
| `dist/vite/`     | Vite in library mode, [vite.library.config.js](vite.library.config.js) | `index.js` (ES module), `index.cjs` (CommonJS) and a separate `components.css`                  |
| `dist/webpack/`  | webpack, [webpack.config.cjs](webpack.config.cjs)                       | `index.cjs`, with the CSS inside the JavaScript; it is added to the page when it runs in a browser |
| `dist/babel/`    | Babel, [babel.config.cjs](babel.config.cjs)                             | One file per source file: JSX becomes plain JavaScript, and `import './card.css'` stays as it is |
| `dist/consumer/` | Vite, [vite.consumer.config.js](vite.consumer.config.js)                | A page that imports `dist/babel/`                                                               |

Two details matter:

- The library builds leave React out. React is _external_: the app that uses the library provides it.
- Babel rewrites files but does not bundle them. Its output still imports a CSS file, so it only works through a tool that understands CSS imports, such as Vite. The consumer page shows exactly that. `build.mjs` also changes the `.jsx` imports to `.js` and copies `card.css` next to the output.

The build ends with a static Storybook. [src/Components.stories.jsx](src/Components.stories.jsx) holds its two stories. Storybook is a gallery for trying components one at a time; it renders these same components, not a copy.

## Then and now

In the original repository these components were spread over several projects: `Card` in a Create React App scaffold, `Button` in separate Storybook and webpack scaffolds, plus duplicate copies. Now one source folder feeds every build.

The React team [deprecated Create React App on 2025-02-14](https://react.dev/blog/2025/02/14/sunsetting-create-react-app) and recommends a framework or a build tool such as Vite. Vite 8 bundles with Rolldown, so bundler settings go under `rolldownOptions`, as in two of the configs here. As of 2026-09, webpack 5 is still widely used, and it is still the clearest place to see loaders at work; the [webpack tour](../../tooling/webpack/README.md) takes them one at a time. [How the ecosystem changed](../../docs/ecosystem.md) tells the longer story.

## Limits

- Two components and one CSS file: no theming and no type declarations.
- Nothing is published. `package.json` is marked private, and the builds are generated on your machine, not committed.
- It shows how packaging works, not how to start a real component library. Build tools organise files; they do not make the components correct.

## Checks and credits

- `npm run test:tooling` loads the Vite and webpack CommonJS files with `require` and renders `Card` and `Button` to HTML with React's server renderer.
- After the build, `npm run test:browser` clicks the counter on the demo page, loads the Babel page and checks that it reports no errors, and opens the **In Card** Storybook story, in Chromium, Firefox and WebKit. Install the browsers once with `npx playwright install chromium firefox webkit`.
- `npm run check` runs these checks together with every other build and test.
- The [migration ledger](../../docs/migration.md) lists the original projects. Original code is MIT; see [NOTICE.md](../../NOTICE.md).
