import {test,expect} from '@playwright/test';
import {readFileSync} from 'node:fs';
import site from '../../scripts/site.cjs';
const catalog=JSON.parse(readFileSync('docs/catalog.json','utf8'));
for (const entry of catalog) for (const path of entry.pages || []) {
  test(`loads ${path}`, async ({page}) => {
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    page.on('response',response=>{if(response.status()>=400)errors.push(`${response.status()} ${response.url()}`)});
    const response=await page.goto('/'+path);
    expect(response.status()).toBe(200);
    await expect(page.locator('body')).toBeVisible();
    // Every page links back to the learning index, apart from the documented exceptions.
    const bar=site.chrome.skipAll.has(path)||site.chrome.skipBar.has(path)?0:1;
    await expect(page.getByRole('navigation',{name:'Latte Web'})).toHaveCount(bar);
    await page.waitForTimeout(100);
    expect(errors).toEqual([]);
  });
}
test('learning index links to experiments',async({page})=>{
  await page.goto('/'); await expect(page.getByRole('heading',{name:'Latte Web',level:1})).toBeVisible();
  await page.getByRole('link',{name:'Promise from scratch'}).click();
  await expect(page.locator('output')).toHaveText('1,2');
});
