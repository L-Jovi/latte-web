import { build } from './procedural/build.js';
import { Compiler } from './layered/lib/compiler.js';
import { writeFileSync } from 'node:fs';
build('procedural/src/index.js', 'dist/procedural.js');
new Compiler({
  entry: 'layered/src/index.js',
  output: 'dist/layered.js',
}).run();
writeFileSync(
  'dist/index.html',
  '<!doctype html><html lang="en"><meta charset="utf-8"><title>Two small bundlers</title><h1>Two small bundlers</h1><p>Both bundles log their greeting. Inspect the generated dependency graph in dist.</p><script src="procedural.js"></script><script src="layered.js"></script></html>',
);
