# 生态是怎样变过来的

[English](ecosystem.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

这个仓库里的大多数示例写于 2018 到 2022 年之间，周边的工具此后变化很大。本页按主题讲这段经历：当时怎么做，痛在哪里，社区造了什么，今天用什么，以及旧代码还能教你什么。

日期指首个稳定版本或官方公告的时间。核对于 2026-09-28。

## 一览

| 主题          | 当时                                        | 现在                                                        | 在这里看                                                                                                                 |
| ------------- | ------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| 异步代码      | 回调、Promise 库                            | 原生 `Promise`、`async`/`await`                             | [从零实现 Promise](../mechanisms/promise/README.zh-Hans.md)                                                              |
| 打包          | script 标签、Grunt、Gulp、手写 webpack 配置 | 原生 ES 模块、Vite                                          | [手写打包器](../mechanisms/bundlers/README.zh-Hans.md)、[webpack 逐项拆解](../tooling/webpack/README.zh-Hans.md)         |
| 创建应用      | Create React App                            | Vite 或框架                                                 | [今天风格的 Todo](../examples/react-modern/README.zh-Hans.md)                                                            |
| 应用状态      | 手写 action 的 Redux、Saga、Immutable.js    | Redux Toolkit、RTK Query、Immer                             | [2018 版 Todo](../examples/react-classic/README.zh-Hans.md) ↔ [今天的 Todo](../examples/react-modern/README.zh-Hans.md)  |
| 组件          | class 与生命周期方法                        | 函数组件与 Hooks                                            | [React 风格的渲染器](../mechanisms/mini-react/README.zh-Hans.md)                                                         |
| 路由          | 把路由状态复制进 Redux                      | 由路由自己负责数据加载（React Router 7）                    | [手写前端路由](../mechanisms/router/README.zh-Hans.md)                                                                   |
| 测试          | Enzyme、浅渲染                              | Testing Library、Vitest、Playwright                         | [老式 React 测试](history/testing/README.zh-Hans.md)                                                                     |
| 富文本        | 手写 `contenteditable`、Draft.js            | Lexical 等编辑器框架                                        | [Draft.js](../examples/rich-text-draft/README.zh-Hans.md) ↔ [Lexical](../examples/rich-text-lexical/README.zh-Hans.md)   |
| 跨域读取数据  | JSONP                                       | CORS、`fetch`、`AbortController`                            | [JSONP 与 fetch 对照](../examples/network/README.zh-Hans.md)                                                             |
| 样式          | 用 Less、Sass 获得变量和嵌套                | 原生 CSS 变量、嵌套、`color-mix()`                          | [Less 与原生 CSS](../tooling/less/README.zh-Hans.md)                                                                     |
| 复制对象      | `JSON.parse(JSON.stringify(x))`、lodash     | `structuredClone`                                           | [浅拷贝与深拷贝](../mechanisms/utilities/clone/README.zh-Hans.md)                                                        |
| GraphQL 服务  | express-graphql、Apollo Server 2            | graphql-http、Apollo Server 5、graphql-ws                   | [从零搭 GraphQL 服务](../examples/graphql-http/README.zh-Hans.md)、[全栈 GraphQL](../examples/graphql/README.zh-Hans.md) |
| Web 上的 Rust | Rust 与 WebAssembly 工作组维护的工具        | 独立组织维护的 wasm-bindgen、wasm-pack                      | [Rust 到 WebAssembly](../examples/wasm/README.zh-Hans.md)                                                                |
| 页面速度      | `performance.timing`、自定义的“白屏时间”    | Navigation Timing 2、`PerformanceObserver`、Core Web Vitals | [2019 年](history/performance/README.zh-Hans.md) ↔ [今天](../examples/performance/README.zh-Hans.md)                     |

## 异步代码：回调 → Promise → `async`/`await`

**当时。** 异步操作写成回调。每一步都嵌套在上一步里面，而且每一步都得记得手动把错误传下去。

**痛在哪里。** 层层嵌套的代码，悄无声息消失的错误，以及被调用两次或者根本不被调用的回调。

**社区造了什么。** Q、Bluebird 等 Promise 库，以及一份社区规范 [Promises/A+](https://promisesaplus.com/)。它精确规定了 `then` 的行为，让不同的库可以互相配合。

**现在。** `Promise` 在 ES2015 成为 JavaScript 的一部分，`async`/`await` 随后在 ES2017 加入。应用代码应该直接用它们。

**旧代码还能教你什么。** 自己写一个 Promise，就会明白为什么回调总是异步执行、为什么一个 Promise 只能结算一次、一个 Promise 又是怎样接管另一个 Promise 的结果的。[从零实现 Promise](../mechanisms/promise/README.zh-Hans.md) 通过的，正是当年各个库用来证明合规的那 872 项测试。

## 打包：script 标签 → 任务运行器 → 打包器 → 原生模块

**当时。** 页面按精心排好的顺序加载一堆 `<script>` 标签。2010 年代初，Grunt、Gulp 这类任务运行器负责复制、合并和压缩这些文件。Browserify 和后来的 webpack 更进一步：读取 `require`/`import` 语句，建立依赖图。

**痛在哪里。** 巨大的配置文件，缓慢的重新构建，以及写代码之前必须先搭好的一整套工具链。

**社区造了什么。** ES 模块在 ES2015 标准化，到 2018 年所有主流浏览器都能原生加载。Vite（2020 年）在开发时直接使用原生模块，只在生产构建时打包。2026-03-12 发布的 Vite 8 改用单一的、用 Rust 编写的打包器 Rolldown。

**现在。** 小项目从 Vite 开始。webpack 5 依然被广泛使用，而且依然是观察 loader、chunk 和插件如何工作最清楚的地方。

**旧代码还能教你什么。** 所有打包器都在做同样的三件事：解析 import、建立依赖图、输出文件。[手写打包器](../mechanisms/bundlers/README.zh-Hans.md) 用大约 60 行做完了这三件事；[webpack 逐项拆解](../tooling/webpack/README.zh-Hans.md)、[Grunt](../tooling/grunt/README.zh-Hans.md) 和 [Gulp](../tooling/gulp-typescript/README.zh-Hans.md) 示例展示了这些工作过去是怎样配置出来的。

## 创建 React 应用：Create React App → Vite 与框架

**当时。** 从 2016 年起，Create React App（CRA）是创建 React 项目的标准方式：一条命令就能得到一套能用的配置。

**痛在哪里。** 配置被藏了起来。想改配置就得 eject，得到一大份 webpack 配置；CRA 本身也逐渐落后于更新、更快的工具。

**现在。** React 团队在 [2025-02-14 宣布停止维护 CRA](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)，推荐使用框架，或者 Vite 这样的构建工具。这里的 React 应用现在都运行在 Vite 上（webpack 示例有意保留 webpack），旧的 CRA 外壳已经退役。

**旧代码还能教你什么。** eject 出来的 CRA 配置是一份真实世界的 webpack 配置；webpack 示例把这些知识点拆成了更小的片段保留下来。

## 应用状态：手写 Redux → Redux Toolkit

**当时。** Redux（2015 年）让状态变化变得可预测：每次变化都是一个 action，由纯函数 reducer 处理。团队手写 action 类型、action creator 和 reducer，用 Redux-Saga 处理副作用，用 Immutable.js 避免误改数据。

**痛在哪里。** 每个功能都要写大量重复代码，学习曲线也很陡。

**现在。** [Redux Toolkit](https://redux.js.org/introduction/why-rtk-is-redux-today) 是官方推荐的 Redux 写法。`createSlice` 替你生成 action，Immer 让 reducer 写起来像直接修改数据，RTK Query 负责获取和缓存服务端数据。

**旧代码还能教你什么。** [2018 年风格的 Todo](../examples/react-classic/README.zh-Hans.md) 把 action、reducer、saga 和 Immutable.js 都摆在明处，你能清楚看到 Redux Toolkit 如今替你做了什么。[今天风格的版本](../examples/react-modern/README.zh-Hans.md)功能完全相同，两者通过同一组测试。

## 组件：class → Hooks

**当时。** 需要状态的组件都写成 class，配合 `componentDidMount` 等生命周期方法。

**痛在哪里。** 相关的逻辑被拆散在几个生命周期方法里，组件之间也不容易共享带状态的逻辑。

**现在。** Hooks 在 React 16.8（2019-02-06）推出。React 18（2022 年）会自动合并批量的状态更新，React 19（2024-12-05）移除了 `ReactDOM.render` 等早已弃用的 API。class 组件仍然能用，但新代码都用函数和 Hooks。

**旧代码还能教你什么。** [React 风格的渲染器](../mechanisms/mini-react/README.zh-Hans.md) 手写了 `createElement`、挂载和 `setState`，让你看清“渲染”和“更新”到底做了什么。

## 路由：路由状态放进 Redux → 由路由负责数据

**当时。** 应用会把当前 URL 复制进 Redux store（借助 react-router-redux 等库），好让所有状态都待在一个地方。

**痛在哪里。** 两份可能互相矛盾的“事实”，以及为了保持同步而多写的代码。

**现在。** URL 归路由管。[React Router 7](https://remix.run/blog/react-router-v7)（2024-11-22）还会为每个路由加载数据。

**旧代码还能教你什么。** 归根结底，每个前端路由都在监听 History API，并决定渲染什么。[手写前端路由](../mechanisms/router/README.zh-Hans.md) 用大约 70 行展示了这一点。

## 测试：Enzyme → Testing Library

**当时。** Enzyme 可以把组件“浅渲染”出来，再检查它内部的状态和结构。

**痛在哪里。** 只要实现一改，测试就坏，哪怕页面其实还能正常工作。Enzyme 的官方适配器只到 React 16。[React 19](https://react.dev/blog/2024/04/25/react-19-upgrade-guide) 移除了 `react-test-renderer/shallow`，并弃用了 `react-test-renderer`，React 团队给出的理由是它“鼓励测试实现细节”。

**现在。** Testing Library（2018 年）测试的是用户看到什么、做了什么。Vitest 负责单元测试，Playwright 驱动真实浏览器。

**旧代码还能教你什么。** [旧的测试用例](history/testing/README.zh-Hans.md)和现在的测试放在一起，两种思路的差别一目了然。

## 富文本：`contenteditable` → 编辑器框架

**当时。** 编辑器建立在 `contenteditable` 和 `document.execCommand` 之上，后者现已被弃用。Draft.js（Facebook，2016 年）在 React 之上加了一层结构化的编辑器状态。

**现在。** Meta 在 [2023-02-06 归档了 Draft.js](https://github.com/facebookarchive/draft-js)，继任者是 [Lexical](https://lexical.dev/)。Lexical、ProseMirror、TipTap 这类编辑器框架会替你处理选区、历史记录和格式。

**旧代码还能教你什么。** 所有编辑器都依赖浏览器的 Selection 和 Range API。[可编辑文本里的光标与选区](../mechanisms/selection/README.zh-Hans.md)直接演示了它们；[Draft.js](../examples/rich-text-draft/README.zh-Hans.md) 和 [Lexical](../examples/rich-text-lexical/README.zh-Hans.md) 两个示例则并排完成同一个任务。

## 跨域读取数据：JSONP → CORS 与 `fetch`

**当时。** 浏览器不允许脚本读取其他源的响应，但 `<script>` 标签可以从任何地方加载代码。JSONP 就利用了这个漏洞：服务器把数据包在一个函数调用里，页面预先定义好这个函数。

**痛在哪里。** JSONP 会把远程响应当作代码执行，拥有页面的全部权限；它只支持 GET，出错时也很难处理。

**现在。** [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS) 让服务器声明谁可以读取它的响应。`fetch`（2015 年）负责读取，`AbortController` 可以取消不再需要的请求。

**旧代码还能教你什么。** [JSONP 与 fetch 对照](../examples/network/README.zh-Hans.md)把信任上的差别摆在眼前：一种方式执行响应，另一种只是读取它。

## 样式：预处理器 → 原生 CSS

**当时。** CSS 没有变量，也不能嵌套，所以团队借助 Less、Sass 这类预处理器来获得这些能力。

**现在。** CSS 自定义属性（变量）已经普遍可用，原生嵌套从 2023 年起在所有主流浏览器中可用，`color-mix()` 等函数也覆盖了预处理器颜色函数的大部分用途。

**旧代码还能教你什么。** Less 变量在编译后就消失了，CSS 变量却一直存在，可以在运行时改变。[Less 与原生 CSS](../tooling/less/README.zh-Hans.md) 两者都有演示。

## 复制对象：JSON 技巧 → `structuredClone`

**当时。** 深拷贝常用 `JSON.parse(JSON.stringify(x))`，但它会丢掉日期、`Map`、`Set` 和循环引用；要么就用一个库。

**现在。** [`structuredClone`](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone) 从 2022 年起在所有主流浏览器中可用，Node.js 从 17 版起可用。

**旧代码还能教你什么。** 自己写深拷贝，就不得不处理共享引用和循环引用。[浅拷贝与深拷贝](../mechanisms/utilities/clone/README.zh-Hans.md)做了这件事，再把结果和 `structuredClone` 对比。

## GraphQL 服务：express-graphql → graphql-http 与 Apollo Server 5

**当时。** express-graphql 是通过 HTTP 提供 GraphQL 服务的参考实现。很多教程用的是 Apollo Server 2 和 subscriptions-transport-ws 协议。

**现在。** GraphQL 基金会[采纳 graphql-http](https://graphql.org/blog/2022-11-07-graphql-http/) 作为参考实现，express-graphql 于 2023 年归档。Apollo Server 4 在 2026-01-26 停止支持；[Apollo Server 5](https://www.apollographql.com/docs/apollo-server/migration) 要求 Node.js 20 或更高版本。实时更新使用 graphql-ws 协议。

**旧代码还能教你什么。** [从零搭 GraphQL 服务](../examples/graphql-http/README.zh-Hans.md)展示了最小的一次完整请求：schema、resolver 和 JSON 响应。[全栈示例](../examples/graphql/README.zh-Hans.md)在此基础上加入了登录、投票和实时更新。

## Web 上的 Rust：工作组的工具 → 社区维护者

**当时。** Rust 与 WebAssembly 工作组维护着主要工具，包括 wasm-bindgen 和 wasm-pack。

**现在。** 工作组[在 2025 年归档了它的 GitHub 组织](https://blog.rust-lang.org/inside-rust/2025/07/21/sunsetting-the-rustwasm-github-org)。wasm-bindgen 迁到了独立的组织并有了新的维护者，wasm-pack 交给了它的一位原始维护者。WebAssembly 本身从 2017 年起就能在所有主流浏览器中运行。

**旧代码还能教你什么。** [Rust 到 WebAssembly](../examples/wasm/README.zh-Hans.md) 跟着一个函数，从 Rust 源码走到 `.wasm` 文件，再走到一次按钮点击。

## 测量页面速度：`performance.timing` → Core Web Vitals

**当时。** 团队从 `performance.timing` 读取时间戳，再自己定义“白屏时间”“首屏时间”。

**现在。** Navigation Timing Level 2 和 `PerformanceObserver` 取代了 `performance.timing`，Core Web Vitals（2020 年）衡量访客的真实感受。2024-03-12 起，INP 取代 FID 成为衡量响应速度的指标。

**旧代码还能教你什么。** [2019 年怎样测页面速度](history/performance/README.zh-Hans.md)解释了为什么当年的数字不好用；[今天怎样测页面速度](../examples/performance/README.zh-Hans.md)用可运行的代码展示了现在的 API。

## 为什么还要保留旧代码？

工具每隔几年就会换一批，它们要解决的问题却变得慢得多。把旧写法和新写法放在一起读，能看清新工具替你做了什么；将来在现有项目里遇到旧写法时，也不至于陌生。如果某个依赖已经不再维护，示例会写明这一点，并配上一个当前的替代方案，详见各自的 README。
