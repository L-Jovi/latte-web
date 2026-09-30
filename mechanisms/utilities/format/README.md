# Thousands separators without losing precision

English | [简体中文](README.zh-Hans.md)

Group the digits of a number string without converting it to `Number`; compare with `Intl.NumberFormat`.

## Try it

```sh
npm run dev
# open http://127.0.0.1:4173/mechanisms/utilities/format/
```

Open the browser console: it shows `1,234,567,890`. To see why the input is a string, type `Number('12345678901234567890')`. The result is `12345678901234567000`: the last digits are gone, because a `Number` cannot hold that many. `formatNumber('12345678901234567890')` keeps them all and gives `'12,345,678,901,234,567,890'`. No install or build is needed: `npm run dev` works right after cloning. You can also open the [live demo](https://l-jovi.github.io/latte-web/mechanisms/utilities/format/index.html).

## How it works

A `Number` stores whole numbers exactly only up to `Number.MAX_SAFE_INTEGER`, which is 9007199254740991. Beyond that, digits are lost as soon as the value becomes a `Number`. So [format-number.js](format-number.js) (7 lines) never converts its input.

It first checks that the input is a decimal string: an optional `+` or `-`, digits, and optionally a point followed by more digits. Anything else throws a `TypeError`. Then it puts a comma into the whole-number part wherever the digits to its right come in complete groups of three. The regular expression `/\B(?=(\d{3})+(?!\d))/g` finds those places: `\B` stops a comma from appearing before the first digit, and the rest means "followed by one or more groups of three digits, and then no more digits". The sign and the digits after the point stay as they were, so `formatNumber('-1234567.890')` gives `'-1,234,567.890'`.

## Then and now

[`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format) formats numbers for any locale, with the separators each language expects. Given a `Number`, it can only show the digits the `Number` still holds. Its `format()` also accepts a string and then uses the exact value the string represents; older versions of the specification converted the string to a `Number` first, so check your browser. By default it keeps at most three decimal places and drops trailing zeros: `new Intl.NumberFormat('en-US').format('-1234567.890')` gives `-1,234,567.89`. Use `Intl.NumberFormat` whenever you show numbers to people.

## Limits

- Only plain decimal strings are accepted. An exponent (`1e21`), existing separators (`1,234`) or a leading point (`.5`) throws a `TypeError`.
- A `Number` works as input as long as its text form is plain decimal: `formatNumber(1234.5)` gives `'1,234.5'`, but `formatNumber(1e21)` throws, because `String(1e21)` is `'1e+21'`.
- It always puts a comma every three digits, as English does, and it neither reads nor writes other locales' formats. That is the job of `Intl.NumberFormat`.

## Checks and credits

- `npm test` checks that `formatNumber('-1234567.890')` gives `'-1,234,567.890'`, keeping the sign and the trailing zero. `npm run test:browser` opens the page in Chromium, Firefox and WebKit and fails if it throws an error or a file does not load.
- The [migration ledger](../../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../../NOTICE.md).
