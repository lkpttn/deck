// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

var colors = ['#FF9EE2', '#DE90E8', '#DFABFF', '#AE90E8', '#A59EFF'];

context.fillStyle = '#011628';
context.fillRect(0, 0, width, height);

hex();

function hex() {
  var size = 20;

  for (let y = 0; y < 18; y++) {
    for (let x = 0; x < 12; x++) {
      if (x % 2 == 0) {
        // Even check
        drawHex(x * 30, y * 34, size);
      } else {
        drawHex(x * 30, y * 34 + 17, size);
      }
    }
  }

  function drawHex(x, y, size) {
    context.beginPath();
    context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    // Use the trig to find the location of the next coordinate
    for (let side = 0; side < 7; side++) {
      context.lineTo(
        x + size * Math.cos((side * 2 * Math.PI) / 6),
        y + size * Math.sin((side * 2 * Math.PI) / 6),
      );
    }

    context.globalAlpha = Math.random() * 0.7;
    context.strokeStyle = pick(colors);
    context.stroke();
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
