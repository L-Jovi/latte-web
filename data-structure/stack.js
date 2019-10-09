// implements [push] [pop] [peek] [length]

function Stack() {
  this.count = 0
  this.storage = {}

  this.push = function(value) {
    this.storage[this.count] = value
    this.count++
  }

  this.pop = function() {
    if (this.count === 0) {
      return undefined

    } else {
      this.count--
      const top = this.storage[this.count]
      delete this.storage[this.count]
      return top
    }
  }

  this.peek = function() {
    return this.storage[this.count - 1]
  }

  this.size = function() {
    return this.count
  }
}


// main
const s = new Stack()

s.push('foo')
s.push('bar')

const topPeek = s.peek()
console.log('peek: ', topPeek)

const topPop = s.pop()
console.log('pop: ', topPop)

let size = s.size()
console.log('size: ', size)

s.push('baz')
size = s.size()
console.log('size: ', size)
