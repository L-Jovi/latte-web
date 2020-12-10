/*
 * @Description: differ from simple-factory, factory-method pattern don't need to modify factory self when add base class.
 * @FileName: factory/factory-method.js
 */

function Factory(type, item) {
  if (this instanceof Factory) {
    this[type](item)
  } else {
    return new Factory(type, item)
  }
}

Factory.prototype = {
  saber(item) {
    // do specify action of saber
    console.log('saber: ', item)
  },
  archer(item) {
    // do specify action of archer
    console.log('archer: ', item)
  },
}

Factory('saber', 'ex')
