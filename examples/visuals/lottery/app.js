const wheel = document.querySelector('.wheel'),
  button = document.querySelector('button'),
  output = document.querySelector('output');
let angle = 0;
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
    output.textContent = 'Selected: ' + ['A', 'B', 'C', 'D'][index];
  } finally {
    button.disabled = false;
  }
};
