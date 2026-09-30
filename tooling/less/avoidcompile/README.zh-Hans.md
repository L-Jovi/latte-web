# 转义值

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

`~"..."` 让 Less 把引号里的文字原样输出，并去掉引号。[avoid.less](avoid.less) 用它让一个旧式 Internet Explorer 风格的 `filter` 值原封不动地通过编译。它只是作为语法示例保留，现在的浏览器并不支持这个值。

想看输出，在仓库根目录运行 `npm run build -w @latte/less`，然后打开 `tooling/less/dist/avoidcompile/avoid.css`：这个值已经没有了 `~` 和引号，和 `avoid.less` 末尾注释里写的预期输出一致。其他示例见 [Less 总览](../README.zh-Hans.md)。

和 `tooling/less` 的其他文件一样使用 GPL-2.0-only 许可；见 [LICENSE](../LICENSE)。
