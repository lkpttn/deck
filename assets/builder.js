// Atomic
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

atomic();

function atomic() {
  // Vars
  var margin = 20;
  var radius = 0.03;
  var targets = [];
  var points = createGrid();
  var colors = [
    '#FC3A51', // Pink
    '#0E2431', // Dark Blue
    '#F5B349', // Orange
  ];

  // Backgrounds
  context.fillStyle = '#E7D5B7';
  context.fillRect(0, 0, width, height);

  for (let i = 0; i < 100; i++) {
    // Randomly add points to our array
    targets.push(pick(points));
  }

  targets.forEach(points => {
    const u = points[0];
    const v = points[1];

    // Read the Operator.js source for more comments about linear interpolation
    const x = lerp(margin, width - margin, u);
    const y = lerp(margin, height - margin, v);

    const color = pick(colors);

    // Draw the line to the point
    context.beginPath();
    context.moveTo(width / 2, height / 2);
    context.lineTo(x, y);
    context.lineWidth = (radius * width) / 8;
    context.strokeStyle = color;
    context.stroke();

    // Draw the circle at the point
    context.beginPath();
    context.arc(x, y, (radius * width) / 4, 0, Math.PI * 2, false);
    context.fillStyle = color;
    context.fill();
  });

  function createGrid() {
    const points = [];
    const count = 20;

    // Create our grid coordinated between 0..1
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);

        points.push([u, v]);
      }
    }
    return points;
  }

  // Math stuff
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
