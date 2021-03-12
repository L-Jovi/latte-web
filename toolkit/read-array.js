Array.prototype.getReader = function() {
  let start = 0
  const array = this

  this.read = function(offset = 1) {
    if (offset <= 0) {
      throw new Error('Error')
    }

    const remain = array.length - start
    if (remain === 0) {
      return []
    }

    if (remain >= offset) {
      const readArray = array.slice(start, start + offset)
      start += offset
      return readArray

    } else {
      const readArray = array.slice(start)
      start = array.length
      return readArray
    }

  }
}

const arr = [1, 2, 3, 4, 5, 6, 7, 8]
arr.getReader()
console.log(arr.read())
console.log(arr.read(2))
console.log(arr.read(3))
console.log(arr.read(4))
console.log(arr.read())
console.log(arr.read(2))
