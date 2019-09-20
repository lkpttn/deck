// VDHH
var canvas = document.getElementById('vdhh');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

vdhh();

function vdhh() {
  // Vars
  context.strokeStyle = '#FFFFFF';
  context.lineWidth = 4;
  context.shadowColor = '#b0850e';
  context.shadowOffsetX = 1;
  context.shadowOffsetY = 2;

  // Backgrounds
  context.fillStyle = '#fcba03';
  context.fillRect(0, 0, width, height);

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 30; j++) {
      // Measure how far it is to the horizontal center of the canvas
      var distanceToCenter = Math.abs(j * 10 - width / 2);

      // Vetical line
      line(
        j * 10,
        i * 75 - distanceToCenter,
        j * 10,
        i * 75 + 50 - distanceToCenter,
      );

      // Horizontal bottom
      line(
        10 + j * 10,
        50 + i * 75 - distanceToCenter,
        10 + j * 10 - 20,
        50 + i * 75 - distanceToCenter,
      );

      // Horizontal top
      line(
        10 + j * 10,
        0 + i * 75 - distanceToCenter,
        10 + j * 10 - 20,
        0 + i * 75 - distanceToCenter,
      );
    }
  }

  function line(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }
}
