// Builder
var canvas = document.getElementById('sortie');
var context = canvas.getContext('2d');

// New Retina canvas
canvas.width = 600;
canvas.height = 1000;
canvas.style.width = '300px';
canvas.style.height = '500px';
context.scale(2, 2);

var width = canvas.width;
var height = canvas.height;

sortie();

function sortie() {
  // Vars
  const lineWidth = 2;
  var x = 0;
  var y = 60 + rangeFloor(-30, 30);

  // Backgrounds
  context.fillStyle = '#2C2E3D';
  context.fillRect(0, 0, width, height);

  // Make a line of lines
  while (x < width + lineWidth) {
    // Draw lines with the same variation at three different y coordinates
    drawLine(x, y, 140 + rangeFloor(10, 60));
    drawLine(x, 140 + y, 240 + rangeFloor(10, 60));
    drawLine(x, 340 + y, 340 + rangeFloor(10, 60));
    x = x + lineWidth;
    y = y + rangeFloor(-9, 10);
  }

  function drawLine(x, y, length) {
    // Create a gradient that spans the length of the line
    let grd = context.createLinearGradient(x, y, x, y + length);
    grd.addColorStop(0.1, '#FFFFFF');
    grd.addColorStop(0.3, '#84BFB1');
    grd.addColorStop(0.5, '#468E7F');
    grd.addColorStop(0.8, '#2C2E3D');

    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x, height);
    context.strokeStyle = grd;
    context.lineWidth = lineWidth;
    context.stroke();
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
