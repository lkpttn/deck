// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

berlin();

function berlin() {
  // The counts and multiplier determine how many grid points we have
  // and how spaced out they are
  const countX = 40;
  const countY = 50;
  const margin = 0;

  // The grid contains nested arrays of coordinates. Each x array
  // has objects in in that contain x and y properties like {x: 5, y: 7}
  var points = createGrid();

  var symbols = ['▬', '‑', '‒', '—', '‑', '‒', '—'];

  var colors = [
    '#F58CFF', // Pink
    '#FFAEE3', // Pale Pink
    '#FFD6D5', // Peach
    '#5983F5', // Blue
    '#9B6EFF', // Purple
    '#3ECCE4', // Aqua
  ];

  // Backgrounds
  context.fillStyle = '#4646DF';
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

    // A little bit of rounding to help with subpixel rendering
    context.save();
    context.fillStyle = pick(colors);
    context.font = `36px "Arial"`;
    context.fillText(pick(symbols), x, y);
    context.restore();
  });

  // Functions
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
