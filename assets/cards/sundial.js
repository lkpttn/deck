// Sundial
var canvas = document.getElementById('sundial');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

sundial();

function sundial() {
  // Move to the center of the canvas and initial rotation
  context.translate(width / 2, height / 2);
  context.rotate((190 * Math.PI) / 180);

  var halfWidth = width / 2;

  for (let i = 0; i < 28; i++) {
    // Rotate 10 degrees each iteration
    context.rotate((-10 * Math.PI) / 180);

    // Math out a new color
    context.fillStyle = `rgba(${40 + i * 3}, ${180 - i * 8},${255 -
      i * 6}, 1.0)`;

    // Draw
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(width, 0);
    context.lineTo(halfWidth, height);
    context.lineTo(0, height);

    context.fill();
  }
}
