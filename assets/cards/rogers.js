// Rogers
var canvas = document.getElementById('rogers');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

rogers();

function rogers() {
  // The counts and multiplier determine how many grid points we have
  // and how spaced out they are
  const countX = 20;
  const countY = 40;
  const multiplier = 30;

  // The grid contains nested arrays of coordinates. Each x array
  // has objects in in that contain x and y properties like {x: 5, y: 7}
  const grid = createGrid();

  // These are all the neighbors of an individual point in space, ways to
  // navigate to the eight adjacent points
  const neighborDirs = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [-1, 0],
    [1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
  ];

  // Our colors, with a slight transparency
  const palette = [
    'rgba(207,70,70,0.6)',
    'rgba(126,152,178,0.6)',
    'rgba(35,183,251,0.6)',
    'rgba(240,36,117, 0.6)',
  ];

  context.fillStyle = '#14141F';
  context.fillRect(0, 0, width, height);

  // Draw a shape at every third point
  for (let i = 0; i < countX; ) {
    for (let j = 0; j < countY; ) {
      let point = grid[i][j];
      let neighborPoints = getNeighbors(point.x, point.y, neighborDirs);
      drawCircle(point.x, point.y);
      drawShape(point, neighborPoints);
      j = j + 2;
    }
    i = i + 2;
  }

  // FUNCTIONS ***********************************

  // Nested for loop to create x and y coordinates
  function createGrid() {
    let points = [];
    for (let x = 0; x < countX; x++) {
      points[x] = [];
      for (let y = 0; y < countY; y++) {
        points[x][y] = {
          x: x,
          y: y,
        };
      }
    }
    return points;
  }

  // This returns an array to us that holds the array position
  // of our neighboring points
  function getNeighbors(x, y, neighbors) {
    return neighbors.map(([dX, dY]) => [x + dX, y + dY]);
  }

  // Draw a circle at the given point
  function drawCircle(x, y) {
    context.beginPath();
    context.arc(x * multiplier, y * multiplier, 1, 0, Math.PI * 2, false);
    context.fillStyle = 'rgba(255,255,255, 0.4)';
    context.fill();
  }

  // Draw a bunch of lines to and from the neighboring points
  function drawShape(point, neighbors) {
    context.strokeStyle = pick(palette);

    context.beginPath();
    context.moveTo(point.x * multiplier, point.y * multiplier);

    // Eight times, randomly pick a neighboring coordinate and draw a line there
    for (let i = 0; i < 8; i++) {
      const nextPoint = pick(neighbors);
      context.lineTo(nextPoint[0] * multiplier, nextPoint[1] * multiplier);
    }

    // Close the shape
    context.lineTo(point.x * multiplier, point.y * multiplier);
    context.stroke();
  }

  // Return a random whole number between min and max
  function rangeFloor(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Pick a random item out of an array
  function pick(array) {
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }
}
