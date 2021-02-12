/*
 * @Description: trigger event after n seconds.
 * @FileName: toolkit/debounce/simple.js
 */

const forgeDebounce = (func, wait = 500) => {
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
