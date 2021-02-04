/**
 * forgeCloneDeep.
 * @param {} item
 * https://juejin.cn/post/6844903929705136141
 */
const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const argsTag = '[object Arguments]'
const nullTag = '[object Null]'

const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const errorTag = '[object Error]'
const regexpTag = '[object RegExp]'
const funcTag = '[object Function]'

function cloneDeep(source, map = new WeakMap()) {
  if ((typeof source === 'object' || typeof source === 'function') && source !== null) {
    // get type
    const type = Object.prototype.toString.call(source)

    // get target instance
    const target = new source.constructor()

    // base type
    switch (type) {
      case boolTag:
      case numberTag:
      case stringTag:
      case errorTag:
      case dateTag:
      case regexpTag:
        return target
      case funcTag:
        return source
      case symbolTag:
        return Object(Symbol.prototype.valueOf.call(source))
      case nullTag:
        return null
    }

    // Set
    if (type === setTag) {
      for (let i of source) {
        target.add(i)
      }
      return target
    }

    // Map
    if (type === mapTag) {
      for (let [key, value] of source) {
        target.set(key, value)
      }
      return target
    }

    if (map.has(source)) {
      return map.get(source)
    } else {
      map.set(source, target)
    }

    for (let key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = cloneDeep(source[key])
      }
    }

  } else {
    return target
  }
}


// const isObject = (obj) => {
//   return typeof obj === 'object' && obj !== null
// }
//
// function cloneDeep(source, map=new WeakMap()) {
//   if (!isObject) {
//     return source
//   }
//
//   // circle ref property
//   if (map.has(source)) {
//     return map.get(source)
//   }
//   const target = Array.isArray(source) ? [] : {}
//   map.set(source, target)
//
//   // symbol
//   const symbolKeys = Object.getOwnPropertySymbols(source)
//   if (symbolKeys.length > 0) {
//     for (let key of symbolKeys) {
//       if (isObject(key)) {
//         target[key] = cloneDeep(source[key], map)
//       } else {
//         target[key] = cloneDeep(source[key])
//       }
//     }
//   }
//
//   for (let key in source) {
//     if (Object.prototype.hasOwnProperty.call(source, key)) {
//       if (typeof source[key] === 'object') {
//         target[key] = cloneDeep(source[key], map)
//       } else {
//         target[key] = source[key]
//       }
//     }
//   }
//   return target
// }
