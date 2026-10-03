import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { wrongLanguage } from './one-language.js';

// Every page shows one language at a time: English when it opens, Chinese
// after its switch, never the two together (assets/language.js). These are all
// the pages the site publishes: scripts/pages.mjs publishes no other HTML.
const catalog = JSON.parse(readFileSync('docs/catalog.json', 'utf8'));
const pages = ['', ...catalog.flatMap((entry) => entry.pages || [])];

// Each page is opened in each language, then switched to the other, so both
// the first drawing and the redrawing on "languagechange" are checked.
for (const path of pages)
  test(`one language at a time on /${path}`, async ({ page }) => {
    for (const [language, other] of [
      ['en', 'zh'],
      ['zh', 'en'],
    ]) {
      await page.goto(`/${path}?lang=${language}`);
      // Let pages that draw after loading (React, timers, fetches) settle.
      await page.waitForTimeout(300);
      expect(
        await page.evaluate(wrongLanguage, language),
        `opened with ?lang=${language}`,
      ).toEqual([]);
      await page.locator('[data-language-switch]').first().click();
      await page.waitForTimeout(300);
      expect(
        await page.evaluate(wrongLanguage, other),
        `switched from ${language} to ${other}`,
      ).toEqual([]);
      // A page that rewrites its address keeps naming the language shown.
      expect(new URL(page.url()).searchParams.get('lang')).toBe(other);
    }
  });

// The check must catch what it looks for. A sentence in the other language is
// planted everywhere it reads: the page text, an aria-label, an option of a
// shown <select> and the title; and an element of the other language is shown.
for (const [language, other, sentence] of [
  ['en', 'zh', '这一句是中文。'],
  ['zh', 'en', 'This sentence is in English.'],
])
  test(`the check reports a sentence planted on the ${language} page`, async ({
    page,
  }) => {
    await page.goto(`/?lang=${language}`);
    expect(await page.evaluate(wrongLanguage, language)).toEqual([]);
    await page.evaluate(
      ([other, sentence]) => {
        document.querySelector('h1').insertAdjacentHTML(
          'afterend',
          `<p>${sentence}</p>
          <button type="button" aria-label="${sentence}">?</button>
          <select><option>${sentence}</option></select>
          <p data-l="${other}" style="display: block !important">?</p>`,
        );
        document.title = sentence;
      },
      [other, sentence],
    );
    const problems = await page.evaluate(wrongLanguage, language);
    // The title, the paragraph, the option and the aria-label.
    expect(problems.filter((problem) => problem === sentence)).toHaveLength(4);
    expect(problems).toContain(
      `shows <p data-l="${other}" style="display: block !important">?</p>`,
    );
    expect(problems).toHaveLength(5);
  });

test('a link that names the language opens the page in it', async ({
  page,
}) => {
  await page.goto('/fundamentals/javascript/context/index.html?lang=zh');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-Hans');
  // innerText is the text on screen: the heading also holds its hidden English half.
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    catalog.find((entry) => entry.path === 'fundamentals/javascript/context')
      .titleZh,
    { useInnerText: true },
  );
  // The choice is remembered for the next page.
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-language', 'zh');
});
