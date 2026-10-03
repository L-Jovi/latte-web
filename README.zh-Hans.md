# Latte Web

[English](README.md) | 简体中文

> 对应英文版：2026-10-03。英文版更新后本页可能滞后。

一组动手实践的 Web 练习与实验。就像一杯拿铁——一份浓缩、两份牛奶、一份奶泡——熟悉、易入口，适合日常学习。

[![CI](https://github.com/L-Jovi/latte-web/actions/workflows/ci.yml/badge.svg)](https://github.com/L-Jovi/latte-web/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

从零实现一些小版本，看懂 Web 是怎样工作的：Promise/A+、mini React、前端路由、打包器，等等。每个示例都小到可以一口气读完。先运行，看看发生了什么；再读代码；最后看看今天的人怎样解决同一个问题。

**[打开在线演示 →](https://l-jovi.github.io/latte-web/?lang=zh)**

## 这里有什么

| 亮点                   | 一句话                                                                                                                                      |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **从零实现 Promise**   | 不到 60 行的 Promise，通过全部 872 项 [Promises/A+](https://promisesaplus.com/) 官方测试。                                                  |
| **打包器**             | 跟着 `import` 语句建立依赖图，最后输出一个文件，大约 60 行。                                                                                |
| **React 风格的渲染器** | `createElement`、挂载和 `setState`，大约 100 行。                                                                                           |
| **前端路由**           | 基于 History API 的链接跳转和前进后退，大约 70 行。                                                                                         |
| **事件循环**           | 先预测任务、微任务和定时器的执行顺序，再运行页面验证。                                                                                      |
| **新旧对照**           | 同一个 Todo 应用，一版是 2018 年的写法（class、Redux-Saga、Immutable.js），一版是今天的写法（Hooks、TypeScript、Redux Toolkit），并排对照。 |
| **在浏览器里跑 Rust**  | 把一个 Rust 函数编译成 WebAssembly，再用按钮调用它。                                                                                        |

此外还有常用工具函数（防抖、节流、深拷贝）、设计模式、webpack 功能逐项拆解、全栈 GraphQL，以及一组 Canvas 和 CSS 实验。

## 试一试

**在浏览器里：** 打开[在线演示](https://l-jovi.github.io/latte-web/?lang=zh)。每个页面都能用右上角的按钮在英文和中文之间切换，一次只显示一种语言。大部分演示页旁边都有一份说明：它带你一步一步看完页面，并显示页面脚本打印的内容，不用打开浏览器控制台。在手机上，说明是屏幕底部的一块面板，可以收起。少数示例需要本地服务器（GraphQL 和网络实验），它们的 README 里写了运行方法。

**在自己电脑上**（Node 24 LTS）：

```sh
git clone https://github.com/L-Jovi/latte-web.git
cd latte-web
npm run dev
# 打开 http://127.0.0.1:4173/?lang=zh
```

大部分页面是纯 HTML 和 JavaScript，clone 下来直接 `npm run dev` 就能看，什么都不用装。应用和构建工具类的示例需要先安装依赖并构建：

```sh
npm ci
npm run build
npm run dev
```

只有 WebAssembly 示例需要 Rust。

## 怎么读这个仓库

每个主题一个目录，都有中英文 README，并且按同样的顺序写：

1. **试一试**：运行什么，应该看到什么。
2. **原理**：用大白话讲清思路，并告诉你从哪个文件读起。
3. **过去与现在**：以前的人怎么解决这个问题，今天又用什么。
4. **刻意省略**：这个小版本故意没做哪些事。

刚接触浏览器？从**基础**开始。想知道熟悉的工具内部怎么运作？直接看**动手实现**。

## 学习路线

<!-- catalog:start -->
<!-- prettier-ignore-start -->
<!-- Generated from docs/catalog.json by `npm run docs:generate`. Edit the catalog, not this block. -->

### 基础

一次一个小页面，看 JavaScript 和浏览器的真实行为。

| 主题 | 你会看到什么 | 试一试 |
| --- | --- | --- |
| [JavaScript 基础：闭包、this 与 new](fundamentals/javascript/README.zh-Hans.md) | 用几段短脚本，看懂闭包、`this` 和对象构造的真实行为。 | [在线演示](https://l-jovi.github.io/latte-web/fundamentals/javascript/index.html?lang=zh) |
| [手写 call、apply 与 bind](fundamentals/javascript/context/README.zh-Hans.md) | 自己实现 call、apply 和 bind，看懂函数调用时 `this` 是怎么确定的。 | [在线演示](https://l-jovi.github.io/latte-web/fundamentals/javascript/context/index.html?lang=zh) |
| [手写 new 与 instanceof](fundamentals/javascript/instance/README.zh-Hans.md) | 自己实现 `new` 和 `instanceof`：创建对象、执行构造函数、沿原型链查找。 | [在线演示](https://l-jovi.github.io/latte-web/fundamentals/javascript/instance/index.html?lang=zh) |
| [class extends 背后做了什么](fundamentals/javascript/classes/README.zh-Hans.md) | 对比 `class extends` 和老式函数继承，包括静态成员为什么也会被继承。 | [在线演示](https://l-jovi.github.io/latte-web/fundamentals/javascript/classes/index.html?lang=zh) |
| [Promise 链与 async/await 对照](fundamentals/javascript/async-await/README.zh-Hans.md) | 同一个两步计算，分别用 `.then()` 和 `await` 来写。 | [在线演示](https://l-jovi.github.io/latte-web/fundamentals/javascript/async-await/index.html?lang=zh) |
| [事件传播与事件循环](fundamentals/events/README.zh-Hans.md) | 先看事件如何冒泡，再预测并验证任务、微任务和定时器的执行顺序。 | [在线演示](https://l-jovi.github.io/latte-web/fundamentals/events/dom-event/index.html?lang=zh) |
| [移动元素：改布局还是用 transform](fundamentals/browser/README.zh-Hans.md) | 分别用 `top` 和 `transform` 移动同一个方块，看哪种会让浏览器重新计算布局。 | [在线演示](https://l-jovi.github.io/latte-web/fundamentals/browser/render.html?lang=zh) |
| [CSS 布局：BFC、Grid 与居中](fundamentals/css/README.zh-Hans.md) | 块格式化上下文、Grid 布局，以及几种居中方法。 | [在线演示](https://l-jovi.github.io/latte-web/fundamentals/css/bfc/bfc.html?lang=zh) |
| [语义化 HTML](fundamentals/html/README.zh-Hans.md) | 用有含义的标签搭页面，而不是一堆没有含义的盒子。 | [在线演示](https://l-jovi.github.io/latte-web/fundamentals/html/semantic.html?lang=zh) |
| [TypeScript：给 action 和 reducer 加类型](fundamentals/typescript/README.zh-Hans.md) | 用可辨识联合类型，让编译器知道 reducer 的每个分支处理的是哪种 action。 | — |

### 动手实现

日常工具的小型实现，每一个都有测试。

| 主题 | 你会看到什么 | 试一试 |
| --- | --- | --- |
| [从零实现 Promise](mechanisms/promise/README.zh-Hans.md) | 分三步写出 Promise：从最小的状态机，到通过全部 872 项 Promises/A+ 官方测试的版本。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/promise/index.html?lang=zh) |
| [Generator 如何暂停与恢复](mechanisms/generator/README.zh-Hans.md) | 看 Babel 把 `yield` 编译成的状态机，以及值是怎样传进传出的。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/generator/index.html?lang=zh) |
| [小例子讲设计模式](mechanisms/design-patterns/README.zh-Hans.md) | 单例、工厂、适配器、代理、发布订阅，每个只用几行代码。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/design-patterns/index.html?lang=zh) |
| [原型继承，以及常见的错误写法](mechanisms/design-patterns/inherit/README.zh-Hans.md) | 看共享原型和借用构造函数会出什么问题，以及 `Object.create` 怎样解决。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/design-patterns/inherit/index.html?lang=zh) |
| [Proxy 拦截与事件委托](mechanisms/design-patterns/proxy/README.zh-Hans.md) | 用 `Proxy` 拦截属性读写，用一个父元素处理所有子元素的点击。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/design-patterns/proxy/index.html?lang=zh) |
| [发布订阅](mechanisms/design-patterns/pub-sub/README.zh-Hans.md) | 一个最小的 `on` / `emit` / `off` 事件中心，发送方不需要知道谁在监听。 | — |
| [手写常用工具函数](mechanisms/utilities/README.zh-Hans.md) | 防抖、节流、深拷贝等，写成边界清楚的短算法。 | — |
| [浅拷贝与深拷贝](mechanisms/utilities/clone/README.zh-Hans.md) | 复制对象图时保留共享引用和循环引用，再和 `structuredClone` 对比。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/clone/index.html?lang=zh) |
| [检测循环引用](mechanisms/utilities/circle-ref/README.zh-Hans.md) | 区分真正的循环引用，和只是被引用了两次的对象。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/circle-ref/index.html?lang=zh) |
| [防抖](mechanisms/utilities/debounce/README.zh-Hans.md) | 等一连串调用停下来之后，只执行一次。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/debounce/index.html?lang=zh) |
| [节流](mechanisms/utilities/throttle/README.zh-Hans.md) | 每个时间间隔最多执行一次，第一次调用立即执行。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/throttle/index.html?lang=zh) |
| [定时器为什么会漂移，以及如何校正](mechanisms/utilities/timer/README.zh-Hans.md) | 测量定时器回调晚了多少，并据此调整下一次的触发时间。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/timer/index.html?lang=zh) |
| [千分位格式化，不丢精度](mechanisms/utilities/format/README.zh-Hans.md) | 不把数字字符串转成 `Number` 也能加千分位；再和 `Intl.NumberFormat` 对比。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/format/index.html?lang=zh) |
| [add(1)(2)(3)：柯里化与类型转换](mechanisms/utilities/add/README.zh-Hans.md) | 用闭包累加，再看一个函数是怎么变成数字的。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/add/index.html?lang=zh) |
| [手写打包器（两种写法）](mechanisms/bundlers/README.zh-Hans.md) | 解析 import、构建依赖图、输出一个文件；先用几个函数写，再改成一个小型编译器。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/bundlers/dist/index.html?lang=zh) |
| [手写一个 React 风格的渲染器](mechanisms/mini-react/README.zh-Hans.md) | 用几个文件实现 createElement、挂载和 setState；两个计数器各自保存状态。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/mini-react/index.html?lang=zh) |
| [手写前端路由](mechanisms/router/README.zh-Hans.md) | 基于 History API 的小路由：点击链接、前进后退，都不刷新页面。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/router/dist/index.html?lang=zh) |
| [函数组合（compose）](mechanisms/compose/README.zh-Hans.md) | Redux 中间件背后的 `compose`，自己写一遍。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/compose/index.html?lang=zh) |
| [可编辑文本里的光标与选区](mechanisms/selection/README.zh-Hans.md) | 在失去焦点前保存光标，在光标处插入文字，重新渲染后再恢复光标。 | [在线演示](https://l-jovi.github.io/latte-web/mechanisms/selection/index.html?lang=zh) |

### 构建工具

源代码是怎样变成浏览器能加载的文件的。

| 主题 | 你会看到什么 | 试一试 |
| --- | --- | --- |
| [webpack 逐项拆解](tooling/webpack/README.zh-Hans.md) | 一组小构建，每个只改一处：入口、loader、source map、热更新、拆包、缓存等。 | — |
| [第一个 webpack 构建](tooling/webpack/getting-started/README.zh-Hans.md) | 一个入口文件打包成一个文件，看中间的依赖图是怎么走的。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/getting-started/dist/index.html?lang=zh) |
| [加载 CSS、图片和数据文件](tooling/webpack/asset-management/README.zh-Hans.md) | 导入 CSS、SVG 和 XML，看各自由哪种 loader 或资源类型处理。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/asset-management/dist/index.html?lang=zh) |
| [多个入口](tooling/webpack/output-management/README.zh-Hans.md) | 两个入口生成两个文件，HTML 插件自动插入对应的 script 标签。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/output-management/dist/index.html?lang=zh) |
| [用 source map 调试](tooling/webpack/development/README.zh-Hans.md) | 用开发模式构建，在 DevTools 里看到原始源码。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/development/dist/index.html?lang=zh) |
| [模块热替换（HMR）](tooling/webpack/hot-module-replacement/README.zh-Hans.md) | 开发服务器运行时修改模块，页面不刷新就能更新。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/hot-module-replacement/dist/index.html?lang=zh) |
| [用 import() 按需加载](tooling/webpack/lazy-loading/README.zh-Hans.md) | 点击按钮时才下载对应的模块。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/lazy-loading/dist/index.html?lang=zh) |
| [多入口共享代码](tooling/webpack/code-splitting/README.zh-Hans.md) | 两个入口共享一份 Lodash，不再各打包一份。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/code-splitting/dist/index.html?lang=zh) |
| [用内容哈希做长期缓存](tooling/webpack/caching/README.zh-Hans.md) | 只有内容变了文件名才变，浏览器就能放心缓存。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/caching/dist/index.html?lang=zh) |
| [开发构建与生产构建](tooling/webpack/production/README.zh-Hans.md) | 同一个项目两套配置：调试用可读的输出，发布用优化后的输出。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/production/dist/index.html?lang=zh) |
| [Tree shaking：去掉没用到的导出](tooling/webpack/tree-shaking/README.zh-Hans.md) | 只导入一个函数，看没用到的那个从生产包里消失。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/tree-shaking/dist/index.html?lang=zh) |
| [为旧式全局代码做适配（shimming）](tooling/webpack/shimming/README.zh-Hans.md) | 给从不 import 的旧代码提供它依赖的全局变量。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/shimming/dist/index.html?lang=zh) |
| [编写 webpack 插件](tooling/webpack/plugins/README.zh-Hans.md) | 一个接入构建流程、输出全部产物清单的插件。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/plugins/dist/index.html?lang=zh) |
| [用 webpack 打包一个库](tooling/webpack/library/README.zh-Hans.md) | 把一个很小的数字与英文单词互转工具打包成库，再在另一个 Node 程序里加载。 | — |
| [Grunt：基于任务的构建](tooling/grunt/README.zh-Hans.md) | 先清理再复制的构建流程，打包器流行之前很多项目就是这样构建的。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/grunt/dist/index.html?lang=zh) |
| [Less，以及今天原生 CSS 能做到的](tooling/less/README.zh-Hans.md) | Less 的变量、混入和条件守卫；以及为什么原生 CSS 变量能在运行时改变，而 Less 变量不能。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/less/modern.html?lang=zh) |
| [模板编译与 HTML 转义](tooling/handlebars/README.zh-Hans.md) | 编译 Handlebars 模板，看为什么 `{{value}}` 会转义而 `{{{value}}}` 不会。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/handlebars/dist/index.html?lang=zh) |
| [Gulp：按顺序执行任务](tooling/gulp-typescript/README.zh-Hans.md) | 用一条小的 Gulp 流水线完成清理、编译 TypeScript 和复制 HTML。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/gulp-typescript/dist/index.html?lang=zh) |
| [通过 webpack 使用 TypeScript 和 React](tooling/webpack-typescript/README.zh-Hans.md) | 看懂 Babel 为什么只删类型不检查，以及 `tsc` 还负责什么。 | [在线演示](https://l-jovi.github.io/latte-web/tooling/webpack-typescript/dist/index.html?lang=zh) |

### 应用与实验

完整的应用示例（新旧写法并排对照），以及视觉实验。

| 主题 | 你会看到什么 | 试一试 |
| --- | --- | --- |
| [一个组件库，三种构建方式](examples/components/README.zh-Hans.md) | 同一组 Card 和 Button，分别用 Vite、webpack 和 Babel 构建，并实际加载每种产物。 | [在线演示](https://l-jovi.github.io/latte-web/examples/components/dist/demo/index.html?lang=zh) |
| [2018 年风格的 Todo：class、Redux、Saga、Immutable](examples/react-classic/README.zh-Hans.md) | 原来的架构，修好后运行在 React 19 上。 | [在线演示](https://l-jovi.github.io/latte-web/examples/react-classic/dist/index.html?lang=zh) |
| [今天风格的 Todo：Hooks、TypeScript、Redux Toolkit](examples/react-modern/README.zh-Hans.md) | 功能和 2018 版完全相同，方便两边对照阅读。 | [在线演示](https://l-jovi.github.io/latte-web/examples/react-modern/dist/index.html?lang=zh) |
| [用 Draft.js 做富文本（已归档）](examples/rich-text-draft/README.zh-Hans.md) | 输入、加粗、保存为 JSON；Draft.js 已于 2023 年被 Meta 归档。 | [在线演示](https://l-jovi.github.io/latte-web/examples/rich-text-draft/dist/index.html?lang=zh) |
| [用 Lexical 做富文本](examples/rich-text-lexical/README.zh-Hans.md) | 同样的输入、加粗、保存流程，换成 Draft.js 的继任者。 | [在线演示](https://l-jovi.github.io/latte-web/examples/rich-text-lexical/dist/index.html?lang=zh) |
| [JSONP 与 fetch + CORS 对照](examples/network/README.zh-Hans.md) | 用两种方式读取同一份跨域数据，并用 `AbortController` 取消请求。 | 本地运行 |
| [用 Service Worker 实现离线访问](examples/service-worker/README.zh-Hans.md) | 不依赖框架，完成注册、缓存、离线访问和清理。 | [在线演示](https://l-jovi.github.io/latte-web/examples/service-worker/index.html) |
| [从零搭一个 GraphQL HTTP 服务](examples/graphql-http/README.zh-Hans.md) | Schema、resolver 和 JSON 响应：最小的一次完整 GraphQL 请求。 | 本地运行 |
| [全栈 GraphQL：Apollo、订阅与 SQLite](examples/graphql/README.zh-Hans.md) | 一个小型链接分享站：注册登录、投票、分页和实时更新。 | 本地运行 |
| [GraphQL 服务端与数据库](examples/graphql/server/README.zh-Hans.md) | Apollo Server + Prisma + SQLite，用迁移脚本和虚构数据重建。 | — |
| [Apollo Client 前端](examples/graphql/client/README.zh-Hans.md) | 在 Vite 应用里发起查询、变更和实时订阅。 | — |
| [在浏览器里运行 Rust（WebAssembly）](examples/wasm/README.zh-Hans.md) | 把一个 Rust 函数编译成 `.wasm`，再通过按钮调用它。 | [在线演示](https://l-jovi.github.io/latte-web/examples/wasm/dist/index.html?lang=zh) |
| [Canvas 点阵倒计时](examples/visuals/clock/README.zh-Hans.md) | 用点阵画出数字；数字变化时，点会化作粒子落下。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/clock/index.html?lang=zh) |
| [用 Canvas 像素做图像处理](examples/visuals/canvas-image/README.zh-Hans.md) | 通过读写像素，实现缩放、水印、放大镜和滤镜。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/canvas-image/index.html?lang=zh) |
| [用鼠标事件和 Pointer Events 实现拖拽](examples/visuals/drag/README.zh-Hans.md) | 同一个拖拽写两遍；Pointer Events 同时支持触屏和手写笔。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/drag/index.html?lang=zh) |
| [滑动翻页](examples/visuals/paging/README.zh-Hans.md) | 用距离和速度阈值把滑动变成翻页，分别用 touch 事件和 Pointer Events 实现。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/paging/index.html?lang=zh) |
| [3D 轮播与 CSS 滚动吸附](examples/visuals/carousel/README.zh-Hans.md) | 用几何计算排布层叠的轮播图，再让 CSS Scroll Snap 原生完成类似的事。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/carousel/index.html?lang=zh) |
| [CSS transform 照片墙](examples/visuals/photo-wall/README.zh-Hans.md) | 散落倾斜的卡片，鼠标悬停时摆正并放大。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/photo-wall/index.html?lang=zh) |
| [可以用键盘操作的搜索建议](examples/visuals/search/README.zh-Hans.md) | 边输入边筛选建议，用方向键选择；使用无障碍的 combobox 标记。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/search/index.html?lang=zh) |
| [导航、步骤条与环形进度](examples/visuals/motion/README.zh-Hans.md) | 展开的导航（JS 补间与 CSS 过渡对比）、步骤条，以及用 `conic-gradient` 画的环形进度。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/motion/index.html?lang=zh) |
| [抽奖转盘](examples/visuals/lottery/README.zh-Hans.md) | 转盘停下的扇区和显示的结果始终一致，用 Web Animations API 实现。 | [在线演示](https://l-jovi.github.io/latte-web/examples/visuals/lottery/index.html?lang=zh) |
| [视觉实验](examples/visuals/README.zh-Hans.md) | 直接在浏览器里运行的 Canvas、CSS 和指针交互实验。 | — |
| [今天怎样测页面速度](examples/performance/README.zh-Hans.md) | 用 Navigation Timing、PerformanceObserver 和 Core Web Vitals 测量你自己的这次访问。 | [在线演示](https://l-jovi.github.io/latte-web/examples/performance/dist/index.html?lang=zh) |

### 历史笔记

早年留下的笔记，用来了解背景，不代表今天的推荐做法。

| 主题 | 你会看到什么 | 试一试 |
| --- | --- | --- |
| [2018 年的 React 架构笔记](docs/history/react/README.zh-Hans.md) | 原始的中文笔记：领域驱动的目录结构、saga 与路由。 | — |
| [老式 React 测试：TestUtils 与 Enzyme](docs/history/testing/README.zh-Hans.md) | 来自早年教程的浅渲染和 DOM 测试，留作与 Testing Library 对比。 | — |
| [2019 年怎样测页面速度](docs/history/performance/README.zh-Hans.md) | 当年怎样用 `performance.timing` 测速，以及为什么今天要换一种方式解读。 | — |

<!-- prettier-ignore-end -->
<!-- catalog:end -->

## 过去与现在

这里的很多示例写于 2018 到 2022 年之间，周边的工具此后变化很大。[生态是怎样变过来的](docs/ecosystem.zh-Hans.md)讲的就是这段经历：从回调到 `async`/`await`，从 script 标签到 Vite，从 Create React App 到今天的工具，以及为什么旧代码依然值得一读。

## 为什么叫 "latte"？

拿铁是一份浓缩、两份牛奶、一份奶泡：最常见的咖啡，也是几乎人人都爱喝的那一杯。在作者这组以咖啡命名的仓库里，Web 就是这样的角色：日常、普及、人人都爱的那一种调配。

系列里的其他仓库：[espresso-algorithm](https://github.com/L-Jovi/espresso-algorithm)（算法，纯粹的浓缩）、[roaster-linux](https://github.com/L-Jovi/roaster-linux)（Linux 工具，烘焙咖啡豆的地方）、[barista-services](https://github.com/L-Jovi/barista-services)（服务，咖啡师）和 cappuccino-ios（iOS 应用，比拿铁更轻；2026 年已退役）。

## 维护状态

这是 [@L-Jovi](https://github.com/L-Jovi) 维护的个人学习合集，不是产品：没有版本发布，也不发布 npm 包。**历史笔记**以外的每个示例，每次改动都会在 CI 里检查，包括类型检查、构建、单元测试、Promises/A+ 测试集，以及 Chromium、Firefox、WebKit 三种浏览器的测试。在线演示从 `main` 自动部署。[检查覆盖了什么，没覆盖什么](docs/verification.zh-Hans.md)。

仓库在 2026 年 9 月重新整理过。[迁移清单](docs/migration.zh-Hans.md)列出了每个旧路径的新位置。

## 参与贡献

欢迎提 issue 和 PR。请先读 [CONTRIBUTING.md](CONTRIBUTING.md)；安全问题请按 [SECURITY.md](SECURITY.md) 的方式私下报告。所有参与者都遵守[行为准则](CODE_OF_CONDUCT.md)。

## 许可

原创代码和文档使用 [MIT](LICENSE) 许可。少数目录保留了原来的许可或署名，见 [NOTICE.md](NOTICE.md)。
