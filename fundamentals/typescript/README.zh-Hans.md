# TypeScript：给 action 和 reducer 加类型

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

用可辨识联合类型，让编译器知道 reducer 的每个分支处理的是哪种 action。每个 action 都是一个对象，它的 `type` 字段是一个固定的字符串，所以 action 类型写错了，代码就编译不过。

## 试一试

```sh
npm ci
npm run build -w @latte/typescript
```

这里没有页面可以打开，产出的是文件。编译器把普通的 JavaScript 写到 `fundamentals/typescript/dist/`：每个源文件对应一个 `.js` 文件和一个 `.d.ts` 文件（后者是类型声明，供其他 TypeScript 代码使用）。对照 [reducers/index.ts](reducers/index.ts) 和 `dist/reducers/index.js`：代码一样，只是类型没了。

想看编译器怎么抓错，就把 `reducers/index.ts` 某个 `case` 里的 `'INCREMENT_ENTHUSIASM'` 改成 `'INCREMENT_ENTHUSIASMM'`，再构建一次。这次构建会失败，报错 TS2678，因为这个字符串不是两种 action 类型之一。

## 原理

“可辨识联合类型”（discriminated union）是这样一种类型：它可以是几种对象形状之一，靠它们共有的某一个字段来区分。按下面的顺序读：

1. [types/narrowing.ts](types/narrowing.ts)（4 行）单独演示这个思路。`Result<T>` 要么是 `{ ok: true; value: T }`，要么是 `{ ok: false; message: string }`。`explain` 检查了 `result.ok` 之后，TypeScript 就知道手上是哪一种：只允许在成功的一侧读 `result.value`，只允许在出错的一侧读 `result.message`。像这样通过一次检查得知确切的类型，叫作“类型收窄”（narrowing）。
2. [constants/index.ts](constants/index.ts)（2 行）存放两个 action 类型字符串。
3. [actions/index.ts](actions/index.ts)（10 行）用它们组成 `EnthusiasmAction`：要么是 `{ type: 'INCREMENT_ENTHUSIASM' }`，要么是 `{ type: 'DECREMENT_ENTHUSIASM' }`。它还为每种 action 提供一个创建它的函数。
4. [reducers/index.ts](reducers/index.ts)（18 行）是 reducer：一个接收当前状态和一个 action、返回下一份状态的函数。它从 `{ languageName: 'TypeScript', enthusiasmLevel: 1 }` 开始，这个形状由 [types/index.ts](types/index.ts) 描述。遇到增加就加 1；遇到减少则用 `Math.max(1, …)`，保证数值不会低于 1。

因为 `action.type` 只可能是两个字符串之一，所以写了其他字符串的 `case` 会报错，用未知的 action 类型调用 reducer 也会报错。

## 过去与现在

这段代码来自一个用 TypeScript 写的 Create React App 项目。这里只保留了其中带类型的 action 和 reducer，场景也和原来一样：调高、调低一个“热情值”（enthusiasm level）；外面那一套重复的 Create React App 配置已被移除。React 团队已于 [2025-02-14 弃用 Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)。

那个年代的 Redux 代码就是这样写的：action 类型常量、action creator 和 reducer，全部手写。截至 2026-09，[Redux Toolkit 是官方推荐的 Redux 写法](https://redux.js.org/introduction/why-rtk-is-redux-today)，它的 `createSlice` 会替你生成 action creator 和 action 类型。读一读手写的版本，就能明白它替你生成了什么。[今天风格的 Todo 应用](../../examples/react-modern/README.zh-Hans.md)就是用 TypeScript 配合 `createSlice` 写的。

## 刻意省略

- TypeScript 只在编译时检查类型。JavaScript 写的调用方，或者程序运行时才拿到的数据（比如服务器返回的 JSON），仍然可能传进任意形状的 action，所以这类输入需要另外校验。
- reducer 的 `default` 分支原样返回状态。如果给 `EnthusiasmAction` 加上第三种 action 类型却不写对应的 `case`，编译器不会报错。
- 没有 store，没有界面，也没有页面：只有类型、action 和 reducer。这是一个小示例，不适合作为真实项目的起点。
- 构建成功只说明类型能对得上，不代表逻辑正确。reducer 的实际行为由另一个测试检查（见下文）。

## 验证与来源

- `npm run typecheck` 在每个工作区（包括这一个）中运行 `tsc --noEmit`，并开启 `strict` 模式。
- 构建之后，`npm run test:tooling` 加载 `dist/reducers/index.js`，检查从初始状态减少一次后数值仍然是 1，再增加一次后变成 2。
- `npm run check` 会连同仓库的其他检查一起运行这两项。`dist/` 不提交到仓库，由构建生成。
- [迁移清单](../../docs/migration.zh-Hans.md)链接到原始版本，位于 `typescript` 目录。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
