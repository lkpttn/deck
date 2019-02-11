// Bergdorf
var canvas = document.getElementById('ace');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

const width = canvas.width;
const height = canvas.height;

const step = 15;

context.fillStyle = '#001628';
context.fillRect(0, 0, width, height);

draw();

function draw() {
  // Circle in the four corners
  context.beginPath();
  drawCircles(0, 0, 6);
  drawCircles(width, 0, 6);
  drawCircles(width, height, 6);
  drawCircles(0, height, 6);
  context.strokeStyle = 'goldenrod';
  context.stroke();

  // Draw the center circles
  context.beginPath();
  drawCircles(width / 2, height / 2, 6);
  context.moveTo(width / 2 - step * 5, height / 2);
  context.lineTo(width / 2 - step, height / 2);
  context.stroke();

  // Draw the diamonds
  context.beginPath();
  drawDiamond(4);
  context.stroke();

  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(width, height);
  context.lineTo(width, 0);
  context.lineTo(0, height);
  context.stroke();
}

function drawCircles(x, y, n) {
  for (let i = 1; i < n; i++) {
    context.arc(x, y, step * i, 0, Math.PI * 2, false);
  }
}

function drawDiamond(n) {
  for (let i = 0; i < n; i++) {
    context.moveTo(0 + step * i, height / 2);
    context.lineTo(width / 2, 0 + step * i * 1.5);
    context.lineTo(width - step * i, height / 2);
    context.lineTo(width / 2, height - step * i * 1.5);
    context.lineTo(0 + step * i, height / 2);
  }
}

// Pinwheel
var canvas = document.getElementById('pinwheel');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

context.fillStyle = '#000000';
context.fillRect(0, 0, width, height);

const size = 20;

pinwheel();

function pinwheel() {
  var rectWidth = 300;
  var rectHeight = 300;
  context.strokeStyle = '#FFFFFF';
  context.lineWidth = 2;

  context.beginPath();
  for (let j = 0; j < 8; j++) {
    let x1 = 0 + j * size + j;
    let y1 = 0 + j * size + j;

    context.rect(x1, y1, rectWidth, rectHeight);
    console.log(
      'Creating a rectangle from ' +
        x1 +
        ', ' +
        y1 +
        ' with a width of ' +
        rectWidth +
        ', and a height of ' +
        rectHeight,
    );

    rectWidth = rectWidth - size * 2;
    rectHeight = rectHeight - size * 2;

    // context.arc(0 - j, 0, 2, 0, Math.PI * 2, false);
    context.rotate(1 * (Math.PI / 180));
    context.translate(j, -1 * j);
  }
  context.stroke();
}
