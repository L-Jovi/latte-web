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
Function.prototype.myCall = function(context) {
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


// bind


// test
function act() {
    return this.name
}

const obj = {
    name: 'saber',
}

act.myCall(obj, 1, 2)
