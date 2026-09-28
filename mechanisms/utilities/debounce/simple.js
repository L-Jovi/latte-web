function forgeDebounce(func, wait = 500) {
  let timer
  function debounced(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => { timer = undefined; func.apply(this, args) }, wait)
  }
  debounced.cancel = () => { clearTimeout(timer); timer = undefined }
  return debounced
}
