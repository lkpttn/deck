// Leaky
var canvas = document.getElementById('leaky');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

leaky();

function leaky() {
  // Backgrounds
  context.fillStyle = '#0B1961';
  context.fillRect(0, 0, width, height);
  context.globalCompositeOperation = 'lighter';

  var colors = ['#ED9900', '#DF2C0F', '#744491', '#004F80', '#FFD0BF'];

  // Draw a group of lines
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 6; j++) {
      centerRect(
        j * 50,
        i * 50,
        rangeFloor(10, 100),
        rangeFloor(10, 100),
        pick(colors),
      );
    }
  }

  function centerRect(x, y, rWidth, rHeight, color) {
    context.fillStyle = color;
    context.fillRect(x, y, rWidth, rHeight);
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
