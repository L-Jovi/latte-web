/*
 * @Description: Check cycle reference.
 * @FileName: check-by-json-parser.js
 */

const isCycleByJSON = (obj) => {
  try {
    JSON.stringify(obj)
    return false
  } catch (err) {
    return true
  }
}
