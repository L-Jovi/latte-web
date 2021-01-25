/*
 * @Description: Implements call as Javascript context.
 * @FileName: call.js
 */

Function.prototype.forgeCall = function(context) {
  context = context || window
  context.fn = this

  // es3 also make sense
  // const args = []
  // for(var i = 1, len = arguments.length; i < len; i++) {
  //   args.push('arguments[' + i + ']');
  // }
  // eval('context.fn(' + args + ')')

  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}
