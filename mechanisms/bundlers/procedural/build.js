// Retains the original parse -> graph -> emit organization.
// Source inspiration: https://zhuanlan.zhihu.com/p/76969308
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { parse } from '@babel/parser';
import traverseModule from '@babel/traverse';
import { transformFromAstSync } from '@babel/core';
const traverse = traverseModule.default || traverseModule;
export function analyze(filename) {
  const source = readFileSync(filename, 'utf8');
  const ast = parse(source, { sourceType: 'module' });
  const dependencies = {};
  traverse(ast, {
    ImportDeclaration({ node }) {
      const request = node.source.value;
      if (!request.startsWith('.'))
        throw new Error('Only relative JavaScript imports are supported');
      dependencies[request] = resolve(dirname(filename), request);
    },
  });
  const { code } = transformFromAstSync(ast, source, {
    plugins: ['@babel/plugin-transform-modules-commonjs'],
    babelrc: false,
    configFile: false,
  });
  return { dependencies, code };
}
export function createGraph(entry) {
  const graph = {};
  const queue = [resolve(entry)];
  for (const filename of queue) {
    if (graph[filename]) continue;
    graph[filename] = analyze(filename);
    queue.push(...Object.values(graph[filename].dependencies));
  }
  return graph;
}
export function bundle(entry) {
  const filename = resolve(entry),
    graph = createGraph(filename);
  return `(function(graph){
    const cache=Object.create(null);
    function load(id){
      if(cache[id])return cache[id].exports;
      const module=cache[id]={exports:{}};
      const localRequire=request=>load(graph[id].dependencies[request]);
      new Function('require','module','exports',graph[id].code)(localRequire,module,module.exports);
      return module.exports;
    }
    return load(${JSON.stringify(filename)});
  })(${JSON.stringify(graph)})`;
}
export function build(entry, output) {
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, bundle(entry));
}
