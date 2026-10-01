import { test, expect } from '@playwright/test';
test('dynamic import executes when requested', async ({ page }) => {
  const messages = [];
  page.on('console', (message) => messages.push(message.text()));
  await page.goto('/tooling/webpack/lazy-loading/dist/index.html');
  expect(messages.some((text) => text.includes('module has loaded'))).toBe(
    false,
  );
  await page
    .getByRole('button', {
      name: 'Click me and look at the console!',
      exact: true,
    })
    .click();
  await expect
    .poll(() => messages.some((text) => text.includes('Button Clicked')))
    .toBe(true);
});
test('component consumer uses the same Card and Button', async ({ page }) => {
  await page.goto('/examples/components/dist/demo/index.html');
  await page.getByRole('button', { name: 'Count: 0', exact: true }).click();
  await expect(
    page.getByRole('button', { name: 'Count: 1', exact: true }),
  ).toBeVisible();
});
test('escaped template displays text without creating an image', async ({
  page,
}) => {
  await page.goto('/tooling/handlebars/dist/index.html');
  await expect(page.locator('img')).toHaveCount(0);
  await expect(page.locator('body')).toContainText(
    '<img src=x onerror=alert(1)>',
  );
});
test('Storybook renders the authored Card story', async ({ page }) => {
  await page.goto(
    '/examples/components/storybook-static/iframe.html?id=learning-card-and-button--in-card&viewMode=story',
  );
  await expect(
    page.getByRole('button', { name: 'A button in a card' }),
  ).toBeVisible();
});
