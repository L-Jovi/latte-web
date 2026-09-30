# Pattern matching and guards

English | [简体中文](README.zh-Hans.md)

Two ways to let Less choose which mixin to use. [switch.less](switch.less) matches on a fixed first argument: with `@switch: light`, only `.mixin(light, @color)` applies, together with `.mixin(@_, @color)`, because `@_` matches anything. [guide.less](guide.less) uses guards, conditions written with `when`: `lightness(@a) >= 50%` gives `#ddd` a black background, and `lightness(@a) <= 50%` gives `#555` a white one.

A comma between guards means "or": `.mixin(@a) when (@a > 10), (@a < -10) { ... }` applies when either condition is true. The two files here use single guards only.

To see the output, run `npm run build -w @latte/less` from the repository root and open `tooling/less/dist/switch/`. In `switch.css`, `.class` gets `color: #a2a2a2` (`#888` lightened by 10%) and `display: block`. The [Less overview](../README.md) lists the other examples.

GPL-2.0-only, like the rest of `tooling/less`; see [LICENSE](../LICENSE).
