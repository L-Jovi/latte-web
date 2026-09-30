# String interpolation

English | [简体中文](README.zh-Hans.md)

`@{name}` inserts the value of a Less variable into a string. In [val2string.less](val2string.less), `@name: "latte"` and `content: "@{name} Web"` compile to `content: "latte Web"`. This happens once, while the file is compiled: Less copies the value in, and nothing in the string is run as JavaScript.

To see the output, run `npm run build -w @latte/less` from the repository root and open `tooling/less/dist/val2string/val2string.css`. The [Less overview](../README.md) lists the other examples.

GPL-2.0-only, like the rest of `tooling/less`; see [LICENSE](../LICENSE).
