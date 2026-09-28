// Shared page chrome for every demo page: the house stylesheet and the top bar.
// Used by scripts/catalog.mjs (static pages and templates), the webpack base config,
// the build scripts that write HTML themselves and the browser tests.

const catalog = require('../docs/catalog.json');

const source = 'https://github.com/L-Jovi/latte-web/tree/main/';
const blob = 'https://github.com/L-Jovi/latte-web/blob/main/';

const groups = [
  {
    kind: 'foundation',
    dir: 'fundamentals',
    title: 'Fundamentals',
    titleZh: '基础',
    intro: 'How JavaScript and the browser behave, one small page at a time.',
    introZh: '一次一个小页面，看 JavaScript 和浏览器的真实行为。',
  },
  {
    kind: 'mechanism',
    dir: 'mechanisms',
    title: 'Build it yourself',
    titleZh: '动手实现',
    intro: 'Small, tested versions of tools you use every day.',
    introZh: '日常工具的小型实现，每一个都有测试。',
  },
  {
    kind: 'tooling',
    dir: 'tooling',
    title: 'Build tools',
    titleZh: '构建工具',
    intro: 'How source files become something a browser can load.',
    introZh: '源代码是怎样变成浏览器能加载的文件的。',
  },
  {
    kind: 'example',
    dir: 'examples',
    title: 'Applications and experiments',
    titleZh: '应用与实验',
    intro:
      'Complete applications with old and new versions side by side, plus visual experiments.',
    introZh: '完整的应用示例（新旧写法并排对照），以及视觉实验。',
  },
  {
    kind: 'history',
    dir: 'docs/history',
    title: 'History',
    titleZh: '历史笔记',
    intro:
      'Notes kept from earlier years. Read them for context; they are not current advice.',
    introZh: '早年留下的笔记，用来了解背景，不代表今天的推荐做法。',
  },
];

// Pages that keep their own markup untouched.
const chrome = {
  // The service worker caches its own files; an extra stylesheet would change its offline behaviour.
  skipAll: new Set(['examples/service-worker/index.html']),
  // This page teaches header/nav landmarks, so an extra <nav> would muddy the lesson.
  skipBar: new Set(['fundamentals/html/semantic.html']),
};

const escape = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
// Catalog summaries use Markdown code spans for the READMEs; render them as <code> in HTML.
const inline = (text) => escape(text).replace(/`([^`]+)`/g, '<code>$1</code>');

const kindTitle = Object.fromEntries(groups.map((g) => [g.kind, g.title]));

// Path from a file inside the repository to the repository root, e.g. '../../'.
const rootFrom = (file) => '../'.repeat(file.split('/').length - 1);

const stylesheet = (rel) =>
  `<link rel="stylesheet" href="${rel}assets/site.css">`;

const bar = (entry, rel) =>
  `<nav class="latte-bar" aria-label="Latte Web"><a class="latte-home" href="${rel}index.html">Latte Web</a><span class="latte-crumb">${escape(kindTitle[entry.kind])}</span><span class="latte-links"><a href="${source}${entry.path}">README</a><a href="${blob}${entry.path}/README.zh-Hans.md" lang="zh-Hans">中文</a></span></nav>`;

// The catalog entry that lists `file` (a path from the repository root) as one of its pages.
const entryFor = (file) => {
  const entry = catalog.find((e) => e.pages?.includes(file));
  if (!entry) throw new Error(`${file} is not a page in docs/catalog.json`);
  return entry;
};

// A complete page for build outputs that have no hand-written HTML of their own.
// The bundler injects its scripts; `body` is extra markup after the heading.
const page = (file, body = '') => {
  const entry = entryFor(file);
  const rel = rootFrom(file);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escape(entry.title)} · Latte Web</title>
${stylesheet(rel)}
</head>
<body>
${bar(entry, rel)}
<h1>${escape(entry.title)}</h1>
<p class="latte-lead">${inline(entry.summary)}</p>
${body}</body>
</html>
`;
};

module.exports = {
  source,
  blob,
  groups,
  chrome,
  escape,
  inline,
  rootFrom,
  stylesheet,
  bar,
  entryFor,
  page,
};
