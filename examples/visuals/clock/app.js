import { digit } from './digit.js';
const canvas = document.querySelector('canvas'),
  ctx = canvas.getContext('2d'),
  output = document.querySelector('output');
const positions = [30, 165, 300, 381, 516, 651, 732, 867];
let balls = [],
  end = 0,
  frame = 0,
  last = 0,
  previous = '00:00:10';
function cells(text, visit) {
  for (let i = 0; i < text.length; i++)
    digit[text[i] === ':' ? 10 : Number(text[i])].forEach((row, y) =>
      row.forEach((filled, x) => {
        if (filled) visit(positions[i] + x * 18 + 9, 50 + y * 18 + 9, i);
      }),
    );
}
function render(text) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#086b89';
  cells(text, (x, y) => {
    ctx.beginPath();
    ctx.arc(x, y, 8, 0, Math.PI * 2);
    ctx.fill();
  });
  for (const ball of balls) {
    ctx.fillStyle = ball.color;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 6, 0, Math.PI * 2);
    ctx.fill();
  }
}
function tick(now) {
  const dt = Math.min((now - last) / 1000, 0.05);
  last = now;
  const seconds = Math.max(0, Math.ceil((end - now) / 1000));
  const text = '00:00:' + String(seconds).padStart(2, '0');
  if (text !== previous) {
    cells(previous, (x, y, i) => {
      if (text[i] !== previous[i])
        balls.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 180,
          vy: -150,
          age: 0,
          color: ['#e8773e', '#49a6a6', '#8955aa'][i % 3],
        });
    });
    previous = text;
    output.textContent = seconds + ' seconds remaining';
  }
  for (const ball of balls) {
    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;
    ball.vy += 500 * dt;
    ball.age += dt;
    if (ball.y > 414) {
      ball.y = 414;
      ball.vy = -Math.abs(ball.vy) * 0.65;
    }
  }
  // Removed particles cannot accumulate forever after repeated restarts.
  balls = balls
    .filter((ball) => ball.age < 4 && ball.x > -8 && ball.x < 1032)
    .slice(-400);
  render(text);
  if (seconds || balls.length) frame = requestAnimationFrame(tick);
}
document.querySelector('button').onclick = () => {
  cancelAnimationFrame(frame);
  balls = [];
  previous = '00:00:10';
  last = performance.now();
  end = last + 10000;
  output.textContent = '10 seconds remaining';
  frame = requestAnimationFrame(tick);
};
render(previous);
