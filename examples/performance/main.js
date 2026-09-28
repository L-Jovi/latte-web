import { onLCP, onINP, onCLS } from 'web-vitals';
const supported = PerformanceObserver.supportedEntryTypes;
const requirements = {
  LCP: 'largest-contentful-paint',
  INP: 'event',
  CLS: 'layout-shift',
};
for (const [metric, type] of Object.entries(requirements))
  document.getElementById(metric).textContent = supported.includes(type)
    ? 'Waiting for an eligible event'
    : 'Unavailable in this browser';
function metric(value) {
  document.getElementById(value.name).textContent = value.value.toFixed(
    value.name === 'CLS' ? 3 : 1,
  );
}
if (supported.includes(requirements.LCP))
  onLCP(metric, { reportAllChanges: true });
if (supported.includes(requirements.INP))
  onINP(metric, { reportAllChanges: true });
if (supported.includes(requirements.CLS))
  onCLS(metric, { reportAllChanges: true });
const recent = [];
function log(entry) {
  recent.push(
    `${entry.entryType}: ${entry.name} (${entry.duration.toFixed(1)} ms)`,
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
  document.querySelector('output').textContent =
    `Measured work: ${measure.duration.toFixed(1)} ms`;
  performance.clearMarks();
  performance.clearMeasures();
};
document.querySelector('#shift').onclick = (event) => {
  event.target.disabled = true;
  setTimeout(() => {
    const banner = document.createElement('p');
    banner.className = 'late';
    banner.textContent = 'Late content changes layout';
    document.querySelector('#content').prepend(banner);
    document.querySelector('output').textContent =
      'Inserted after the recent-input window';
  }, 700);
};
