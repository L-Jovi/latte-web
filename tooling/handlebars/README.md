# Template compiling and HTML escaping

English | [简体中文](README.zh-Hans.md)

Compile a Handlebars template and see why `{{value}}` is escaped while `{{{value}}}` is not. _Escaping_ turns characters such as `<` into codes such as `&lt;`, so text from a user shows up as text instead of becoming HTML.

## Try it

```sh
npm ci
npm run build -w @latte/handlebars
npm run dev
# open http://127.0.0.1:4173/tooling/handlebars/dist/
```

Under the heading **What `{{info}}` printed**, the page shows the text `<img src=x onerror=alert(1)>`. It is only text: no image is created and no alert appears. You can also open the [live demo](https://latte.jovipro.com/tooling/handlebars/dist/index.html).

## How it works

[index.handlebars](index.handlebars) (3 lines) is a template with one placeholder, `{{info}}`. [build.mjs](build.mjs) (20 lines) fills it with `<img src=x onerror=alert(1)>`, a string that would run code if the browser treated it as HTML: the image `x` fails to load, and its `onerror` handler calls `alert(1)`.

The build uses the template in two ways:

1. `Handlebars.compile` turns the template into a function, and the build calls it right away to write `dist/index.html`. In that file, `<` has become `&lt;`, `>` has become `&gt;` and `=` has become `&#x3D;`.
2. `Handlebars.precompile` turns the same template into JavaScript source, saved as `dist/template.cjs`. That file needs only `handlebars/runtime`, the part of Handlebars that runs templates: about 29 KB minified, against 89 KB for the full library with the compiler.

Double braces, `{{info}}`, escape the value. Triple braces, `{{{info}}}`, insert it as HTML on purpose. To see the difference, change the template to `{{{info}}}` and build again: now the page contains a real, broken `<img>`, and an alert pops up.

## Then and now

The original version compiled the template with webpack 3 and `handlebars-loader`, then rendered it in the browser. This version compiles it in a short Node script, which is all the escaping lesson needs.

React's counterpart of triple braces is `dangerouslySetInnerHTML`, its way to insert raw HTML. Its [documentation](https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html) warns that unless the markup comes from a completely trusted source, this makes it trivial to introduce an XSS (cross-site scripting) vulnerability.

## Limits

- Escaping makes text safe to show as HTML. It is not a general cleaner for URLs or JavaScript: the [Handlebars guide](https://handlebarsjs.com/guide/#html-escaping) warns that it does not escape JavaScript strings, for example in inline event handlers.
- A template is code. Never compile a template that a user wrote; escaping protects only the values you pass in.
- `dist/template.cjs` is loaded only by a test in Node; no page uses it.

## Checks and credits

- `npm run test:browser` opens the page in Chromium, Firefox and WebKit and checks that it contains no `<img>` and shows the test string as text. Another test fails on a script error or a file that does not load.
- `npm run test:tooling` runs `dist/template.cjs` with a different input, `<img onerror="bad()">`, and checks that the output contains `&lt;img` and no `<img`, as in the compiled page. `npm run check` runs the build first, then this test.
- The [migration ledger](../../docs/migration.md) links to the original version.
- Original code is MIT; see [NOTICE.md](../../NOTICE.md).
