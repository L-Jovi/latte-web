import { test, expect } from '@playwright/test';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
test('JSONP cleanup, CORS Fetch and explicit cancellation', async ({
  page,
}) => {
  await page.goto('/examples/network/');
  await page
    .getByRole('button', { name: 'Request with JSONP', exact: true })
    .click();
  await expect(page.locator('output')).toContainText('"transport":"jsonp"');
  expect(
    await page.evaluate(() =>
      Object.keys(window).filter((key) => key.startsWith('latte_')),
    ),
  ).toEqual([]);
  await page
    .getByRole('button', { name: 'Request with Fetch', exact: true })
    .click();
  await expect(page.locator('output')).toContainText('"transport":"data"');
  await page
    .getByRole('button', { name: 'Start slow Fetch', exact: true })
    .click();
  await expect(page.locator('output')).toHaveText('Waiting');
  await page
    .getByRole('button', { name: 'Cancel request', exact: true })
    .click();
  await expect(page.locator('output')).toHaveText('Request cancelled');
});
test('service worker reloads with its origin stopped and supports cleanup', async ({
  page,
  context,
  browser,
  browserName,
}) => {
  const files = new Map([
    ['/examples/service-worker/', 'index.html'],
    ['/examples/service-worker/index.html', 'index.html'],
    ['/examples/service-worker/app.js', 'app.js'],
    ['/examples/service-worker/service-worker.js', 'service-worker.js'],
  ]);
  const server = createServer(async (req, res) => {
    const file = files.get(req.url);
    if (!file) {
      res.writeHead(404).end();
      return;
    }
    res.setHeader(
      'Content-Type',
      file.endsWith('.js') ? 'text/javascript' : 'text/html',
    );
    res.setHeader('Cache-Control', 'no-store');
    res.end(
      await readFile(
        new URL('../../examples/service-worker/' + file, import.meta.url),
      ),
    );
  });
  const listen = (port) =>
    new Promise((resolve) => server.listen(port, '127.0.0.1', resolve));
  const stop = () =>
    new Promise((resolve, reject) =>
      server.close((error) => (error ? reject(error) : resolve())),
    );
  await listen(0);
  const port = server.address().port;
  const url = `http://127.0.0.1:${port}/examples/service-worker/`;
  try {
    await page.goto(url);
    await page.getByRole('button', { name: 'Enable offline cache' }).click();
    await expect(page.locator('output')).toHaveText('Offline cache ready');
    expect(
      await page.evaluate(() => navigator.serviceWorker.controller.scriptURL),
    ).toContain('/examples/service-worker/service-worker.js');
    await stop();
    // WebKit 1.63 offline emulation kills SW responses before dispatch (upstream #42775).
    // Stopping the actual origin verifies cached navigation in every engine without that emulator.
    if (browserName !== 'webkit') await context.setOffline(true);
    await page.reload();
    await expect(
      page.getByRole('heading', { name: 'Offline notebook' }),
    ).toBeVisible();
    if (browserName !== 'webkit')
      await expect(page.locator('#connection')).toHaveText('Offline');
    const control = await browser.newContext({ serviceWorkers: 'block' });
    try {
      const empty = await control.newPage();
      await expect(empty.goto(url)).rejects.toThrow();
    } finally {
      await control.close();
    }
    await context.setOffline(false);
    await listen(port);
    await page.getByRole('button', { name: 'Clear this experiment' }).click();
    await expect(page.locator('output')).toContainText('Cleared');
    expect(await page.evaluate(() => caches.keys())).toEqual([]);
    await page.reload();
    expect(
      await page.evaluate(() => navigator.serviceWorker.controller),
    ).toBeNull();
  } finally {
    await context.setOffline(false);
    if (server.listening) await stop();
  }
});
test('basic GraphQL runs an actual HTTP request', async ({ page }) => {
  await page.goto('/examples/graphql-http/');
  await page.getByRole('button', { name: 'Run query', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('Hello world!');
});
