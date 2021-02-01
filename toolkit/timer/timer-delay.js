const start = Date.now()

// mock consuming event
setInterval(() => {
  let num = 2000000000
  while (num > 0) {
    num--
  }
})

// compute delay
let count = 0

setInterval(() => {
  count++
  const now = Date.now()
  const delay = now - (start + count * 1000)
  console.log(delay)
}, 1000)
