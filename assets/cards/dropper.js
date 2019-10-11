// Dropper
var canvas = document.getElementById('dropper');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#055d80';
context.fillRect(0, 0, width, height);

dropper();

function dropper() {
  // Vars
  var countX = 7;
  var countY = 11;
  var margin = 0;
  var size = 50;
  const directions = ['up-left', 'up-right', 'down-left', 'down-right'];
  var points = createGrid();
  context.lineWidth = 2;

  points.forEach(points => {
    const { postion, color } = points;
    const [u, v] = postion;

    // Spread our points out evenly across the canvas
    const x = lerp(margin, width - margin, u);
    const y = lerp(margin, height - margin, v);

    context.save();
    context.strokeStyle = color;
    context.translate(x, y);

    // Circles
    for (let i = 0; i < 3; i++) {
      let orientation = pick(directions);
      context.beginPath();
      switch (orientation) {
        case 'up-left':
          // Top left
          context.arc(0, 0, size / 2, Math.PI, (3 * Math.PI) / 2, false);
          break;
        case 'up-right':
          // Top right
          context.arc(0, 0, size / 2, (3 * Math.PI) / 2, 0, false);
          break;
        case 'down-left':
          // Bottom left
          context.arc(0, 0, size / 2, Math.PI / 2, Math.PI, false);
          break;
        case 'down-right':
          // Bottom right
          context.arc(0, 0, size / 2, 0, Math.PI / 2, false);
          break;
      }
      context.stroke();
    }

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
        points.push({
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
