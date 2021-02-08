// https://muyiy.cn/question/program/84.html

function add() {
  let args = [].slice.call(arguments)

  function fn() {
    let argsFn = [].slice.call(arguments)
    return add.apply(null, args.concat(argsFn))
  }

  fn.toString = function() {
    return args.reduce((a, b) => a + b)
  }

  return fn
}

console.log(add(1, 2, 3)(5, 7)())
