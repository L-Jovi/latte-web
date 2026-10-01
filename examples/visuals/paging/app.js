function pager(section, vertical) {
  const viewport = section.querySelector('.viewport'),
    track = section.querySelector('.track'),
    output = section.querySelector('output');
  let index = 0,
    start;
  const extent = () =>
    vertical ? viewport.clientHeight : viewport.clientWidth;
  function show() {
    track.style.transform = `translate${vertical ? 'Y' : 'X'}(${-index * extent()}px)`;
    // The page shows one language at a time (assets/language.js).
    output.textContent =
      document.documentElement.dataset.language === 'zh'
        ? `第 ${index + 1} 页，共 3 页`
        : `Page ${index + 1} of 3`;
    section.querySelector('[data-step="-1"]').disabled = index === 0;
    section.querySelector('[data-step="1"]').disabled = index === 2;
  }
  function go(step) {
    index = Math.max(0, Math.min(2, index + step));
    show();
  }
  function begin(value) {
    start = { value, time: performance.now() };
    track.style.transition = 'none';
  }
  function move(value) {
    if (start)
      track.style.transform = `translate${vertical ? 'Y' : 'X'}(${-index * extent() + value - start.value}px)`;
  }
  function end(value, cancel = false) {
    if (!start) return;
    const distance = value - start.value;
    const threshold = performance.now() - start.time < 300 ? 50 : extent() / 6;
    track.style.transition = '';
    go(!cancel && Math.abs(distance) > threshold ? (distance < 0 ? 1 : -1) : 0);
    start = null;
  }
  section
    .querySelectorAll('button')
    .forEach(
      (button) => (button.onclick = () => go(Number(button.dataset.step))),
    );
  viewport.onkeydown = (event) => {
    if (
      ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'].includes(event.key)
    ) {
      event.preventDefault();
      go(['ArrowLeft', 'ArrowUp'].includes(event.key) ? -1 : 1);
    }
  };
  new ResizeObserver(show).observe(viewport);
  // A language switch writes the page number again, in the other language.
  document.addEventListener('languagechange', show);
  show();
  return { begin, move, end, viewport };
}
const touch = pager(document.querySelector('#touch'), false);
touch.viewport.addEventListener(
  'touchstart',
  (event) => {
    if (event.touches.length === 1) touch.begin(event.touches[0].clientX);
  },
  { passive: true },
);
touch.viewport.addEventListener(
  'touchmove',
  (event) => {
    if (event.touches.length === 1) {
      event.preventDefault();
      touch.move(event.touches[0].clientX);
    }
  },
  { passive: false },
);
touch.viewport.addEventListener('touchend', (event) =>
  touch.end(event.changedTouches[0].clientX),
);
touch.viewport.addEventListener('touchcancel', () => touch.end(0, true));
const pointer = pager(document.querySelector('#pointer'), true);
let id;
pointer.viewport.onpointerdown = (event) => {
  if (!event.isPrimary || event.button !== 0) return;
  id = event.pointerId;
  pointer.begin(event.clientY);
  pointer.viewport.setPointerCapture(id);
};
pointer.viewport.onpointermove = (event) => {
  if (event.pointerId === id) pointer.move(event.clientY);
};
pointer.viewport.onpointerup = (event) => {
  if (event.pointerId === id) {
    pointer.end(event.clientY);
    id = undefined;
  }
};
pointer.viewport.onpointercancel = pointer.viewport.onlostpointercapture =
  () => {
    pointer.end(0, true);
    id = undefined;
  };
