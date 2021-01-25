function clone(value) {
  const obj = {}
  for (let key in value) {
    obj[key] = value[key]
  }

  return obj
}
