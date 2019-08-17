// below not work because of CORS
/* fetch('http://localhost:3000/jsonp')
  .then((response) => {
    console.log(response)
  }) */


// implements jsonp
const jsonp = (url, cb, success) => {
  let script = document.createElement('script')
  script.src = url
  script.async = true
  script.type = 'text/javascript'
  window[cb] = (data) => {
    success && success(data)
  }
  document.body.appendChild(script)
}

jsonp('http://localhost:3000/mock/jsonp?cb=callback', 'callback', (value) => {
  console.log(value)
})
