import { test, expect } from '@playwright/test';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { wrongLanguage } from './one-language.js';

// Every guide is walked through step by step: each value and console line it
// promises must really appear, so a guide cannot drift away from its page.
const root = 'assets/guides';
const guides = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? guides(join(dir, entry.name))
      : entry.name.endsWith('.json')
        ? [join(dir, entry.name)]
        : [],
  );

for (const file of guides(root)) {
  const path = file.slice(root.length + 1).replace(/\.json$/, '.html');
  const { steps } = JSON.parse(readFileSync(file, 'utf8'));
  test(`guide for ${path}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/' + path);
    const panel = page.getByRole('complementary', { name: 'Guide' });
    for (const [index, step] of steps.entries()) {
      await expect(panel.locator('.latte-guide-head')).toHaveText(
        `Guide · step ${index + 1} of ${steps.length}`,
      );
      if (step.action) await panel.locator('.latte-guide-do').click();
      const values = panel.locator('.latte-guide-watch dd');
      for (const [i, item] of (step.watch || []).entries())
        if ('expect' in item)
          await expect(values.nth(i)).toHaveText(item.expect);
      const lines = panel.locator('.latte-guide-line');
      // A string must appear in some line; a list must be exactly the first lines,
      // in order (steps that list them clear the console first).
      if (typeof step.expectConsole === 'string')
        await expect(
          lines.filter({ hasText: step.expectConsole }),
        ).not.toHaveCount(0);
      else if (step.expectConsole)
        await expect
          .poll(async () =>
            (await lines.allTextContents()).slice(0, step.expectConsole.length),
          )
          .toEqual(step.expectConsole);
      if (step.absentConsole) {
        // Give late timers a chance to print before checking that nothing did.
        await page.waitForTimeout(700);
        for (const text of [step.absentConsole].flat())
          await expect(lines.filter({ hasText: text })).toHaveCount(0);
      }
      if (step.action)
        expect(await page.evaluate(wrongLanguage, 'en')).toEqual([]);
      if (index < steps.length - 1)
        await panel
          .getByRole('button', { name: 'Next step', exact: true })
          .click();
    }
    // Switched to Chinese, the same step reads in Chinese (the panel's name changes too).
    // The panel's button switches the whole page (assets/language.js).
    const box = page.locator('.latte-guide');
    await box.locator('[data-language-switch]').click();
    await expect(box.locator('.latte-guide-title')).toHaveText(
      steps.at(-1).titleZh,
    );
    await expect(box.locator('.latte-guide-head')).toHaveText(
      `说明 · 第 ${steps.length} 步，共 ${steps.length} 步`,
    );
    expect(errors).toEqual([]);
  });

  // The same walk with the page in Chinese. Its buttons and the text its scripts
  // draw are translated, so every action must still find its target, and the page
  // must stay in Chinese as the reader uses it. The English walk has already
  // measured the values each step promises.
  test(`guide for ${path} in Chinese`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(`/${path}?lang=zh`);
    const panel = page.locator('.latte-guide');
    for (const [index, step] of steps.entries()) {
      await expect(panel.locator('.latte-guide-head')).toHaveText(
        `说明 · 第 ${index + 1} 步，共 ${steps.length} 步`,
      );
      if (step.action) {
        await panel.locator('.latte-guide-do').click();
        // Let what the action starts (a fetch, a render, a timer) draw.
        await page.waitForTimeout(300);
        expect(await page.evaluate(wrongLanguage, 'zh')).toEqual([]);
      }
      if (index < steps.length - 1)
        await panel
          .getByRole('button', { name: '下一步', exact: true })
          .click();
    }
    expect(errors).toEqual([]);
  });
}
