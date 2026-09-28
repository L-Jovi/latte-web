import { cpSync, rmSync, mkdirSync } from 'node:fs';

// Copies the public learning pages into a static site for GitHub Pages.
// Run `npm run build` with LATTE_PAGES_BASE=/latte-web/ first.
const out = process.argv[2] ?? '_site';
const publish = [
  'index.html',
  'fundamentals',
  'mechanisms',
  'tooling',
  'examples',
];
// Dependencies, dotfiles and the GraphQL server are not web pages.
const skip =
  /(^|\/)(node_modules|\.[^/]+)(\/|$)|^examples\/graphql\/server(\/|$)/;
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const path of publish)
  cpSync(path, `${out}/${path}`, {
    recursive: true,
    filter: (source) => !skip.test(source),
  });
console.log(`Assembled the GitHub Pages site in ${out}/`);
