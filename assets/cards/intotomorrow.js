// Into Tomorrow
var canvas = document.getElementById('intotomorrow');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#23363A';
context.fillStyle = '#000000';
context.fillRect(0, 0, width, height);

intoTomorrow();

function intoTomorrow() {
  const rings = 7;
  const step = 10;

  context.strokeStyle = '#F1D9A3';

  // Dashed Line
  context.beginPath();
  context.setLineDash([5, 5]);
  context.moveTo(width / 2, height);
  context.lineTo(width / 2, 70);
  context.stroke();

  // Rings
  context.setLineDash([]);
  for (let i = 0; i < rings; i++) {
    context.beginPath();
    context.ellipse(
      width / 2, // x position
      70 + i * step * 7, // y position
      60 + i * 14, // x radius
      5 + i * 4, // y radius
      0, // rotation
      0, // start angle
      2 * Math.PI, // end angle
    );
    context.stroke();
  }

  // Sphere
  context.beginPath();
  context.fillStyle = '#E95B1C';
  context.arc(width / 2, 65, 30, 0, Math.PI * 2, false);
  context.fill();

  // 3D effect
  context.beginPath();
  context.ellipse(width / 2, 70, 60, 5, 0, 0, Math.PI);
  context.stroke();
}
