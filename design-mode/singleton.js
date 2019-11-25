class Singleton {
  constructor() {}
}


// using closure ensure [instance] exist within class
Singleton.getInstance = (function() {
  let instance

  return function() {
    if (!instance) {
      instance = new Singleton()
    }
    return instance
  }
})()


let s1 = Singleton.getInstance()
let s2 = Singleton.getInstance()
console.log(s1 === s2)
