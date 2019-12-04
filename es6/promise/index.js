/*
 * @Description: Promise test case.
 * @FileName: promise/index.js
 */

const PromiseSimple = require('./simple')
const PromiseFull = require('./promise-a+')


/* const s = new PromiseSimple(function(resolve, reject) {
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
  }) */


// test real promise exec order
const promise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 2000)
})

promise
  .then((val) => {
    console.log('1st call: ', val)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(2)
      }, 3000)
    })
  })
  .then((val) => {
    console.log('2nd call: ', val)
    return val
  })
