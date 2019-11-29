// Emissary
var canvas = document.getElementById('emissary');
var context = canvas.getContext('2d');

// New Retina canvas
canvas.width = 600;
canvas.height = 1000;
canvas.style.width = '300px';
canvas.style.height = '500px';
context.scale(2, 2);

var width = canvas.width / 2;
var height = canvas.height / 2;

emissary();

function emissary() {
  // Variables
  var cx = width / 2;
  var cy = height / 2;
  var increment = 1.15;
  var count = 10;

  // Backgrounds
  context.fillStyle = '#711D15';
  context.fillRect(0, 0, width, height);

  context.Style = 'rgba(242, 76, 61, 0.9)';

  for (let i = 0; i < 25; i++) {
    circleDots(i * 6, count, 15, i * 20);
    count = count * increment;
  }

  function circleDots(count, radius, minTheta, maxTheta) {
    for (let i = 0; i < count; i++) {
      // Calculate a random point on circle between given angles
      var angle = rangeFloor(minTheta, maxTheta) * (Math.PI / 180);
      var x = cx + Math.cos(angle) * radius;
      var y = cy + Math.sin(angle) * radius;

      // Draw a circle on that point
      context.beginPath();
      context.arc(x, y, Math.random() * 1.8, 0, Math.PI * 2, false);
      context.fill();
    }
  }

  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }
}
