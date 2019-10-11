// https://www.benfrederickson.com/flowers-from-simplex-noise/

// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#112F41';
context.fillRect(0, 0, width, height);

blob();

function blob() {
  // Vars
  var simplex = new SimplexNoise();
  var radius = (0.8 * height) / 2;
  var circle = { x: width / 4, y: height / 4, radius };
  var frequency = 2.0;
  var magnitude = 0.5;
  var independence = 0.1;
  var spacing = 0.02;
  var count = 150;

  context.translate(width / 2, height / 2);
  let current = { ...circle };
  current.radius /= magnitude + 1;

  for (let i = 0; i < count; i++) {
    drawDeformedCircle(current, frequency, magnitude, i * independence);
    current.radius *= 1 - spacing;
  }

  // FUNCTIONS ************************
  function drawDeformedCircle(circle, frequency, magnitude, seed) {
    context.beginPath();
    const samples = Math.floor(4 * circle.radius + 20);
    for (let j = 0; j < samples + 1; ++j) {
      const angle = (2 * Math.PI * j) / samples;

      // Figure out the x/y coordinates for the given angle
      const x = Math.cos(angle);
      const y = Math.sin(angle);

      // Randomly deform the radius of the circle at this point
      const deformation =
        simplex.noise3D(x * frequency, y * frequency, seed) + 1;
      const radius = circle.radius * (1 + magnitude * deformation);

      // Extend the circle to this deformed radius
      context.lineTo(radius * x, radius * y);
    }

    context.fillStyle = '#112F41';
    context.fill();
    context.strokeStyle = 'rgba(250, 175, 10, .8)';
    context.stroke();
  }
}
