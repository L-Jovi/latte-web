// implements [size] [head] [add] [remove] [indexOf] [elementAt] [addAt] [removeAt]

function Node(element) {
  this.element = element
  this.next = null
}


function LinkedList() {
  let length = 0
  let head = null

  this.size = function() {
    return length
  }

  this.head = function() {
    return head
  }

  this.add = function(element) {
    const node = new Node(element)

    if (head === null) {
      head = node

    } else {
      let currentNode = head
      while (currentNode.next) {
        currentNode = currentNode.next
      }
      currentNode.next = node
    }

    length++
  }

  this.remove = function(element) {
    let currentNode = head
    let previousNode

    if (currentNode.element === element) {
      head = currentNode.next
    } else {
      while (currentNode.element !== element) {
        previousNode = currentNode
        currentNode = currentNode.next
      }
      // prune currentNode
      previousNode.next = currentNode.next
    }

    length--
  }

  this.isEmpty = function() {
    return length === 0
  }

  this.indexOf = function(element) {
    let index = -1
    let currentNode = head

    while (currentNode) {
      index++
      if (currentNode.element == element) {
        return index
      } else {
        currentNode = currentNode.next
      }
    }

    return -1
  }

  this.elementAt = function(index) {
    let currentIndex = 0
    let currentNode = head

    // return first element if index = 0
    while (currentIndex < index) {
      currentIndex++
      currentNode = currentNode.next
    }

    return currentNode.element
  }

  this.addAt = function(index, element) {
    const node = new Node(element)
    let currentIndex = 0
    let currentNode = head
    let previousNode

    // skip index > length condition
    if (index > length) {
      return false

    } else {
      // insert at 1st position
      if (index === 0) {
        node.next = currentNode
        head = node

      } else {
        // insert after 1st position
        // until currentIndex === index
        while (index > currentIndex) {
          currentIndex++
          previousNode = currentNode
          currentNode = currentNode.next
        }

        // connect previousNode, node(inserting node), currentNode
        node.next = currentNode
        previousNode.next = node
      }
    }

    length++
  }

  this.removeAt = function(index) {
    let currentIndex = 0
    let currentNode = head
    let previousNode

    if (idnex < 0 || index >= length) {
      return null

    } else {
      if (index === 0) {
        head = currentNode.next

      } else {
        while (currentIndex < index) {
          currentIndex++
          previousNode = currentNode
          currentNode = currentNode.next
        }

        // remove currentNode
        previousNode.next = currentNode.next
      }
    }

    length--
    return currentNode.element
  }
}


// main

const list = new LinkedList()
list.add(5)
list.add(3)
const index = list.indexOf(3)
console.log('indexOf: ', index)
