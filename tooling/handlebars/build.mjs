import Handlebars from 'handlebars';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import site from '../../scripts/site.cjs';
const source = await readFile('index.handlebars', 'utf8');
const data = { info: '<img src=x onerror=alert(1)>' };
await mkdir('dist', { recursive: true });
await writeFile(
  'dist/index.html',
  site.page(
    'tooling/handlebars/dist/index.html',
    '<h2><span data-l="en">What <code>{{info}}</code> printed</span><span data-l="zh"><code>{{info}}</code> 输出了什么</span></h2>' +
      Handlebars.compile(source)(data),
  ),
);
await writeFile(
  'dist/template.cjs',
  'module.exports = require("handlebars/runtime").template(' +
    Handlebars.precompile(source) +
    ');',
);
