function clone(source) {
  const target = {}

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      target[key] = value[key]
    }
  }

  return target
}
