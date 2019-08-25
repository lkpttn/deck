// Koinobori
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

chronos();

var step = 0;
var radiusX = 0;
var countup = true;

var rotation = 0;
var countupY = true;

function chronos() {
  // Vars
  var rings = 3;
  var now = new Date();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var miliseconds = now.getMilliseconds();
  var coords = ['x: 15, y:15'];

  // Backgrounds
  context.save();
  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);

  // Move to center
  context.translate(width / 2, height / 2);

  // Rings
  context.beginPath();
  context.ellipse(0, 0, 40, 150, degreeToRadian(15), 0, Math.PI * 2, false);
  context.stroke();

  context.beginPath();
  context.ellipse(
    0,
    0,
    120,
    minutes,
    degreeToRadian(45),
    0,
    Math.PI * 2,
    false,
  );
  context.stroke();

  context.beginPath();
  context.ellipse(0, 0, 90, 85, degreeToRadian(78), 0, Math.PI * 2, false);
  context.stroke();

  // context.beginPath();
  // context.ellipse(0, 0, 70, 100, 0, 0, Math.PI * 2, false);
  // context.stroke();

  // Sphere
  context.beginPath();
  context.fillStyle = '#E95B1C';
  context.arc(0, 0, 30, 0, Math.PI * 2, false);
  context.fill();

  // // 3D effect
  // context.beginPath();
  // context.ellipse(0, 0, 50, 50, 0, (Math.PI * 3) / 2, Math.PI / 2, true);
  // context.stroke();

  window.requestAnimationFrame(chronos);
  context.restore();

  function degreeToRadian(degree) {
    return (degree * Math.PI) / 180;
  }

  function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}
