const output = document.querySelector('output');
const connection = document.querySelector('#connection');
function report() {
  connection.textContent = navigator.onLine ? 'Online' : 'Offline';
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
    output.textContent = 'Offline cache ready';
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
    output.textContent = error.message;
  }
};
document.querySelector('#clear').onclick = async () => {
  try {
    const registration = await navigator.serviceWorker.getRegistration(scope);
    if (registration?.scope === scope) await registration.unregister();
    for (const key of await caches.keys())
      if (key.startsWith('latte-offline-')) await caches.delete(key);
    output.textContent = 'Cleared; reload to release the current worker';
  } catch (error) {
    output.textContent = error.message;
  }
};
