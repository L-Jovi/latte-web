# 2018 年的 React 架构笔记

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

原始的中文笔记：领域驱动的目录结构、saga 与路由。它们讲的是本仓库那个 React + Redux Todo 应用当年是怎么组织的，保留下来供阅读，并不是今天的建议。

## 试一试

不需要安装或运行任何东西。可以在 GitHub 上读这些笔记（Markdown 和截图都能正常显示），也可以用任何 Markdown 阅读器打开。推荐按这个顺序读：

1. [notes/Domain-driven-design.md](notes/Domain-driven-design.md)（28 行）：为什么要把业务逻辑从视图和 action 里挪出去，放进独立的 service。
2. [notes/structure.md](notes/structure.md)（73 行）：目录结构，以及三处额外的处理：把 action 分成两类、用 redux-saga 处理复杂的异步流程、用 Immutable.js 让比较变得廉价。
3. [notes/routes.md](notes/routes.md)（16 行）：借助 react-router-redux，把路由的位置信息保存在 Immutable.js 的 store 里。
4. [notes/optimize-scene.md](notes/optimize-scene.md)（71 行）：用 Reselect 缓存 selector 的计算结果，为什么选 axios 而不用 `fetch`，以及一个在每个 action 之前运行的中间件。

这些笔记写于 2018 年 5 月到 6 月。最后一次改动是在 2019-11-15（提交 `2c6aeb0`），只是把它们移到了新的目录。

## 原理

笔记描述的是一个 React + Redux 应用的设计。这个应用修好后保留了下来，就是 [2018 年风格的 Todo 应用](../../../examples/react-classic/README.zh-Hans.md)。概括起来：

- **视图和 action 都要薄。** 笔记认为，在普通的 React + Redux 里，视图承担得太多：既要派发 action，又要读取 state；而 action 最后几乎包揽了所有异步和数据转换的逻辑。所以 action 被分成两类：只告诉 reducer 要改什么的“纯 action”（pure action），以及交给中间件处理的、带副作用的 action。
- **每个业务领域一个 service。** 业务逻辑挪进独立的 `services` 模块，每个业务领域一个。这借用了领域驱动设计里的“限界上下文”（bounded context）：每个领域都有清晰的边界。
- **用 saga 处理副作用。** 发请求、防抖，以及让超时和响应“赛跑”，都放在 redux-saga 里运行。redux-saga 是一个 Redux 中间件，每个流程都写成一个 generator 函数。笔记把它和 RxJS 做了比较，最后选了 redux-saga。
- **不可变的状态。** state 保存在 Immutable.js 的数据结构里。每次修改都会产生一个新对象，所以 `shouldComponentUpdate` 可以直接比较引用，不必逐层遍历深层对象。
- **路由和 selector。** 借助 react-router-redux，路由的位置信息被复制进 store；Reselect 缓存从 state 算出来的值，直到输入发生变化。

## 过去与现在

这些选择大多已经被取代：

| 笔记里的做法（2018 年）                      | 截至 2026-09                                                                                                                                                       |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 手写 action、reducer 和 saga                 | [Redux Toolkit](https://redux.js.org/introduction/why-rtk-is-redux-today) 是官方推荐的 Redux 写法：`createSlice` 替你写 action，RTK Query 负责获取和缓存服务端数据 |
| 用 Immutable.js，让每次修改都产生新对象      | Redux Toolkit 内置的 Immer：reducer 写起来像直接修改，得到的仍然是新对象                                                                                           |
| 用 react-router-redux 把路由状态复制进 Redux | URL 归路由管；[React Router 7](https://remix.run/blog/react-router-v7)（2024-11-22）还会为每个路由加载数据                                                         |
| 选 axios，因为 `fetch` 没法取消              | 用 `AbortController` 取消 `fetch` 请求；超时仍然需要调用方自己定规则                                                                                               |
| class 组件里的 `shouldComponentUpdate`       | 函数组件与 Hooks，从 [React 16.8（2019-02-06）](https://legacy.reactjs.org/blog/2019/02/06/react-v16.8.0.html)起可用                                               |

仓库里能运行的应用已经跟上了这些变化。[2018 年风格的 Todo 应用](../../../examples/react-classic/README.zh-Hans.md)保留了 class、saga 和 Immutable.js，但去掉了 react-router-redux、已弃用的生命周期方法，以及那个在每个 action 之前运行的中间件。[今天风格的 Todo 应用](../../../examples/react-modern/README.zh-Hans.md)用的是 Hooks 和 Redux Toolkit。更完整的经过见[生态是怎样变过来的](../../ecosystem.zh-Hans.md)。

## 刻意省略

- 这些是当年的论述，不是测量结果。其中没有任何内容代表今天的性能结论或框架推荐。
- 正文保持原样，只改了三处：每篇笔记开头加了一段简短的说明（2026 年加入；optimize-scene.md 还多了一条关于取消 `fetch` 的更正）；指向演示应用的链接改为指向基线提交；去掉了一个图片链接里多余的制表符。
- 原来的目录里还有一份 Create React App 手册的副本，这里没有保留。

## 验证与来源

- 这里的内容不运行，也不测试，但取代这套设计的应用有测试。`npm run test:apps` 运行当前的组件和渲染器测试，其中包括在两个 Todo 应用上跑同样的步骤。执行 `npm run build` 之后，`npm run test:browser` 在 Chromium、Firefox、WebKit 中运行这两个应用。
- 这些笔记是原创内容，使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。[迁移清单](../../migration.zh-Hans.md)链接到确切的原始版本，位于 `react/react-practice/docs`。
