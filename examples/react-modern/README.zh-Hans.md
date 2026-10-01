# 今天风格的 Todo：Hooks、TypeScript、Redux Toolkit

[English](README.md) | 简体中文

> 对应英文版：2026-10-01。英文版更新后本页可能滞后。

功能和 [2018 版](../react-classic/README.zh-Hans.md)完全相同，方便两边对照阅读。

## 试一试

```sh
npm ci
npm run build -w @latte/react-modern
npm run dev
# 打开 http://127.0.0.1:4173/examples/react-modern/dist/?lang=zh
```

你看到的应该和 2018 版一模一样：一条**使用 Redux** 待办，同样的按钮和筛选，点**导入示例**后显示 `已导入 2 条待办`，读取失败时显示同样的 `导入失败，请重试。`，还有一个支持后退、前进的**关于**页面。只有副标题和关于页的文字写出了各自的做法。什么都不会保存：刷新页面就从头开始。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/examples/react-modern/dist/index.html?lang=zh)。

## 原理

所有状态相关的代码都在 [src/store.ts](src/store.ts)（101 行）里：

- `createSlice` 定义待办的状态，为每种操作写一个 reducer，并自动生成对应的 action。状态由可以转成 JSON 的普通对象组成。reducer 看起来像是在原地修改状态，比如 `todo.completed = !todo.completed`；Redux Toolkit 内置的 Immer 会把这些修改变成一个新的状态对象。
- RTK Query 的 `createApi` 把导入描述成一个查询接口。请求是否在加载、是否失败都由 RTK Query 记录，不必为这些状态手写 action 或 reducer。这个接口还会检查文件内容是不是字符串列表。
- `configureStore` 把 slice 和 RTK Query 的 reducer 合在一起，并加上 RTK Query 的中间件。

[src/App.tsx](src/App.tsx)（195 行）里只有函数组件。`useState` 保存还在输入中的文字。`useAppSelector` 和 `useAppDispatch` 是加上了本应用 TypeScript 类型的 React Redux Hook。点**导入示例**会发起查询，再把标题作为新的待办复制进 slice，并分配新的 ID。你编辑的是这些副本，读取回来的响应本身从不被修改。

路由和 2018 版一样用 `HashRouter`，所以任何普通的静态服务器都能提供这两个页面。

## 过去与现在

在 Redux Toolkit 出现之前，每个功能都要手写 action 类型、action creator 和 reducer，还常常搭配 Redux-Saga 和 Immutable.js，就像 2018 版那样。截至 2026-09，Redux 文档称 Redux Toolkit 是他们[官方推荐的写法](https://redux.js.org/introduction/why-rtk-is-redux-today)，[迁移指南](https://redux.js.org/usage/migrating-to-modern-redux)还特别推荐用 RTK Query 获取数据。Saga 仍然适合步骤很多的长流程；像这样一次小小的读取，用 RTK Query 就不必手写请求相关的代码。

原来的 TypeScript 练习项目用的是 Create React App，React 团队已于 [2025-02-14 弃用它](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)。这个版本改用 Vite 构建。

两个版本对照：

| 工作       | 2018 年风格（[react-classic](../react-classic/README.zh-Hans.md)） | 今天的风格（本目录）                                           |
| ---------- | ------------------------------------------------------------------ | -------------------------------------------------------------- |
| 组件       | class，通过 `connect` 连接 store                                   | 函数，使用 `useAppSelector` 和 `useAppDispatch` 这两个 Hook    |
| action     | 在 `actions.js` 里用 `createAction` 手写                           | 由 `store.ts` 里的 `createSlice` 自动生成                      |
| 更新状态   | `reducer.js` 里的 `switch`，返回新的 Immutable.js `Map` 和 `List`  | slice 里的 reducer 直接修改草稿，由 Immer 生成新对象           |
| 导入示例   | `sagas.js` 里的 saga（`call`、`put`、`takeLeading`）               | `store.ts` 里的 RTK Query 接口，用 `useLazyExamplesQuery` 触发 |
| 加载与出错 | reducer 里分别处理开始、结果和失败                                 | 由 RTK Query 记录（`isFetching`、`isError`）                   |
| 创建 store | `store.js` 里的 `legacy_createStore` 加 saga 中间件                | `store.ts` 里的 `configureStore`                               |
| 语言       | JavaScript                                                         | TypeScript，开启 `strict` 模式                                 |

更完整的经过见[生态是怎样变过来的](../../docs/ecosystem.zh-Hans.md)。

## 刻意省略

- 和 2018 版一样只是个小场景：不保存数据，没有账户，也没有服务器。
- 这里只演示一次简短的请求，没有多个步骤的长流程，而那正是 Saga 仍有用武之地的地方。

## 验证与来源

- `npm run test:apps` 用 Testing Library 渲染两个版本，并对每个版本执行同样的步骤：新增、勾选、筛选、编辑和删除。
- 构建之后，`npm run test:browser` 在 Chromium、Firefox、WebKit 中对两个版本运行一个更长的场景：上面这些步骤，再加上 **Clear completed**、导入、带后退和前进的 About 页面，以及一次先报错、重试后成功的导入。
- `npm run typecheck -w @latte/react-modern` 以 `strict` 模式运行 TypeScript 编译器。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
