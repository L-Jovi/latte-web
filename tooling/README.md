# Build tools

English | [简体中文](README.zh-Hans.md)

How source files become something a browser can load.

| Topic | What you'll see | Try it |
| --- | --- | --- |
| [webpack, one feature at a time](webpack/README.md) | A set of small builds, each changing one thing: entries, loaders, source maps, hot reload, splitting, caching and more. | — |
| [Your first webpack build](webpack/getting-started/README.md) | One entry file becomes one bundle; follow the dependency graph in between. | [Live demo](https://latte.jovipro.com/tooling/webpack/getting-started/dist/index.html) |
| [Loading CSS, images and data](webpack/asset-management/README.md) | Import CSS, an SVG and an XML file, and see which loader or asset type handles each one. | [Live demo](https://latte.jovipro.com/tooling/webpack/asset-management/dist/index.html) |
| [Multiple entry points](webpack/output-management/README.md) | Two entries produce two named files, and the HTML plugin adds their script tags for you. | [Live demo](https://latte.jovipro.com/tooling/webpack/output-management/dist/index.html) |
| [Source maps for debugging](webpack/development/README.md) | Build in development mode and read your original source in DevTools. | [Live demo](https://latte.jovipro.com/tooling/webpack/development/dist/index.html) |
| [Hot module replacement](webpack/hot-module-replacement/README.md) | Edit a module while the dev server runs, and the page updates without a reload. | [Live demo](https://latte.jovipro.com/tooling/webpack/hot-module-replacement/dist/index.html) |
| [Lazy loading with import()](webpack/lazy-loading/README.md) | A module is downloaded only when you click the button. | [Live demo](https://latte.jovipro.com/tooling/webpack/lazy-loading/dist/index.html) |
| [Sharing code between entries](webpack/code-splitting/README.md) | Two entries share one copy of Lodash instead of bundling it twice. | [Live demo](https://latte.jovipro.com/tooling/webpack/code-splitting/dist/index.html) |
| [Content hashes for long-term caching](webpack/caching/README.md) | File names change only when their content changes, so browsers can cache them safely. | [Live demo](https://latte.jovipro.com/tooling/webpack/caching/dist/index.html) |
| [Development vs production builds](webpack/production/README.md) | One project, two configs: readable output for debugging, optimized output for users. | [Live demo](https://latte.jovipro.com/tooling/webpack/production/dist/index.html) |
| [Tree shaking: dropping unused exports](webpack/tree-shaking/README.md) | Import one function and watch the unused one disappear from the production bundle. | [Live demo](https://latte.jovipro.com/tooling/webpack/tree-shaking/dist/index.html) |
| [Shimming old global-style code](webpack/shimming/README.md) | Give legacy code the global it expects, even though it never imports it. | [Live demo](https://latte.jovipro.com/tooling/webpack/shimming/dist/index.html) |
| [Writing a webpack plugin](webpack/plugins/README.md) | A plugin that hooks into the build and writes a list of every output file. | [Live demo](https://latte.jovipro.com/tooling/webpack/plugins/dist/index.html) |
| [Publishing a library with webpack](webpack/library/README.md) | Package a tiny number-to-word converter as a library and load it from a separate Node program. | — |
| [Grunt: task-based builds](grunt/README.md) | A clean-then-copy build, the way many projects worked before bundlers. | [Live demo](https://latte.jovipro.com/tooling/grunt/dist/index.html) |
| [Less, and what native CSS can do today](less/README.md) | Variables, mixins and guards in Less, and why native CSS variables can change at runtime while Less variables cannot. | [Live demo](https://latte.jovipro.com/tooling/less/modern.html) |
| [Template compiling and HTML escaping](handlebars/README.md) | Compile a Handlebars template and see why `{{value}}` is escaped while `{{{value}}}` is not. | [Live demo](https://latte.jovipro.com/tooling/handlebars/dist/index.html) |
| [Gulp: running tasks in order](gulp-typescript/README.md) | Clean, compile TypeScript and copy HTML as a small Gulp pipeline. | [Live demo](https://latte.jovipro.com/tooling/gulp-typescript/dist/index.html) |
| [TypeScript and React through webpack](webpack-typescript/README.md) | See why Babel strips types without checking them, and where `tsc` still fits in. | [Live demo](https://latte.jovipro.com/tooling/webpack-typescript/dist/index.html) |

[Back to the learning path](../README.md#learning-path)
