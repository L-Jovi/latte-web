import { cpSync, rmSync, mkdirSync, readFileSync } from 'node:fs';

// Copies the public learning pages into a static site for GitHub Pages.
// Run `npm run build` with LATTE_PAGES_BASE=/latte-web/ first.
const out = process.argv[2] ?? '_site';
const publish = [
  'index.html',
  'assets',
  'fundamentals',
  'mechanisms',
  'tooling',
  'examples',
];
// Dependencies, dotfiles, the GraphQL server and Storybook's build are not
// pages of the site. Storybook's interface is English only and has no
// language switch; its README shows how to run it locally.
const skip =
  /(^|\/)(node_modules|\.[^/]+|storybook-static)(\/|$)|^examples\/graphql\/server(\/|$)/;
// The site's pages are the index and the pages listed in docs/catalog.json,
// which the browser tests open in both languages. Any other HTML file in these
// folders is a build's template, whose built copy in dist/ is the page, or a
// sample for the browser console. On its own, a template can show both
// languages at once, so only the listed pages are published.
const catalog = JSON.parse(readFileSync('docs/catalog.json', 'utf8'));
const pages = new Set([
  'index.html',
  ...catalog.flatMap((entry) => entry.pages ?? []),
]);
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const path of publish)
  cpSync(path, `${out}/${path}`, {
    recursive: true,
    filter: (source) =>
      !skip.test(source) && (!source.endsWith('.html') || pages.has(source)),
  });
console.log(`Assembled the GitHub Pages site in ${out}/`);
