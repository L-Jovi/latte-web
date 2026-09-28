class C__Super {}
class C__Sub extends C__Super {}

const c__sub = new C__Sub()

console.log(C__Sub.__proto__ === C__Super)


function Super() {}
function Sub() {}

Sub.prototype = new Super()
Sub.prototype.constructor = Sub

var sub = new Sub()

console.log(Sub.__proto__ === Function.prototype)
console.log(Sub.__proto__ === Super)
