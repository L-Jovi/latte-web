# 一个组件库，三种构建方式

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

同一组 `Card` 和 `Button`，分别用 Vite、webpack 和 Babel 构建，并实际加载每种产物。把三种结果放在一起，就能看出每个构建工具对同一份源码做了什么。

## 试一试

```sh
npm ci
npm run build -w @latte/components
npm run dev
# 打开 http://127.0.0.1:4173/examples/components/dist/demo/?lang=zh
```

页面上会出现一张卡片，里面有一个**计数：0** 按钮，每点一次加一。`dist/consumer/consumer.html` 这个页面改为加载 Babel 的产物，在同样的卡片里显示一个 **Babel 包已加载**按钮。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/examples/components/dist/demo/index.html?lang=zh)和 [Babel 产物的在线页面](https://l-jovi.github.io/latte-web/examples/components/dist/consumer/consumer.html?lang=zh)。

想浏览那两条 Storybook 故事，运行 `npm run storybook -w @latte/components`，然后打开 http://127.0.0.1:6006。

## 原理

组件本身故意写得很小。[src/Card.jsx](src/Card.jsx) 把子元素包进一个 `div`，样式来自 [src/card.css](src/card.css)。[src/Button.jsx](src/Button.jsx) 显示 `message`，其余属性（比如 `onClick`）原样交给原生的 `<button>`。[src/index.js](src/index.js) 导出这两个组件。

[build.mjs](build.mjs)（44 行）依次运行各个工具，每个工具在 `dist/` 下写出自己的目录：

| 目录             | 工具与配置                                                    | 产物                                                                                |
| ---------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `dist/demo/`     | Vite，[vite.config.js](vite.config.js)                        | 计数器页面，按应用打包                                                              |
| `dist/vite/`     | Vite 库模式，[vite.library.config.js](vite.library.config.js) | `index.js`（ES 模块）、`index.cjs`（CommonJS），以及单独的 `components.css`         |
| `dist/webpack/`  | webpack，[webpack.config.cjs](webpack.config.cjs)             | `index.cjs`，CSS 打进了 JavaScript，代码在浏览器里运行时才插入页面                  |
| `dist/babel/`    | Babel，[babel.config.cjs](babel.config.cjs)                   | 每个源文件对应一个输出文件：JSX 变成普通 JavaScript，`import './card.css'` 保持原样 |
| `dist/consumer/` | Vite，[vite.consumer.config.js](vite.consumer.config.js)      | 一个导入 `dist/babel/` 的页面                                                       |

有两个细节值得注意：

- 库的构建不包含 React。React 被设为*外部依赖*（external），由使用这个库的应用自己提供。
- Babel 只改写文件，不做打包。它的产物里仍然导入了一个 CSS 文件，所以只能交给能处理 CSS 导入的工具（比如 Vite）来用，消费页面演示的正是这一点。`build.mjs` 还会把导入路径里的 `.jsx` 改成 `.js`，并把 `card.css` 复制到产物旁边。

构建的最后一步会生成静态的 Storybook。[src/Components.stories.jsx](src/Components.stories.jsx) 里有它的两条故事。Storybook 是一个逐个试用组件的展示工具，它渲染的就是这两个组件本身，而不是另写的一份。

## 过去与现在

在原来的仓库里，这些组件分散在好几个项目中：`Card` 在一个 Create React App 脚手架里，`Button` 在单独的 Storybook 和 webpack 脚手架里，另外还有重复的副本。现在所有构建都来自同一个源码目录。

React 团队已于 [2025-02-14 弃用 Create React App](https://react.dev/blog/2025/02/14/sunsetting-create-react-app)，推荐改用框架或 Vite 这类构建工具。Vite 8 用 Rolldown 打包，所以打包器的设置写在 `rolldownOptions` 下，这里有两个配置文件就是这样写的。截至 2026-09，webpack 5 仍被广泛使用，也仍是观察 loader 怎样工作的最清楚的地方；[webpack 逐项拆解](../../tooling/webpack/README.zh-Hans.md)会一个一个地讲。更完整的经过见[生态是怎样变过来的](../../docs/ecosystem.zh-Hans.md)。

## 刻意省略

- 只有两个组件和一个 CSS 文件，没有主题，也没有类型声明。
- 不发布任何东西：`package.json` 标记为私有，构建产物在你自己的机器上生成，不提交到仓库。
- 它演示的是打包怎样工作，不是真实组件库的起步模板。构建工具负责组织文件，并不能保证组件写得对。

## 验证与来源

- `npm run test:tooling` 用 `require` 加载 Vite 和 webpack 的 CommonJS 产物，再用 React 的服务端渲染把 `Card` 和 `Button` 渲染成 HTML。
- 构建之后，`npm run test:browser` 在 Chromium、Firefox、WebKit 中点击演示页的计数器，加载 Babel 页面并确认它没有报错，还会打开 Storybook 的 **In Card** 故事。浏览器装一次即可：`npx playwright install chromium firefox webkit`。
- `npm run check` 会把这些检查和其他所有构建、测试一起运行。
- 原来的几个项目记录在[迁移清单](../../docs/migration.zh-Hans.md)里。原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
