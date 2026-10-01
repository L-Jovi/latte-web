# 构建工具

[English](README.md) | 简体中文

> 对应英文版：两种语言由同一份目录数据同时生成，内容始终同步。

源代码是怎样变成浏览器能加载的文件的。

| 主题 | 你会看到什么 | 试一试 |
| --- | --- | --- |
| [webpack 逐项拆解](webpack/README.zh-Hans.md) | 一组小构建，每个只改一处：入口、loader、source map、热更新、拆包、缓存等。 | — |
| [第一个 webpack 构建](webpack/getting-started/README.zh-Hans.md) | 一个入口文件打包成一个文件，看中间的依赖图是怎么走的。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/getting-started/dist/index.html?lang=zh) |
| [加载 CSS、图片和数据文件](webpack/asset-management/README.zh-Hans.md) | 导入 CSS、SVG 和 XML，看各自由哪种 loader 或资源类型处理。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/asset-management/dist/index.html?lang=zh) |
| [多个入口](webpack/output-management/README.zh-Hans.md) | 两个入口生成两个文件，HTML 插件自动插入对应的 script 标签。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/output-management/dist/index.html?lang=zh) |
| [用 source map 调试](webpack/development/README.zh-Hans.md) | 用开发模式构建，在 DevTools 里看到原始源码。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/development/dist/index.html?lang=zh) |
| [模块热替换（HMR）](webpack/hot-module-replacement/README.zh-Hans.md) | 开发服务器运行时修改模块，页面不刷新就能更新。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/hot-module-replacement/dist/index.html?lang=zh) |
| [用 import() 按需加载](webpack/lazy-loading/README.zh-Hans.md) | 点击按钮时才下载对应的模块。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/lazy-loading/dist/index.html?lang=zh) |
| [多入口共享代码](webpack/code-splitting/README.zh-Hans.md) | 两个入口共享一份 Lodash，不再各打包一份。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/code-splitting/dist/index.html?lang=zh) |
| [用内容哈希做长期缓存](webpack/caching/README.zh-Hans.md) | 只有内容变了文件名才变，浏览器就能放心缓存。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/caching/dist/index.html?lang=zh) |
| [开发构建与生产构建](webpack/production/README.zh-Hans.md) | 同一个项目两套配置：调试用可读的输出，发布用优化后的输出。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/production/dist/index.html?lang=zh) |
| [Tree shaking：去掉没用到的导出](webpack/tree-shaking/README.zh-Hans.md) | 只导入一个函数，看没用到的那个从生产包里消失。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/tree-shaking/dist/index.html?lang=zh) |
| [为旧式全局代码做适配（shimming）](webpack/shimming/README.zh-Hans.md) | 给从不 import 的旧代码提供它依赖的全局变量。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/shimming/dist/index.html?lang=zh) |
| [编写 webpack 插件](webpack/plugins/README.zh-Hans.md) | 一个接入构建流程、输出全部产物清单的插件。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/plugins/dist/index.html?lang=zh) |
| [用 webpack 打包一个库](webpack/library/README.zh-Hans.md) | 把一个很小的数字与英文单词互转工具打包成库，再在另一个 Node 程序里加载。 | — |
| [Grunt：基于任务的构建](grunt/README.zh-Hans.md) | 先清理再复制的构建流程，打包器流行之前很多项目就是这样构建的。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/grunt/dist/index.html?lang=zh) |
| [Less，以及今天原生 CSS 能做到的](less/README.zh-Hans.md) | Less 的变量、混入和条件守卫；以及为什么原生 CSS 变量能在运行时改变，而 Less 变量不能。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/less/modern.html?lang=zh) |
| [模板编译与 HTML 转义](handlebars/README.zh-Hans.md) | 编译 Handlebars 模板，看为什么 `{{value}}` 会转义而 `{{{value}}}` 不会。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/handlebars/dist/index.html?lang=zh) |
| [Gulp：按顺序执行任务](gulp-typescript/README.zh-Hans.md) | 用一条小的 Gulp 流水线完成清理、编译 TypeScript 和复制 HTML。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/gulp-typescript/dist/index.html?lang=zh) |
| [通过 webpack 使用 TypeScript 和 React](webpack-typescript/README.zh-Hans.md) | 看懂 Babel 为什么只删类型不检查，以及 `tsc` 还负责什么。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack-typescript/dist/index.html?lang=zh) |

[返回学习路线](../README.zh-Hans.md#学习路线)
