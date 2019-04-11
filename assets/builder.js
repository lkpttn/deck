// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#CFCAC8';
context.fillRect(0, 0, width, height);

klint2();

function klint2() {
  var centerX = width / 2;
  var centerY = height / 2;

  // Colors
  var white = '#FFFFFF';
  var grey = '#CFCAC8';
  var greyRed = '#CCBABA';
  var yellow = '#B7845B';
  var red = '#BD8578';
  var blue = '#6F7CA1';
  var blackYellow = '#6C5942';
  var black = '#040200';

  // Bottom rect
  context.fillStyle = black;
  context.fillRect(0, centerY, width, height);

  // Circles
  context.beginPath();
  context.fillStyle = blackYellow;
  context.arc(centerX, centerY, 100, 0, Math.PI * 2, false);
  context.fill();

  context.beginPath();
  context.fillStyle = greyRed;
  context.arc(centerX, centerY, 100, Math.PI, Math.PI * 2, false);
  context.fill();

  // Triangles
  drawEqualTriangle(60, 0, -54, false, white);

  drawEqualTriangle(60, 0, 54, true, black);

  function drawEqualTriangle(side, offsetX, offsetY, tipUp, color) {
    var h = side * (Math.sqrt(3) / 2);

    context.save();
    // Offset from the center of the canvas
    context.translate(centerX + offsetX, centerY + offsetY);
    context.beginPath();

    // Draw pointing up or down
    if (tipUp === true) {
      context.moveTo(0, -h);
      context.lineTo(-side, h);
      context.lineTo(side, h);
      context.lineTo(0, -h);
      context.fillStyle = color;
      context.fill();
      drawBorders(h, side, true);
    } else if (tipUp === false) {
      context.moveTo(0, h);
      context.lineTo(side, -h);
      context.lineTo(-side, -h);
      context.lineTo(0, h);
      context.fillStyle = color;
      context.fill();
      drawBorders(h, side, false);
    }

    context.restore();
  }

  function drawBorders(h, side, tipUp) {
    context.lineWidth = 5;
    context.lineCap = 'round';

    if (tipUp === true) {
      context.beginPath();
      context.moveTo(0, -h);
      context.lineTo(-side, h);
      context.strokeStyle = yellow;
      context.stroke();

      context.beginPath();
      context.moveTo(-side, h);
      context.lineTo(side, h);
      context.strokeStyle = red;
      context.stroke();

      context.beginPath();
      context.moveTo(side, h);
      context.lineTo(0, -h);
      context.strokeStyle = blue;
      context.stroke();
    } else if (tipUp === false) {
      context.beginPath();
      context.moveTo(0, h);
      context.lineTo(side, -h);
      context.strokeStyle = blue;
      context.stroke();

      context.beginPath();
      context.moveTo(side, -h);
      context.lineTo(-side, -h);
      context.strokeStyle = red;
      context.stroke();

      context.beginPath();
      context.moveTo(-side, -h);
      context.lineTo(0, h);
      context.strokeStyle = yellow;
      context.stroke();
    }
  }
}
