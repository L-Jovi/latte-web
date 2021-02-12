/*
 * @Description: trigger event once within n seconds.
 * @FileName: toolkit/throttle/simple.js
 */

const forgeThrottle = (fn, wait = 1000) => {
  let lastTime = 0

  return function(...args) {
    let now = +new Date()
    if (now - lastTime > wait) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}
