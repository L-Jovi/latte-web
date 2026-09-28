// A graph clone for plain objects, arrays, Map, Set, Date and RegExp.
// Unsupported host objects retain identity; use structuredClone for supported platform values.
function cloneDeep(source, seen = new WeakMap()) {
  if (source === null || typeof source !== 'object') return source
  if (seen.has(source)) return seen.get(source)
  let target
  if (source instanceof Date) target = new Date(source.getTime())
  else if (source instanceof RegExp) {
    target = new RegExp(source.source, source.flags)
    target.lastIndex = source.lastIndex
  } else if (source instanceof Map) target = new Map()
  else if (source instanceof Set) target = new Set()
  else if (Array.isArray(source)) target = []
  else if (Object.getPrototypeOf(source) === Object.prototype || Object.getPrototypeOf(source) === null) {
    target = Object.create(Object.getPrototypeOf(source))
  } else return source
  seen.set(source, target)
  if (source instanceof Map) {
    for (const [key, value] of source) target.set(cloneDeep(key, seen), cloneDeep(value, seen))
  } else if (source instanceof Set) {
    for (const value of source) target.add(cloneDeep(value, seen))
  } else {
    for (const key of Reflect.ownKeys(source)) {
      if (Array.isArray(source) && key === 'length') continue
      const descriptor = Object.getOwnPropertyDescriptor(source, key)
      if ('value' in descriptor) descriptor.value = cloneDeep(descriptor.value, seen)
      Object.defineProperty(target, key, descriptor)
    }
    if (Array.isArray(source)) target.length = source.length
  }
  return target
}
