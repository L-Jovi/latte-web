import Handlebars from 'handlebars';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
const source = await readFile('index.handlebars', 'utf8');
const data = { info: '<img src=x onerror=alert(1)>' };
await mkdir('dist', { recursive: true });
await writeFile(
  'dist/index.html',
  '<!doctype html><html lang="en"><meta charset="utf-8"><title>Escaped template</title><h1>Escaped Handlebars input</h1>' +
    Handlebars.compile(source)(data) +
    '</html>',
);
await writeFile(
  'dist/template.cjs',
  'module.exports = require("handlebars/runtime").template(' +
    Handlebars.precompile(source) +
    ');',
);
