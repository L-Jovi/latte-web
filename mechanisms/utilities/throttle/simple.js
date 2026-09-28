// Leading-only throttle: trailing invocations are deliberately not queued.
function forgeThrottle(fn, wait = 1000) {
  let lastTime = -Infinity
  return function (...args) {
    const now = performance.now()
    if (now - lastTime >= wait) {
      lastTime = now
      return fn.apply(this, args)
    }
  }
}
