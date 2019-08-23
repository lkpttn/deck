// Koinobori
var canvas = document.getElementById('koinobori');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

koinobori();

function koinobori() {
  // The counts and margin determine how many grid points we have
  // and how spaced out they are
  const countX = 40;
  const countY = 50;
  const margin = 0;

  // The grid is an array of objects that have u & v properties
  // that we will use to create x and y positioning
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

  // Do the same thing for each item in points
  points.forEach(points => {
    // Deconstruct into variables
    // u and v values are between 0..1
    var u = points[0];
    var v = points[1];

    // Lerp will distribute the point on our canvas based on
    // it's value between 0..1
    var x = lerp(margin, width - margin, u);
    var y = lerp(margin, height - margin, v);

    // Pick a random symbol and color to draw at the point
    context.fillStyle = pick(colors);
    context.font = `36px "Arial"`;
    context.fillText(pick(symbols), x, y);
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
