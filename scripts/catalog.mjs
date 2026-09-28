import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

// `--check` compares every generated file with the working tree and writes nothing.
const check = process.argv.includes('--check');
const read = (path) => JSON.parse(readFileSync(path, 'utf8'));
const catalog = read('docs/catalog.json');
const migration = read('docs/migration.json');
const base = `https://github.com/L-Jovi/latte-web/tree/${migration.baseline}/`;
const source = 'https://github.com/L-Jovi/latte-web/tree/main/';
const live = 'https://l-jovi.github.io/latte-web/';
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
const escape = (s) =>
  s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;');
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

// The learning index is served locally by `npm run dev` and on GitHub Pages, so links stay relative.
const card = (e) => {
  const title = escape(e.title);
  const heading = demo(e)
    ? `<a href="${e.pages[0]}">${title}</a>`
    : e.pages?.length
      ? `<a href="${e.pages[0]}">${title}</a> <span class="tag">runs locally · 需本地运行</span>`
      : title;
  return `<li><h3>${heading}</h3><p lang="zh-Hans" class="zh">${escape(e.titleZh)}</p><p>${escape(e.summary)}</p><p class="links"><a href="${source}${e.path}">Read · 阅读</a></p></li>`;
};
emit(
  'index.html',
  `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Learn how the web works by building small versions of it.">
<link rel="icon" href="data:,">
<title>Latte Web · learning index</title>
<style>
:root{color-scheme:light dark;--fg:#1d2a38;--muted:#5b6876;--link:#1456a0;--card:#f5f7fa;--line:#dde3ea}
@media (prefers-color-scheme:dark){:root{--fg:#e6ebf1;--muted:#9aa7b4;--link:#7ab7ff;--card:#18212b;--line:#2a3542}}
*{box-sizing:border-box}
body{margin:0;font:17px/1.6 system-ui,sans-serif;color:var(--fg);background:Canvas}
main{max-width:72rem;margin:0 auto;padding:2.5rem 1rem 4rem}
h1{font-size:2.2rem;margin:0}
h2{margin:2.5rem 0 .25rem}
h3{font-size:1.05rem;margin:0}
a{color:var(--link)}
.lead,.zh,.intro{color:var(--muted);margin:.25rem 0}
ul{list-style:none;padding:0;display:grid;gap:.75rem;grid-template-columns:repeat(auto-fill,minmax(19rem,1fr))}
li{background:var(--card);border:1px solid var(--line);border-radius:.6rem;padding:.9rem 1rem}
li p{margin:.3rem 0}
.links{font-size:.9rem}
.tag{font-size:.75rem;font-weight:normal;color:var(--muted)}
</style>
</head>
<body>
<main>
<h1>Latte Web</h1>
<p class="lead">Learn how the web works by building small versions of it.</p>
<p class="lead" lang="zh-Hans">从零实现一些小版本，看懂 Web 是怎样工作的。</p>
<p><a href="${source.replace('/tree/main/', '')}">Source on GitHub</a> · <a href="${source}README.zh-Hans.md">中文说明</a></p>
${groups
  .map((g) => {
    const entries = catalog.filter((e) => e.kind === g.kind);
    return `<section>
<h2>${g.title} · <span lang="zh-Hans">${g.titleZh}</span></h2>
<p class="intro">${escape(g.intro)}</p>
<ul>${entries.map(card).join('')}</ul>
</section>`;
  })
  .join('\n')}
</main>
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
