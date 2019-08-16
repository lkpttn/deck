// Juicebox
var canvas = document.getElementById('juicebox');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

juicebox();

function juicebox() {
  var size = 30;
  var colors = [
    '#FFB713', // Gold
    '#5200C5', // Purple
    '#009F45', // Green
    '#FF3A5C', // Redish
    '#4646DF', // Blue
    '#F44918', // Orange
  ];

  // Backgrounds
  context.fillStyle = '#FFFFFF';
  context.fillRect(0, 0, width, height);

  // Do the actual drawing
  for (let i = 0; i < size / 5; i++) {
    for (let j = 0; j < size; j++) {
      drawBox(i * size * 2, j * size, size, size, pick(colors));
    }
  }

  // Draw a 3D box from an isometric perspective
  function drawBox(x, y, sideWidth, height, color) {
    // Left side
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x - sideWidth, y - sideWidth * 0.5);
    context.lineTo(x - sideWidth, y - height - sideWidth * 0.5);
    context.lineTo(x, y - height);
    context.closePath();
    context.fillStyle = shadeColor(color, -10);
    context.strokeStyle = color;
    context.stroke();
    context.fill();

    // Right side
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + sideWidth, y - sideWidth * 0.5);
    context.lineTo(x + sideWidth, y - height - sideWidth * 0.5);
    context.lineTo(x, y - height);
    context.closePath();
    context.fillStyle = shadeColor(color, 10);
    context.strokeStyle = shadeColor(color, 50);
    context.stroke();
    context.fill();

    // Top side
    context.beginPath();
    context.moveTo(x, y - height);
    context.lineTo(x - sideWidth, y - height - sideWidth * 0.5);
    context.lineTo(
      x - sideWidth + sideWidth,
      y - height - (sideWidth * 0.5 + sideWidth * 0.5),
    );
    context.lineTo(x + sideWidth, y - height - sideWidth * 0.5);
    context.closePath();
    context.fillStyle = shadeColor(color, 20);
    context.strokeStyle = shadeColor(color, 60);
    context.stroke();
    context.fill();
  }

  // Math stuff
  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Pick a random item out of an array
  function pick(array) {
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }

  // Takes a color and percentage to spit out a new darker or lighter version
  function shadeColor(color, percent) {
    color = color.substr(1);
    var num = parseInt(color, 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }
}
