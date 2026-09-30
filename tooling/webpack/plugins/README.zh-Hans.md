# 编写 webpack 插件

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

一个接入构建流程、输出全部产物清单的插件。插件（plugin）在构建的固定时刻介入，可以处理整个构建；相比之下，loader 一次只转换一个文件。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# 打开 http://127.0.0.1:4173/tooling/webpack/plugins/dist/
```

页面上显示 **Hello Webpack**。插件还在旁边的 `dist/` 里写了一个 `FILELIST.md`，也可以通过 http://127.0.0.1:4173/tooling/webpack/plugins/dist/FILELIST.md 打开：

```markdown
# Emitted files

- bundle.js
- bundle.js.LICENSE.txt
- index.html
```

也可以直接打开这个页面的[在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/plugins/dist/index.html)。

## 原理

[plugins/file-list-plugin.cjs](plugins/file-list-plugin.cjs)（25 行）是一个带 `apply(compiler)` 方法的类。webpack 会调用一次 `apply`，插件借这个机会挂上钩子（tap hooks），也就是把函数交给 webpack，让它在特定时刻调用：

1. `compiler.hooks.thisCompilation` 在 webpack 开始一次编译（compilation）时触发；compilation 这个对象保存着本次构建的模块和输出文件。
2. 在这次编译上，`processAssets` 在 webpack 准备输出文件的过程中按阶段触发。插件选的是最后一个阶段 `PROCESS_ASSETS_STAGE_REPORT`，专门用来生成报告。到这时其他文件都已经生成了，包括压缩工具从 `bundle.js` 里挪出来的 `bundle.js.LICENSE.txt`。
3. 插件把文件名排好序，写成一个 Markdown 列表，再用 `compilation.emitAsset('FILELIST.md', new sources.RawSource(...))` 加进输出。`RawSource` 把一个普通字符串包装成文件内容。

`FILELIST.md` 不会列出自己，因为它是在清单生成之后才加进去的。[webpack.config.cjs](webpack.config.cjs)（4 行）把这个插件加到[共用配置](../base.cjs)里。插件和 loader 都是在 webpack 构建时运行于 Node 中，这些代码一行也不会进入浏览器。

## 过去与现在

最初的版本在编译器的 `emit` 钩子里直接往 `compilation.assets` 写入文件。webpack 5 的文档明确提醒不要在 `emit` 里添加文件：它在所有处理阶段之后才运行，后面再没有任何步骤能看到这个文件（见 [compilation 钩子](https://webpack.js.org/api/compilation-hooks/#processassets)）。现在的[官方示例](https://webpack.js.org/contribute/writing-a-plugin/)和这个版本一样使用 `processAssets` 和 `emitAsset`，不过用的是更早的 `PROCESS_ASSETS_STAGE_SUMMARIZE` 阶段。

原来的仓库里还有一份没写完的 webpack 编译器钩子草稿，基于 Tapable 编写；Tapable 正是 webpack 钩子背后的库。这个能实际运行的插件取代了那份草稿。

## 刻意省略

- 输出的文件名是固定的；最初的版本可以通过 `filename` 选项修改。
- 每类钩子只用了一个；webpack 还有[很多别的钩子](https://webpack.js.org/api/compiler-hooks/)。
- 这里没有写 loader，也就是扩展 webpack 的另一种方式。

## 验证与来源

- `npm run test:tooling` 读取 `dist/FILELIST.md`，检查其中列出了 `bundle.js` 和 `index.html`；`npm run check` 会先构建，再运行它。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开页面，只要出现脚本错误或有文件加载失败就会报错。
- 插件的写法参照 webpack 官方页面 [Writing a Plugin](https://webpack.js.org/contribute/writing-a-plugin/)。最初插件里的注释指向[这篇知乎文章](https://zhuanlan.zhihu.com/p/102917655)，钩子草稿则指向[这篇 aotu.io 上的文章](https://aotu.io/notes/2020/07/17/webpack-analize/index.html)。[迁移清单](../../../docs/migration.zh-Hans.md)链接到这两份最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
