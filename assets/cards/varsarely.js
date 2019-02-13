// Varsarely
var canvas = document.getElementById('varsarely');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

// Calculated sizes to fit our canvas width and height
var squareSize = 19;
var gutter = 10;

context.fillStyle = '#000000';
context.fillRect(0, 0, width, height);

varsarely();

function varsarely() {
  // This is where we'll do our drawing
  context.fillStyle = '#ffffff';

  // Make a grid of coordinates for us to work with
  var points = createGrid();

  points.forEach(point => {
    const { postion, rotation } = point;
    const [x, y] = postion;

    // We're actually going to move the canvas origin point to
    // where our square is going to be
    context.save();
    context.translate(x, y);
    context.beginPath();

    if (rotation) {
      // If the rotation bool is true, rotate the canvas and
      // draw the square. We use half sizes here to make sure
      // the rotation happens at the center of the square
      context.translate(squareSize / 2, squareSize / 2);
      context.rotate((45 * Math.PI) / 180);
      context.rect(
        (-1 * squareSize) / 2,
        (-1 * squareSize) / 2,
        squareSize,
        squareSize,
      );
      context.fill();
    } else {
      context.rect(0, 0, squareSize, squareSize);
      context.fill();
    }

    // After we're done, restore our origin point,
    // rotation, etc for the next square
    context.restore();
  });
}

function createGrid() {
  // Return an array that contains coordinates for us to
  // use, and a boolean to rotate some squares
  var points = [];

  // Nested for loop to create x and y coordinates
  for (let x = gutter; x < width - gutter; ) {
    for (let y = gutter; y < height - gutter; ) {
      // If our random value meets a threshold, return a
      // true boolean with that square
      let random = Math.random();
      let rotate = false;
      if (random > 0.85) {
        rotate = true;
      }
      points.push({
        rotation: rotate,
        postion: [x, y],
      });

      // We have to cheat a little bit to make the grid fit cleanly
      y = y + gutter + squareSize - 0.1;
    }
    x = x + gutter + squareSize;
  }
  return points;
}
