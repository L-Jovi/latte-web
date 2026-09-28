/*
 * @Description: implements several methods of inherit
 * @FileName: inherit/prototype-obj.js
 */

function Parent() {

}

Parent.prototype.species = 'animal'


function Child(name,color){
  this.name = name
  this.color = color
}

const F = function() {

}

F.prototype = Parent.prototype

Child.prototype = new F()
Child.prototype.constructor = Child


const c = new Child()
console.log(c.species)
