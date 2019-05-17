// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

var colors = [
  '#485b23',
  '#507A4A',
  '#C0C480',
  '#FFEAA4',
  '#FFA56E',
  '#FFCDA4',
  '#FF938D',
];

// Draw underneath the previous shapes
context.globalCompositeOperation = 'destination-over';

hex();

function hex() {
  var size = 25;
  var x = width / 2;
  var y = height / 2;

  // Rotate our canvas from the center
  context.translate(width / 2, height / 2);
  context.rotate((30 * Math.PI) / 180);
  context.translate(-width / 2, -height / 2);

  for (let i = 0; i < 15; i++) {
    // Draw slightly increasing hexagons and cycle through the colors
    drawHex(size, colors[i % colors.length]);
    size = size + rangeFloor(15, 50);
  }

  function drawHex(size, color) {
    context.beginPath();
    context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    // Use the trig to find the location of the next coordinate
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
