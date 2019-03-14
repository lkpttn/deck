// Auditiva
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#000000';
context.fillRect(0, 0, width, height);

auditiva();

// Draw again on a click
canvas.addEventListener('click', function() {
  auditiva();
});

function auditiva() {
  const lineWidth = 5;
  var colors = [
    '#F80004', // red
    '#9419FE', // purple
    '#F5F802', // yellow
    '#011EFC', // blue
    '#76FC13', // green
  ];

  context.globalCompositeOperation = 'lighter';
  context.fillStyle = '#000000';
  context.fillRect(0, 0, width, height);

  context.globalCompositeOperation = 'lighter';
  context.lineWidth = lineWidth;
  context.lineCap = 'round';
  // Fill the background with lines
  for (let i = 0; i <= width / lineWidth; i++) {
    context.strokeStyle = colors[i % colors.length];
    // Draw lines at x
    context.beginPath();
    context.moveTo(i * lineWidth, height);
    context.lineTo(i * lineWidth, rangeFloor(height / 2, height));
    context.stroke();

    // Upside down
    context.beginPath();
    context.moveTo(i * lineWidth, 0);
    context.lineTo(i * lineWidth, rangeFloor(0, height / 2));
    context.stroke();
  }

  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }
}

// context.beginPath();
// context.moveTo(i * lineWidth, height);
// context.lineTo(i * lineWidth, rangeFloor(0, height));
// context.stroke();
