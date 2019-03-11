// Soft Serve
var canvas = document.getElementById('softserve');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = 'rgb(47, 61, 74)';
context.fillRect(0, 0, width, height);

softServe();

// Draw again on a click
canvas.addEventListener('click', function() {
  softServe();
});

function softServe() {
  // How big our base squares are
  var squareNum = 250;
  var subdivideNum = squareNum / 2;
  var count = 3;
  var colors = [
    '#FCEECB', // caramel
    '#C2AF9C', // chocolate
    '#FFB5A7', // strawberry
    '#F5D3EA', // pink
    '#D3BDE5', // purple
  ];

  // Ok this is a lot of loops
  // The outer set draws our big squares
  for (let i = 0; i < count; i++) {
    for (let j = 0; j < count; j++) {
      let x = i * squareNum;
      let y = j * squareNum;
      bisectSquare(x, y, squareNum, colors);

      // For each square, choose if it's going to subdivide again
      let divide = Math.random();
      if (divide > 0.4) {
        for (let k = 0; k < count; k++) {
          for (let l = 0; l < count; l++) {
            let x1 = x + k * (squareNum / 2);
            let y1 = y + l * (squareNum / 2);
            bisectSquare(x1, y1, subdivideNum, colors);

            // Choose to subdivide a second time
            let doubleDivide = Math.random();
            if (doubleDivide > 0.8) {
              for (let m = 0; m < count; m++) {
                for (let n = 0; n < count; n++) {
                  let x2 = x1 + m * (squareNum / 4);
                  let y2 = y1 + n * (squareNum / 4);
                  bisectSquare(x2, y2, squareNum / 4, colors);
                }
              }
            }
          }
        }
      }
    }
  }

  function bisectSquare(x, y, size, colors) {
    context.fillStyle = pick(colors);
    context.fillRect(x, y, x + size, y + size);

    // Choose direction so we aren't always drawing just
    // the bottom triangles
    const directions = ['LtR', 'RtL', 'LtRD', 'RtLD'];

    context.beginPath();
    context.fillStyle = pick(colors);

    // Based on the direction, we draw in one of four potential corners
    let direction = pick(directions);
    if (direction === 'LtR') {
      // Left to right
      context.moveTo(x, y);
      context.lineTo(x + size, y + size);
      context.lineTo(x + size, y);
      context.fill();
    } else if (direction === 'RtL') {
      // Right to left
      context.moveTo(x + size, y);
      context.lineTo(x, y + size);
      context.lineTo(x + size, y + size);
      context.fill();
    } else if (direction === 'LtRD') {
      // Left to Right Down
      context.moveTo(x, y);
      context.lineTo(x + size, y + size);
      context.lineTo(x, y + size);
      context.fill();
    } else if ((direction = 'RtLD')) {
      // Right to Left Down
      context.moveTo(x + size, y);
      context.lineTo(x, y + size);
      context.lineTo(x + size, y + size);
      context.fill();
    } else {
      console.log('No draw');
    }
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
