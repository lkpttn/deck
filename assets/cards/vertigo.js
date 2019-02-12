// Vertigo
var canvas = document.getElementById('vertigo');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#db451f';
context.fillRect(0, 0, width, height);

vertigo();

function vertigo() {
  var size = 0;
  var squareWidth = 1;
  context.strokeStyle = '#FFFFFF';
  context.lineWidth = 2;

  context.translate(width / 2, height / 2);
  for (let i = 0; i < 30; i++) {
    context.beginPath();
    context.rect(
      0 - squareWidth,
      0 - squareWidth,
      squareWidth * 2,
      squareWidth * 2,
    );
    context.stroke();
    context.rotate((2 * Math.PI) / 180);
    squareWidth = squareWidth + size;
    size++;
  }
}
