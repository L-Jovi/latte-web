// Based on https://github.com/mqyqingfeng/Blog/issues/12; ordinary constructors only.
Object.defineProperty(Function.prototype, 'forgeBind', {
  configurable: true,
  writable: true,
  value: function (context, ...boundArgs) {
    if (typeof this !== 'function') throw new TypeError('Not callable')
    const fn = this
    function Bound(...args) {
      if (new.target) {
        if (!fn.prototype) throw new TypeError('Target is not constructable')
        return fn.apply(this, [...boundArgs, ...args])
      }
      return fn.apply(context, [...boundArgs, ...args])
    }
    if (fn.prototype) Bound.prototype = Object.create(fn.prototype, {
      constructor: {value: Bound, writable: true, configurable: true}
    })
    return Bound
  }
})
