# Less 编译与原生 CSS 变量

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。

保留的 .less 文件展示混入、条件、@arguments 与转义值，构建在 dist 下生成对应 CSS。旧厂商前缀和 IE 专属字符串是历史语法案例，不代表现代浏览器仍需要它们。打开 modern.html 修改运行时自定义属性：Less 变量在编译后消失，CSS 变量仍参与层叠。

## 运行与预期

在仓库根目录执行 `npm ci`，然后运行 `npm run build -w @latte/less`。运行 `npm run dev`，打开 `http://127.0.0.1:4173/tooling/less/modern.html`。

## 从哪里读

从 [build.mjs](build.mjs), [mix/mix.less](mix/mix.less), [arguments/args.less](arguments/args.less), [modern.html](modern.html) 开始。构建工具负责组织文件，并不保证应用逻辑正确。这个示例只表达所述机制，不作为生产项目模板。

## 验证

`npm run check` 检查类型、构建工作区、验证机制并加载打包后的库。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开生成页面。首次执行 `npx playwright install chromium firefox webkit` 安装浏览器。

## 来源与许可

GPL-2.0-only; retained LICENSE applies to this directory。[迁移与原始版本](../../docs/migration.zh-Hans.md)；[署名](../../NOTICE.md)。构建产物通过命令重建，不提交到仓库。
