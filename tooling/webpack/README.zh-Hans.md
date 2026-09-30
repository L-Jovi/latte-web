# webpack 逐项拆解

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

一组小构建，每个只改一处：入口、loader、source map、热更新、拆包、缓存等。可以按顺序读，也可以直接跳到你需要的那一项。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# 打开 http://127.0.0.1:4173/tooling/webpack/getting-started/dist/
```

构建会先打印 `Built getting-started`，接着其余十二个专题各打印一行，并把每个专题的产物写进它自己的 `dist/` 目录。想看别的专题，把地址里的 `getting-started` 换成对应的目录名。`library` 专题没有页面，它的 README 说明了怎样在 Node 里加载它。每个专题的 README 里也都有在线演示的链接。

## 原理

每个专题目录都有自己的 `webpack.config.cjs`。除了 `library`，它们都从 [base.cjs](base.cjs) 出发。这份共用配置设定了：

- `context` 指向专题目录，所以不管你在哪个目录下运行命令，`./src/index.js` 这样的路径含义都不变；
- 生产模式，产物会被压缩；
- 入口 `./src/index.js` 和输出 `dist/bundle.js`，并用 `output.clean` 在每次构建前清空 `dist/`；
- HtmlWebpackPlugin，它用 [scripts/site.cjs](../../scripts/site.cjs) 里的共用页面生成 `dist/index.html`：学习目录里的标题和摘要、站点顶栏，再填好 `<script>` 标签；
- 开发服务器地址 `127.0.0.1:4180`，同时开启模块热替换。

[build.cjs](build.cjs) 通过 webpack 的 Node API 逐个构建这些专题，遇到第一个错误就停下。

如果想用 webpack 的开发服务器代替构建好的文件，运行 `npm run dev -w @latte/webpack` 可以打开第一个专题；其他专题要指定它的配置，例如 `npm exec -w @latte/webpack -- webpack serve --config lazy-loading/webpack.config.cjs`。然后打开 http://127.0.0.1:4180/。开发服务器把构建结果放在内存里，不会改动 `dist/`；你保存文件后，它会更新页面。

| 专题                                                                        | 改了什么                               |
| --------------------------------------------------------------------------- | -------------------------------------- |
| [第一个 webpack 构建](getting-started/README.zh-Hans.md)                    | 什么都没改，原样使用共用配置           |
| [加载 CSS、图片和数据文件](asset-management/README.zh-Hans.md)              | 处理 CSS、SVG 和 XML 文件的规则        |
| [多个入口](output-management/README.zh-Hans.md)                             | 两个入口，各输出一个文件               |
| [用 source map 调试](development/README.zh-Hans.md)                         | 开发模式和内联 source map              |
| [模块热替换（HMR）](hot-module-replacement/README.zh-Hans.md)               | 在开发服务器运行时接收更新的代码       |
| [用 import() 按需加载](lazy-loading/README.zh-Hans.md)                      | 第一次点击时才加载的模块               |
| [多入口共享代码](code-splitting/README.zh-Hans.md)                          | `dependOn` 和一个共用的运行时文件      |
| [用内容哈希做长期缓存](caching/README.zh-Hans.md)                           | 文件名里的 `[contenthash]`             |
| [开发构建与生产构建](production/README.zh-Hans.md)                          | 另一份专供开发用的配置文件             |
| [Tree shaking：去掉没用到的导出](tree-shaking/README.zh-Hans.md)            | `usedExports`                          |
| [为旧式全局代码做适配（shimming）](shimming/README.zh-Hans.md)              | `ProvidePlugin`                        |
| [编写 webpack 插件](plugins/README.zh-Hans.md)                              | 一个生成 `FILELIST.md` 的插件          |
| [用 webpack 打包一个库](library/README.zh-Hans.md)                          | `output.library` 和 `target: 'node'`   |

## 过去与现在

在打包器出现之前，页面要按精心排好的顺序加载一堆 `<script>` 标签，[Grunt](../grunt/README.zh-Hans.md)、[Gulp](../gulp-typescript/README.zh-Hans.md) 这类任务运行器负责复制、合并和压缩这些文件。webpack 则读取 `import` 语句，据此建立依赖图。截至 2026-09，新的小项目建议从 Vite 开始；webpack 5 依然被广泛使用，也依然是观察 loader、chunk 和插件如何工作最清楚的地方。更完整的经过见[生态是怎样变过来的](../../docs/ecosystem.zh-Hans.md)；[手写打包器（两种写法）](../../mechanisms/bundlers/README.zh-Hans.md)则亲手完成了同样的基本工作。

这些专题最初的版本就已经在用 webpack 5，但有些活儿要靠额外的包来干，而现在 webpack 自己就能完成，比如用 `file-loader` 处理图片、用 `clean-webpack-plugin` 清空 `dist/`。如今它们改用资源模块（asset modules）和 `output.clean`。

## 刻意省略

- 每个专题只改一两处设置，所以没有哪一个能直接当作真实项目的完整配置。
- 只有 source map 和模块热替换两个专题用开发模式构建，其余都沿用 `base.cjs` 里的生产模式。
- 开发服务器一次只运行一个专题，端口是 4180。
- 在线演示展示的是构建好的结果。需要开发服务器的功能，比如模块热替换，只能在你自己的电脑上看到。
- `dist/` 目录不提交到仓库，由构建生成。

## 验证与来源

- `npm run check` 会跑一遍所有构建，再运行 `npm run test:tooling`：它用 `require` 加载打包好的库，并读取插件生成的 `FILELIST.md`。
- `npm run test:browser` 在 Chromium、Firefox、WebKit 中打开每个专题的页面，只要出现脚本错误或有文件加载失败就会报错；对按需加载专题，它还会点击按钮。测试打开的是构建好的页面，所以要先构建；第一次运行前，先用 `npx playwright install chromium firefox webkit` 安装浏览器。
- 大多数专题都对应 webpack 官方的同名[指南](https://webpack.js.org/guides/)；[webpack 概念](https://webpack.js.org/concepts/)解释了其中的术语。[迁移清单](../../docs/migration.zh-Hans.md)链接到各专题最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
