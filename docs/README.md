# Reading and verification guide

English | [简体中文](README.zh-Hans.md)

Choose a question, observe it, then read its owner source. The repository is a collection of independent experiments, not a single deployable product.

| Question                                                | Suggested route                                                                                                                                              | Observable result                                                               |
| ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| What does JavaScript do before a framework is involved? | [Foundations](../fundamentals/README.md) → [Promise](../mechanisms/promise/README.md) → [mini React](../mechanisms/mini-react/README.md)                     | Call context, ordering and component updates become visible.                    |
| What does a build tool actually produce?                | [Two bundlers](../mechanisms/bundlers/README.md) → [Webpack topics](../tooling/webpack/README.md) → [component outputs](../examples/components/README.md)    | Follow an import graph and load built modules in a real consumer.               |
| Why did application patterns change?                    | [Classic Todo](../examples/react-classic/README.md) ↔ [modern Todo](../examples/react-modern/README.md) → [GraphQL feed](../examples/graphql/README.md)      | Compare identical Todo behavior, then explicit network and database boundaries. |
| How do browser interactions work?                       | [Selection](../mechanisms/selection/README.md) → [visual experiments](../examples/visuals/README.md) → [offline cache](../examples/service-worker/README.md) | Restore a cursor, manipulate geometry and reload without an origin server.      |
| How should a measurement be interpreted?                | [2019 research](history/performance/README.md) → [current observations](../examples/performance/README.md)                                                   | Distinguish historical conclusions, raw events and current visit metrics.       |

All commands below run at the repository root. Node 24 LTS and npm 11 are required. `npm ci` uses one lockfile and the reviewed native package install-script allowlist. SQLite uses a native package; the supported macOS arm64/Linux CI environments install its Node 24 build. Other platforms may require that package's compiler prerequisites. Rust is optional until the Wasm command.

| Command                                    | What it proves                                                                                                                                                |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                              | Serves the static learning index on 127.0.0.1:4173. It does not start API servers.                                                                            |
| `npm run typecheck`                        | Checks the TypeScript workspaces and generates Prisma types.                                                                                                  |
| `npm run build`                            | Builds every JavaScript workspace, including component consumer outputs and Storybook.                                                                        |
| `npm test` / `npm run test:aplus`          | Checks bounded mechanisms and the standard Promise/A+ suite.                                                                                                  |
| `npm run test:tooling`                     | Executes bundled graphs and packaged library consumers.                                                                                                       |
| `npm run test:apps`                        | Runs Testing Library/Vitest behavior and renderer checks.                                                                                                     |
| `npm run test:api`                         | Rebuilds temporary SQLite databases and uses real HTTP/WebSocket connections.                                                                                 |
| `npm run test:browser`                     | Uses built entries, a temporary feed database and local services in Chromium, Firefox and WebKit. Run `npx playwright install chromium firefox webkit` first. |
| `npm run build:wasm` / `npm run test:wasm` | Runs Rust tests, compiles the module and calls it in all three browsers.                                                                                      |
| `npm run check:docs`                       | Validates local document/image links, both README languages, catalog destinations and baseline coverage.                                                      |
| `npm run check`                            | Runs types, all JavaScript builds and every non-browser check above.                                                                                          |

Browser/API tests never reset the application database created by `db:setup`. Test services use ports 4173, 4000, 4001 and 4002; stop separately running demos before browser checks. Test output is ignored under `test-results/`, `playwright-report/` or `output/`.

Read [ecosystem decisions](ecosystem.md), [migration decisions](migration.md) and [verification limits](verification.md) before generalizing a demo. `docs/catalog.json` owns the current index; `docs/migration.json` owns longest-prefix baseline mappings. After editing either, run `npm run docs:generate`. The generator also produces `baseline-disposition.json`, one resolved decision for each original file.

Contribute through [a protected main PR](../CONTRIBUTING.md); there is no npm publication or website deployment workflow.
