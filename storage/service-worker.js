// service worker
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('my-cache')
      .then((cache) => {
        return cache.addAll(['./index.html', './index.js'])
      })
  )
})

self.addEventListener('fetch', e => {
  e.responseWith(
    caches.match(e.request)
      .then((response) => {
        if (response) {
          return response
        } else {
          console.log('fetch source')
        }
      })
  )
})
