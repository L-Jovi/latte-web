// implements [values] [size] [has] [add] [remove] [union] [intersection] [difference] [subset]

function MySet() {
  const collection = []

  this.has = function(element) {
    return collection.indexOf(element) !== -1
  }

  this.values = function() {
    return collection
  }

  this.size = function() {
    return collection.length
  }

  this.add = function(element) {
    if (!this.has(element)) {
      collection.push(element)
      return true

    } else {
      return false
    }
  }

  this.remove = function(element) {
    if (this.has(element)) {
      const index = collection.indexOf(element)
      collection.splice(index, 1)
      return true

    } else {
      return false
    }
  }

  this.union = function(otherSet) {
    const unionSet = MySet()
    const firstSet = this.values()
    const secondSet = otherSet.values()

    firstSet.forEach(function(e) {
      unionSet.add(e)
    })
    secondSet.forEach(function(e) {
      unionSet.add(e)
    })

    return unionSet
  }

  this.intersection = function(otherSet) {
    const intersectionSet = new MySet()
    const firstSet = this.values()

    firstSet.forEach(function(e) {
      if (otherSet.has(e)) {
        intersectionSet.add(e)
      }
    })

    return intersectionSet
  }
}
