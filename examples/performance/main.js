import { onLCP, onINP, onCLS } from 'web-vitals';
// The page shows one language at a time (assets/language.js): English by
// default, Chinese after the switch. draw() writes this script's words in the
// language shown, and runs again after a switch; numbers and entries stay.
const words = {
  en: {
    waiting: 'Waiting for an eligible event',
    unavailable: 'Unavailable in this browser',
    ready: 'Ready',
    measured: (ms) => `Measured work: ${ms} ms`,
    late: 'Late content changes layout',
    inserted: 'Inserted after the recent-input window',
  },
  zh: {
    waiting: '等待符合条件的事件',
    unavailable: '这个浏览器不支持',
    ready: '就绪',
    measured: (ms) => `实测耗时：${ms} 毫秒`,
    late: '迟来的内容改变了布局',
    inserted: '在最近一次输入的时间窗口之后插入',
  },
};
const supported = PerformanceObserver.supportedEntryTypes;
const requirements = {
  LCP: 'largest-contentful-paint',
  INP: 'event',
  CLS: 'layout-shift',
};
// Until a metric has a value, its row says why: waiting, or not measurable here.
const pending = {};
for (const [metric, type] of Object.entries(requirements))
  pending[metric] = supported.includes(type) ? 'waiting' : 'unavailable';
function metric(value) {
  delete pending[value.name];
  document.getElementById(value.name).textContent = value.value.toFixed(
    value.name === 'CLS' ? 3 : 1,
  );
}
// What the line under the buttons says, given the words of one language.
let status = (text) => text.ready;
function draw() {
  const text =
    words[document.documentElement.dataset.language === 'zh' ? 'zh' : 'en'];
  for (const [metric, reason] of Object.entries(pending))
    document.getElementById(metric).textContent = text[reason];
  document.querySelector('output').textContent = status(text);
  const banner = document.querySelector('.late');
  if (banner) banner.textContent = text.late;
}
draw();
document.addEventListener('languagechange', draw);
if (supported.includes(requirements.LCP))
  onLCP(metric, { reportAllChanges: true });
if (supported.includes(requirements.INP))
  onINP(metric, { reportAllChanges: true });
if (supported.includes(requirements.CLS))
  onCLS(metric, { reportAllChanges: true });
const recent = [];
const listed = new Set();
function log(entry) {
  // An observer created before load can receive the navigation entry twice
  // (seen in Chromium 152), so each entry is listed once.
  const key = `${entry.entryType} ${entry.name} ${entry.startTime}`;
  if (listed.has(key)) return;
  listed.add(key);
  // startTime says when it happened; a paint entry is a single moment, so its duration is 0.
  recent.push(
    `${entry.entryType}: ${entry.name} at ${entry.startTime.toFixed(1)} ms, lasting ${entry.duration.toFixed(1)} ms`,
  );
  document.querySelector('#entries').textContent = recent.slice(-8).join('\n');
}
for (const type of ['navigation', 'paint', 'measure', 'longtask'])
  if (supported.includes(type))
    new PerformanceObserver((list) => list.getEntries().forEach(log)).observe({
      type,
      buffered: true,
    });
function navigation() {
  const entry = performance.getEntriesByType('navigation')[0];
  if (entry)
    document.querySelector('#navigation').textContent = JSON.stringify(
      {
        type: entry.type,
        ttfb: entry.responseStart,
        domContentLoaded: entry.domContentLoadedEventEnd,
        load: entry.loadEventEnd,
      },
      null,
      2,
    );
}
// loadEventEnd is only final after the load handler itself returns.
if (document.readyState === 'complete') navigation();
else addEventListener('load', () => setTimeout(navigation, 0), { once: true });
document.querySelector('#work').onclick = () => {
  performance.mark('work-start');
  const start = performance.now();
  while (performance.now() - start < 120) {
    /* Deliberately block one bounded interaction to make its cost observable. */
  }
  performance.mark('work-end');
  const measure = performance.measure(
    'controlled-work',
    'work-start',
    'work-end',
  );
  const ms = measure.duration.toFixed(1);
  status = (text) => text.measured(ms);
  draw();
  performance.clearMarks();
  performance.clearMeasures();
};
document.querySelector('#shift').onclick = (event) => {
  event.target.disabled = true;
  setTimeout(() => {
    const banner = document.createElement('p');
    banner.className = 'late';
    document.querySelector('#content').prepend(banner);
    status = (text) => text.inserted;
    draw();
  }, 700);
};
