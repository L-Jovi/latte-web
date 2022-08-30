/*
 * @Description: Implement generator by native Javascript.
 * @FileName: forge.js
 */

function forgeGenerator(cb) {
  return (function() {
    var object = {
      next: 0,
      stop: function() {}
    }

    return {
      next: function() {
        var ret = cb(object)
        if (ret === undefined) return { value: undefined, done: true }
        return {
          value: ret,
          done: false
        }
      }
    }
  })()
}
