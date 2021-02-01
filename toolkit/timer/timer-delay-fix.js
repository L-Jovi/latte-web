const start = Date.now()

// mock consuming event
setInterval(() => {
  let num = 2000000000
  while (num > 0) {
    num--
  }
})

// fix delay by reset timeout approach [wait]
const timer
const wait = 1000
let count = 0

function fn() {
  count++
  const now = Date.now()
  const delay = now - (start + count * wait)
  console.log(delay)
  const waitReal = wait - delay

  if (timer && clearTimeout(timer)) {
    timer = setTimeout(fn, waitReal)
  }
}

timer = setTimeout(fn, wait)
