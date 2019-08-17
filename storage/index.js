// register service worker
if (navigator.serviceWorker) {
  navigator.serviceWorkerContainer
    .register('https://localhost:3000/javascripts/service-worker.js')
    .then((registation) => {
      console.log(registation)
    })
    .catch((err) => {
      console.log(err)
    })
}
