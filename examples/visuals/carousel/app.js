import { slots } from './geometry.js';
const layered = document.querySelector('#layers'),
  cards = [...layered.querySelectorAll('article')];
let current = 0;
// The page shows one language at a time (assets/language.js).
const cardName = (number) =>
  document.documentElement.dataset.language === 'zh'
    ? `卡片 ${number}`
    : `Card ${number}`;
function render() {
  slots(cards.length, current).forEach((slot, i) => {
    Object.assign(cards[i].style, {
      transform: `translateX(${slot.x}px) scale(${slot.scale})`,
      opacity: slot.opacity,
      zIndex: slot.z,
    });
    cards[i].setAttribute('aria-current', String(i === current));
  });
  layered.querySelector('output').textContent = cardName(current + 1);
}
function rotate(step) {
  current = (current + step + cards.length) % cards.length;
  render();
}
layered
  .querySelectorAll('button')
  .forEach(
    (button) => (button.onclick = () => rotate(Number(button.dataset.step))),
  );
layered.querySelector('.stage').onkeydown = (event) => {
  if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault();
    rotate(event.key === 'ArrowRight' ? 1 : -1);
  }
};
render();
const snap = document.querySelector('#snap'),
  strip = snap.querySelector('.strip');
let selected = 0;
function select(step) {
  selected = Math.max(0, Math.min(4, selected + step));
  strip.scrollTo({
    left: selected * strip.clientWidth,
    behavior: matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'instant'
      : 'smooth',
  });
}
strip.onscroll = () => {
  selected = Math.round(strip.scrollLeft / strip.clientWidth);
  snap.querySelector('output').textContent = cardName(selected + 1);
  snap.querySelector('[data-step="-1"]').disabled = selected === 0;
  snap.querySelector('[data-step="1"]').disabled = selected === 4;
};
strip.onscroll();
snap
  .querySelectorAll('button')
  .forEach(
    (button) => (button.onclick = () => select(Number(button.dataset.step))),
  );
strip.onkeydown = (event) => {
  if (['ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault();
    select(event.key === 'ArrowRight' ? 1 : -1);
  }
};
// A language switch writes both readouts again, in the other language.
document.addEventListener('languagechange', () => {
  render();
  strip.onscroll();
});
