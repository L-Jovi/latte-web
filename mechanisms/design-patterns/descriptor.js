// Property descriptors are standard JavaScript; this example needs no decorator transform.
const test = {}
Object.defineProperty(test, 'name', {value: 'yck', writable: false, enumerable: true})
console.log(test.name, Reflect.set(test, 'name', 'replacement'))
