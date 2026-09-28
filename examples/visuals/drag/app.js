function move(block, x, y) {
  const field = block.parentElement;
  block.style.left =
    Math.max(0, Math.min(field.clientWidth - block.offsetWidth, x)) + 'px';
  block.style.top =
    Math.max(0, Math.min(field.clientHeight - block.offsetHeight, y)) + 'px';
}
const mouse = document.querySelector('#classic .block');
let start;
mouse.addEventListener('mousedown', (event) => {
  if (event.button !== 0) return;
  event.preventDefault();
  start = {
    x: event.clientX - mouse.offsetLeft,
    y: event.clientY - mouse.offsetTop,
  };
});
document.addEventListener('mousemove', (event) => {
  if (start) move(mouse, event.clientX - start.x, event.clientY - start.y);
});
document.addEventListener('mouseup', () => {
  start = null;
});
addEventListener('blur', () => {
  start = null;
});
const pointer = document.querySelector('#modern .block');
let gesture;
pointer.onpointerdown = (event) => {
  if (!event.isPrimary || event.button !== 0) return;
  gesture = {
    id: event.pointerId,
    x: event.clientX - pointer.offsetLeft,
    y: event.clientY - pointer.offsetTop,
  };
  pointer.setPointerCapture(event.pointerId);
};
pointer.onpointermove = (event) => {
  if (gesture?.id === event.pointerId)
    move(pointer, event.clientX - gesture.x, event.clientY - gesture.y);
};
pointer.onpointerup =
  pointer.onpointercancel =
  pointer.onlostpointercapture =
    () => {
      gesture = null;
    };
pointer.onkeydown = (event) => {
  const delta = {
    ArrowLeft: [-10, 0],
    ArrowRight: [10, 0],
    ArrowUp: [0, -10],
    ArrowDown: [0, 10],
  }[event.key];
  if (delta) {
    event.preventDefault();
    move(pointer, pointer.offsetLeft + delta[0], pointer.offsetTop + delta[1]);
  }
};
