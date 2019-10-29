function readonly(target, key, descriptor) {
  descriptor.writable = false
  return descriptor
}


class Test {
  @readonly
  name = 'yck'
}


let t = new Test()
t.name = 111
