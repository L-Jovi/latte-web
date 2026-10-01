import { jsonp } from './jsonp.js';
const output = document.querySelector('output');
const origin = 'http://127.0.0.1:4002';
let controller;
// The page shows one language at a time (assets/language.js). The words this
// script writes come from this table and are written again after a switch;
// an answer or an error message is program output, shown as it came (<samp>).
const words = {
  en: { waiting: 'Waiting', cancelled: 'Request cancelled' },
  zh: { waiting: '等待中', cancelled: '请求已取消' },
};
let said = null;
function say(key) {
  said = key;
  const language =
    document.documentElement.dataset.language === 'zh' ? 'zh' : 'en';
  output.textContent = words[language][key];
}
function quote(text) {
  said = null;
  const sample = document.createElement('samp');
  sample.textContent = text;
  output.replaceChildren(sample);
}
document.addEventListener('languagechange', () => {
  if (said) say(said);
});
async function show(task) {
  try {
    quote(JSON.stringify(await task()));
  } catch (error) {
    if (error.name === 'AbortError') say('cancelled');
    else quote(error.message);
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
  say('waiting');
  try {
    const response = await fetch(origin + '/slow', { signal: request.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (controller === request) quote(JSON.stringify(data));
  } catch (error) {
    if (controller !== request) return;
    if (error.name === 'AbortError') say('cancelled');
    else quote(error.message);
  }
};
document.querySelector('#cancel').onclick = () => controller?.abort();
