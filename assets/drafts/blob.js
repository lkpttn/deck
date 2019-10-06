import simplex as SimplexNoise from '/modules/simplex-noise.js';
// https://www.benfrederickson.com/flowers-from-simplex-noise/

// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#112F41';
context.fillRect(0, 0, width, height);

blob();

function blob() {
  // Vars
  var circle = (4 * (Math.sqrt(2) - 1)) / 3;
  circle = 0.55;
  var count = Math.PI;

  context.translate(width / 2, height / 2);

  drawBezierCircle(150, 'white');
  // drawBezierCircle(100, 'red');

  // FUNCTIONS ************************

  function drawBezierCircle(width, color) {
    let c;
    var offsetX = Math.sin(count); // 0
    var offsetY = Math.cos(count); // -1
    let radius = width / 2;

    context.beginPath();

    // Top right
    c = circle + 0.0 * Math.sin(count); // Sine of pi is 0
    context.moveTo(offsetX + 0, offsetY + -radius);
    context.bezierCurveTo(
      offsetX + c * radius + 30,
      offsetY + -radius,
      offsetX + radius,
      offsetY + -c * radius,
      offsetX + radius,
      offsetY + 0,
    );

    // bottom right
    context.bezierCurveTo(
      offsetX + radius,
      offsetY + c * radius,
      offsetX + c * radius - 30,
      offsetY + radius,
      offsetX + 0,
      offsetY + radius,
    );

    // bottom left
    context.bezierCurveTo(
      offsetX + -c * radius - 24,
      offsetY + radius,
      offsetX + -radius - 14,
      offsetY + c * radius,
      offsetX + -radius,
      offsetY + 0,
    );

    // top left
    context.bezierCurveTo(
      offsetX + -radius,
      offsetY + -c * radius - 54,
      offsetX + -c * radius,
      offsetY + -radius,
      offsetX + 0,
      offsetY + -radius,
    );

    context.fillStyle = color;
    context.fill();

    // Control points
  }

  function drawControlPoint(x, y) {
    context.beginPath();
    context.arc(x, y, 5, 0, Math.PI * 2, false);
    context.fillStyle = 'lime';
    context.fill();
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
