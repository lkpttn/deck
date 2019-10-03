// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

// New Retina canvas
canvas.width = 600;
canvas.height = 1000;
canvas.style.width = '300px';
canvas.style.height = '500px';
context.scale(2, 2);

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#055d80';
context.fillRect(0, 0, width, height);

maze();

function maze() {
  // Vars
  var countX = 27;
  var countY = 45;
  var margin = 0;
  var points = createGrid();
  var lineLength = 12;
  context.lineWidth = 3;

  points.forEach(points => {
    const { postion, color, orientation } = points;
    const [u, v] = postion;

    const x = lerp(margin, width - margin, u);
    const y = lerp(margin, height - margin, v);

    context.save();
    context.strokeStyle = 'rgb(100, 255, 200)';
    context.translate(x, y);
    context.beginPath();
    if (orientation) {
      context.moveTo(-lineLength, -lineLength);
      context.lineTo(lineLength, lineLength);
    } else {
      context.moveTo(lineLength, -lineLength);
      context.lineTo(-lineLength, lineLength);
    }
    context.stroke();
    context.restore();
  });

  // FUNCTIONS ************************
  function createGrid() {
    const points = [];

    // Will return a set of points between 0..1
    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        const u = countX <= 1 ? 0.5 : x / (countX - 1);
        const v = countY <= 1 ? 0.5 : y / (countY - 1);

        var randBoolean = Math.random() < 0.5;

        points.push({
          orientation: randBoolean,
          color: `rgba(${rangeFloor(20, 60)},
          ${rangeFloor(200, 255)},${rangeFloor(100, 250)},1`,
          postion: [u, v],
        });
      }
    }
    return points;
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

  function lerp(min, max, t) {
    return min * (1 - t) + max * t;
  }
}
