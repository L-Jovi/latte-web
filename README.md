# latte-web

English | [简体中文](README.zh-Hans.md)

Small experiments explaining how the Web works. Observe a behavior, read the smallest useful implementation, then compare it with a modern tool. Handwritten exercises have explicit limits; they are not published production libraries.

## Read and run

Use Node 24 LTS and npm 11. From the repository root:

```sh
npm ci
npm run build
npm run dev
# Open http://127.0.0.1:4173
```

Application and toolchain commands live in their own READMEs. The root server is the static experiment index. JavaScript installation does not require Rust.

## Learning path

Read foundations → handwritten mechanisms → toolchains → applications, or choose one question directly.

### Foundations

- [JavaScript foundations](fundamentals/javascript/README.md) — maintained
- [Call, apply and bind](fundamentals/javascript/context/README.md) — maintained
- [Construction and prototype lookup](fundamentals/javascript/instance/README.md) — maintained
- [Class and function inheritance](fundamentals/javascript/classes/README.md) — maintained
- [Promise chains and await](fundamentals/javascript/async-await/README.md) — maintained
- [Events and scheduling](fundamentals/events/README.md) — maintained
- [Layout and transform](fundamentals/browser/README.md) — maintained
- [CSS layout](fundamentals/css/README.md) — maintained
- [Semantic HTML](fundamentals/html/README.md) — maintained
- [Types and an explicit Redux-style reducer](fundamentals/typescript/README.md) — maintained

### Handwritten mechanisms

- [Promise: three steps](mechanisms/promise/README.md) — maintained
- [Generator state machines](mechanisms/generator/README.md) — maintained
- [Small design patterns](mechanisms/design-patterns/README.md) — maintained
- [Inheritance and counterexamples](mechanisms/design-patterns/inherit/README.md) — maintained
- [Property proxy and event delegation](mechanisms/design-patterns/proxy/README.md) — maintained
- [Publish and subscribe](mechanisms/design-patterns/pub-sub/README.md) — maintained
- [Small JavaScript utilities](mechanisms/utilities/README.md) — maintained
- [Shallow and graph cloning](mechanisms/utilities/clone/README.md) — maintained
- [Cycles versus repeated references](mechanisms/utilities/circle-ref/README.md) — maintained
- [Debouncing](mechanisms/utilities/debounce/README.md) — maintained
- [Leading throttling](mechanisms/utilities/throttle/README.md) — maintained
- [Timer drift](mechanisms/utilities/timer/README.md) — maintained
- [Decimal string formatting](mechanisms/utilities/format/README.md) — maintained
- [Chained addition](mechanisms/utilities/add/README.md) — maintained
- [Two handmade bundlers](mechanisms/bundlers/README.md) — maintained
- [A minimal element/component renderer](mechanisms/mini-react/README.md) — maintained
- [A History API router](mechanisms/router/README.md) — maintained
- [Function composition](mechanisms/compose/README.md) — maintained
- [Selection, Range and cursor restoration](mechanisms/selection/README.md) — maintained

### Toolchains

- [Webpack learning topics](tooling/webpack/README.md) — maintained
- [Entry and output](tooling/webpack/getting-started/README.md) — maintained
- [Assets and loaders](tooling/webpack/asset-management/README.md) — maintained
- [Multiple entries](tooling/webpack/output-management/README.md) — maintained
- [Development source maps](tooling/webpack/development/README.md) — maintained
- [Hot module replacement](tooling/webpack/hot-module-replacement/README.md) — maintained
- [Lazy loading](tooling/webpack/lazy-loading/README.md) — maintained
- [Shared dependencies](tooling/webpack/code-splitting/README.md) — maintained
- [Content hashes and caching](tooling/webpack/caching/README.md) — maintained
- [Development and production modes](tooling/webpack/production/README.md) — maintained
- [Unused exports](tooling/webpack/tree-shaking/README.md) — maintained
- [Legacy globals at the module boundary](tooling/webpack/shimming/README.md) — maintained
- [Compiler lifecycle plugins](tooling/webpack/plugins/README.md) — maintained
- [A packaged number dictionary](tooling/webpack/library/README.md) — maintained
- [Declarative file tasks with Grunt](tooling/grunt/README.md) — maintained
- [Less compilation and native CSS variables](tooling/less/README.md) — maintained
- [Template compilation and escaping](tooling/handlebars/README.md) — maintained
- [Task sequencing and TypeScript](tooling/gulp-typescript/README.md) — maintained
- [Typed React props through Webpack](tooling/webpack-typescript/README.md) — maintained

### Applications and browser experiments

- [Card and Button, three packaging paths](examples/components/README.md) — maintained
- [Classic React and Redux](examples/react-classic/README.md) — maintained
- [Modern React and Redux Toolkit](examples/react-modern/README.md) — maintained
- [Draft.js controlled editing](examples/rich-text-draft/README.md) — maintained
- [Lexical editor state and plugins](examples/rich-text-lexical/README.md) — maintained

### Historical research

- [Historical React architecture notes](docs/history/react/README.md) — historical
- [Historical TestUtils and Enzyme cases](docs/history/testing/README.md) — historical

## Verification and maintenance

```sh
npm run check
npx playwright install chromium firefox webkit
npm run test:browser
```

`maintained` entries participate in current checks; `historical` entries are attributed reading material. Each README describes verification and intentional limits. This collection has no single product version or release promise.

Migration is in progress: content in the old directories is not yet part of the maintained runnable set.

[Migration ledger](docs/migration.md) · [Contributing](CONTRIBUTING.md) · [Code of conduct](CODE_OF_CONDUCT.md) · [Security reporting](SECURITY.md)

## License

Original code is [MIT](LICENSE). Retained third-party code, GPL/ISC subprojects and attributions keep their own terms; see [NOTICE](NOTICE.md) and local license files. Historical prose stays in its original language.
