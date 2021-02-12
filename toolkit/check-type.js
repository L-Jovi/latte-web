/**
 * isType.
 *
 * @param {String} type
 * @returns {Function}
 */
const isType = type => target => {
  return Object.prototype.toString.call(target) === `[object] ${type}`
}


console.log(isType('String')('foobar'))
