/*
 * @Description: Check cycle reference.
 * @FileName: check-by-iterator.js
 */

const isCycleByIterator = (obj, records=[]) => {
  if (typeof obj === 'object') {
    if (records.indexOf(obj) !== -1) {
      return true

    } else {
      records.push(obj)
      for (let key in obj) {
        if (obj.hasOwnProperty(key) && isCircleRef(obj[key], records)) {
          return true
        }
      }
    }

  } else {
    return false
  }
}
