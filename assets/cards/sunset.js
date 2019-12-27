// Sunset
var canvas = document.getElementById('sunset');
var context = canvas.getContext('2d');

// New Retina canvas
canvas.width = 600;
canvas.height = 1000;
canvas.style.width = '300px';
canvas.style.height = '500px';
context.scale(2, 2);

var width = canvas.width / 2;
var height = canvas.height / 2;

context.fillStyle = '#002F40';
context.fillRect(0, 0, width, height);

sunset();

function sunset() {
  // Vars
  var simplex = new SimplexNoise();
  var radius = (1.1 * height) / 2;
  var circle = { x: width / 4, y: height / 4, radius };
  var frequency = 1.4;
  var magnitude = 0.2;
  var independence = 0.1;
  var spacing = 0.04;
  var count = 162;

  var colors = [
    '#002F40', // Dark Blue
    '#005F73', // Medium Blue
    '#00ACB9', // Light Blue
    '#664D5C', // Dull Red
    '#BC6A60', // Medium Red
    '#D9A8AF', // Light Red
    '#EB783C', // Medium Orange
    '#FFA051', // Light Orange
    '#FECA55', // Yellow
  ];

  context.translate(width / 2, height / 2);
  let current = { ...circle };
  current.radius /= magnitude + 1;

  for (let i = 0; i < count; i++) {
    drawDeformedCircle(
      current,
      frequency,
      magnitude,
      i * independence,
      colors[i % colors.length],
    );
    current.radius *= 1 - spacing;
  }

  function drawDeformedCircle(circle, frequency, magnitude, seed, color) {
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

    context.fillStyle = color;
    context.fill();
    context.strokeStyle = hexToRGBA(color, 0.5);
    context.stroke();
  }

  function hexToRGBA(hex, alpha = 1) {
    const [r, g, b] = hex.match(/\w\w/g).map(x => parseInt(x, 16));
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
}
