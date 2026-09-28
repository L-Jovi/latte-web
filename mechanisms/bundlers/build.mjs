import { build } from './procedural/build.js';
import { Compiler } from './layered/lib/compiler.js';
import { writeFileSync } from 'node:fs';
import site from '../../scripts/site.cjs';
build('procedural/src/index.js', 'dist/procedural.js');
new Compiler({
  entry: 'layered/src/index.js',
  output: 'dist/layered.js',
}).run();
writeFileSync(
  'dist/index.html',
  site.page(
    'mechanisms/bundlers/dist/index.html',
    '<p>The procedural bundle logs <code>my lord saber</code> to the browser console. The layered bundle writes its greeting below. Both files sit next to this page in <code>dist/</code>.</p><script src="procedural.js"></script><script src="layered.js"></script>',
  ),
);
