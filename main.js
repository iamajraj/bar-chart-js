const canvas = document.getElementById("canvas");
const numbersInp = document.querySelector("input[name='numbers']");
const applyBtn = document.querySelector(".controlsApply");

const WIDTH = 700;
const HEIGHT = 500;
const PADDING = 50;

canvas.width = WIDTH;
canvas.height = HEIGHT;

const ctx = canvas.getContext("2d");

const yAxis = [1, 2, 5, 3, 7, 3];
const barData = yAxis;

applyBtn.addEventListener("click", () => {
  let value = numbersInp.value;
  if (value !== "") {
    let nums = value.split(",");
    if (!nums.some((v) => Number.isInteger(Number(v)))) {
      alert("Please provide correct data");
    } else {
      clear();
      drawXAxis();
      drawYAxis(nums);
      drawBars(nums);
    }
  }
});

function drawXAxis() {
  ctx.beginPath();
  ctx.moveTo(0 + PADDING, HEIGHT - PADDING);
  ctx.lineTo(WIDTH - PADDING, HEIGHT - PADDING);
  ctx.stroke();
}

function clear() {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function drawYAxis(data = yAxis) {
  let max = Math.max(...data);
  let segments = divideIntoSegments(max, Math.min(data.length, 3));
  segments = segments.sort((a, b) => b - a);

  if (segments.includes(0)) {
    segments.splice(segments.indexOf(0), 1);
  }
  let size = (HEIGHT - PADDING * 2) / segments.length;
  let heightPad = 50;

  ctx.beginPath();
  ctx.moveTo(PADDING, PADDING);
  ctx.lineTo(PADDING, HEIGHT - heightPad);
  ctx.stroke();

  let numberLeftPad = 30;

  for (let i = 0; i < segments.length; i++) {
    ctx.beginPath();
    ctx.textBaseline = "top";
    ctx.fillText(segments[i], PADDING - numberLeftPad, size * i + PADDING);
    ctx.textBaseline = "bottom";
  }

  // add zero
  ctx.beginPath();
  ctx.fillText(0, PADDING - numberLeftPad, HEIGHT - heightPad);
}

function divideIntoSegments(total, numSegments) {
  const step = total / numSegments;
  const segments = [];

  for (let i = 1; i <= numSegments; i++) {
    const segment = Math.round(step * i);
    segments.push(segment);
  }

  return segments;
}

function drawBars(data = barData) {
  let size = WIDTH / data.length - 20;
  let extraPadding = 20;

  let maxValue = Math.max(...data);

  for (let i = 0; i < data.length; i++) {
    ctx.beginPath();

    let barHeight =
      (data[i] / maxValue) * (HEIGHT - extraPadding - PADDING * 2);

    let y = HEIGHT - barHeight - PADDING;

    ctx.rect(i * size + PADDING, y, size - extraPadding, barHeight);
    ctx.fillStyle = getRandomColor();
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      data[i],
      i * size + PADDING + (size - extraPadding) / 2,
      y - 5
    );
  }
}

function getRandomColor() {
  return `rgb(
  ${Math.floor(Math.random() * 255)},
  ${Math.floor(Math.random() * 255)},
  ${Math.floor(Math.random() * 255)})`;
}

drawXAxis();
drawYAxis();
drawBars();
