# 千分位格式化，不丢精度

[English](README.md) | 简体中文

> 对应英文版：2026-09-28。英文版更新后本页可能滞后。

不把数字字符串转成 `Number` 也能加千分位；再和 `Intl.NumberFormat` 对比。

## 试一试

```sh
npm run dev
# 打开 http://127.0.0.1:4173/mechanisms/utilities/format/
```

打开浏览器控制台，会看到 `1,234,567,890`。想知道输入为什么是字符串，可以输入 `Number('12345678901234567890')`，结果是 `12345678901234567000`：最后几位没了，因为 `Number` 装不下这么多位数字。`formatNumber('12345678901234567890')` 则一位不丢，得到 `'12,345,678,901,234,567,890'`。不需要安装依赖，也不需要构建：克隆仓库后直接运行 `npm run dev` 即可。也可以直接打开[在线演示](https://l-jovi.github.io/latte-web/mechanisms/utilities/format/index.html)。

## 原理

`Number` 只能精确保存不超过 `Number.MAX_SAFE_INTEGER`（也就是 9007199254740991）的整数，超过之后，数值一变成 `Number` 就会丢掉一些位。所以 [format-number.js](format-number.js)（7 行）从头到尾都不转换输入。

它先检查输入是不是十进制字符串：可选的 `+` 或 `-`，一串数字，后面还可以跟一个小数点和更多数字。其他任何形式都会抛出 `TypeError`。然后，它在整数部分里，凡是右边的数字正好能凑成若干组三位数的地方，都插入一个逗号。找出这些位置的是正则表达式 `/\B(?=(\d{3})+(?!\d))/g`：`\B` 保证逗号不会出现在第一位数字前面，其余部分的意思是“后面跟着一组或多组三位数字，然后再没有数字”。正负号和小数点后的数字保持原样，所以 `formatNumber('-1234567.890')` 得到 `'-1,234,567.890'`。

## 过去与现在

[`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format) 可以按任意地区的习惯格式化数字，使用每种语言惯用的分隔符。传给它一个 `Number` 时，它只能显示这个 `Number` 还保留着的数字。它的 `format()` 也接受字符串，这时会使用字符串所表示的精确值；而较早版本的规范会先把字符串转成 `Number`，所以请确认你的浏览器支持这一点。默认情况下，它最多保留三位小数，并去掉末尾的零：`new Intl.NumberFormat('en-US').format('-1234567.890')` 得到 `-1,234,567.89`。给人看的数字，请用 `Intl.NumberFormat` 来显示。

## 刻意省略

- 只接受普通的十进制字符串。指数形式（`1e21`）、已经带分隔符的数字（`1,234`）和以小数点开头的写法（`.5`）都会抛出 `TypeError`。
- 也可以传入 `Number`，只要它转成文字后是普通的十进制形式：`formatNumber(1234.5)` 得到 `'1,234.5'`，而 `formatNumber(1e21)` 会抛错，因为 `String(1e21)` 是 `'1e+21'`。
- 它总是像英文那样每三位加一个逗号，既不读取也不输出其他地区的格式。那是 `Intl.NumberFormat` 的工作。

## 验证与来源

- `npm test` 检查 `formatNumber('-1234567.890')` 得到 `'-1,234,567.890'`，正负号和末尾的零都保留了下来。`npm run test:browser` 在 Chromium、Firefox、WebKit 中打开这个页面，只要抛出错误或有文件加载失败就会报错。
- [迁移清单](../../../docs/migration.zh-Hans.md)链接到最初的版本。
- 原创代码使用 MIT 许可；见 [NOTICE.md](../../../NOTICE.md)。
