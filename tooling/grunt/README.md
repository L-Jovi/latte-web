# Grunt: task-based builds

English | [简体中文](README.zh-Hans.md)

A clean-then-copy build, the way many projects worked before bundlers. A _task runner_ such as Grunt runs named steps, like deleting a folder or copying files, in the order you list them.

## Try it

```sh
npm ci
npm run build -w @latte/grunt
npm run dev
# open http://127.0.0.1:4173/tooling/grunt/dist/
```

Grunt prints `Running "clean:dist" (clean) task`, then `Running "copy:app" (copy) task` with `Created 1 directory, copied 2 files`, and finally `Done.` The page says **Grunt copied this page**. `dist/` is an exact copy of `app/`: nothing was changed, combined or minified. You can also open the [live demo](https://latte.jovipro.com/tooling/grunt/dist/index.html).

## How it works

[Gruntfile.cjs](Gruntfile.cjs) (9 lines) has three parts:

1. `grunt.initConfig` describes the tasks as data: `clean` deletes `dist/`, and `copy` copies everything under `app/` (`cwd: 'app'`, `src: ['**/*']`) into `dist/`. `expand: true` makes one copy per matching file and keeps its path inside `app/`.
2. `grunt.loadNpmTasks` loads the plugins that do the work, `grunt-contrib-clean` and `grunt-contrib-copy`.
3. `grunt.registerTask('default', ['clean', 'copy'])` lists the steps that run, in order, when you type `grunt` without a task name.

[app/index.html](app/index.html) is a six-line page, and [app/js/index.js](app/js/index.js) is an empty file. Nothing here reads `import` statements: Grunt knows only the files and the steps you list, not which file needs which. That is the main difference from a bundler.

## Then and now

In the early 2010s, task runners such as Grunt and [Gulp](../gulp-typescript/README.md) copied, concatenated and minified the files that a page loaded with `<script>` tags. Bundlers such as webpack went further: they read the `import` statements and build a dependency graph from them. For a new project today (2026-09), start with Vite, which also serves each module to the browser as you develop ([Why Vite](https://vite.dev/guide/why)). [How the ecosystem changed](../../docs/ecosystem.md) tells the longer story.

The original version renamed its copies with `.min.html` and `.min.map` endings, although copying does not minify anything. This version keeps the real file names.

## Limits

- Files are copied as they are: no minifying, no hashes in file names, no dependency graph.
- There is no watch task, so you run the build again after each change.
- It is kept runnable to show an older way of working, not as a way to build new applications.

## Checks and credits

- `npm run check` runs this build. `npm run test:browser` opens the copied page in Chromium, Firefox and WebKit and fails on a script error or a file that does not load; it does not compare `dist/` with `app/`.
- Grunt's [Getting started](https://gruntjs.com/getting-started) guide explains `initConfig`, `loadNpmTasks` and the `default` task. The [migration ledger](../../docs/migration.md) links to the original version.
- This folder keeps its own ISC license ([LICENSE](LICENSE)); the repository's MIT license does not replace it. See [NOTICE.md](../../NOTICE.md).
