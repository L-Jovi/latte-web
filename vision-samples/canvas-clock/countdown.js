const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;
const RADIUS = 8;
const MARGIN_TOP = 60;
const MARGIN_LEFT = 30;

const endTime = new Date(2018, 1, 20);
let curShowTimeSeconds = 0

const balls = [];
const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]

window.onload = function() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext("2d");

  canvas.width = WINDOW_WIDTH;
  canvas.height = WINDOW_HEIGHT;

  curShowTimeSeconds = getCurrentShowTimeSeconds()
  setInterval(
    function() {
      render(context);
      update();
    },
    50
  );
}

function getCurrentShowTimeSeconds() {
  const curTime = new Date();
  let ret = endTime.getTime() - curTime.getTime();
  ret = Math.round(ret / 1000)

  return ret >= 0 ? ret : 0;
}

function update() {

  const nextShowTimeSeconds = getCurrentShowTimeSeconds();

  const nextHours = parseInt(nextShowTimeSeconds / 3600);
  const nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60)
  const nextSeconds = nextShowTimeSeconds % 60

  const curHours = parseInt(curShowTimeSeconds / 3600);
  const curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60)
  const curSeconds = curShowTimeSeconds % 60

  if (nextSeconds != curSeconds) {
    if (parseInt(curHours / 10) != parseInt(nextHours / 10)) {
      addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
    }
    if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
      addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
    }

    if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
      addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
    }
    if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
      addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
    }

    if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
      addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
    }
    if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
      addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
    }

    curShowTimeSeconds = nextShowTimeSeconds;
  }

  updateBalls();
}

function updateBalls() {

  for (let i = 0; i < balls.length; i++) {

    balls[i].x += balls[i].vx;
    balls[i].y += balls[i].vy;
    balls[i].vy += balls[i].g;

    if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
      balls[i].y = WINDOW_HEIGHT - RADIUS;
      balls[i].vy = -balls[i].vy * 0.75;
    }
  }
}

function addBalls(x, y, num) {

  for (let i = 0; i < digit[num].length; i++)
    for (let j = 0; j < digit[num][i].length; j++)
      if (digit[num][i][j] == 1) {
        const aBall = {
          x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
          y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
          g: 1.5 + Math.random(),
          vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
          vy: -5,
          color: colors[Math.floor(Math.random() * colors.length)]
        }

        balls.push(aBall)
      }
}

function render(cxt) {

  cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

  const hours = parseInt(curShowTimeSeconds / 3600);
  const minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60)
  const seconds = curShowTimeSeconds % 60

  renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt)
  renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt)
  renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt)
  renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);
  renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt);
  renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt);
  renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);
  renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt);

  for (let i = 0; i < balls.length; i++) {
    cxt.fillStyle = balls[i].color;

    cxt.beginPath();
    cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
    cxt.closePath();

    cxt.fill();
  }
}

function renderDigit(x, y, num, cxt) {

  cxt.fillStyle = "rgb(0,102,153)";

  for (let i = 0; i < digit[num].length; i++)
    for (let j = 0; j < digit[num][i].length; j++)
      if (digit[num][i][j] == 1) {
        cxt.beginPath();
        cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI)
        cxt.closePath()

        cxt.fill()
      }
}
