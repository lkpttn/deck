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

context.fillStyle = '#ffd1ca';
context.fillRect(0, 0, width, height);

pomegranate();

function pomegranate() {
  // Vars
  var count = 40;
  var margin = 10;
  var points = createGrid();

  points.forEach(points => {
    const { postion, color, radius } = points;
    const [u, v] = postion;

    const x = lerp(margin, width - margin, u);
    const y = lerp(margin, height - margin, v);

    context.save();
    context.fillStyle = color;
    context.translate(x, y);
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2, false);
    context.fill();
    context.restore();
  });

  // FUNCTIONS ************************
  function createGrid() {
    const points = [];

    // Will return a set of points between 0..1
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);

        points.push({
          radius: rangeFloor(15, 40),
          color: `rgba(${rangeFloor(250, 255)},
          ${rangeFloor(0, 255)},${rangeFloor(0, 255)},0.2`,
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
