// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;
var increment = 0;
var colors = ['#507A4A', '#C0C480', '#FFEAA4', '#FFCDA4', '#FF938D'];

context.translate(width / 2, height / 2);
context.rotate((30 * Math.PI) / 180);
context.translate(-width / 2, -height / 2);

context.globalCompositeOperation = 'destination-over';

// setInterval(hex, 250);
hex();

function hex() {
  var x = width / 2;
  var y = height / 2;
  context.clearRect(-200, -200, width + 400, height + 400);

  for (let i = 0; i < 25; i++) {
    drawHex(rangeFloor(15, 25) * i, colors[i % colors.length]);
  }

  let colorHold = colors.pop();
  colors.unshift(colorHold);

  function drawHex(size, color) {
    context.beginPath();
    context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    for (let side = 0; side < 7; side++) {
      context.lineTo(
        x + size * Math.cos((side * 2 * Math.PI) / 6),
        y + size * Math.sin((side * 2 * Math.PI) / 6),
      );
    }
    context.fillStyle = color;
    context.fill();
  }

  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }
}
