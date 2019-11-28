/*
 * @Description: Implements call as Javascript context.
 * @FileName: context.js
 */

// call
Function.prototype.myCall = function(context) {
  context = context || window
  context.fn = this

  const args = [...arguments].slice(1)
  const result = context.fn(...args)

  delete context.fn
  return result
}


// apply
Function.prototype.myApply = function(context) {
  context = context || window
  context.fn = this

  let result
  if (arguments[1]) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result
}


// main
function CustomFn() {
    return this.name
}

const obj = {
    name: 'saber',
}

CustomFn.myCall(obj, 1, 2)
