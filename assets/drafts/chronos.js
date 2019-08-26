// Koinobori
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

chronos();

function chronos() {
  // Vars
  var now = new Date();
  var day = now.getDate();
  var hour = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Mapped variables
  var secondsMapped = mapRange(seconds, 0, 60, 0, 360);
  var minutesMapped = mapRange(minutes, 0, 60, 0, 360);
  var hourMapped = mapRange(hour, 0, 24, 0, 360);
  var dayMapped = mapRange(day, 0, 31, 0, 360);

  // Backgrounds
  context.save();
  context.fillStyle = '#090658';
  context.fillRect(0, 0, width, height);
  context.lineWidth = 3;

  // Move to center
  context.translate(width / 2, height / 2);

  // Rings
  drawRing(40, 60, degreeToRadian(secondsMapped), '#F371A9', false);
  drawRing(60, 80, degreeToRadian(minutesMapped), '#D761BE', false);
  drawRing(80, 100, degreeToRadian(hourMapped), '#AA51BA', false);
  drawRing(100, 120, degreeToRadian(dayMapped), '#6F429C', false);

  // 3D Effects
  drawRing(40, 60, degreeToRadian(secondsMapped), '#F371A9', true);
  drawRing(60, 80, degreeToRadian(minutesMapped), '#D761BE', true);
  drawRing(80, 100, degreeToRadian(hourMapped), '#AA51BA', true);
  drawRing(100, 120, degreeToRadian(dayMapped), '#6F429C', true);

  // Outer rings
  context.strokeStyle = '#3E347E';
  for (let i = 0; i < 8; i++) {
    context.beginPath();
    context.arc(0, 0, 140 + i * 20, 0, Math.PI * 2, false);
    context.stroke();
  }

  // Sphere
  context.beginPath();
  context.fillStyle = '#FFFDDD';
  context.arc(0, 0, 30, 0, Math.PI * 2, false);
  context.fill();

  context.restore();

  function drawRing(radiusX, radiusY, rotation, color, half) {
    context.beginPath();
    if (half) {
      context.ellipse(0, 0, radiusX, radiusY, rotation, 0, Math.PI, false);
    } else {
      context.ellipse(0, 0, radiusX, radiusY, rotation, 0, Math.PI * 2, false);
    }
    context.strokeStyle = color;
    context.stroke();
  }

  function degreeToRadian(degree) {
    return (degree * Math.PI) / 180;
  }

  function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }
}
