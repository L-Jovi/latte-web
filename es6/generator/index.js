function* foo(x) {
  let y = 2 * (yield(x + 1))
  let z = yield(y / 3)
  return (x + y + z)
}

const it = foo(5)
console.log(it.next())
console.log(it.next(12))
