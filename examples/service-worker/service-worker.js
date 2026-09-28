const CACHE = 'latte-offline-v1';
const FILES = ['./', './index.html', './app.js'].map(
  (path) => new URL(path, self.registration.scope).href,
);
self.addEventListener('install', (event) =>
  event.waitUntil(
    (async () => {
      await (await caches.open(CACHE)).addAll(FILES);
      await self.skipWaiting();
    })(),
  ),
);
self.addEventListener('activate', (event) =>
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys())
        if (key.startsWith('latte-offline-') && key !== CACHE)
          await caches.delete(key);
      await self.clients.claim();
    })(),
  ),
);
self.addEventListener('fetch', (event) => {
  // Only this demo's static GET requests enter the cache, never other apps or API responses.
  if (event.request.method !== 'GET' || !FILES.includes(event.request.url))
    return;
  event.respondWith(
    (async () => {
      const cache = await caches.open(CACHE);
      try {
        const response = await fetch(event.request);
        if (response.ok) await cache.put(event.request, response.clone());
        return response;
      } catch {
        return (
          (await cache.match(event.request)) ||
          new Response('Offline asset unavailable', { status: 503 })
        );
      }
    })(),
  );
});
