import { cpSync, rmSync, mkdirSync, readdirSync } from 'node:fs';
import { dirname } from 'node:path';

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
// Dependencies, dotfiles and the GraphQL server are not web pages.
const skip =
  /(^|\/)(node_modules|\.[^/]+)(\/|$)|^examples\/graphql\/server(\/|$)/;
// An HTML file beside a Vite or webpack config is that build's template. Its
// paths are written for the built copy in dist/, so on its own it can load
// neither the site's stylesheet nor its language switch: only the build is
// published.
const template = (source) =>
  source.endsWith('.html') &&
  readdirSync(dirname(source)).some((name) =>
    /^(vite|webpack)\.config\./.test(name),
  );
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
for (const path of publish)
  cpSync(path, `${out}/${path}`, {
    recursive: true,
    filter: (source) => !skip.test(source) && !template(source),
  });
console.log(`Assembled the GitHub Pages site in ${out}/`);
