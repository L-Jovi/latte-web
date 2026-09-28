import { resolve, dirname } from 'node:path';
import { mkdirSync, writeFileSync } from 'node:fs';
import { parseModule } from './parser.js';
export class Compiler {
  constructor({ entry, output }) {
    this.entry = resolve(entry);
    this.output = output;
    this.modules = new Map();
  }
  buildModule(filename) {
    if (this.modules.has(filename)) return;
    const module = parseModule(filename);
    // Register before traversing: a cycle must not recurse forever.
    this.modules.set(filename, module);
    for (const dependency of Object.values(module.dependencies))
      this.buildModule(dependency);
  }
  emit() {
    const modules = Object.fromEntries(this.modules);
    return `(function(modules){
      const cache=Object.create(null);
      function requireModule(id){
        if(cache[id])return cache[id].exports;
        const module=cache[id]={exports:{}};
        const require=request=>requireModule(modules[id].dependencies[request]);
        new Function('require','module','exports',modules[id].code)(require,module,module.exports);
        return module.exports;
      }
      return requireModule(${JSON.stringify(this.entry)});
    })(${JSON.stringify(modules)})`;
  }
  run() {
    this.modules.clear();
    this.buildModule(this.entry);
    const code = this.emit();
    if (this.output) {
      mkdirSync(dirname(this.output), { recursive: true });
      writeFileSync(this.output, code);
    }
    return code;
  }
}
