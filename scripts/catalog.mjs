import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import site from './site.cjs';

// `--check` compares every generated file with the working tree and writes nothing.
const check = process.argv.includes('--check');
const read = (path) => JSON.parse(readFileSync(path, 'utf8'));
const catalog = read('docs/catalog.json');
const migration = read('docs/migration.json');
const base = `https://github.com/L-Jovi/latte-web/tree/${migration.baseline}/`;
const live = 'https://l-jovi.github.io/latte-web/';
const { source, blob, groups, chrome, escape, inline, rootFrom } = site;
// Markdown table cells cannot contain a raw pipe.
const cell = (s) => s.replaceAll('|', '\\|');
const outputs = new Map();
const emit = (path, content) => outputs.set(path, content);
const demo = (entry) => entry.pages?.length && entry.live !== false;

const table = (entries, zh, prefix) => {
  const readme = zh ? 'README.zh-Hans.md' : 'README.md';
  const rows = entries.map((e) => {
    const title = `[${cell(zh ? e.titleZh : e.title)}](${prefix}${e.path}/${readme})`;
    const summary = cell(zh ? e.summaryZh : e.summary);
    const tryIt = demo(e)
      ? `[${zh ? '在线演示' : 'Live demo'}](${live}${e.pages[0]})`
      : e.pages?.length
        ? zh
          ? '本地运行'
          : 'Run locally'
        : '—';
    return `| ${title} | ${summary} | ${tryIt} |`;
  });
  const head = zh
    ? '| 主题 | 你会看到什么 | 试一试 |\n| --- | --- | --- |'
    : "| Topic | What you'll see | Try it |\n| --- | --- | --- |";
  return `${head}\n${rows.join('\n')}`;
};

// The root READMEs are written by hand; only the marked learning-path block is generated.
const start = '<!-- catalog:start -->';
const end = '<!-- catalog:end -->';
const note =
  '<!-- Generated from docs/catalog.json by `npm run docs:generate`. Edit the catalog, not this block. -->';
for (const zh of [false, true]) {
  const path = zh ? 'README.zh-Hans.md' : 'README.md';
  const text = readFileSync(path, 'utf8');
  const i = text.indexOf(start);
  const j = text.indexOf(end);
  if (i < 0 || j < i) throw new Error(`${path}: missing ${start} … ${end}`);
  const block = groups
    .map((g) => {
      const entries = catalog.filter((e) => e.kind === g.kind);
      return `### ${zh ? g.titleZh : g.title}\n\n${zh ? g.introZh : g.intro}\n\n${table(entries, zh, '')}`;
    })
    .join('\n\n');
  emit(
    path,
    `${text.slice(0, i + start.length)}\n<!-- prettier-ignore-start -->\n${note}\n\n${block}\n\n<!-- prettier-ignore-end -->\n${text.slice(j)}`,
  );
}

// Section indexes are fully generated.
for (const g of groups) {
  const entries = catalog.filter((e) => e.kind === g.kind);
  const up = '../'.repeat(g.dir.split('/').length);
  const strip = (e) => ({ ...e, path: e.path.slice(g.dir.length + 1) });
  emit(
    `${g.dir}/README.md`,
    `# ${g.title}\n\nEnglish | [简体中文](README.zh-Hans.md)\n\n${g.intro}\n\n${table(entries.map(strip), false, '')}\n\n[Back to the learning path](${up}README.md#learning-path)\n`,
  );
  emit(
    `${g.dir}/README.zh-Hans.md`,
    `# ${g.titleZh}\n\n[English](README.md) | 简体中文\n\n> 对应英文版：两种语言由同一份目录数据同时生成，内容始终同步。\n\n${g.introZh}\n\n${table(entries.map(strip), true, '')}\n\n[返回学习路线](${up}README.zh-Hans.md#学习路线)\n`,
  );
}

// Every demo page gets the house stylesheet and a top bar back to the index, inside
// marked blocks that later runs replace. The webpack topics and the build scripts
// that write their own HTML use site.page() instead.
const marked = (name, html) =>
  `<!-- latte-site:${name} -->${html}<!-- /latte-site:${name} -->`;
const block = (name) =>
  new RegExp(
    `<!-- latte-site:${name} -->[\\s\\S]*?<!-- /latte-site:${name} -->`,
  );
// `after` puts a new block right after its anchor instead of right before it.
const upsert = (file, text, name, html, anchor, after = false) => {
  if (block(name).test(text))
    return text.replace(block(name), marked(name, html));
  const m = text.match(anchor);
  if (!m) throw new Error(`${file}: no ${anchor} to anchor the ${name} block`);
  const at = after ? m.index + m[0].length : m.index;
  return text.slice(0, at) + marked(name, html) + text.slice(at);
};
const dress = (file, page, css, vite = false) => {
  const entry = site.entryFor(page);
  let text = readFileSync(file, 'utf8');
  // The stylesheet goes after </title>, then the guide script, before any demo script runs.
  text = upsert(file, text, 'css', css, /<\/title\s*>/i, true);
  const guide = site.guideFor(page);
  text = guide
    ? upsert(
        file,
        text,
        'guide',
        site.guideScript(rootFrom(page), guide, vite),
        /<!-- \/latte-site:css -->/,
        true,
      )
    : text.replace(block('guide'), '');
  // The bar goes before the first heading or app root.
  if (!chrome.skipBar.has(page))
    text = upsert(
      file,
      text,
      'bar',
      site.bar(entry, rootFrom(page)),
      /<h1[\s>]|<div id="root"/i,
    );
  emit(file, text);
};
for (const entry of catalog)
  for (const page of entry.pages || [])
    if (!page.includes('/dist/') && !chrome.skipAll.has(page))
      dress(page, page, site.stylesheet(rootFrom(page)));

// Built pages get the chrome through their source templates; the bar links are
// relative to the built page. Vite bundles the stylesheet: a module import relative
// to the template resolves in `vite build` and in the `vite` dev server alike.
const vite = [
  ['mechanisms/router/index.html', 'mechanisms/router/dist/index.html'],
  [
    'examples/react-classic/index.html',
    'examples/react-classic/dist/index.html',
  ],
  ['examples/react-modern/index.html', 'examples/react-modern/dist/index.html'],
  [
    'examples/rich-text-draft/index.html',
    'examples/rich-text-draft/dist/index.html',
  ],
  [
    'examples/rich-text-lexical/index.html',
    'examples/rich-text-lexical/dist/index.html',
  ],
  [
    'examples/graphql/client/index.html',
    'examples/graphql/client/dist/index.html',
  ],
  ['examples/wasm/index.html', 'examples/wasm/dist/index.html'],
  ['examples/performance/index.html', 'examples/performance/dist/index.html'],
  [
    'examples/components/index.html',
    'examples/components/dist/demo/index.html',
  ],
  [
    'examples/components/consumer.html',
    'examples/components/dist/consumer/consumer.html',
  ],
];
for (const [file, page] of vite)
  dress(
    file,
    page,
    `<script type="module">import '${rootFrom(file)}assets/site.css';</script>`,
    true,
  );
// These templates are copied into dist as they are, so every link is relative to the built page.
const copied = [
  ['tooling/grunt/app/index.html', 'tooling/grunt/dist/index.html'],
  [
    'tooling/gulp-typescript/src/index.html',
    'tooling/gulp-typescript/dist/index.html',
  ],
  [
    'tooling/webpack-typescript/index.html',
    'tooling/webpack-typescript/dist/index.html',
  ],
];
for (const [file, page] of copied)
  dress(file, page, site.stylesheet(rootFrom(page)));

// The learning index is served locally by `npm run dev` and on GitHub Pages, so links stay relative.
const about = read('package.json').description;
const aboutZh =
  '一组动手实践的 Web 练习与实验。就像一杯拿铁——一份浓缩、两份牛奶、一份奶泡——熟悉、易入口，适合日常学习。';
const anchor = (g) => g.dir.split('/').pop();
const card = (e) => {
  const title = escape(e.title);
  const heading = e.pages?.length
    ? `<a href="${e.pages[0]}">${title}</a>`
    : title;
  const tag = demo(e)
    ? '<a class="chip live" href="' + e.pages[0] + '">Live demo</a>'
    : e.pages?.length
      ? '<span class="chip">Runs locally · 需本地运行</span>'
      : '<span class="chip">Read · 阅读</span>';
  return `<li class="card"><h3>${heading}</h3><p class="zh" lang="zh-Hans">${escape(e.titleZh)}</p><p class="summary">${inline(e.summary)}</p><p class="card-foot">${tag}<a class="read" href="${source}${e.path}">README</a></p></li>`;
};
// A latte by the repository's recipe: one part foam, two parts milk, one part espresso.
const cup = `<svg class="cup" viewBox="0 0 320 360" role="img" aria-label="A latte: one part foam, two parts milk, one part espresso"><defs><clipPath id="glass"><path d="M40 70 L260 70 L234 318 Q230 336 212 336 L88 336 Q70 336 66 318 Z"/></clipPath></defs><g clip-path="url(#glass)"><rect x="0" y="70" width="320" height="67" fill="#fffaf2"/><rect x="0" y="137" width="320" height="133" fill="#e3c7a4"/><rect x="0" y="270" width="320" height="70" fill="#6b4226"/></g><path d="M40 70 L260 70 L234 318 Q230 336 212 336 L88 336 Q70 336 66 318 Z" fill="none" stroke="#2b1d14" stroke-width="7" stroke-linejoin="round"/><path d="M255 118 Q312 122 304 186 Q297 232 244 236" fill="none" stroke="#2b1d14" stroke-width="7" stroke-linecap="round"/><text x="150" y="112" text-anchor="middle">1 foam</text><text x="150" y="210" text-anchor="middle">2 milk</text><text class="light" x="150" y="310" text-anchor="middle">1 espresso</text><text class="steam" x="150" y="46" text-anchor="middle">&lt;/&gt;</text></svg>`;
const siblings = [
  ['espresso-algorithm', 'algorithms'],
  ['roaster-linux', 'Linux tools'],
  ['barista-services', 'services'],
  ['cappuccino-ios', 'iOS apps'],
];
emit(
  'index.html',
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="${escape(about)}">
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Crect x='3' y='2' width='10' height='3' fill='%23fffaf2'/%3E%3Crect x='3' y='5' width='10' height='6' fill='%23e3c7a4'/%3E%3Crect x='3' y='11' width='10' height='3' fill='%236b4226'/%3E%3Crect x='3' y='2' width='10' height='12' rx='2' fill='none' stroke='%232b1d14'/%3E%3C/svg%3E">
<title>Latte Web · learning index</title>
<link rel="stylesheet" href="assets/site.css">
<style>
body{max-width:76rem}
.hero{display:grid;grid-template-columns:minmax(0,1fr) 15rem;gap:2.5rem;align-items:center;padding:1.5rem 0 1rem}
.hero h1{margin:0 0 .75rem;font-size:3rem;letter-spacing:-.02em}
.hero .lead{margin:0 0 .5rem;font-size:1.15rem}
.hero .zh{color:var(--latte-muted)}
.hero .hook{margin:1rem 0 1.25rem}
.actions{display:flex;flex-wrap:wrap;gap:.75rem}
.button{display:inline-block;padding:.55rem 1.1rem;border-radius:.6rem;background:var(--latte-accent);color:var(--latte-accent-fg);font-weight:600;text-decoration:none}
.button.ghost{background:transparent;color:var(--latte-accent);box-shadow:inset 0 0 0 1.5px var(--latte-accent)}
.stats{margin:1.25rem 0 0;color:var(--latte-muted);font-size:.95rem}
.cup{width:100%;height:auto}
.cup text{font:700 19px system-ui,sans-serif;fill:#4a3527}
.cup .steam{font-size:44px;fill:#2b1d14}
.cup .light{fill:#fffaf2}
.jump{display:flex;flex-wrap:wrap;gap:.5rem;margin:1.5rem 0 .5rem;padding:0;list-style:none}
.jump a{display:inline-block;padding:.3rem .8rem;border-radius:999px;background:var(--latte-code);color:var(--latte-fg);text-decoration:none;font-size:.95rem}
.jump a span{color:var(--latte-muted)}
section{margin-top:2.5rem}
section h2{margin:0;font-size:1.5rem}
section h2 .zh{margin-left:.5rem;color:var(--latte-muted);font-weight:500;font-size:1.1rem}
.intro{margin:.25rem 0 1rem;color:var(--latte-muted)}
.cards{display:grid;gap:1rem;grid-template-columns:repeat(auto-fill,minmax(18rem,1fr));margin:0;padding:0;list-style:none}
.card{display:flex;flex-direction:column;padding:1rem 1.1rem;border:1px solid var(--latte-line);border-radius:.8rem;background:var(--latte-card);transition:transform .15s ease,box-shadow .15s ease}
.card:hover{transform:translateY(-2px);box-shadow:0 6px 18px rgb(43 29 20 / 8%)}
.card h3{margin:0;font-size:1.05rem;line-height:1.35}
.card h3 a{color:var(--latte-fg);text-decoration:none}
.card h3 a:hover{color:var(--latte-accent)}
.card .zh{margin:.2rem 0 .5rem;color:var(--latte-muted);font-size:.9rem}
.card .summary{margin:0 0 .9rem;font-size:.95rem}
.card-foot{display:flex;gap:.75rem;align-items:center;margin:auto 0 0;font-size:.85rem}
.chip{padding:.15rem .6rem;border-radius:999px;background:var(--latte-code);color:var(--latte-muted)}
.chip.live{background:var(--latte-accent);color:var(--latte-accent-fg);text-decoration:none;font-weight:600}
.read{margin-left:auto}
footer{margin-top:3.5rem;padding-top:1.25rem;border-top:1px solid var(--latte-line);color:var(--latte-muted);font-size:.9rem}
@media (max-width:48rem){.hero{grid-template-columns:1fr}.cup{max-width:11rem}.hero h1{font-size:2.4rem}}
@media (prefers-reduced-motion:reduce){.card{transition:none}.card:hover{transform:none}}
</style>
</head>
<body>
<nav class="latte-bar" aria-label="Latte Web"><a class="latte-home" href="index.html">Latte Web</a><span class="latte-crumb">Learning index</span><span class="latte-links"><a href="${source.replace('/tree/main/', '')}">GitHub</a><a href="${blob}README.zh-Hans.md" lang="zh-Hans">中文</a></span></nav>
<header class="hero">
<div>
<h1>Latte Web</h1>
<p class="lead">${escape(about)}</p>
<p class="lead zh" lang="zh-Hans">${escape(aboutZh)}</p>
<p class="hook">Learn how the web works by building small versions of it: Promise/A+, mini React, a router, a bundler and more. Run a page, follow the guide beside it, then read the code.</p>
<p class="actions"><a class="button" href="#mechanisms">Start building</a><a class="button ghost" href="${source.replace('/tree/main/', '')}">View on GitHub</a></p>
<p class="stats">${catalog.length} examples · 872/872 Promises/A+ tests · every page tested in Chromium, Firefox and WebKit</p>
</div>
${cup}
</header>
<ul class="jump">${groups
    .map((g) => {
      const n = catalog.filter((e) => e.kind === g.kind).length;
      return `<li><a href="#${anchor(g)}">${g.title} <span>${n}</span></a></li>`;
    })
    .join('')}</ul>
${groups
  .map((g) => {
    const entries = catalog.filter((e) => e.kind === g.kind);
    return `<section id="${anchor(g)}">
<h2>${g.title}<span class="zh" lang="zh-Hans">${g.titleZh}</span></h2>
<p class="intro">${escape(g.intro)}</p>
<ul class="cards">${entries.map(card).join('')}</ul>
</section>`;
  })
  .join('\n')}
<footer>
<p>Part of a coffee-named series: ${siblings.map(([name, what]) => `<a href="https://github.com/L-Jovi/${name}">${name}</a> (${what})`).join(', ')}.</p>
<p>Original code and documentation are MIT licensed. <a href="${source.replace('/tree/main/', '')}">github.com/L-Jovi/latte-web</a></p>
</footer>
</body>
</html>
`,
);

const disposition = read('docs/baseline-files.json').map((path) => {
  const rule = migration.entries
    .filter((entry) => path === entry.old || path.startsWith(entry.old + '/'))
    .sort((a, b) => b.old.length - a.old.length)[0];
  if (!rule) throw new Error(`Unmapped baseline file: ${path}`);
  return {
    old: path,
    rule: rule.old,
    action: rule.action,
    new: rule.new,
    history: rule.action === 'withdrawn' ? null : base + encodeURI(path),
  };
});
const withdrawnFiles = disposition.filter(
  (d) => d.action === 'withdrawn',
).length;
for (const zh of [false, true]) {
  const suffix = zh ? '.zh-Hans' : '';
  let ledger = `# ${zh ? '迁移清单' : 'Migration ledger'}\n\n${zh ? '[English](migration.md) | 简体中文\n\n> 对应英文版：两种语言由同一份迁移数据同时生成，内容始终同步。' : 'English | [简体中文](migration.zh-Hans.md)'}\n\n${zh ? `基线：[${migration.baseline.slice(0, 7)}](${base})，即 2026 年重新整理之前的最后一次提交。当时共有 ${disposition.length} 个跟踪文件、20 个主题目录和 24 个 Node 包；其中标为 withdrawn 的 ${withdrawnFiles} 个文件后来已从 Git 历史中删除。` : `Baseline: [${migration.baseline.slice(0, 7)}](${base}), the last commit before the 2026 reorganization. It had ${disposition.length} tracked files in 20 topic folders and 24 Node packages; the ${withdrawnFiles} files marked withdrawn were later removed from Git history.`}\n\n`;
  ledger += zh
    ? '最具体的路径规则优先；目录规则覆盖其中所有源文件、资源和配置。退役内容可从固定提交恢复。`pending` 尚未迁移；`retain` 保留教学机制；`merge` 提取并合并；`rewrite` 更新底座或入口；`historical` 仅保留历史阅读；`retire` 从当前树移除；`withdrawn` 因隐私或版权撤下，不提供链接。新入口 README 记录教学目的和验证命令。\n'
    : 'The most specific path rule wins; directory rules include source, assets and configuration. Retired content is recoverable at the fixed commit. `pending` awaits migration; `retain` preserves a mechanism; `merge` extracts into another example; `rewrite` updates the entry or runtime; `historical` is reading only; `retire` removes content from the current tree; `withdrawn` removes it for privacy or rights reasons and is not linked. Destination READMEs describe purpose and verification.\n';
  ledger += zh
    ? '\n| 原入口（历史） | 处理 | 新入口 | 理由 | 批次 |\n| --- | --- | --- | --- | --- |\n'
    : '\n| Original (history) | Decision | Destination | Rationale | Batch |\n| --- | --- | --- | --- | --- |\n';
  ledger +=
    migration.entries
      .map(
        (e) =>
          `| ${e.action === 'withdrawn' ? e.old : `[${e.old}](${base}${encodeURI(e.old)})`} | ${e.action} | ${e.new ? `[${e.new}](../${e.new})` : '—'} | ${zh ? e.reasonZh : e.reason} | ${e.phase ?? '—'} |`,
      )
      .join('\n') + '\n';
  emit(`docs/migration${suffix}.md`, ledger);
}

emit(
  'docs/baseline-disposition.json',
  JSON.stringify(disposition, null, 2) + '\n',
);

if (check) {
  const stale = [...outputs].filter(
    ([path, content]) =>
      !existsSync(path) || readFileSync(path, 'utf8') !== content,
  );
  if (stale.length) {
    console.error(
      `Generated files are out of date; run npm run docs:generate:\n${stale.map(([path]) => `  ${path}`).join('\n')}`,
    );
    process.exit(1);
  }
  console.log(`All ${outputs.size} generated files are up to date.`);
} else {
  for (const [path, content] of outputs) {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content);
  }
  console.log(
    `Generated navigation for ${catalog.length} learning units; ${migration.entries.length} migration rules.`,
  );
}
