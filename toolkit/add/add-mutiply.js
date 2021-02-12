// https://muyiy.cn/question/program/84.html

function addMutiplyParams() {
  let args = [].slice.call(arguments)

  function fn() {
    let argsFn = [].slice.call(arguments)
    return addMutiplyParams.apply(null, args.concat(argsFn))
  }

  fn.toString = function() {
    return args.reduce((a, b) => a + b)
  }

  return fn
}


function addSimpleParam(a) {
  function sum(b) {
    a = a + b
    return sum
  }

  sum.toString = function() {
    return a
  }

  return sum
}
