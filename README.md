# latte-web

English | [简体中文](README.zh-Hans.md)

Small experiments explaining how the Web works. Observe a behavior, read the smallest useful implementation, then compare it with a modern tool. Handwritten exercises have explicit limits; they are not published production libraries.

## Read and run

Use Node 24 LTS and npm 11. From the repository root:

```sh
npm ci
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
