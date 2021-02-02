/*
 * @Description: Implements bind as Javascript context.
 * @FileName: bind.js
 * https://github.com/mqyqingfeng/Blog/issues/12
 */

Function.prototype.forgeBind = function(context) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.forgeBind: not callable')
  }

  const fn = this
  const argsBind = Array.prototype.slice.call(arguments, 1)

  function Proxy() {}
  function Constructor() {
    const self = this instanceof Constructor ? this : context
    const argsCall = Array.prototype.slice.call(arguments)
    const args = argsBind.concat(argsCall)
    return fn.apply(self, args)
  }
  Proxy.prototype = this.prototype
  Constructor.prototype = new Proxy()
  return Constructor
}
