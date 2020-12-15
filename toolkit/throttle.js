//
// throttle.js
//

const throttle = (func, wait = 50) => {
  let lastTime = 0

  return function(...args) {
    let now = +new Date()
    if (now - lastTime > wait) {
      lastTime = now
      func.apply(this, args)
    }
  }
}


// test
setInterval(
  throttle(() => { console.log(1) }, 500),
  1
)
