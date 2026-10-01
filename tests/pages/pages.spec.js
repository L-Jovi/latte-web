import { test, expect } from '@playwright/test';
import { existsSync, readFileSync } from 'node:fs';

// Every page marked as a live demo must work from the /latte-web/ sub-path.
const catalog = JSON.parse(readFileSync('docs/catalog.json', 'utf8'));
const live = catalog.filter((e) => e.pages?.length && e.live !== false);

test('the learning index links to live demos with relative URLs', async ({
  page,
}) => {
  await page.goto('index.html');
  await expect(
    page.getByRole('heading', { name: 'Latte Web', level: 1 }),
  ).toBeVisible();
  const absolute = await page.$$eval('a[href^="/"]', (links) =>
    links.map((a) => a.getAttribute('href')),
  );
  expect(absolute).toEqual([]);
});

for (const entry of live)
  test(`serves ${entry.pages[0]}`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('response', (response) => {
      if (response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    const response = await page.goto(entry.pages[0]);
    expect(response.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
    await page.waitForTimeout(100);
    expect(errors).toEqual([]);
  });

test('the handwritten router navigates under the site prefix', async ({
  page,
}) => {
  await page.goto('mechanisms/router/dist/index.html');
  await page.getByRole('link', { name: 'About', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'About view' })).toBeVisible();
  expect(new URL(page.url()).pathname).toBe(
    '/latte-web/mechanisms/router/dist/about',
  );
  await page.goBack();
  await expect(page.getByRole('heading', { name: 'Home view' })).toBeVisible();
});

test('the Rust module runs from the site prefix', async ({ page }) => {
  // CI always builds the module; a local run without Rust cannot.
  test.skip(
    !process.env.CI && !existsSync('_site/examples/wasm/dist/add.wasm'),
    'Rust module not built (npm run build:wasm)',
  );
  await page.goto('examples/wasm/dist/');
  await page.getByRole('button', { name: 'Add in Rust', exact: true }).click();
  await expect(page.locator('output')).toHaveText('5');
});
