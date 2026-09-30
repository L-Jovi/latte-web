# 字符串插值

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

`@{name}` 把 Less 变量的值插进字符串。在 [val2string.less](val2string.less) 里，`@name: "latte"` 加上 `content: "@{name} Web"`，编译结果是 `content: "latte Web"`。这件事只在编译文件时发生一次：Less 把变量的值复制进去，字符串里的任何内容都不会被当作 JavaScript 执行。

想看输出，在仓库根目录运行 `npm run build -w @latte/less`，然后打开 `tooling/less/dist/val2string/val2string.css`。其他示例见 [Less 总览](../README.zh-Hans.md)。

和 `tooling/less` 的其他文件一样使用 GPL-2.0-only 许可；见 [LICENSE](../LICENSE)。
