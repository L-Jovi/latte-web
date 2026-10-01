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
    site.pair(
      'The procedural bundle logs <code>my lord saber</code> to the browser console. The layered bundle writes its greeting below. Both files sit next to this page in <code>dist/</code>.',
      '过程式版本打出的包在浏览器控制台里打印 <code>my lord saber</code>。分层版打出的包把问候语写在下面。两个文件都和这个页面一起放在 <code>dist/</code> 里。',
      'p',
    ) +
      '<script src="procedural.js"></script><script src="layered.js"></script>',
  ),
);
