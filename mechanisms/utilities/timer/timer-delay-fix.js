// Adjust the next deadline rather than claiming that JavaScript timers are exact.
function startDriftTimer(callback, wait = 1000) {
  if (!(wait > 0)) throw new RangeError('wait must be positive')
  const start = performance.now()
  let count = 0
  let timer
  let stopped = false
  function tick() {
    if (stopped) return
    count++
    callback({ count, drift: performance.now() - (start + count * wait) })
    if (!stopped) timer = setTimeout(tick, Math.max(0, start + (count + 1) * wait - performance.now()))
  }
  timer = setTimeout(tick, wait)
  return () => { stopped = true; clearTimeout(timer) }
}
