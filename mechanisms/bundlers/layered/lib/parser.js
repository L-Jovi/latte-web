import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { parse } from '@babel/parser';
import { transformFromAstSync } from '@babel/core';
export function parseModule(filename) {
  const source = readFileSync(filename, 'utf8');
  const ast = parse(source, { sourceType: 'module' });
  const dependencies = {};
  for (const node of ast.program.body) {
    if (node.type !== 'ImportDeclaration') continue;
    const request = node.source.value;
    if (!request.startsWith('.'))
      throw new Error('Only relative JavaScript imports are supported');
    dependencies[request] = resolve(dirname(filename), request);
  }
  const { code } = transformFromAstSync(ast, source, {
    plugins: ['@babel/plugin-transform-modules-commonjs'],
    babelrc: false,
    configFile: false,
  });
  return { dependencies, code };
}
