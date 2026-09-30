const link = document.querySelector('.legacy a');
let frame;
function tween(to) {
  cancelAnimationFrame(frame);
  const from = link.getBoundingClientRect().width,
    start = performance.now();
  function draw(now) {
    const t = matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 1
      : Math.min(1, (now - start) / 250);
    link.style.width = from + (to - from) * (1 - (1 - t) ** 3) + 'px';
    if (t < 1) frame = requestAnimationFrame(draw);
  }
  frame = requestAnimationFrame(draw);
}
function updateWidth() {
  // Same states as the CSS menu, so a mouse click does not keep the link wide.
  tween(link.matches(':hover,:focus-visible') ? 260 : 180);
}
for (const event of ['mouseenter', 'mouseleave', 'focus', 'blur'])
  link.addEventListener(event, updateWidth);
let step = 0;
const steps = [...document.querySelectorAll('#steps li')];
function show() {
  steps.forEach((node, i) => {
    if (i === step) node.setAttribute('aria-current', 'step');
    else node.removeAttribute('aria-current');
  });
  document.querySelector('output').textContent = `Step ${step + 1} of 3`;
  document.querySelector('#back').disabled = step === 0;
  document.querySelector('#next').disabled = step === 2;
}
document.querySelector('#back').onclick = () => {
  step = Math.max(0, step - 1);
  show();
};
document.querySelector('#next').onclick = () => {
  step = Math.min(2, step + 1);
  show();
};
show();
document.querySelector('#progress').oninput = (event) => {
  const ring = document.querySelector('.ring');
  ring.style.setProperty('--value', event.target.value);
  ring.setAttribute('aria-valuenow', event.target.value);
  ring.firstElementChild.textContent = event.target.value + '%';
};
