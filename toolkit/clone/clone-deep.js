function cloneDeepForge(item) {
  if (!item) {
    return item
  } // null, undefined values check

  const types = [Number, String, Boolean]
  let result

  // normalizing primitives if someone did new String('aaa'), or new Number('444')
  types.forEach(function(type) {
    if (item instanceof type) {
      result = type(item)
    }
  })

  // complex data structure
  if (typeof result == "undefined") {
    if (Object.prototype.toString.call(item) === "[object Array]") {
      result = []
      item.forEach(function(child, index, array) {
        result[index] = cloneDeep(child)
      })

    } else if (typeof item == "object") {
      // dom node
      if (item.nodeType && typeof item.cloneNode == "function") {
        result = item.cloneNode(true)

      // check that this is a literal
      } else if (!item.prototype) {
        if (item instanceof Date) {
          result = new Date(item)
        } else {
          // it is an object literal
          result = {}
          for (var i in item) {
            result[i] = cloneDeep(item[i])
          }
        }

      } else {
        // depending what you would like here,
        // just keep the reference, or create new object
        if (false && item.constructor) {
          // would not advice to do that, reason? Read below
          result = new item.constructor()
        } else {
          result = item
        }
      }

    } else {
      result = item
    }
  }

  return result
}


const isObject = (obj) => {
  return typeof obj === 'object' && obj !== null
}

function cloneDeep(source, map=new WeakMap()) {
  if (!isObject) {
    return source
  }

  // circle ref property
  if (map.has(source)) {
    return map.get(source)
  }
  const target = Array.isArray(source) ? [] : {}
  map.set(source, target)

  // symbol
  const symbolKeys = Object.getOwnPropertySymbols(source)
  if (symbolKeys.length > 0) {
    for (let key of symbolKeys) {
      if (isObject(key)) {
        target[key] = cloneDeep(source[key], map)
      } else {
        target[key] = cloneDeep(source[key])
      }
    }
  }

  for (let key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (typeof source[key] === 'object') {
        target[key] = cloneDeep(source[key], map)
      } else {
        target[key] = source[key]
      }
    }
  }
  return target
}
