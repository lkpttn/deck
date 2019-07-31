// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

berlin();

function berlin() {
  var colors = [
    '#FFB713', // Gold
    '#5200C5', // Purple
    '#009F45', // Green
    '#FF3A5C', // Redish
    '#4646DF', // Blue
    '#F44918', // Orange
  ];

  // Backgrounds
  context.fillStyle = '#000000';
  context.fillRect(0, 0, width, height);

  for (let i = 0; i < 20; i++) {
    if (Math.random() > 0.5) {
      drawBox(width / 2 + 30, i * 30, 40, 10);
    } else {
      drawCircle(width / 2 + 30, i * 30, 10, pick(colors));
    }

    if (Math.random() > 0.5) {
      drawBox(width / 2 - 30, i * 30, 40, 10);
    } else {
      drawCircle(width / 2 - 30, i * 30, 10, pick(colors));
    }
  }

  function drawCircle(x, y, radius, color) {
    context.beginPath();
    context.fillStyle = color;
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fill();
  }

  // Draw from center
  function drawBox(x, y, width, height) {
    context.beginPath();
    context.fillStyle = '#CCCCCC';
    context.fillRect(x - width / 2, y - height / 2, width, height);
  }

  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }

  function pick(array) {
    // Pick a random item out of an array
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }
}
