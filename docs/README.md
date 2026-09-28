# Reading guide

English | [简体中文](README.zh-Hans.md)

Pick a question, run the example that answers it, then read the code. Each example stands on its own: this is a collection, not one application.

## Start from a question

| Question                                                  | Suggested route                                                                                                                                                           | What you will see                                                                                                |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| What does JavaScript do before any framework is involved? | [Fundamentals](../fundamentals/README.md) → [Promise from scratch](../mechanisms/promise/README.md) → [React-style renderer](../mechanisms/mini-react/README.md)          | How `this` is decided, in what order async code runs, and how a component updates.                               |
| What does a build tool actually produce?                  | [Build your own bundler](../mechanisms/bundlers/README.md) → [webpack tour](../tooling/webpack/README.md) → [one library, three builds](../examples/components/README.md) | An import graph turned into files, and those files loaded by a real consumer.                                    |
| Why did the way we write apps change?                     | [2018 Todo](../examples/react-classic/README.md) ↔ [today's Todo](../examples/react-modern/README.md) → [full-stack GraphQL](../examples/graphql/README.md)               | The same Todo features written two ways, then a network API and a database.                                      |
| How do browser interactions work?                         | [Cursors and selections](../mechanisms/selection/README.md) → [visual experiments](../examples/visuals/README.md) → [offline pages](../examples/service-worker/README.md) | A cursor restored after re-rendering, shapes you can drag, and a page that reloads with the server switched off. |
| How should a speed measurement be read?                   | [Page speed in 2019](history/performance/README.md) → [page speed today](../examples/performance/README.md)                                                               | Why old "load time" numbers mislead, and what current metrics measure.                                           |

## Commands

Run these from the repository root with Node 24 LTS and npm 11. `npm ci` installs everything from one lockfile and runs only the install scripts listed under `allowScripts` in `package.json`. The SQLite driver is a native package: on macOS (Apple silicon) and Linux it installs a prebuilt binary, while other platforms may need a C/C++ compiler. Rust is only needed for the WebAssembly commands.

| Command                                    | What it does                                                                                                                                                                           |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                              | Serves the learning index at http://127.0.0.1:4173. Plain HTML pages work even without `npm ci`. It does not start the API servers.                                                    |
| `npm run typecheck`                        | Type-checks the TypeScript workspaces and generates the Prisma client.                                                                                                                 |
| `npm run build`                            | Builds every workspace, including the component library outputs and Storybook.                                                                                                         |
| `npm test` / `npm run test:aplus`          | Tests the handmade mechanisms and runs the Promises/A+ suite.                                                                                                                          |
| `npm run test:tooling`                     | Runs the bundler outputs and loads the packaged libraries from a separate consumer.                                                                                                    |
| `npm run test:apps`                        | Runs the Testing Library and Vitest tests for the apps and the renderer.                                                                                                               |
| `npm run test:api`                         | Creates temporary SQLite databases and tests the APIs over real HTTP and WebSocket connections.                                                                                        |
| `npm run test:browser`                     | Opens every example in Chromium, Firefox and WebKit, with temporary databases and local services. Run `npx playwright install chromium firefox webkit` first.                          |
| `npm run build:wasm` / `npm run test:wasm` | Runs the Rust tests, compiles the module and calls it in all three browsers.                                                                                                           |
| `npm run check:docs`                       | Checks that generated pages are up to date, that every document and image link works, that each Chinese page names its English version, and that every original file is accounted for. |
| `npm run check`                            | Runs type checks, all builds and every check above except the browser and WebAssembly tests.                                                                                           |

Browser and API tests never touch the database created by `db:setup`. They use ports 4173, 4000, 4001 and 4002, so stop any demo you started yourself first. Test output goes to `test-results/`, `playwright-report/` or `output/`, which Git ignores.

## Before you generalize from an example

Read [how the ecosystem changed](ecosystem.md) for context, the [migration ledger](migration.md) for where old files went, and [what the checks cover](verification.md) for the limits of each example.

## Editing the index

`docs/catalog.json` lists every example with its title, a one-line summary and its demo page. `docs/migration.json` maps the original files to their new homes. After editing either one, run `npm run docs:generate`: it rewrites the learning-path block in the root READMEs, the section indexes, `index.html` and the migration ledger. `npm run check:docs` fails if a generated file is out of date.

Contributions go through a pull request to the protected `main` branch; see [CONTRIBUTING.md](../CONTRIBUTING.md). The live demos are deployed to GitHub Pages from `main`; nothing is published to npm.
