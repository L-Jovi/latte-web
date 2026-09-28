import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { runInNewContext } from 'node:vm';
import { createRequire } from 'node:module';
import { bundle } from '../../mechanisms/bundlers/procedural/build.js';
import { Compiler } from '../../mechanisms/bundlers/layered/lib/compiler.js';
const require = createRequire(import.meta.url);
for (const [name, compile] of [
  ['procedural', bundle],
  ['layered', (entry) => new Compiler({ entry }).run()],
]) {
  test(`${name}: diamond and circular imports are evaluated once`, () => {
    const dir = mkdtempSync(join(tmpdir(), 'latte-bundler-'));
    try {
      const files = {
        'entry.js':
          "import {a} from './a.js';import {b} from './b.js';export const answer=a+b;",
        'a.js': "import {one} from './shared.js';export const a=one;",
        'b.js': "import {one} from './shared.js';export const b=one+1;",
        'shared.js':
          "import './entry.js';globalThis.executions++;export const one=1;",
      };
      for (const [file, source] of Object.entries(files))
        writeFileSync(join(dir, file), source);
      const context = { executions: 0 };
      const result = runInNewContext(compile(join(dir, 'entry.js')), context);
      assert.equal(result.answer, 3);
      assert.equal(context.executions, 1);
      writeFileSync(join(dir, 'bad.js'), "import 'node:fs';");
      assert.throws(() => compile(join(dir, 'bad.js')), /relative/);
    } finally {
      rmSync(dir, { recursive: true, force: true });
    }
  });
}
test('Webpack library output can be loaded by a real CommonJS consumer', () => {
  const numbers = require('../../tooling/webpack/library/dist/numbers.cjs');
  assert.equal(numbers.numToWord(0), 'Zero');
  assert.equal(numbers.wordToNum('tWo'), 2);
  assert.equal(numbers.wordToNum('unknown'), -1);
});
test('Webpack plugin emits a report containing its actual bundle', () => {
  const report = readFileSync(
    'tooling/webpack/plugins/dist/FILELIST.md',
    'utf8',
  );
  assert.match(report, /bundle\.js/);
  assert.match(report, /index\.html/);
});
test('Handlebars runtime-only output escapes input like the compiler', () => {
  const template = require('../../tooling/handlebars/dist/template.cjs');
  const text = template({ info: '<img onerror="bad()">' });
  assert.match(text, /&lt;img/);
  assert.doesNotMatch(text, /<img/);
});
test('typed reducer preserves state shape and the minimum count', async () => {
  const { enthusiasm } =
    await import('../../fundamentals/typescript/dist/reducers/index.js');
  const initial = enthusiasm(undefined, { type: 'DECREMENT_ENTHUSIASM' });
  assert.equal(initial.enthusiasmLevel, 1);
  assert.equal(
    enthusiasm(initial, { type: 'INCREMENT_ENTHUSIASM' }).enthusiasmLevel,
    2,
  );
});
for (const format of ['vite', 'webpack'])
  test(`${format} component package loads and server-renders from built CJS`, () => {
    const { Card, Button } = require(
      '../../examples/components/dist/' + format + '/index.cjs',
    );
    const React = require('react');
    const { renderToStaticMarkup } = require('react-dom/server');
    assert.match(
      renderToStaticMarkup(
        React.createElement(
          Card,
          null,
          React.createElement(Button, { message: 'Loaded package' }),
        ),
      ),
      /Loaded package/,
    );
  });
