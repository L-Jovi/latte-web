/*
 * @Description: Implements call as Javascript context.
 * @FileName: apply.js
 */

Function.prototype.forgeApply = function(context) {
  context = context || window
  context.fn = this

  let result
  debugger
  if (arguments[1] && Array.isArray(arguments[1])) {
    result = context.fn(...arguments[1])
  } else {
    result = context.fn()
  }

  delete context.fn
  return result
}
