// The site bar above the wheel has a button of its own: the language switch.
const wheel = document.querySelector('.wheel'),
  button = document.querySelector('.wheel ~ button'),
  output = document.querySelector('output');
let angle = 0,
  selected = null;
// The page shows one language at a time (assets/language.js), so the result
// is kept and written again when the reader switches language.
function say(letter) {
  selected = letter;
  output.textContent =
    document.documentElement.dataset.language === 'zh'
      ? '选中：' + letter
      : 'Selected: ' + letter;
}
document.addEventListener('languagechange', () => {
  if (selected) say(selected);
});
button.onclick = async () => {
  button.disabled = true;
  const index = Math.floor(Math.random() * 4);
  // Align the chosen segment's centre with the fixed bottom pointer after three full turns.
  const target = (180 - (index * 90 + 45) + 360) % 360;
  const next = angle + 1080 + ((target - (angle % 360) + 360) % 360);
  const animation = wheel.animate(
    [{ transform: `rotate(${angle}deg)` }, { transform: `rotate(${next}deg)` }],
    {
      duration: matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 1
        : 900,
      easing: 'cubic-bezier(.2,.7,.1,1)',
      fill: 'forwards',
    },
  );
  try {
    await animation.finished;
    angle = next;
    wheel.style.transform = `rotate(${angle}deg)`;
    animation.cancel();
    say(['A', 'B', 'C', 'D'][index]);
  } finally {
    button.disabled = false;
  }
};
