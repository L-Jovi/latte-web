/*
 * @Description: implements several methods of inherit
 * weakness: Large memory overhead > call constructor function
 * @FileName: inherit/combination.js
 */

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


// parasitic combination
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


// use copy
function Animal(name, age) {
  this.name = name
  this.age = age
}

Animal.prototype.getName = function() {
  console.log(this.name)
}


function Cat(name, age, grade) {
  Animal.call(this, name, age)
  this.grade = grade
}


function inherit(child, parent) {
  let obj = parent.prototype
  obj.constructor = child
  for (let key in child.prototype) {
    Object.defineProperty(obj, key, {
      value: child.prototype[key]
    })
  }
  child.prototype = obj
}

inherit(Cat, Animal)
