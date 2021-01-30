/*
 * @Description: trigger event after n seconds.
 * @FileName: toolkit/debounce/simple.js
 */

const debounceForge = (func, wait = 500) => {
  let timer = 0

  return function(...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, wait)
  }
}
