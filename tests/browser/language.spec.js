import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { wrongLanguage } from './one-language.js';

// Every page shows one language at a time: English when it opens, Chinese
// after its switch, never the two together (assets/language.js).
const catalog = JSON.parse(readFileSync('docs/catalog.json', 'utf8'));
const pages = ['', ...catalog.flatMap((entry) => entry.pages || [])];

for (const path of pages)
  test(`one language at a time on /${path}`, async ({ page }) => {
    await page.goto('/' + path);
    // Let pages that draw after loading (React, timers, fetches) settle.
    await page.waitForTimeout(300);
    expect(await page.evaluate(wrongLanguage, 'en')).toEqual([]);
    await page.locator('[data-language-switch]').first().click();
    await page.waitForTimeout(300);
    expect(await page.evaluate(wrongLanguage, 'zh')).toEqual([]);
  });

test('a link that names the language opens the page in it', async ({
  page,
}) => {
  await page.goto('/fundamentals/javascript/context/index.html?lang=zh');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hans');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    catalog.find((entry) => entry.path === 'fundamentals/javascript/context')
      .titleZh,
  );
  // The choice is remembered for the next page.
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-language', 'zh');
});
