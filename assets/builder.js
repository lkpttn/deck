// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

corvus();

function corvus() {
  // Vars
  var size = 100;
  var underColors = [
    '#FF002B', // red
    '#FFB084', // peach
    '#007EBE', // sea blue
    '#FF95BA', // pink
  ];

  var overColors = [
    '#FFB084', // peach
    '#007EBE', // sea blue
    '#0035A0', // deep blue
    '#892F54', // mauve
  ];

  var circleColors = [
    '#EEEEEE', // white
    '#FFFDDD', // lemon
  ];

  // Backgrounds
  context.fillStyle = '#aaa';
  context.fillRect(0, 0, width, height);

  // Give us that good color mixing
  context.globalCompositeOperation = 'hard-light';

  // Move to center, rotate and move back
  context.translate(width / 2, height / 2);
  context.rotate(Math.PI / 4);
  context.translate(-width - 15, -height);

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      // Draw the rows slightly offset, and make note of items being even or odd
      if (i % 2 == 0) {
        drawSquare(i * size, j * size, size, true);
      } else {
        drawSquare(i * size, size / 2 + j * size, size, false);
      }
    }
  }

  function drawSquare(x, y, size, orientation) {
    // Even goes one way, odd goes the other
    if (orientation) {
      // First rect
      context.fillStyle = pick(underColors);
      context.fillRect(x, y, size, size / 2);

      // Circle
      drawCircle(x + size / 2, y + size / 2, size / 2 - 10);

      // Second rect
      context.fillStyle = pick(overColors);
      context.fillRect(x, y + size / 2, size, size / 2);
    } else {
      // First rect
      context.fillStyle = pick(underColors);
      context.fillRect(x, y, size / 2, size);

      // Circle
      drawCircle(x + size / 2, y + size / 2, size / 2 - 10);

      // Second rect
      context.fillStyle = pick(overColors);
      context.fillRect(x + size / 2, y, size / 2, size);
    }
  }

  function drawCircle(x, y, radius) {
    context.beginPath();
    context.fillStyle = pick(circleColors);
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fill();
  }

  // Math stuff
  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Pick a random item out of an array
  function pick(array) {
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }
}
