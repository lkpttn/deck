// Circuit
var canvas = document.getElementById('circuit');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#013129';
context.fillRect(0, 0, width, height);

circuit();

// Draw again on a click
canvas.addEventListener('click', function() {
  circuit();
});

function circuit() {
  // Redraw background
  context.fillStyle = '#013129';
  context.fillRect(0, 0, width, height);

  // Draw the circuit line
  var numbers = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  for (let i = 0; i < 8; i++) {
    drawLine(10 + i * 50);
  }

  function drawLine(x) {
    context.beginPath();
    var x = x;
    context.moveTo(x, 0);

    // 1d10 down, 1d10 right, 1d10 down, 1d10 left, until end of page
    for (let y = 0; y < height; ) {
      y = y + pick(numbers);
      context.lineTo(x, y);

      // 1d10 right
      x = x + pick(numbers);
      context.lineTo(x, y);

      // 1d10 down
      y = y + pick(numbers);
      context.lineTo(x, y);

      // 1d10 left
      x = x - pick(numbers);
      context.lineTo(x, y);
    }

    // BG line
    context.lineWidth = 16;
    context.strokeStyle = '#013129';
    context.stroke();

    // Foreground line
    context.lineWidth = 4;
    context.strokeStyle = '#FAB955';
    context.stroke();
  }

  function pick(array) {
    // Pick a random item out of an array
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }

  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }
}
