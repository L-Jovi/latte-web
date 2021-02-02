/*
 * @Description: Implements new keyword by native Javascript.
 * @FileName: new.js
 */

function forgeNew() {
  const obj = {}
  const Constructor = Array.prototype.shift.call(arguments)
  obj.__proto__ = Constructor.prototype

  const result = Constructor.apply(obj, arguments)
  return typeof result === 'object' ? result : obj
}
