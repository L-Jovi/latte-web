import test from 'node:test';
import assert from 'node:assert/strict';
import { forgeCompose } from '../../mechanisms/compose/index.js';
test('compose supports identity and forwards multiple arguments to the innermost function', () => {
  assert.equal(forgeCompose()(7), 7);
  assert.equal(
    forgeCompose(
      (x) => x * 2,
      (a, b) => a + b,
    )(3, 4),
    14,
  );
});
