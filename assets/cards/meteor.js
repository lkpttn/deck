// Meteor
var canvas = document.getElementById('meteor');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

meteor();

function meteor() {
  // Colors
  var purple = '#21172A';
  var colors = ['#FCF811', '#FFFFDD', '#FD675B']; // Yellow, tan, orange

  // Backgrounds
  context.fillStyle = purple;
  context.fillRect(0, 0, width, height);

  // We rotate the canvas 45 degrees for that cool meteor slant
  context.translate(width / 2, height / 2);
  context.rotate((-30 * Math.PI) / 180);
  context.translate(-width / 2, -height / 2);

  // Draw trails
  for (let i = 0; i < 50; i++) {
    // Separated out for easy reading
    // We're drawing meteors left to right at random y coordinates
    // Randomly picking a width, tail length and small range of colors
    let x = -100 + i * 15;
    let y = rangeFloor(-100, height + 100);
    let width = rangeFloor(1, 4);
    let length = rangeFloor(100, 250);
    let color = pick(colors);
    drawMeteor(x, y, width, length, color);
  }

  function drawMeteor(x, y, width, trailLength, color) {
    context.beginPath();
    // We draw the gradient bounds from the tip of the meteor to
    // the end of it's tail
    let grd = context.createLinearGradient(x, y, x, y + trailLength);
    grd.addColorStop(0.1, 'rgba(232, 21, 91, 0.1)');
    grd.addColorStop(1, color);

    // This part actually draws the meteor at the coordinates
    context.fillStyle = grd;
    context.fillRect(x, y, width, trailLength);
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
