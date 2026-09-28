import { Compiler } from './compiler.js';
new Compiler({
  entry: 'layered/src/index.js',
  output: 'dist/layered.js',
}).run();
