const target = {
  name: 'saber',
  weapon: 'ex',
}

const handler = {
  get: (target, key, proxy) => {
    console.log(target)
    console.log(key, typeof key)
    console.log(proxy)
    return 'king ' + target[key]
  },

  set: (target, key, value, proxy) => {
    switch (key) {
      case 'name':
        target.name = 'archer'
      default:
        target.weapon = 'ea'
    }
  }
}

const proxy = new Proxy(target, handler)
console.log(proxy.name)
proxy.name = 'foobar'
console.log(proxy.name)
