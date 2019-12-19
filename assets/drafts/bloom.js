// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

// New Retina canvas
canvas.width = 600;
canvas.height = 1000;
canvas.style.width = '300px';
canvas.style.height = '500px';
context.scale(2, 2);

var width = canvas.width / 2;
var height = canvas.height / 2;

bloom();

// Take pixels into array (collection)
function bloom() {
  // Variables
  let length = 80;

  // Backgrounds
  context.fillStyle = 'black';
  context.fillRect(0, 0, width, height);

  context.strokeStyle = 'white';
  context.fillStyle = 'white';

  function draw(x, y, length, angle, branchWidth) {
    context.beginPath();
    context.lineWidth = branchWidth;
    context.save();

    // Move to the correct position and rotate the canvas
    context.translate(x, y);
    context.rotate((Math.PI / 180) * angle);

    // Move the drawing point to the new origin
    context.moveTo(0, 0);
    context.lineTo(0, -length);
    context.stroke();

    if (length < 5) {
      context.restore();
      // context.arc(0, -length, 3, 0, Math.PI / 2);
      // context.fill();
      return;
    }

    draw(0, -length, length * 0.7, rangeFloor(-45, -15), branchWidth * 0.8);
    draw(0, -length, length * 0.7, rangeFloor(15, 45), branchWidth * 0.8);
    // draw(0, -length, length * 0.7, rangeFloor(-5, 5));
    context.restore();
  }

  draw(width / 2, height - 40, length + 3, 0, 5);

  // MATH
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
