import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  filterPixels,
  procedural,
} from '../../examples/visuals/canvas-image/pixels.js';
import { slots } from '../../examples/visuals/carousel/geometry.js';
test('pixel filters preserve alpha/source and clamp edge neighborhoods', () => {
  const source = new Uint8ClampedArray([255, 0, 0, 128, 0, 0, 255, 255]);
  const original = source.slice();
  assert.deepEqual(
    [...filterPixels(source, 2, 1, 'invert')],
    [0, 255, 255, 128, 255, 255, 0, 255],
  );
  assert.deepEqual(
    [...filterPixels(source, 2, 1, 'blur')],
    [128, 0, 128, 128, 128, 0, 128, 255],
  );
  assert.deepEqual(
    [...filterPixels(source, 2, 1, 'mosaic')],
    [128, 0, 128, 128, 128, 0, 128, 255],
  );
  assert.deepEqual(source, original);
  const grey = filterPixels(source, 2, 1, 'grey');
  assert.equal(grey[0], grey[1]);
  assert.equal(grey[1], grey[2]);
  assert.equal(procedural(3, 2).length, 24);
});
test('carousel slots wrap while keeping exactly one front card', () => {
  for (let current = 0; current < 5; current++) {
    const positions = slots(5, current);
    assert.equal(positions[current].x, 0);
    assert.equal(positions[current].scale, 1);
    assert.equal(positions.filter((slot) => slot.z === 5).length, 1);
    assert.equal(new Set(positions.map((slot) => slot.x)).size, 5);
  }
});
