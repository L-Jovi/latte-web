const isType = type => target => Object.prototype.toString.call(target) === `[object ${type}]`
console.log(isType('String')('foobar'))
