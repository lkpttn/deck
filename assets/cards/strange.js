// Strange
var canvas = document.getElementById('strange');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

strange();

function strange() {
  // Backgrounds
  context.fillStyle = '#000000';
  context.fillRect(0, 0, width, height);

  context.translate(width / 2, height / 2);
  context.strokeStyle = '#ffffff';

  // Outer arcs
  drawCircle(140, 2);
  drawCircle(120, 2);
  strokes(140, 20, 1, 3);

  drawSquare(170, 75, 2);
  drawSquare(170, 105, 2);

  // Middle circle
  drawCircle(70, 1);
  drawSquare(100, 45, 1);
  drawSquare(100, 0, 1);

  // Inner
  drawCircle(40, 1);
  drawCircle(35, 1);
  strokes(40, 5, 1, 10);
  drawSquare(40, 75, 2);
  drawSquare(40, 105, 2);

  // Draw small lines in a circle at a certain size
  function strokes(radius, length, thickness, frequency) {
    context.save();
    for (let i = 0; i < 360 / frequency; i++) {
      context.beginPath();
      context.moveTo(0, -radius);
      context.lineTo(0, -radius + length);
      context.lineWidth = thickness;
      context.stroke();
      context.rotate((frequency * Math.PI) / 180);
    }
    context.restore();
  }

  function drawCircle(radius, thickness) {
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2, false);
    context.lineWidth = thickness;
    context.stroke();
  }

  function drawSquare(size, rotation, thickness) {
    context.save();
    context.rotate((rotation * Math.PI) / 180);
    context.beginPath();
    context.rect(-size / 2, -size / 2, size, size);
    context.lineWidth = thickness;
    context.stroke();

    context.restore();
  }
}
