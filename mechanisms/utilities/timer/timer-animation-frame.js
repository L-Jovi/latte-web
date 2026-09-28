const e = document.getElementById('a');
let flag = true;
let left = 0;

function render() {
  if (flag == true) {
    if (left >= 100) {
      flag = false;
    }
    e.innerHTML = left++;
  } else {
    if (left <= 0) {
      flag = true;
    }
    e.innerHTML = left--;
  }
}

// via interval
// setInterval(function () {
//   render();
// }, 1000/60);

// via requestAnimationFrame
(function animate() {
  render()
  requestAnimationFrame(animate)
})()
