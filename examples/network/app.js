import { jsonp } from './jsonp.js';
const output = document.querySelector('output');
const origin = 'http://127.0.0.1:4002';
let controller;
async function show(task) {
  try {
    output.textContent = JSON.stringify(await task());
  } catch (error) {
    output.textContent =
      error.name === 'AbortError' ? 'Request cancelled' : error.message;
  }
}
document.querySelector('#jsonp').onclick = () =>
  show(() => jsonp(origin + '/jsonp'));
document.querySelector('#fetch').onclick = () =>
  show(async () => {
    const response = await fetch(origin + '/data');
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
  });
document.querySelector('#slow').onclick = async () => {
  controller?.abort();
  const request = new AbortController();
  controller = request;
  output.textContent = 'Waiting';
  try {
    const response = await fetch(origin + '/slow', { signal: request.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (controller === request) output.textContent = JSON.stringify(data);
  } catch (error) {
    if (controller === request)
      output.textContent =
        error.name === 'AbortError' ? 'Request cancelled' : error.message;
  }
};
document.querySelector('#cancel').onclick = () => controller?.abort();
