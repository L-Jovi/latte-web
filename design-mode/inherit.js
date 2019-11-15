// combination
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
