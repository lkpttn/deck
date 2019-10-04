import simplex as SimplexNoise from '/modules/simplex-noise.js';
// https://www.benfrederickson.com/flowers-from-simplex-noise/

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

context.fillStyle = '#112F41';
context.fillRect(0, 0, width, height);

blob();

function blob() {
  // Vars
  var simplex = new SimplexNoise();
  var radius = 40;

  // Sample circle
  context.beginPath();
  context.arc(width / 2, height / 2, radius, 0, Math.PI * 2, false);
  context.strokeStyle = 'white';
  context.stroke();

  for (let i = 0; i < 10; i++) {
    drawBlob(width / 2, height / 2, 50 + i * 10, Math.random(), Math.random());
  }

  function drawBlob(cx, cy, radius, frequency, magnitude) {
    // Sample points around a circle
    const samples = Math.floor(4 * radius + 20);

    context.beginPath();
    for (let i = 0; i < samples + 1; i++) {
      // Finding the angle of a point around the circle
      let angle = (2 * Math.PI * i) / samples;

      // x/y of an angle
      let x = Math.cos(angle);
      let y = Math.sin(angle);

      // Change this Math.random to a noise function
      let deformation = simplex.noise2d(x * frequency, y * frequency) + 1;
      let circleRadius = radius * (1 + magnitude * deformation);

      // Draw line
      context.lineTo(cx + circleRadius * x, cy + circleRadius * y);
    }
    context.stroke();
  }
}
