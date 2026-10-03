import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';
import { wrongLanguage } from './one-language.js';

// Every page fits a phone in both languages, 320 px wide, the narrowest phone
// screen in common use. Each page needs a viewport tag, or a real phone lays
// it out 980 px wide and shrinks it. On a narrow screen the guide is a sheet
// over the bottom of the window (assets/site.css). At every step the page must
// not scroll sideways, the sheet must stay on screen, and the part of the demo
// that the step marks must show above the sheet.
const catalog = JSON.parse(readFileSync('docs/catalog.json', 'utf8'));
const pages = ['', ...catalog.flatMap((entry) => entry.pages || [])];
const stepsOf = (path) => {
  const file = `assets/guides/${path.replace(/\.html$/, '')}.json`;
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')).steps : [];
};

// With reduced motion, the guide scrolls to a step at once, not smoothly.
test.use({ viewport: { width: 320, height: 640 }, reducedMotion: 'reduce' });

const sideways = () =>
  document.documentElement.scrollWidth - document.documentElement.clientWidth;
// The top of the part a step marks, and the top of the sheet.
const tops = (selector) => [
  Math.min(
    ...[...document.querySelectorAll(selector)]
      .filter((node) => !node.closest('.latte-guide'))
      .map((node) => node.getBoundingClientRect().top),
  ),
  document.querySelector('.latte-guide').getBoundingClientRect().top,
];

for (const path of pages)
  test(`fits a phone: /${path}`, async ({ page }) => {
    const steps = stepsOf(path);
    for (const language of ['en', 'zh']) {
      await page.goto(`/${path}?lang=${language}`);
      await expect(page.locator('meta[name="viewport"]')).toHaveAttribute(
        'content',
        /width=device-width/,
      );
      await page.waitForTimeout(300);
      expect(await page.evaluate(sideways), `${language}, as it opens`).toBe(0);
      const next = page.locator('.latte-guide').getByRole('button', {
        name: language === 'zh' ? '下一步' : 'Next step',
        exact: true,
      });
      for (const [index, step] of steps.entries()) {
        const at = `${language}, step ${index + 1}`;
        if (index) await next.click();
        await expect(next, at).toBeInViewport();
        expect(await page.evaluate(sideways), at).toBe(0);
        expect(await page.evaluate(wrongLanguage, language), at).toEqual([]);
        // A step marks an element that an earlier action may create; this walk
        // takes no actions, so such a step has nothing to show.
        const marked =
          step.focus || step.action?.click || step.action?.toggle?.target;
        if (!index || !marked) continue;
        const [top, sheet] = await page.evaluate(tops, marked);
        if (top !== Infinity) expect(top, at).toBeLessThan(sheet);
      }
    }
  });

test('the guide sheet folds down to its top row', async ({ page }) => {
  await page.goto('/mechanisms/utilities/throttle/index.html');
  const sheet = page.locator('.latte-guide');
  const next = sheet.getByRole('button', { name: 'Next step', exact: true });
  await expect(next).toBeVisible();
  await sheet.getByRole('button', { name: 'Hide the guide' }).click();
  await expect(next).toBeHidden();
  expect((await sheet.boundingBox()).height).toBeLessThan(80);
  await sheet.getByRole('button', { name: 'Show the guide' }).click();
  await expect(next).toBeVisible();
});
