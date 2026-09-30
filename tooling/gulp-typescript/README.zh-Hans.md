# Gulp：按顺序执行任务

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

用一条小的 Gulp 流水线完成清理、编译 TypeScript 和复制 HTML。Gulp 把每一步都当作一个普通的 JavaScript 函数，一个接一个地运行，遇到第一个失败的步骤就停下。

## 试一试

```sh
npm ci
npm run build -w @latte/gulp-typescript
npm run dev
# 打开 http://127.0.0.1:4173/tooling/gulp-typescript/dist/
```

Gulp 依次为 `clean`、`compile` 和 `html` 打印 `Starting` 和 `Finished`。页面标题从 `Loading greeting` 变成 **Hello from TypeScript modules via Gulp**。`dist/` 里有 `index.html`，每个 `.ts` 文件也各对应一个 `.js` 文件：`main.js` 和 `greet.js`。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/tooling/gulp-typescript/dist/index.html)。

## 原理

[gulpfile.js](gulpfile.js)（16 行）导出三个小函数，以及一个用 `series` 依次运行它们的默认任务：

- `clean` 用 Node 自带的 `rm` 删除 `dist/`。
- `compile` 把 TypeScript 编译器 `tsc` 作为一个单独的进程启动。`tsc` 读取 [tsconfig.json](tsconfig.json)，检查类型，再把 `src/` 里的每个 TypeScript 文件各写成一个 JavaScript 文件，放进 `dist/`。
- `html` 把 [src/index.html](src/index.html) 复制到 `dist/`。

每个函数通过返回值告诉 Gulp 自己已经完成：`clean` 和 `html` 返回 Promise，`compile` 返回子进程。如果 `tsc` 发现类型错误，它会以错误码退出，`series` 也就不会再运行 `html`。

这里没有打包器。`tsc` 原样保留 `main.js` 里的 `import`，页面用 `<script type="module">` 加载 `main.js`，浏览器再自己去获取 `greet.js`。所以 [src/main.ts](src/main.ts) 导入的是 `./greet.js`，也就是编译后的文件名。

## 过去与现在

2010 年代初，[Grunt](../grunt/README.zh-Hans.md) 和 Gulp 这样的任务运行器负责复制、合并和压缩文件。这个示例最初的版本配置成用 Browserify、它的 `tsify` 插件和 Babel 打包 TypeScript，还留着几段注释掉的写法，分别用了 `gulp-typescript`、Watchify 和 uglify。现在的版本直接调用 TypeScript 编译器自己的命令 `tsc`，不再借助包装它的插件，并让浏览器加载原生 ES 模块。它还把任务直接导出，而不是用 `gulp.task()` 注册；Gulp 的[文档](https://gulpjs.com/docs/en/getting-started/creating-tasks/)如今把导出作为定义任务的主要方式。

截至 2026-09，新项目建议从 Vite 开始。Gulp 只是执行你交给它的步骤，而 Vite 还理解你的模块，并在开发时更新页面（见 [Why Vite](https://vite.dev/guide/why)）。

## 刻意省略

- 没有监听（watch）任务：每次修改之后都要重新运行构建。
- 不打包也不压缩。每个模块都是一次单独的请求；[Vite 文档](https://vite.dev/guide/why)解释了为什么这在生产环境中仍然低效。
- HTML 原样复制，不会给文件名加上哈希。

## 验证与来源

- `npm run check` 先用 `tsc --noEmit` 检查这个目录的类型，再构建它。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开页面，只要出现脚本错误或有文件加载失败就会报错，所以缺了 `greet.js` 也会被发现；它不检查标题文字。
- [迁移清单](../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
