import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
const read = path => JSON.parse(readFileSync(path,'utf8'));
const catalog=read('docs/catalog.json');
const migration=read('docs/migration.json');
const base=`https://github.com/L-Jovi/latte-web/tree/${migration.baseline}/`;
const groups=[['foundation','fundamentals','Foundations','基础'],['mechanism','mechanisms','Handwritten mechanisms','手写机制'],['tooling','tooling','Toolchains','工具链'],['example','examples','Applications and browser experiments','应用与浏览器实验'],['history','docs/history','Historical research','历史研究']];
const escape=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
for(const zh of [false,true]) {
  const suffix=zh?'.zh-Hans':'';
  let body=zh?`# latte-web\n\n[English](README.md) | 简体中文\n\n一组解释 Web 如何工作的学习实验：先看可观察的行为，再读最小实现，最后比较现代工具解决了哪些问题。手写练习有明确边界，并不作为生产库发布。\n\n## 开始阅读与运行\n\n需要 Node 24 LTS 和 npm 11。在仓库根目录执行：\n`:`# latte-web\n\nEnglish | [简体中文](README.zh-Hans.md)\n\nSmall experiments explaining how the Web works. Observe a behavior, read the smallest useful implementation, then compare it with a modern tool. Handwritten exercises have explicit limits; they are not published production libraries.\n\n## Read and run\n\nUse Node 24 LTS and npm 11. From the repository root:\n`;
  body+='\n```sh\nnpm ci\nnpm run dev\n# Open http://127.0.0.1:4173\n```\n\n';
  body+=zh?'应用和工具链的命令写在各项目 README；根入口提供静态实验导航。普通 JavaScript 安装不需要 Rust。\n\n## 学习路线\n\n按基础 → 手写机制 → 工具链 → 应用实践阅读，也可以直接选一个问题。\n':'Application and toolchain commands live in their own READMEs. The root server is the static experiment index. JavaScript installation does not require Rust.\n\n## Learning path\n\nRead foundations → handwritten mechanisms → toolchains → applications, or choose one question directly.\n';
  for(const [kind,dir,title,titleZh] of groups) {
    const entries=catalog.filter(e=>e.kind===kind);
    if(!entries.length) continue;
    body+=`\n### ${zh?titleZh:title}\n\n`;
    body+=entries.map(e=>`- [${zh?e.titleZh:e.title}](${e.path}/README${suffix}.md) — ${e.status}`).join('\n')+'\n';
    mkdirSync(dir,{recursive:true});
    const relative='../'.repeat(dir.split('/').length);
    writeFileSync(`${dir}/README${suffix}.md`,`# ${zh?titleZh:title}\n\n${zh?'[English](README.md) | 简体中文':'English | [简体中文](README.zh-Hans.md)'}\n\n`+entries.map(e=>`- [${zh?e.titleZh:e.title}](${e.path.slice(dir.length+1)}/README${suffix}.md)`).join('\n')+`\n\n[${zh?'返回学习路线':'Learning path'}](${relative}README${suffix}.md)\n`);
  }
  body+=zh?'\n## 验证与维护状态\n\n```sh\nnpm run check\nnpx playwright install chromium firefox webkit\nnpm run test:browser\n```\n\n`maintained` 表示纳入当前检查；`historical` 仅作有出处的历史阅读。每个项目文档说明测试覆盖与刻意简化。没有统一产品版本或发布承诺。\n':'\n## Verification and maintenance\n\n```sh\nnpm run check\nnpx playwright install chromium firefox webkit\nnpm run test:browser\n```\n\n`maintained` entries participate in current checks; `historical` entries are attributed reading material. Each README describes verification and intentional limits. This collection has no single product version or release promise.\n';
  if(!migration.complete) body+=zh?'\n迁移仍分批进行：旧目录中的内容暂不属于已维护运行集合。\n':'\nMigration is in progress: content in the old directories is not yet part of the maintained runnable set.\n';
  body+=`\n[${zh?'迁移清单':'Migration ledger'}](docs/migration${suffix}.md) · [${zh?'贡献':'Contributing'}](CONTRIBUTING.md) · [${zh?'行为准则':'Code of conduct'}](CODE_OF_CONDUCT.md) · [${zh?'安全报告':'Security reporting'}](SECURITY.md)\n\n`;
  body+=zh?'## 许可\n\n原创代码使用 [MIT](LICENSE)。保留的第三方代码、GPL/ISC 子项目及署名以各目录和 [NOTICE](NOTICE.md) 为准；根许可证不覆盖这些许可。历史原文保留原语言。\n':'## License\n\nOriginal code is [MIT](LICENSE). Retained third-party code, GPL/ISC subprojects and attributions keep their own terms; see [NOTICE](NOTICE.md) and local license files. Historical prose stays in its original language.\n';
  writeFileSync(`README${suffix}.md`,body);
  let ledger=`# ${zh?'迁移清单':'Migration ledger'}\n\n${zh?'[English](migration.md) | 简体中文':'English | [简体中文](migration.zh-Hans.md)'}\n\n${zh?'基线':'Baseline'}: [${migration.baseline.slice(0,7)}](${base}) — 805 tracked files, 20 topic roots, 24 Node packages.\n\n`;
  ledger+=zh?'最具体的路径规则优先；目录规则覆盖其中所有源文件、资源和配置。退役内容可从固定提交恢复。`pending` 尚未迁移；`retain` 保留教学机制；`merge` 提取并合并；`rewrite` 更新底座或入口；`historical` 仅保留历史阅读；`retire` 从当前树移除。新入口 README 记录教学目的和验证命令。\n':'The most specific path rule wins; directory rules include source, assets and configuration. Retired content is recoverable at the fixed commit. `pending` awaits migration; `retain` preserves a mechanism; `merge` extracts into another example; `rewrite` updates the entry or runtime; `historical` is reading only; `retire` removes content from the current tree. Destination READMEs describe purpose and verification.\n';
  ledger+=zh?'\n| 原入口（历史） | 处理 | 新入口 | 理由 | 批次 |\n| --- | --- | --- | --- | --- |\n':'\n| Original (history) | Decision | Destination | Rationale | Batch |\n| --- | --- | --- | --- | --- |\n';
  ledger+=migration.entries.map(e=>`| [${e.old}](${base}${encodeURI(e.old)}) | ${e.action} | ${e.new?`[${e.new}](../${e.new})`:'—'} | ${zh?e.reasonZh:e.reason} | ${e.phase??'—'} |`).join('\n')+'\n';
  writeFileSync(`docs/migration${suffix}.md`,ledger);
}
writeFileSync('index.html',`<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" href="data:,"><title>latte-web learning index</title><style>body{font:18px/1.6 system-ui;max-width:70rem;margin:3rem auto;padding:0 1rem;color:#203040}a{color:#1456a0}li{margin:.5rem 0}small{color:#596775}</style><h1>latte-web</h1><p>Observe → read → compare. 基础 → 手写机制 → 工具链 → 应用实践。</p>`+groups.map(([kind,,title,titleZh])=>{const entries=catalog.filter(e=>e.kind===kind);return entries.length?`<section><h2>${title} · ${titleZh}</h2><ul>`+entries.map(e=>`<li>${e.pages?.length?`<a href="/${e.pages[0]}">${escape(e.title)}</a>`:escape(e.title)} <small>${escape(e.titleZh)} · ${e.status}</small> — <a href="/${e.path}/README.md">README</a></li>`).join('')+'</ul></section>':''}).join(''));
console.log(`Generated navigation for ${catalog.length} learning units; ${migration.entries.length} migration rules.`);
