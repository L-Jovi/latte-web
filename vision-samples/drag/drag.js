let isDrag = false
let tLeft
let tTop

const moveElem = document.querySelector('.move')

document.addEventListener('mousedown', function(e) {
  if (e.target === moveElem) {
    isDrag = true
    const rect = moveElem.getBoundingClientRect()
    tLeft = e.clientX - rect.left
    tTop = e.clientY - rect.top
  }
})

document.addEventListener('mouseup', function() {
  isDrag = false;
})

document.addEventListener('mousemove', function(e) {
  if (isDrag) {
    const leftBounding = e.clientX - tLeft
    const topBounding = e.clientY - tTop
    moveElem.style.left = leftBounding + 'px'
    moveElem.style.top = topBounding + 'px'
  }
})
