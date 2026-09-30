# 模式匹配与条件

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

让 Less 自己选用哪个混入，这里有两种办法。[switch.less](switch.less) 按固定的第一个参数匹配：`@switch: light` 时，只有 `.mixin(light, @color)` 生效，再加上 `.mixin(@_, @color)`，因为 `@_` 能匹配任何值。[guide.less](guide.less) 用的是守卫，也就是用 `when` 写的条件：`lightness(@a) >= 50%` 让 `#ddd` 得到黑色背景，`lightness(@a) <= 50%` 让 `#555` 得到白色背景。

守卫之间用逗号隔开表示“或”：`.mixin(@a) when (@a > 10), (@a < -10) { ... }` 只要满足其中一个条件就会生效。这里的两个文件都只用了单个守卫。

想看输出，在仓库根目录运行 `npm run build -w @latte/less`，然后打开 `tooling/less/dist/switch/`。在 `switch.css` 里，`.class` 得到了 `color: #a2a2a2`（`#888` 调亮 10%）和 `display: block`。其他示例见 [Less 总览](../README.zh-Hans.md)。

和 `tooling/less` 的其他文件一样使用 GPL-2.0-only 许可；见 [LICENSE](../LICENSE)。
