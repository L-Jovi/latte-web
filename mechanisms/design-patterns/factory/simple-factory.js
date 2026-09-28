/*
 * @Description: provide static function return item.
 * @FileName: factory/simple-factory.js
 */
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

const item = Factory.create('yck')
item.consoleName()
