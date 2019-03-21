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
  context.save();
  context.translate(width / 2, height / 2);

  var halfWidth = width / 2;
  var halfHeight = height / 2;

  context.rotate((70 * Math.PI) / 180);

  context.fillStyle = '#144b89';
  context.beginPath();
  context.moveTo(-width, 0);
  context.lineTo(halfHeight, 0);
  context.lineTo(width, halfHeight);
  context.lineTo(-width, height);
  context.fill();

  context.rotate((-10 * Math.PI) / 180);

  context.fillStyle = '#336fb2';
  context.beginPath();
  context.moveTo(-width, 0);
  context.lineTo(halfHeight, 0);
  context.lineTo(width, halfHeight);
  context.lineTo(-width, height);
  context.fill();

  context.rotate((-30 * Math.PI) / 180);

  context.fillStyle = '#354cf4';
  context.beginPath();
  context.moveTo(-width, 0);
  context.lineTo(halfHeight, 0);
  context.lineTo(width, halfHeight);
  context.lineTo(-width, height);
  context.fill();

  context.restore();

  // Circle
  context.beginPath();
  context.fillStyle = 'white';
  context.arc(width / 2, height / 2, 100, 0, Math.PI * 2, false);
  context.clip();
  context.fill();
}
