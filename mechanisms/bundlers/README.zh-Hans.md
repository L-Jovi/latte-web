# 手写打包器（两种写法）

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

解析 import、构建依赖图、输出一个文件；先用几个函数写，再改成一个小型编译器。两个版本都把几个小模块合成一个浏览器能直接运行的脚本。

## 试一试

```sh
npm ci
npm run build -w @latte/bundlers
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/bundlers/dist/
```

页面上显示 **welcome Jovi**，这是分层版打出的包写进页面的；浏览器控制台里显示 `my lord saber`，这是过程式版本打出的包打印的。用编辑器打开 `dist/procedural.js`：文件开头是加载器，文件末尾是依赖图，每个模块的代码都以它的文件路径为键存放。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/mechanisms/bundlers/dist/index.html)。

## 原理

所有打包器都做三件事，这里的两个版本做法相同：

1. **解析**：读入一个文件，用 Babel 把它转成语法树（描述代码结构的数据），找出其中的 `import` 语句。然后 Babel 把 `import` 和 `export` 改写成 `require` 调用和 `exports` 对象，这样模块就能放在一个普通函数里运行。
2. **构建依赖图**，也就是“哪个文件导入了哪个文件”的关系图：从入口文件出发，顺着每个 import 往下走。已经在图里的文件会被跳过，所以一个文件即使被导入两次，或者处在 import 形成的环里，也只会被读取一次。
3. **输出**一个文件：依赖图作为数据，再加一个小加载器。某个模块第一次被 `require` 时，加载器运行它，并把它的 `exports` 存进缓存。模块在代码运行**之前**就放进了缓存，所以遇到循环时，第二次 `require` 拿到的是还没填完的 `exports`，而不会把这个模块从头再运行一遍。

先读 [procedural/build.js](procedural/build.js)（56 行）。它把三个步骤写成几个函数：`analyze` 解析一个文件，`createGraph` 顺着 import 往下走，`bundle` 生成代码，`build` 把结果写到磁盘上。

分层版把同样的工作拆成两部分。[layered/lib/parser.js](layered/lib/parser.js)（22 行）只负责解析；[layered/lib/compiler.js](layered/lib/compiler.js)（42 行）是一个 `Compiler` 类，像 webpack 配置那样接收 `entry` 和 `output`，然后构建依赖图、输出打包结果。[build.mjs](build.mjs) 运行两个版本，并写出 `dist/`。

## 过去与现在

在打包器出现之前，页面要按精心排好的顺序加载许多 `<script>` 标签。后来 Browserify 和 webpack 先后出现，它们读取 `require` 和 `import` 语句并构建依赖图，和这个例子做的事一样。ES 模块从 ES2015 起成为 JavaScript 的一部分，如今浏览器可以原生加载。[Vite](https://vite.dev/guide/why) 在开发时把源文件直接作为原生模块交给浏览器，生产环境仍然打包，因为层层嵌套的 import 会带来额外的网络往返。[2026-03-12 发布的 Vite 8](https://vite.dev/blog/announcing-vite8) 改用单一的、用 Rust 编写的打包器 Rolldown。

截至 2026-09，新的小项目建议从 Vite 开始。webpack 5 仍然被广泛使用，[webpack 逐项拆解](../../tooling/webpack/README.zh-Hans.md)展示了它的 loader、chunk 和插件。更完整的经过见[生态是怎样变过来的](../../docs/ecosystem.zh-Hans.md)。

## 刻意省略

- 只跟踪写明文件名的相对路径 `import`，例如 `./word.js`。没有自动补扩展名这一步，所以写成 `./word` 就找不到文件。遇到 `lodash` 这样的包名，构建会直接报错。
- 不支持重新导出（`export … from`）、动态 `import()` 和 source map。
- Babel 7 只改写模块语法，之后加载器按 CommonJS 的规则运行。真正 ES 模块的某些规则，比如“活绑定”（导入的名字总是反映导出模块里的当前值），并没有完整保留。
- 每个模块都通过 `new Function` 运行，拥有页面的全部权限。这里没有沙箱，所以只打包你信任的代码。
- 打包器只负责组织文件，并不能让文件里的代码变得正确。这是一个用来阅读的小例子，不是真实项目的起点；完整的问题交给 webpack 和 Vite 解决。

## 验证与来源

- `npm run test:tooling` 用两个版本分别打包四个小文件：入口导入两个文件，这两个文件又都导入同一个共享文件，而共享文件再反过来导入入口，形成一个环。测试检查打包结果算出的答案正确、共享文件只运行一次，并且 `import 'node:fs'` 因为不是相对路径而被拒绝。
- `npm run test:browser` 在 Chromium、Firefox、WebKit 中打开构建好的页面，只要抛出错误或有文件加载失败就会报错；它不检查页面上的文字。第一次运行前，用 `npx playwright install chromium firefox webkit` 安装浏览器。`npm run check` 会运行这个构建和上面的测试，还有其他检查；它运行的全部内容见[检查覆盖了什么](../../docs/verification.zh-Hans.md)。
- 过程式打包器的第一个版本既没有缓存，也不检查文件是否已经在图里，所以共享模块每被导入一次就运行一次，遇到循环 import 则永远结束不了。[迁移清单](../../docs/migration.zh-Hans.md)链接到两个打包器最初的版本，也就是 `webpack-scratch` 和 `webpack-forge` 目录。
- `procedural/build.js` 参考了[这篇知乎文章](https://zhuanlan.zhihu.com/p/76969308)。
- `dist/` 不提交到仓库，由构建命令生成。原创代码使用 MIT 许可；见 [NOTICE.md](../../NOTICE.md)。
