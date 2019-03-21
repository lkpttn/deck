// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#d6f3ff';
context.fillRect(0, 0, width, height);

zig();

function zig() {
  // Bg shapes
  context.fillStyle = '#144b89';
  context.beginPath();
  context.moveTo(0, 175);
  context.lineTo(width / 2, 225);
  context.lineTo(width, 175);
  context.lineTo(width, height);
  context.lineTo(0, height);
  context.fill();

  context.fillStyle = '#336fb2';
  context.beginPath();
  context.moveTo(0, 220);
  context.lineTo(width / 2, 250);
  context.lineTo(width, 220);
  context.lineTo(width, height);
  context.lineTo(0, height);
  context.fill();

  context.fillStyle = '#4cc1d3';
  context.beginPath();
  context.moveTo(0, 250);
  context.lineTo(width / 2, 270);
  context.lineTo(width, 250);
  context.lineTo(width, height);
  context.lineTo(0, height);
  context.fill();

  context.fillStyle = '#aeeff9';
  context.beginPath();
  context.moveTo(0, 280);
  context.lineTo(width / 2, 280);
  context.lineTo(width, 280);
  context.lineTo(width, height);
  context.lineTo(0, height);
  context.fill();

  // Circle
  context.beginPath();
  context.fillStyle = 'white';
  context.arc(width / 2, height / 2, 100, 0, Math.PI * 2, false);
  context.clip();
  context.fill();

  context.translate(width / 2, height / 2);
  context.rotate((15 * Math.PI) / 180);
  context.translate((-1 * width) / 2, (-1 * height) / 2);

  context.fillStyle = '#e5b227';
  context.beginPath();
  context.moveTo(0, 250);
  context.lineTo(width / 2, 270);
  context.lineTo(width, 250);
  context.lineTo(width, height);
  context.lineTo(0, height);
  context.fill();

  context.fillStyle = '#ffd972';
  context.beginPath();
  context.moveTo(0, 280);
  context.lineTo(width / 2, 280);
  context.lineTo(width, 280);
  context.lineTo(width, height);
  context.lineTo(0, height);
  context.fill();
}
