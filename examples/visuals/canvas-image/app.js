import { filterPixels, procedural } from './pixels.js';
const canvas = document.querySelector('canvas'),
  ctx = canvas.getContext('2d', { willReadFrequently: true }),
  source = new Image();
const scale = document.querySelector('#scale'),
  watermark = document.querySelector('#watermark'),
  magnify = document.querySelector('#magnify');
let mode = 'none',
  point = { x: 240, y: 150 };
source.src = './source.svg';
await source.decode();
function draw() {
  ctx.clearRect(0, 0, 480, 300);
  const factor = Number(scale.value);
  ctx.drawImage(
    source,
    240 - 240 * factor,
    150 - 150 * factor,
    480 * factor,
    300 * factor,
  );
  const image = ctx.getImageData(0, 0, 480, 300);
  image.data.set(
    mode === 'procedural'
      ? procedural(480, 300)
      : filterPixels(image.data, 480, 300, mode),
  );
  ctx.putImageData(image, 0, 0);
  if (magnify.checked) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(point.x, point.y, 50, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(
      source,
      ((point.x - 240 + 240 * factor) * 2) / factor - 50 / factor,
      ((point.y - 150 + 150 * factor) * 2) / factor - 50 / factor,
      100 / factor,
      100 / factor,
      point.x - 50,
      point.y - 50,
      100,
      100,
    );
    ctx.restore();
  }
  if (watermark.checked) {
    ctx.fillStyle = 'white';
    ctx.font = '20px system-ui';
    ctx.fillText('latte-web', 350, 275);
  }
  document.querySelector('output').textContent = `${mode}; scale ${factor}`;
}
for (const input of [scale, watermark, magnify])
  input.addEventListener('input', draw);
document.querySelector('#filters').onclick = (event) => {
  if (event.target.dataset.mode) {
    mode = event.target.dataset.mode;
    draw();
  }
};
canvas.addEventListener('pointermove', (event) => {
  const rect = canvas.getBoundingClientRect();
  point = {
    x: ((event.clientX - rect.left) * canvas.width) / rect.width,
    y: ((event.clientY - rect.top) * canvas.height) / rect.height,
  };
  if (magnify.checked) draw();
});
canvas.onkeydown = (event) => {
  const moves = {
    ArrowLeft: [-10, 0],
    ArrowRight: [10, 0],
    ArrowUp: [0, -10],
    ArrowDown: [0, 10],
  };
  if (moves[event.key]) {
    event.preventDefault();
    point.x = Math.max(0, Math.min(480, point.x + moves[event.key][0]));
    point.y = Math.max(0, Math.min(300, point.y + moves[event.key][1]));
    draw();
  }
};
draw();
