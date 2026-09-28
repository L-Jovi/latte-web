// Temporary receiver method: an intentionally limited model of non-strict this binding.
Object.defineProperty(Function.prototype, 'forgeApply', {
  configurable: true,
  writable: true,
  value: function (context, args = []) {
    if (typeof this !== 'function') throw new TypeError('Not callable')
    const receiver = context == null ? globalThis : Object(context)
    const key = Symbol('temporary call')
    Object.defineProperty(receiver, key, {value: this, configurable: true})
    try {
      return receiver[key](...(args == null ? [] : Array.from(args)))
    } finally {
      delete receiver[key]
    }
  }
})
