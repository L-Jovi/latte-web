/*
 * @Description: ES6 generator sample for test.
 * @FileName: index.js
 */

function* testGen(x) {
  let y = 2 * (yield(x + 1))
  let z = yield(y / 3)
  return (x + y + z)
}

const it = testGen(5)
console.log(it.next())
console.log(it.next(12))
console.log(it.next(10))


function* genn() {
  const a = yield 'saber';
  console.log(a, 'this is a');
  const b = yield 'archer';
  console.log(b, 'this is b');
  const c = yield 'rider';
  console.log(c, 'this is c');
  return 'resultValue'
}

let g = genn();

g.next(); // { value: 'saber', done: false }
g.next('param-a'); // { value: 'archer', done: false }
g.next('param-b') // { value: 'rider', done: false }
g.next() // { value: 'resultValue', done: true }
g.next() // { value: undefined, done: true }
