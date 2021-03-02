// middleware mock
// val * 10 + 10 - 2
const multiply = (x) => {
   const result = x * 10;
   console.log(result);
   return result;
}

const add = (y) => y + 10

const minus = (z) => z - 2

console.log('1: ', minus(add(multiply(10))))


// compose
const compose = function(m1, m2, m3) {
  return function(x) {
    // const res3 = m3(x)
    // const res2 = m2(res3)
    // const res1 = m1(res2)
    // return res1
    return m1(m2(m3(x)))
  }
}

const enhancer = compose(minus, add, multiply)
console.log('2: ', enhancer(10))


// redux compose forge
const forgeCompose = function(...funcs) {
  return funcs.reduce((a, b) => {
    return function(x) {
      return a(b(x))
    }
  })
}

const forgeEnhancer = forgeCompose(minus, add, multiply)
console.log('2: ', forgeEnhancer(10))
