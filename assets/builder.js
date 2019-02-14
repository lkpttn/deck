// Bergdorf
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

const step = 15;

context.fillStyle = '#000000';
context.fillRect(0, 0, width, height);

specialK();

function specialK() {
  // Draw overlapping trapezoids
}
