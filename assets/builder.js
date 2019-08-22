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
  const countX = 8;
  const countY = 40;
  const multiplier = 30;
  const margin = 40;

  // The grid contains nested arrays of coordinates. Each x array
  // has objects in in that contain x and y properties like {x: 5, y: 7}
  const grid = createGrid();

  var symbols = ['—', '▲', '▼', '●'];

  var colors = [
    '#FFB713', // Gold
    '#5200C5', // Purple
    '#009F45', // Green
    '#FF3A5C', // Redish
    '#4646DF', // Blue
    '#F44918', // Orange
  ];

  // Backgrounds
  context.fillStyle = '#000000';
  context.fillRect(0, 0, width, height);

  // Draw a shape at every third point
  for (let i = 0; i < countX; i++) {
    for (let j = 0; j < countY; j++) {
      let point = grid[i][j];

      context.save();
      context.fillStyle = pick(colors);
      context.font = `24px "Arial"`;
      context.translate(point.x, point.y);
      context.fillText(pick(symbols), 0, 0);
      context.restore();
    }
  }

  // Functions
  // Nested for loop to create x and y coordinates
  function createGrid() {
    let points = [];
    for (let x = 0; x < countX; x++) {
      points[x] = [];
      for (let y = 0; y < countY; y++) {
        points[x][y] = {
          x: margin + x * multiplier,
          y: margin + y * multiplier,
        };
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
}
