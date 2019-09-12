// Koinobori
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

knots();

function knots() {
  // Vars
  context.strokeStyle = '#FFFFFF';
  context.lineWidth = 2;
  context.shadowColor = 'rgba(66,66,66,0.5)';
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 2;

  var orange = '##fcba03';

  // Backgrounds
  context.fillStyle = '#a88c59';
  context.fillRect(0, 0, width, height);

  // for (let i = 0; i < 30; i++) {
  //   var distanceToCenter = Math.abs(i * 10 - width / 2);
  //   console.log(distanceToCenter);

  //   line(i * 10, 0, 150 + i * 5, 150 - i * 5);
  //   line(300 - i * 10, 0, 150 - i * 5, 150 - i * 5);

  //   // Straight line
  //   line(i * 10, 0, i * 10, 200 - distanceToCenter);

  //   // Chevron line
  //   line(i * 10, 350 - distanceToCenter, i * 10, 300 - distanceToCenter);

  //   // Chevron
  //   // line(0, 50 + i * 10, 150, 150 + i * );
  // }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 30; j++) {
      var distanceToCenter = Math.abs(j * 10 - width / 2);
      // Chevron line
      line(
        j * 10,
        i * 75 - distanceToCenter,
        j * 10,
        i * 75 + 50 - distanceToCenter,
      );

      line(
        10 + j * 10,
        50 + i * 75 - distanceToCenter,
        10 + j * 10 - 20,
        50 + i * 75 - distanceToCenter,
      );

      line(
        10 + j * 10,
        0 + i * 75 - distanceToCenter,
        10 + j * 10 - 20,
        0 + i * 75 - distanceToCenter,
      );
    }
  }

  // line(50 + i * 10, 50, 150 + i * 5, 150 - i * 5);
  // line(250 - i * 10, 50, 150 - i * 5, 150 - i * 5);

  function line(x1, y1, x2, y2) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }
}
