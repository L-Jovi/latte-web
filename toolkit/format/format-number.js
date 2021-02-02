/*
 * @Description: trigger event after n seconds.
 * @FileName: toolkit/format/format-number.js
 */

function formatNumber(str) {
  // ["0", "9", "8", "7", "6", "5", "4", "3", "2", "1"]
  const nums = str.split('').reverse()
  return nums.reduce((prev, next, index) => {
    if (index % 3) {
      return next + prev
    } else {
      return next + ',' + prev
    }
  })
}
