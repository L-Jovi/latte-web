// This model covers ordinary function constructors, not classes or bound constructors.
function forgeNew(Constructor, ...args) {
  if (typeof Constructor !== 'function' || !Constructor.prototype) {
    throw new TypeError('Expected an ordinary function constructor')
  }
  const obj = Object.create(Constructor.prototype)
  const result = Constructor.apply(obj, args)
  return result !== null && (typeof result === 'object' || typeof result === 'function')
    ? result : obj
}
