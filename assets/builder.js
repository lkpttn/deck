// Koinobori
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

chronos();

var step = 0;
var rotationX = 0;
var countup = true;

function chronos() {
  // Vars
  var rings = 3;
  var now = new Date();
  var seconds = now.getSeconds();
  var miliseconds = now.getMilliseconds();

  // Backgrounds
  context.save();
  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);

  // Move to center
  context.translate(width / 2, height / 2);

  let miliMapped = mapRange(miliseconds, 0, 1000, 0, 50);

  if (countup) {
    rotationX++;
    if (rotationX >= 50) {
      countup = false;
    }
  } else {
    rotationX--;
    if (rotationX <= 0) {
      countup = true;
    }
  }

  context.beginPath();
  context.ellipse(0, 0, rotationX, 50, 0, 0, Math.PI * 2, false);
  context.stroke();

  // Rings
  // for (let i = 0; i < rings; i++) {
  //   context.beginPath();
  //   context.ellipse(
  //     0, // x position
  //     0, // y position
  //     rotationX + i * 13, // x radius
  //     50 + i * 13, // y radius
  //     0, // rotation
  //     0, // start angle
  //     2 * Math.PI, // end angle
  //   );
  //   context.stroke();
  // }

  // // Sphere
  context.beginPath();
  context.fillStyle = '#E95B1C';
  context.arc(0, 0, 30, 0, Math.PI * 2, false);
  context.fill();

  // 3D effect
  context.beginPath();
  context.ellipse(0, 0, rotationX, 50, 0, (Math.PI * 3) / 2, Math.PI / 2, true);
  context.stroke();

  window.requestAnimationFrame(chronos);
  context.restore();

  function degreeToRadian(degree) {
    return (degree * Math.PI) / 180;
  }

  function mapRange(value, inMin, inMax, outMin, outMax) {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }

  function drawRings(offset, gradient, lineWidth) {
    // Existing content is kept where it doesn't overlap with the shape
    // aka everything else we draw will punch a hole in the background
    context.globalCompositeOperation = 'destination-out';
    context.translate(width / 2, height / 2);

    // Draw rings
    for (let i = 0; i < 15; i++) {
      context.beginPath();
      context.arc(0, 0, offset + i * 20, 0, Math.PI * 2, false);
      context.strokeStyle = 'white';
      context.lineWidth = lineWidth;
      context.stroke();
    }
  }
}
