class Plug {
  getName() {
    return 'archer'
  }
}


class Target {
  constructor() {
    this.plug = new Plug()
  }

  getName() {
    return `saber and ${this.plug.getName()}`
  }
}


let target = new Target()
console.log(target.getName())
