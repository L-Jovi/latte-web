# Escaped values

English | [简体中文](README.zh-Hans.md)

`~"..."` tells Less to output the text between the quotes exactly as written, without the quotes. [avoid.less](avoid.less) uses it to pass an old Internet Explorer-style `filter` value through untouched. It is kept as a syntax example; current browsers do not support that value.

To see the output, run `npm run build -w @latte/less` from the repository root and open `tooling/less/dist/avoidcompile/avoid.css`: the value appears without the `~` and the quotes, matching the expected output written in the comment at the end of `avoid.less`. The [Less overview](../README.md) lists the other examples.

GPL-2.0-only, like the rest of `tooling/less`; see [LICENSE](../LICENSE).
