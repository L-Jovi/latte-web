// new
function myNew() {
    let obj = {}
    let Constructor = [].shift.call(arguments)
    obj.__proto__ = Constructor.prototype

    let result = Constructor.apply(obj, arguments)
    return result instanceof Object ? result : obj
}


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
