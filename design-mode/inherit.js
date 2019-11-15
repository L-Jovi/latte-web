/*
 * @Description: implements several methods of inherit
 * @FileName: inherit.js
 */

// combination
// weakness: Large memory overhead > call constructor function
function Parent(value) {
  this.val = value
}

Parent.prototype.getValue = function() {
  console.log(this.val)
}


function Child(value) {
  Parent.call(this, value)
}

Child.prototype = new Parent()


const child = new Child(1)
child.getValue()
console.log(child instanceof Parent)


// Parasitic combination
function Father(value) {
  this.val = value
}

Father.prototype.getValue = function() {
  console.log(this.val)
}


function Son(value) {
  Father.call(this, value)
}

Son.prototype = Object.create(Father.prototype, {
  constructor: {
    value: Son,
    enumerable: false,
    writable: true,
    configurable: true,
  }
})

const son = new Son(2)
son instanceof Father
