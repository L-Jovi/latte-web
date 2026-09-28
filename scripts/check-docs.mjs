import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
const root = process.cwd();
const read = (path) => JSON.parse(readFileSync(path, 'utf8'));
const catalog = read('docs/catalog.json'),
  migration = read('docs/migration.json'),
  baseline = read('docs/baseline-files.json');
const errors = [];
const files = new Set([
  'README.md',
  'README.zh-Hans.md',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'SECURITY.md',
  'NOTICE.md',
  'docs/migration.md',
  'docs/migration.zh-Hans.md',
]);
const walk = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', 'dist', 'target', 'pkg', '.git'].includes(entry.name))
      continue;
    const path = `${dir}/${entry.name}`;
    if (entry.isDirectory()) walk(path);
    else if (/\.md$/.test(path)) files.add(path);
  }
};
walk('docs');
for (const dir of ['fundamentals', 'mechanisms', 'tooling', 'examples'])
  for (const name of ['README.md', 'README.zh-Hans.md'])
    files.add(`${dir}/${name}`);
for (const entry of catalog) {
  for (const name of ['README.md', 'README.zh-Hans.md'])
    if (!existsSync(`${entry.path}/${name}`))
      errors.push(`Missing ${entry.path}/${name}`);
  if (existsSync(entry.path)) walk(entry.path);
  else errors.push(`Missing catalog directory ${entry.path}`);
  for (const page of entry.pages || [])
    if (!existsSync(page)) errors.push(`Missing browser entry ${page}`);
}
for (const path of baseline) {
  const rule = migration.entries
    .filter((e) => path === e.old || path.startsWith(e.old + '/'))
    .sort((a, b) => b.old.length - a.old.length)[0];
  if (!rule) errors.push(`Unmapped baseline file: ${path}`);
}
for (const entry of migration.entries) {
  if (migration.complete && entry.action === 'pending')
    errors.push(`Pending migration: ${entry.old}`);
  if (entry.new && !existsSync(entry.new))
    errors.push(`Missing migration destination: ${entry.new}`);
}
for (const file of files) {
  if (!existsSync(file)) {
    errors.push(`Missing document ${file}`);
    continue;
  }
  // Chinese mirrors must say which English version they follow (team README policy §6.2).
  if (
    file.endsWith('.zh-Hans.md') &&
    !readFileSync(file, 'utf8').includes('对应英文版')
  )
    errors.push(`${file}: missing the 对应英文版 sync line`);
  const source = readFileSync(file, 'utf8').replace(/```[\s\S]*?```/g, '');
  for (const match of source.matchAll(
    /!?\[[^\]]*\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g,
  )) {
    const url = match[1];
    if (/^(https?:|mailto:|#)/.test(url)) continue;
    const path = resolve(
      dirname(resolve(root, file)),
      decodeURIComponent(url.split('#')[0]),
    );
    if (!existsSync(path)) errors.push(`${file}: broken link ${url}`);
  }
}
const disposition = read('docs/baseline-disposition.json');
if (
  disposition.length !== baseline.length ||
  new Set(disposition.map((entry) => entry.old)).size !== baseline.length
)
  errors.push('Per-file migration coverage differs from baseline');
for (const item of disposition) {
  const rule = migration.entries
    .filter(
      (entry) => item.old === entry.old || item.old.startsWith(entry.old + '/'),
    )
    .sort((a, b) => b.old.length - a.old.length)[0];
  if (
    !rule ||
    item.rule !== rule.old ||
    item.action !== rule.action ||
    item.new !== rule.new
  )
    errors.push(`Stale per-file migration: ${item.old}`);
  if (item.action === 'withdrawn' && item.history !== null)
    errors.push(`Withdrawn file must not link to history: ${item.old}`);
}
// Material withdrawn for privacy or rights reasons must never be linked again.
const history = `https://github.com/L-Jovi/latte-web/tree/${migration.baseline}/`;
for (const entry of migration.entries.filter((e) => e.action === 'withdrawn'))
  for (const ledger of ['docs/migration.md', 'docs/migration.zh-Hans.md'])
    if (
      readFileSync(ledger, 'utf8').includes(
        `](${history}${encodeURI(entry.old)}`,
      )
    )
      errors.push(`${ledger}: links withdrawn path ${entry.old}`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(
  `Checked ${files.size} documents, ${catalog.length} units and all ${baseline.length} baseline files.`,
);
