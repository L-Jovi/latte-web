// Ten observations, without the original unbounded CPU-burning loop.
const started = performance.now()
let count = 0
const interval = setInterval(() => {
  count++
  console.log({count, drift: performance.now() - started - count * 1000})
  if (count === 10) clearInterval(interval)
}, 1000)
