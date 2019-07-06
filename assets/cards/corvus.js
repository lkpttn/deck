// Corvus
var canvas = document.getElementById('corvus');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

corvus();

function corvus() {
  // Vars
  var robinBlue = '#3ce7f0';
  var darkGold = '#946c22';
  var darkBlue = '#13233b';

  var circleRadius = 130;

  // Backgrounds
  context.fillStyle = robinBlue;
  context.fillRect(0, 0, width, height);

  // Move to center
  context.translate(width / 2, height / 2);

  // Make the outer rings
  for (let i = 0; i < 15; i++) {
    context.beginPath();
    context.arc(0, 0, 140 + i * 15, 0, Math.PI * 2, false);
    context.strokeStyle = darkGold;

    // Change the width on even and odd pairs
    if (i % 2 == 0) {
      context.lineWidth = 2;
    } else {
      context.lineWidth = 1;
    }
    context.stroke();
  }

  // Inner circle
  context.beginPath();
  context.arc(0, 0, circleRadius, 0, Math.PI * 2, false);
  context.fillStyle = darkBlue;
  context.fill();
  context.clip();

  // Make starfield
  for (let index = 0; index < 40; index++) {
    // Make a dot
    let x = rangeFloor(-circleRadius, circleRadius);
    let y = rangeFloor(-circleRadius, circleRadius);
    let innerRadius = rangeFloor(1, 5);

    context.beginPath();
    context.fillStyle = darkGold;
    context.arc(x, y, innerRadius, 0, Math.PI * 2, false);
    context.fill();
  }

  // Math stuff
  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }
}
