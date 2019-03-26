// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#ffffff';
context.fillRect(0, 0, width, height);

breton();

// Draw again on a click
canvas.addEventListener('click', function() {
  breton();
});

function breton() {
  const angles = [30, 60, 90, 120, 150, 180];

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, width, height);

  // Draw a group of lines
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 3; j++) {
      drawLines(j * 140, i * 120, angles);
    }
  }

  // Functions
  function drawLines(x, y, angleArray) {
    var rotate = (pick(angleArray) * Math.PI) / 180;
    const width = 150;
    const height = 200;

    console.log('Drawing at ' + x + ', ' + y + ' with rotation of ' + rotate);

    context.save();
    // 0,0 will be where the drawing happens
    context.translate(x - width / 2, y - height / 2);

    // Move to the center and rotate
    context.translate(width / 2, height / 2);
    context.rotate(rotate);
    context.translate((-1 * width) / 2, (-1 * height) / 2);

    // Background rectangles
    context.fillStyle = '#232957';
    context.fillRect(0, 0, width, height);

    context.fillStyle = '#ffffff';
    context.fillRect(10, 10, width - 20, height - 20);

    context.fillStyle = '#232957';
    for (let i = 0; i < 8; i++) {
      context.fillRect(i * 20, 0, 10, height);
    }
    context.restore();
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
