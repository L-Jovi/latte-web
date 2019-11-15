/*
 * @Description: implements new oprator
 * @FileName: new.js
 */

// new
function myNew() {
  let obj = {}
  let Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype

  let result = Constructor.apply(obj, arguments)
  return result instanceof Object ? result : obj
}
