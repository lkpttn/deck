// Anthozoa
var canvas = document.getElementById('anthozoa');
var context = canvas.getContext('2d');

// New Retina canvas
canvas.width = 600;
canvas.height = 1000;
canvas.style.width = '300px';
canvas.style.height = '500px';
context.scale(2, 2);

var width = canvas.width / 2;
var height = canvas.height / 2;

anthozoa();

function anthozoa() {
  // Vars
  context.lineWidth = 2;
  context.strokeStyle = '#FFF';

  const countX = 4;
  const countY = 6;
  const margin = 45;
  var colors = ['#F2D857', '#F2BA52', '#D99C52', '#F28B50'];
  var points = createGrid();

  // Backgrounds
  context.fillStyle = '#200F8C';
  context.fillRect(0, 0, width, height);

  points.forEach(points => {
    // Deconstruct into variables
    // u and v values are between 0..1
    var u = points[0];
    var v = points[1];

    // Lerp will distribute the point on our canvas based on
    // it's value between 0..1
    var x = lerp(margin, width - margin, u);
    var y = lerp(margin, height - margin, v);

    let outerCircle = rangeFloor(10, 20);
    let innerCircle = rangeFloor(4, 10);
    let ratio = rangeFloor(4, 15);

    // A little bit of rounding to help with subpixel rendering
    drawSpirograph(x, y, outerCircle, innerCircle, ratio, pick(colors));
  });

  function drawSpirograph(
    centerX,
    centerY,
    radiusOuter,
    radiusInner,
    ratio,
    color,
  ) {
    context.beginPath();
    context.moveTo(centerX + radiusOuter + radiusInner, centerY);

    // Draw line segements around a circle
    for (let theta = 0; theta <= Math.PI * 2; theta += 0.01) {
      let x =
        centerX +
        radiusOuter * Math.cos(theta) +
        radiusInner * Math.cos(theta * ratio);
      let y =
        centerY +
        radiusOuter * Math.sin(theta) +
        radiusInner * Math.sin(theta * ratio);
      context.lineTo(x, y);
    }

    context.strokeStyle = color;
    context.stroke();
  }

  function createGrid() {
    const points = [];

    // Will return a set of points between 0..1
    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        const u = countX <= 1 ? 0.5 : x / (countX - 1);
        const v = countY <= 1 ? 0.5 : y / (countY - 1);

        points.push([u, v]);
      }
    }
    return points;
  }

  // Math stuff
  function lerp(min, max, t) {
    return min * (1 - t) + max * t;
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
