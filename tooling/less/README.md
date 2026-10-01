# Less, and what native CSS can do today

English | [简体中文](README.zh-Hans.md)

Variables, mixins and guards in Less, and why native CSS variables can change at runtime while Less variables cannot. _Less_ is a CSS preprocessor: you write `.less` files, and a compiler turns them into plain CSS before the browser sees them.

## Try it

```sh
npm ci
npm run build -w @latte/less
npm run dev
# open http://127.0.0.1:4173/tooling/less/modern.html
```

The page shows a steel-blue card. Click **Change theme**, and the card turns rust brown at once, with no new build: the page changes a native CSS variable while it runs. You can also open the [live demo](https://l-jovi.github.io/latte-web/tooling/less/modern.html).

The build writes one CSS file into `dist/` for each `.less` file, in a folder of the same name: [mix/mix.less](mix/mix.less), for example, becomes `dist/mix/mix.css`. Open the two side by side to see what the compiler did.

## How it works

[build.mjs](build.mjs) (12 lines) finds every `.less` file one folder down, compiles it with Less's Node API, `less.render`, and writes the CSS to `dist/`. Each folder shows one feature:

- [base/foo.less](base/foo.less): a variable, `@base`, colour functions such as `saturate` and `lighten`, and _mixins_, reusable groups of declarations. Its two `.box-shadow` mixins have _guards_, conditions written with `when`: one takes a colour, the other a number. Passing `30%` picks the number version, which calls the colour version with `rgba(0, 0, 0, 0.3)`.
- [mix/mix.less](mix/mix.less): a mixin with a default argument. `#header` uses the default, `5px`; `#footer` passes `20px`.
- [arguments/args.less](arguments/args.less): `@arguments`, which holds all of a mixin's arguments at once, so `.box-saber(2px, 5px)` becomes `box-shadow: 2px 5px 1px #000`.
- [inherit/inherit.less](inherit/inherit.less): nested rules and `&:hover`, which compile to flat selectors such as `#header p a:hover`.
- Three folders have short notes of their own: [switch](switch/README.md) (choosing a mixin by its argument), [avoidcompile](avoidcompile/README.md) (passing text through untouched) and [val2string](val2string/README.md) (variables inside strings).

[base/gen.js](base/gen.js) (2 lines) calls the same API by hand: `node tooling/less/base/gen.js` prints a `.box` rule with `width: 2px`, worked out from `(1px + 1px)`.

Less variables exist only while the file is compiled: `dist/mix/mix.css` has no trace of `@var_radius`, only its values. [modern.html](modern.html) (23 lines) sets its colour with a native CSS _custom property_, `--accent`, which stays in the CSS that the browser keeps and follows the normal cascade. That is why one line of JavaScript, `document.documentElement.style.setProperty('--accent', '#98542d')`, can recolour the card after the page has loaded.

## Then and now

CSS had no variables and no nesting, so teams used preprocessors such as Less and Sass to get them. Today, [custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascading_variables/Using_custom_properties) are supported everywhere, [native nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Nesting) has worked in all major browsers since 2023, and functions such as `color-mix()` cover much of what the colour helpers of preprocessors did. [How the ecosystem changed](../../docs/ecosystem.md) tells the longer story.

## Limits

- The `-webkit-` and `-moz-` prefixes and the old Internet Explorer `filter` value are kept as syntax examples; current browsers do not need them.
- No page uses the compiled CSS: you compare `dist/` with the sources by reading them.

## Checks and credits

- `npm run check` runs this build. `npm run test:browser` opens `modern.html` in Chromium, Firefox and WebKit and fails on a script error or a file that does not load; it does not click the button or check the compiled CSS.
- The [migration ledger](../../docs/migration.md) links to the original version.
- This folder keeps its own GPL-2.0 license ([LICENSE](LICENSE), declared as `GPL-2.0-only` in `package.json`); the repository's MIT license does not replace it. See [NOTICE.md](../../NOTICE.md).
