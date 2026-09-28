// Ordinary prototype-chain lookup; Symbol.hasInstance and bound functions are outside this model.
function forgeInstanceof(value, Constructor) {
  if (typeof Constructor !== 'function' || typeof Constructor.prototype !== 'object' || Constructor.prototype === null) {
    throw new TypeError('Expected a constructor with an object prototype')
  }
  if (value === null || (typeof value !== 'object' && typeof value !== 'function')) return false
  let prototype = Object.getPrototypeOf(value)
  while (prototype !== null) {
    if (prototype === Constructor.prototype) return true
    prototype = Object.getPrototypeOf(prototype)
  }
  return false
}
