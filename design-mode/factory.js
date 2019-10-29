class Man {
  constructor(name) {
    this.name = name
  }

  consoleName() {
    console.log(this.name)
  }
}


class Factory {
  static create(name) {
    return new Man(name)
  }
}


Factory.create('yck').consoleName()
