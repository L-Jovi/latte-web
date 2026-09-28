import { test, expect } from '@playwright/test';
const root = '/examples/visuals/';
test('dot clock renders pixels and counts down from a fresh deadline', async ({
  page,
}) => {
  await page.goto(root + 'clock/');
  expect(
    await page.locator('canvas').evaluate((canvas) =>
      canvas
        .getContext('2d')
        .getImageData(0, 0, 1024, 420)
        .data.some((value, i) => i % 4 === 3 && value > 0),
    ),
  ).toBe(true);
  await page.getByRole('button').click();
  await expect(page.locator('output')).toHaveText('10 seconds remaining');
  await expect(page.locator('output')).toHaveText('9 seconds remaining');
});
test('canvas filters change actual pixels and controls support keyboard', async ({
  page,
}) => {
  await page.goto(root + 'canvas-image/');
  await expect(page.locator('output')).toHaveText('none; scale 1');
  const pixel = () =>
    page
      .locator('canvas')
      .evaluate((canvas) => [
        ...canvas.getContext('2d').getImageData(20, 20, 1, 1).data,
      ]);
  const original = await pixel();
  await page.getByRole('button', { name: 'Invert', exact: true }).click();
  expect(await pixel()).toEqual(
    original.map((value, i) => (i === 3 ? value : 255 - value)),
  );
  await page.getByRole('button', { name: 'Grayscale' }).click();
  const grey = await pixel();
  expect(grey[0]).toBe(grey[1]);
  expect(grey[1]).toBe(grey[2]);
  await page.getByLabel('Scale', { exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('output')).toContainText('scale 1.1');
  await page.getByLabel('Magnifier', { exact: true }).check();
  await page.getByLabel('Image canvas').focus();
  await page.keyboard.press('ArrowRight');
  await page.getByLabel('Watermark', { exact: true }).check();
  await page.getByRole('button', { name: 'Mosaic', exact: true }).click();
  await expect(page.locator('output')).toContainText('mosaic');
});
test('mouse and pointer drag share bounds; pointer also supports keyboard', async ({
  page,
}) => {
  await page.goto(root + 'drag/');
  for (const name of ['Mouse', 'Pointer']) {
    const block = page.getByRole('button', { name, exact: true });
    const rect = await block.boundingBox();
    await page.mouse.move(rect.x + 20, rect.y + 20);
    await page.mouse.down();
    await page.mouse.move(rect.x + 150, rect.y + 80);
    await page.mouse.up();
    expect(await block.evaluate((node) => node.offsetLeft)).toBe(130);
  }
  const pointer = page.getByRole('button', { name: 'Pointer', exact: true });
  await pointer.focus();
  await page.keyboard.press('ArrowRight');
  expect(await pointer.evaluate((node) => node.offsetLeft)).toBe(140);
});
test('touch and pointer paging handle gestures, keyboard and end bounds', async ({
  page,
}) => {
  await page.goto(root + 'paging/');
  const touch = page.getByLabel('Touch pages');
  await touch.evaluate((node) => {
    for (const [type, x] of [
      ['touchstart', 250],
      ['touchmove', 100],
      ['touchend', 100],
    ]) {
      const event = new Event(type, { bubbles: true, cancelable: true });
      Object.defineProperty(
        event,
        type === 'touchend' ? 'changedTouches' : 'touches',
        { value: [{ clientX: x, clientY: 40 }] },
      );
      node.dispatchEvent(event);
    }
  });
  await expect(page.locator('#touch output')).toHaveText('Page 2 of 3');
  await touch.focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#touch output')).toHaveText('Page 3 of 3');
  await expect(
    page.getByRole('button', { name: 'Next touch page' }),
  ).toBeDisabled();
  const pointer = page.getByLabel('Pointer pages');
  await pointer.scrollIntoViewIfNeeded();
  const rect = await pointer.boundingBox();
  await page.mouse.move(rect.x + 100, rect.y + 150);
  await page.mouse.down();
  await page.mouse.move(rect.x + 100, rect.y + 30);
  await page.mouse.up();
  await expect(page.locator('#pointer output')).toHaveText('Page 2 of 3');
});
test('layer geometry and native scroll snap select the next card', async ({
  page,
}) => {
  await page.goto(root + 'carousel/');
  await page.getByRole('button', { name: 'Next layered card' }).click();
  await expect(page.locator('#layers output')).toHaveText('Card 2');
  await expect(page.locator('#layers [aria-current=true]')).toHaveText(
    'Card 2',
  );
  await page.getByRole('button', { name: 'Next snap card' }).click();
  await expect(page.locator('#snap output')).toHaveText('Card 2');
  await page.getByRole('button', { name: 'Previous snap card' }).click();
  await expect(page.locator('#snap output')).toHaveText('Card 1');
});
test('search suggestions select with keys and dismiss with Escape', async ({
  page,
}) => {
  await page.goto(root + 'search/');
  const input = page.getByRole('combobox');
  await input.fill('graph');
  await expect(page.getByRole('option')).toHaveText('GraphQL');
  await input.press('ArrowDown');
  await input.press('Enter');
  await expect(page.locator('output')).toHaveText('Selected: GraphQL');
  await input.fill('css');
  await input.press('Escape');
  await expect(page.getByRole('listbox')).toBeHidden();
});
test('photo focus, motion controls and reduced-motion spinner', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto(root + 'photo-wall/');
  await page.getByRole('button', { name: 'Landscape 1', exact: true }).focus();
  await expect(
    page.getByRole('button', { name: 'Landscape 1', exact: true }),
  ).toBeFocused();
  await expect
    .poll(() =>
      page
        .getByRole('button', { name: 'Landscape 1', exact: true })
        .evaluate((node) => new DOMMatrix(getComputedStyle(node).transform).a),
    )
    .toBeCloseTo(1.08);
  await page.goto(root + 'motion/');
  for (const name of ['JavaScript tween', 'CSS transition']) {
    const link = page.getByRole('link', { name, exact: true });
    await link.focus();
    await expect
      .poll(() =>
        link.evaluate((node) => Math.round(node.getBoundingClientRect().width)),
      )
      .toBe(260);
  }
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.locator('[aria-current=step]')).toHaveText('Run');
  await page.getByRole('slider', { name: 'Progress', exact: true }).fill('70');
  await expect(page.getByRole('progressbar')).toHaveAttribute(
    'aria-valuenow',
    '70',
  );
  await page.goto(root + 'lottery/');
  await page.getByRole('button', { name: 'Spin' }).click();
  await expect(page.locator('output')).toHaveText(/Selected: [A-D]/);
  await expect(page.getByRole('button')).toBeEnabled();
});
test('performance entries report measured work and feature availability', async ({
  page,
}) => {
  await page.goto('/examples/performance/dist/');
  await expect(page.locator('#navigation')).toContainText('ttfb');
  await page.getByRole('button', { name: 'Run 120 ms of work' }).click();
  await expect(page.locator('output')).toContainText('Measured work:');
  await expect(page.locator('#entries')).toContainText(
    'measure: controlled-work',
  );
  for (const id of ['LCP', 'INP', 'CLS'])
    expect(await page.locator('#' + id).textContent()).not.toBe('');
  await page.getByRole('button', { name: 'Insert late content' }).click();
  await expect(page.locator('.late')).toHaveText('Late content changes layout');
});
