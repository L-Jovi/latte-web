# 开发构建与生产构建

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

同一个项目两套配置：调试用可读的输出，发布用优化后的输出。这里以生产构建为主配置，另一个 6 行的文件把它改成开发构建。

## 试一试

```sh
npm ci
npm run build -w @latte/webpack
npm run dev
# 打开 http://127.0.0.1:4173/tooling/webpack/production/dist/?lang=zh
```

页面上显示 `Hello webpack!,5 cubed is equal to 125`，控制台打印 `Looks like we are in production mode!`。`dist/bundle.js` 只有 257 字节：先是一行代码，webpack 已经在里面把 `cube(5)` 算成了 `125`，开发模式的提示和没用到的 `square` 函数都去掉了；后面跟着 `//# sourceMappingURL=bundle.js.map`，指向旁边的 source map 文件。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/tooling/webpack/production/dist/index.html?lang=zh)。

## 原理

[webpack.config.cjs](webpack.config.cjs)（3 行）保留[共用配置](../base.cjs)里的生产模式，并加上 `devtool: 'source-map'`，把 source map 写成单独的文件 `bundle.js.map`。生产模式会压缩代码，并把 `process.env.NODE_ENV` 设为 `'production'`。[src/index.js](src/index.js)（15 行）会检查这个值，所以它的 `if` 有一个分支永远不会执行，压缩工具就把它删掉了。（页面上的逗号，是因为代码把一个数组赋给了 `innerHTML`，数组各项会用逗号连起来。）

[webpack.dev.cjs](webpack.dev.cjs)（6 行）加载上面那份配置，用对象展开（`...config`）复制一份，再改两项：`mode: 'development'` 和 `devtool: 'inline-source-map'`。构建脚本只构建生产配置。想试试开发配置，运行 `npm exec -w @latte/webpack -- webpack serve --config production/webpack.dev.cjs`，然后打开 http://127.0.0.1:4180/：控制台这次打印 `Looks like we are in development mode!`。

[src/math.js](src/math.js) 导出了 `square` 和 `cube`，但只有 `cube` 被导入。[Tree shaking：去掉没用到的导出](../tree-shaking/README.zh-Hans.md)专门讲这一步。

## 过去与现在

最初的版本照着[官方指南](https://webpack.js.org/guides/production/)的做法，用三个文件 `webpack.common.js`、`webpack.dev.js` 和 `webpack.prod.js`，再用 `webpack-merge` 包把它们合并起来。这里把生产设置当作主配置，开发配置用普通的对象展开改掉其中两项，不需要额外的包。从 webpack 4 开始，`mode` 会自动设置 `process.env.NODE_ENV`，并在生产模式下开启压缩。

## 刻意省略

- `bundle.js.map` 和页面一起发布，所以任何人都能通过它读到原始源码。[devtool 文档](https://webpack.js.org/configuration/devtool/)建议，在真实服务器上不要让普通用户访问 source map，或者改用 `hidden-source-map`：它不写那行指向 source map 的注释，source map 只留给错误报告使用。
- 对象展开只复制最外面一层。替换 `mode` 和 `devtool` 这样就够了，但如果要改嵌套的设置，比如 `module.rules` 里的某条规则，就得多复制几层。[webpack-merge](https://github.com/survivejs/webpack-merge) 替你做的正是这件事：它会拼接数组、合并对象。

## 验证与来源

- `npm run check` 会运行生产构建。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开构建好的页面，只要出现脚本错误或有文件加载失败就会报错；它不检查页面上的文字，也没有测试会运行开发配置。
- 基于 webpack 官方指南 [Production](https://webpack.js.org/guides/production/)。[迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
