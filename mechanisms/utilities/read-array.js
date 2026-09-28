function createArrayReader(array) {
  let position = 0
  return function read(count = 1) {
    if (!Number.isInteger(count) || count <= 0) throw new RangeError('Count must be a positive integer')
    const values = array.slice(position, position + count)
    position += values.length
    return values
  }
}
