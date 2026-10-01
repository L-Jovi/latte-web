const output = document.querySelector('output');
const connection = document.querySelector('#connection');
// The page shows one language at a time (assets/language.js, written into
// index.html). The text this script writes comes from this table, and is
// written again when the reader switches.
const words = {
  en: {
    online: 'Online',
    offline: 'Offline',
    idle: 'Not registered',
    ready: 'Offline cache ready',
    cleared: 'Cleared; reload to release the current worker',
  },
  zh: {
    online: '在线',
    offline: '离线',
    idle: '未注册',
    ready: '离线缓存已就绪',
    cleared: '已清理；刷新页面后，当前的 worker 才会释放',
  },
};
const zh = () => document.documentElement.dataset.language === 'zh';
const word = (key) => words[zh() ? 'zh' : 'en'][key];
// What the output says is kept, so that a language switch can say it again.
let state = 'idle',
  failure = '';
function say(next, error) {
  state = next;
  if (error) failure = error.message;
  if (state !== 'failed') output.textContent = word(state);
  else if (!zh()) output.textContent = failure;
  else {
    // The browser's own message stays as it wrote it, marked as program output.
    const message = document.createElement('samp');
    message.textContent = failure;
    output.replaceChildren('出错了：', message);
  }
}
function report() {
  connection.textContent = navigator.onLine ? word('online') : word('offline');
}
report();
addEventListener('online', report);
addEventListener('offline', report);
const scope = new URL('./', location.href).href;
function controlled() {
  if (
    navigator.serviceWorker.controller?.scriptURL ===
    new URL('service-worker.js', scope).href
  )
    say('ready');
}
navigator.serviceWorker.addEventListener('controllerchange', controlled);
controlled();
document.querySelector('#register').onclick = async () => {
  try {
    await navigator.serviceWorker.register('./service-worker.js', {
      scope: './',
    });
    await navigator.serviceWorker.ready;
    controlled();
  } catch (error) {
    say('failed', error);
  }
};
document.querySelector('#clear').onclick = async () => {
  try {
    const registration = await navigator.serviceWorker.getRegistration(scope);
    if (registration?.scope === scope) await registration.unregister();
    for (const key of await caches.keys())
      if (key.startsWith('latte-offline-')) await caches.delete(key);
    say('cleared');
  } catch (error) {
    say('failed', error);
  }
};
document.addEventListener('languagechange', () => {
  report();
  say(state);
});
