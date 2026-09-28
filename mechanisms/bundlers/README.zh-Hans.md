# 两种手写打包器

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

过程式版本按函数展示解析、依赖图与输出；分层版分开解析器和 Compiler。两版沿相对静态 JavaScript import 遍历，在执行前缓存模块，遇到访问过的文件便停止重复遍历。菱形与循环依赖测试验证共享模块只执行一次。路径必须含 .js；包解析、重导出、动态 import、source map、完整 ESM 活绑定语义和沙箱均不在范围内。生成代码用 Function 执行可信输入。Babel 7 只转换模块语法，Webpack、Vite 负责更完整的问题。

## 运行与预期

在仓库根目录执行 `npm ci`，然后运行 `npm run build -w @latte/bundlers`。运行 `npm run dev`，打开 `http://127.0.0.1:4173/mechanisms/bundlers/dist/index.html`。

## 从哪里读

从 [procedural/build.js](procedural/build.js), [layered/lib/compiler.js](layered/lib/compiler.js), [layered/lib/parser.js](layered/lib/parser.js) 开始。构建工具负责组织文件，并不保证应用逻辑正确。这个示例只表达所述机制，不作为生产项目模板。

## 验证

`npm run check` 检查类型、构建工作区、验证机制并加载打包后的库。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开生成页面。首次执行 `npx playwright install chromium firefox webkit` 安装浏览器。

## 来源与许可

MIT。[迁移与原始版本](../../docs/migration.zh-Hans.md)；[署名](../../NOTICE.md)。构建产物通过命令重建，不提交到仓库。
