const PromiseSimple = require('./simple')
const PromiseFull = require('./promise-a+')


const s = new PromiseSimple(function(resolve, reject) {
  setTimeout(function() {
    const value = 3
    resolve(3)
  }, 1000)
})

s
  .then(function(value) {
    console.log(value)
  })


const p = new PromiseFull(function(resolve, reject) {
  setTimeout(function() {
    const value = 5
    resolve(value)
  }, 1500)
})

p
  .then(function(value) {
      return value + 1
  })
  .then(function(value) {
    return value * 2
  })
  .then(function(value) {
    console.log(value)
  })
