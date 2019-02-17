// Builder
var canvas = document.getElementById('charles');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#eeb600';
context.fillRect(0, 0, width, height);

charles();

function charles() {
  const count = 30;
  const step = 35;
  const radius = 15;

  // Rotate 45 degrees from the middle of the canvas
  // But go back to 0,0 to start our drawing
  context.fillStyle = '#222222';
  context.strokeStyle = '#222222';
  context.translate(width / 2, height / 2);
  context.rotate((45 * Math.PI) / 180);
  context.translate(-1 * width, -1 * height);

  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      // Draw two slightly overlapping circles
      context.beginPath();
      context.arc(i * step - 10, j * step, radius, 0, Math.PI, false);
      context.arc(i * step + 10, j * step, radius, 0, Math.PI, true);
      context.fill();
      context.stroke();
    }
  }
}
