/*
 * @Description: Implement instanceof keyword by native Javascript.
 * @FileName: instanceof.js
 */

function forgeInstanceof(left, right) {
  let prototype = right.prototype
  left = left.__proto__

  while (true) {
    if (left === null || left == undefined) {
      return false
    }
    if (prototype === left) {
      return true
    }
    left = left.__proto__
  }
}


// main
