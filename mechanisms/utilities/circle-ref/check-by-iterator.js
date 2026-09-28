// A repeated sibling reference is not a cycle: track only the current traversal path.
function isCycleByIterator(value, ancestors = new Set()) {
  if (value === null || typeof value !== 'object') return false
  if (ancestors.has(value)) return true
  ancestors.add(value)
  try {
    const children = value instanceof Map ? [...value.keys(), ...value.values()]
      : value instanceof Set ? [...value] : Reflect.ownKeys(value).flatMap(key => {
        const descriptor = Object.getOwnPropertyDescriptor(value, key)
        return 'value' in descriptor ? [descriptor.value] : []
      })
    return children.some(child => isCycleByIterator(child, ancestors))
  } finally {
    ancestors.delete(value)
  }
}
