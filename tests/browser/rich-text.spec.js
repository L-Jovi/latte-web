import { test, expect } from '@playwright/test';
test('Range restores the insertion point after focus leaves the editor', async ({
  page,
}) => {
  await page.goto('/mechanisms/selection/index.html');
  const editor = page.getByRole('textbox', { name: 'Editor', exact: true });
  await editor.focus();
  await editor.evaluate((element) => {
    const range = document.createRange();
    range.setStart(element.firstChild, 5);
    range.collapse(true);
    const selection = getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    element.dispatchEvent(new KeyboardEvent('keyup'));
  });
  await page.getByRole('textbox', { name: 'Text to insert' }).fill('✨');
  await page.getByRole('button', { name: 'Insert at saved cursor' }).click();
  await expect(editor).toHaveText('Hello✨ world');
  await page.keyboard.type('!');
  await expect(editor).toHaveText('Hello✨! world');
});
test('highlight rebuild preserves caret and treats markup as text', async ({
  page,
}) => {
  await page.goto('/mechanisms/selection/ec-richtext.html');
  const editor = page.getByRole('textbox', { name: 'Highlighted editor' });
  await editor.fill('A #tag# B');
  await expect(editor.locator('mark')).toHaveText('#tag#');
  await page.keyboard.press('End');
  await page.keyboard.insertText('<img>');
  await expect(editor).toContainText('<img>');
  await expect(editor.locator('img')).toHaveCount(0);
});
for (const variant of ['draft', 'lexical'])
  test(`${variant}: type, format and serialize the same text`, async ({
    page,
  }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/examples/rich-text-${variant}/dist/index.html`);
    const editor = page.getByRole('textbox', { name: 'Editor', exact: true });
    await editor.click();
    await page.keyboard.type('Readable text');
    await page.keyboard.press('ControlOrMeta+a');
    await page.getByRole('button', { name: 'Bold', exact: true }).click();
    await page.getByRole('button', { name: 'Save JSON', exact: true }).click();
    const saved = page.getByLabel('Saved state');
    await expect(saved).toContainText('Readable text');
    const state = JSON.parse(await saved.textContent());
    if (variant === 'draft')
      expect(
        state.blocks[0].inlineStyleRanges.some(
          (range) => range.style === 'BOLD',
        ),
      ).toBe(true);
    else expect(state.root.children[0].children[0].format & 1).toBe(1);
    expect(errors).toEqual([]);
  });
