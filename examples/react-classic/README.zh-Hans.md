# 2018 年风格的 Todo：class、Redux、Saga、Immutable

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

原来的架构，修好后运行在 React 19 上。它和[今天风格的版本](../react-modern/README.zh-Hans.md)功能完全相同，可以逐个文件对照着读。

## 试一试

```sh
npm ci
npm run build -w @latte/react-classic
npm run dev
# 打开 http://127.0.0.1:4173/examples/react-classic/dist/
```

列表一开始只有一条待办：**Use Redux**。可以试试这些：

- 新增、编辑、勾选和删除待办。编辑时把文字清空再保存，这一条就会被删掉。
- 用 **All**、**Active**、**Completed** 筛选，或者点 **Toggle all**（全部切换）和 **Clear completed**（清除已完成）。
- **Import examples** 从本地的 `todos.json` 读入两条虚构的标题，并显示 `Imported 2 todos`。如果读取失败，页面会显示 `Import failed. Try again.`，再点一次即可重试。
- **About** 打开第二个页面，浏览器的后退、前进按钮可以在两个页面之间切换。

什么都不会保存：刷新页面就从头开始。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/examples/react-classic/dist/index.html)。

## 原理

每一次修改都经过 Redux：组件派发一个 _action_（一个说明“发生了什么”的普通对象），_reducer_（一个函数）根据它返回下一份状态，用到这份状态的组件随之重新渲染。按下面的顺序读：

1. [src/actions.js](src/actions.js)（11 行）用 redux-actions 的 `createAction` 为每种操作生成一个 action creator。
2. [src/reducer.js](src/reducer.js)（97 行）在一个 `switch` 里处理各种 action。状态是一个 Immutable.js 的 `Map`，里面装着待办组成的 `List`，所以每次更新都返回一个新对象，而不是修改旧对象。
3. [src/sagas.js](src/sagas.js)（21 行）负责导入。_saga_ 是一个 generator 函数，一步一步地描述副作用：先宣布开始，再用 `call` 调用读取文件的函数，最后用 `put` 把标题或错误送进 store。导入进行期间，`takeLeading` 会忽略新的导入请求。文件内容必须是字符串列表，否则导入失败。
4. [src/store.js](src/store.js)（10 行）创建 store，并挂上 saga 中间件。
5. [src/App.jsx](src/App.jsx)（101 行）和 [src/TodoItem.jsx](src/TodoItem.jsx)（46 行）是 class 组件。`connect` 把当前可见的待办、筛选条件、状态和错误信息，以及各个 action creator 作为 props 交给页面组件，页面组件再把每条待办和 action creator 交给 `TodoItem`。还在输入中的文字放在组件自己的 `state` 里，不进 store。

导入的标题会分配新的 ID，不会和你自己添加的待办冲突。路由用的是 `HashRouter`：页面名放在 `#` 后面，比如 `#/about`，所以任何普通的静态服务器都能提供这两个页面。

## 过去与现在

在 2018 年，这是组织 React 应用的常见方式。Redux（2015）让每一次修改都变成一个由纯函数 reducer 处理的 action。大家手写 action 和 reducer，用 Redux-Saga 处理副作用，再用 Immutable.js 防止不小心改动状态。这个应用的原始版本还用了 React 后来弃用的生命周期方法，把路由状态复制进 Redux，并通过一个中间件为每个 action 额外发出一份 `BEFORE_` 副本。修好的版本去掉了这些，其余都保留。React 19 仍然支持 class 组件。

截至 2026-09，[Redux Toolkit 是官方推荐的 Redux 写法](https://redux.js.org/introduction/why-rtk-is-redux-today)，新组件则写成使用 Hooks 的函数；Hooks 从 [React 16.8（2019-02-06）](https://legacy.reactjs.org/blog/2019/02/06/react-v16.8.0.html)起成为稳定功能。Redux 现在把 `createStore` 标为弃用，推荐改用 Redux Toolkit 的 `configureStore`；`store.js` 用的是同一个函数的另一个名字 `legacy_createStore`，这样就不会显示弃用警告。

两个版本对照：

| 工作         | 2018 年风格（本目录）                                        | 今天的风格（[react-modern](../react-modern/README.zh-Hans.md)）          |
| ------------ | ------------------------------------------------------------ | ------------------------------------------------------------------------ |
| 组件         | class，通过 `connect` 连接 store                             | 函数，使用 `useAppSelector` 和 `useAppDispatch` 这两个 Hook              |
| action       | 在 `actions.js` 里用 `createAction` 手写                     | 由 `store.ts` 里的 `createSlice` 自动生成                                |
| 更新状态     | `reducer.js` 里的 `switch`，返回新的 Immutable.js `Map` 和 `List` | slice 里的 reducer 直接修改草稿，由 Immer 生成新对象                   |
| 导入示例     | `sagas.js` 里的 saga（`call`、`put`、`takeLeading`）         | `store.ts` 里的 RTK Query 接口，用 `useLazyExamplesQuery` 触发           |
| 加载与出错   | reducer 里分别处理开始、结果和失败                           | 由 RTK Query 记录（`isFetching`、`isError`）                             |
| 创建 store   | `store.js` 里的 `legacy_createStore` 加 saga 中间件          | `store.ts` 里的 `configureStore`                                         |
| 语言         | JavaScript                                                   | TypeScript，开启 `strict` 模式                                           |

更完整的经过见[生态是怎样变过来的](../../docs/ecosystem.zh-Hans.md)。

## 刻意省略

- 和今天风格的版本一样只是个小场景：不保存数据，没有账户，也没有服务器。
- 原来的应用还把一个 Draft.js 编辑器放在 store 里。这部分现在是单独的示例：[用 Draft.js 做富文本](../rich-text-draft/README.zh-Hans.md)。
- 原来有一个递归绑定 action creator 的辅助函数，还有那个 `BEFORE_` 中间件，这么小的应用用不上它们。想读原来的代码，可以从[迁移清单](../../docs/migration.zh-Hans.md)里的链接找到。

## 验证与来源

- `npm run test:apps` 用 Testing Library 渲染两个版本，并对每个版本执行同样的步骤：新增、勾选、筛选、编辑和删除。
- 构建之后，`npm run test:browser` 在 Chromium、Firefox、WebKit 中对两个版本运行一个更长的场景：上面这些步骤，再加上 **Clear completed**、导入、带后退和前进的 About 页面，以及一次先报错、重试后成功的导入。
- [2018 年的 React 架构笔记](../../docs/history/react/README.zh-Hans.md)讲了原始应用是怎样组织的。这些笔记只供阅读，不会运行。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
