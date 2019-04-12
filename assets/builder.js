// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

klint2();

function klint2() {
  var centerX = width / 2;
  var centerY = height / 2;

  // Colors
  var white = '#FFFFFF';
  var grey = '#CCCCCC';
  var greyRed = '#CBADA7';
  var blackYellow = '#A17241';
  var black = '#040200';
  var yellow = '#B7845B';
  var red = '#BD8578';
  var blue = '#6F7CA1';

  // Backgrounds
  context.fillStyle = grey;
  context.fillRect(0, 0, width, centerY);

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

  // Overlay bg
  context.globalCompositeOperation = 'multiply';
  context.fillStyle = '#555555';
  context.fillRect(0, centerY, width, height);

  function drawEqualTriangle(side, offsetX, offsetY, tipUp, color) {
    var h = side * (Math.sqrt(3) / 2);
    // We use this to choose what direction the triangle points
    var flip = 1;

    // Offset from the center of the canvas
    context.save();
    context.translate(centerX + offsetX, centerY + offsetY);

    // Draw pointing up or down
    if (tipUp === false) {
      flip = -1;
    }

    context.beginPath();
    context.moveTo(0, -h * flip);
    context.lineTo(-side * flip, h * flip);
    context.lineTo(side * flip, h * flip);
    context.lineTo(0, -h * flip);
    context.fillStyle = color;
    context.fill();
    drawBorders(h, side, flip, tipUp);
    context.restore();
  }

  function drawBorders(h, side, flip, tipUp) {
    context.lineWidth = 5;
    context.lineCap = 'round';

    // We use the same tipUp value to power the
    // ternanry operator to stroke in the right
    // order, yellow on the left side.

    context.beginPath();
    context.moveTo(0 * flip, -h * flip);
    context.lineTo(-side * flip, h * flip);
    context.strokeStyle = tipUp ? yellow : blue;
    context.stroke();

    context.beginPath();
    context.moveTo(-side * flip, h * flip);
    context.lineTo(side * flip, h * flip);
    context.strokeStyle = red;
    context.stroke();

    context.beginPath();
    context.moveTo(side * flip, h * flip);
    context.lineTo(0, -h * flip);
    context.strokeStyle = tipUp ? blue : yellow;
    context.stroke();
  }
}
