// implements [enqueue] [dequeue] [front] [isEmpty] [size]

function PriorityQueue() {
  const collection = []

  this.print = function() {
    console.log(collection)
  }

  this.enqueue = function(element) {
    if (this.isEmpty()) {
      collection.push(element)

    } else {
      let added = false
      for (let i = 0; i < collection.length; i++) {
        if (element[1] < collection[i][1]) {
          collection.splice(i, 0, element)
          added = true
          break
        }
      }

      if (!added) {
        collection.push(element)
      }
    }
  }

  this.dequeue = function () {
    return collection.shift()
  }

  this.front = function () {
    return collection[0]
  }

  this.isEmpty = function () {
    return collection.length === 0
  }

  this.size = function () {
    return collection.length
  }
}


// main

let pQ = new PriorityQueue()

pQ.enqueue(['gannicus', 3])
pQ.enqueue(['spartacus', 1])
pQ.enqueue(['crixus', 2])
pQ.enqueue(['oenomaus', 4])

pQ.print()
