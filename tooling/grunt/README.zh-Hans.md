# Grunt：基于任务的构建

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

先清理再复制的构建流程，打包器流行之前很多项目就是这样构建的。Grunt 这样的任务运行器，会按你列出的顺序执行一个个有名字的步骤，比如删除目录、复制文件。

## 试一试

```sh
npm ci
npm run build -w @latte/grunt
npm run dev
# 打开 http://127.0.0.1:4173/tooling/grunt/dist/?lang=zh
```

Grunt 先打印 `Running "clean:dist" (clean) task`，再打印 `Running "copy:app" (copy) task` 和 `Created 1 directory, copied 2 files`，最后是 `Done.`。页面上写着**这个页面是 Grunt 复制的**。`dist/` 和 `app/` 一模一样：没有任何修改、合并或压缩。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/tooling/grunt/dist/index.html?lang=zh)。

## 原理

[Gruntfile.cjs](Gruntfile.cjs)（9 行）分三部分：

1. `grunt.initConfig` 用数据描述任务：`clean` 删除 `dist/`，`copy` 把 `app/` 下的所有文件（`cwd: 'app'`、`src: ['**/*']`）复制到 `dist/`。`expand: true` 表示每个匹配到的文件单独复制一份，并保留它在 `app/` 里的路径。
2. `grunt.loadNpmTasks` 加载真正干活的插件：`grunt-contrib-clean` 和 `grunt-contrib-copy`。
3. `grunt.registerTask('default', ['clean', 'copy'])` 列出只输入 `grunt`、不带任务名时要依次执行的步骤。

[app/index.html](app/index.html) 是一个 6 行的页面，[app/js/index.js](app/js/index.js) 是个空文件。这里没有任何步骤读取 `import` 语句：Grunt 只知道你列出的文件和步骤，不知道哪个文件依赖哪个文件。这是它和打包器最主要的区别。

## 过去与现在

2010 年代初，Grunt 和 [Gulp](../gulp-typescript/README.zh-Hans.md) 这样的任务运行器负责复制、合并和压缩页面用 `<script>` 标签加载的文件。webpack 这样的打包器更进一步：它们读取 `import` 语句，据此建立依赖图。截至 2026-09，新项目建议从 Vite 开始，它在开发时还会把每个模块直接提供给浏览器（见 [Why Vite](https://vite.dev/guide/why)）。更完整的经过见[生态是怎样变过来的](../../docs/ecosystem.zh-Hans.md)。

最初的版本会把复制出来的文件改名，加上 `.min.html` 和 `.min.map` 后缀，可复制根本不会压缩任何东西。现在的版本保留真实的文件名。

## 刻意省略

- 文件原样复制：不压缩，文件名里不加哈希，也没有依赖图。
- 没有监听（watch）任务，每次修改之后都要重新运行构建。
- 保留它是为了展示过去的工作方式，不是推荐用它构建新应用。

## 验证与来源

- `npm run check` 会运行这个构建。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开复制出来的页面，只要出现脚本错误或有文件加载失败就会报错；它不会比较 `dist/` 和 `app/`。
- Grunt 的 [Getting started](https://gruntjs.com/getting-started) 指南介绍了 `initConfig`、`loadNpmTasks` 和 `default` 任务。[迁移清单](../../docs/migration.zh-Hans.md)链接到最初的版本。
- 这个目录保留自己的 ISC 许可（[LICENSE](LICENSE)），仓库的 MIT 许可不会取代它。见 [NOTICE.md](../../NOTICE.md)。
