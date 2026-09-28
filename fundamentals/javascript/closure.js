/*
 * @Description: Some classic closure case for understand.
 * @FileName: closure.js
 */

// async callback within loop
for (let i = 0; i < 5; i++) {
  ;(function(i) {
    setTimeout(function() {
      console.log(i)
    }, i * 1000)
  })(i)
}
