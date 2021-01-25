/*
 * @Description: Implements new keyword by native Javascript.
 * @FileName: new.js
 */

function forgeNew() {
  let obj = {}
  let Constructor = [].shift.call(arguments)
  obj.__proto__ = Constructor.prototype

  const result = Constructor.apply(obj, arguments)
  return result instanceof Object ? result : obj
}
