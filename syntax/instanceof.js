/*
 * @Description: Implement instanceof keyword by native Javascript.
 * @FileName: instanceof.js
 */

// instanceof
function myInstanceof(left, right) {
    let prototype = right.prototype
    left = left.__proto__

    while(true) {
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
function CustomFn() {
    this.name = 'saber'
}

CustomFn.prototype.fire = function() {
    console.log('fire')
}

const instance = myNew(CustomFn)
console.log(instance)
