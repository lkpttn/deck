// Auditiva
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#1a1e3f';
context.fillRect(0, 0, width, height);

auditiva();

// Draw again on a click
canvas.addEventListener('click', function() {
  auditiva();
});

function auditiva() {
  var colors = [
    '#ff4300', // red
    '#9419FE', // purple
    '#F5F802', // yellow
    '#354cf4', // blue
    '#76FC13', // green
  ];

  context.globalCompositeOperation = 'source-over';
  context.fillStyle = '#1a1e3f';
  context.fillRect(0, 0, width, height);

  // Draw a group of lines
  context.lineWidth = 2;
  context.lineCap = 'round';
  context.globalCompositeOperation = 'screen';

  for (let i = 0; i < 10; i++) {
    let color = colors[i % colors.length];
    clipCircle(rangeFloor(0, width), rangeFloor(0, height), color);
  }

  // Functions
  function clipCircle(x, y, color) {
    var radius = 150;
    context.save();
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.clip();

    context.strokeStyle = color;
    drawLines(x - radius, y - radius, 300);
    context.restore();
  }

  function drawLines(x, y, size) {
    // Draw a bunch of vertical lines
    for (let i = 0; i < size / 7; i++) {
      context.beginPath();
      context.moveTo(x + i * 7, y);
      context.lineTo(x + i * 7, y + size);
      context.stroke();
    }
  }

  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }
}
