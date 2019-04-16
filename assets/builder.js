// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.globalCompositeOperation = 'source-over';

meteor();

function meteor() {
  // Colors
  var purple = '#21172A';
  var colors = ['#E8155B', '#FFFFDD', '#FD675B']; // Pink, tan, orange

  // Backgrounds
  context.fillStyle = purple;
  context.fillRect(0, 0, width, height);

  // We rotate the canvas 45 degrees for that cool meteor slant
  context.translate(width / 2, height / 2);
  context.rotate((-30 * Math.PI) / 180);
  context.translate(-width / 2, -height / 2);

  // Draw trails
  for (let i = 0; i < 50; i++) {
    let x = rangeNearest10(-200, width + 200);
    let y = rangeNearest10(-100, height + 100);
    let length = rangeFloor(100, 250);
    let color = pick(colors);
    drawMeteor(x, y, length, color);
    console.log(`Drawing a ${color} meteor at ${x},${y}`);
  }

  function drawMeteor(x, y, trailLength, color) {
    context.beginPath();
    let grd = context.createLinearGradient(x, y, x, x + trailLength);
    grd.addColorStop(0.1, purple);
    grd.addColorStop(1, color);

    context.fillStyle = grd;
    context.fillRect(x, y, 1, trailLength);
  }

  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }

  function rangeNearest10(min, max) {
    // Return a random whole number between min and max
    let num = Math.random() * (max - min) + min;
    return Math.round(num / 10) * 10;
  }

  function pick(array) {
    // Pick a random item out of an array
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }
}
