import {test,expect} from '@playwright/test';
test('DOM propagation stops both the second listener and the parent',async({page})=>{
  const messages=[];page.on('console',message=>messages.push(message.text()));
  await page.goto('/fundamentals/events/dom-event/index.html');
  await page.locator('.child').click();
  expect(messages.filter(text=>text.startsWith('fire'))).toEqual(['fire child']);
});
test('layout and transform move the same box while changing different properties',async({page})=>{
  await page.goto('/fundamentals/browser/render.html');
  // Positions can be fractional (Firefox lays out in 1/60 px), so compare to 0.005 px.
  const start=await page.locator('#box').boundingBox();
  await page.getByRole('button',{name:'Move with top',exact:true}).click();
  expect((await page.locator('#box').boundingBox()).y-start.y).toBeCloseTo(100,2);
  await page.getByRole('button',{name:'Move with transform',exact:true}).click();
  expect((await page.locator('#box').boundingBox()).y-start.y).toBeCloseTo(100,2);
  await page.getByRole('button',{name:'Move with transform',exact:true}).click();
  expect((await page.locator('#box').boundingBox()).y).toBeCloseTo(start.y,2);
});
test('a burst of clicks produces one debounced call',async({page})=>{
  const messages=[];page.on('console',message=>messages.push(message.text()));
  await page.goto('/mechanisms/utilities/debounce/index.html');
  await page.getByRole('button',{name:'Test Debounce',exact:true}).click({clickCount:3});
  await expect.poll(()=>messages.filter(text=>text==='1 2').length).toBe(1);
});
