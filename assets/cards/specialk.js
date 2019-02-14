// Special K
var canvas = document.getElementById('specialk');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#000000';
context.fillRect(0, 0, width, height);

specialK();

function specialK() {
  // Draw overlapping trapezoids
  var red = '#f44b3f';
  var blue = '#1c73ff';
  var yellow = '#ffd21e';
  var white = '#ffffff';

  drawTrapezoid(40, -100, 600, white, false);
  drawTrapezoid(-80, 0, 200, blue, false);
  drawTrapezoid(-80, 300, 300, red, false);
  drawTrapezoid(200, 100, 400, yellow, false);
  drawTrapezoid(60, -120, 80, yellow, true);
  drawTrapezoid(180, 100, 200, red, true);
  drawTrapezoid(300, -80, 100, blue, true);

  function drawTrapezoid(x, y, length, color, flip) {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(x, y);
    if (flip) {
      context.lineTo(x - 100, y + 100);
      context.lineTo(x - 100, y + 50 + length);
      context.lineTo(x, y + 150 + length);
      context.fill();
    } else {
      context.lineTo(x + 100, y + 100);
      context.lineTo(x + 100, y + 50 + length);
      context.lineTo(x, y + length + 150);
      context.fill();
    }
  }
}
