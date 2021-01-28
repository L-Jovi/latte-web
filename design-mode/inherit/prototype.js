/*
 * @Description: implements several methods of inherit
 * weakness: modify Child prototype also modify Parent
 * @FileName: inherit/prototype.js
 */

function Parent() {

}

Parent.prototype.species = 'animal'


function Child(name,color){
  this.name = name
  this.color = color
}

Child.prototype = Parent.prototype;
Child.prototype.constructor = Child;


const c = new Child("大毛","黄色");
console.log(c.species)
