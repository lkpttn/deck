// Shortcake
var canvas = document.getElementById('shortcake');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

shortcake();

function shortcake() {
  var colors = [
    '#FF4748',
    '#FF6C5B',
    '#FF9070',
    '#FFAF86',
    '#FFCA9D',
    '#FFDFB4',
    '#FFF0CC',
  ];

  // Backgrounds
  context.fillStyle = '#FFCA96';
  context.fillRect(0, 0, width, height);

  context.fillStyle = '#FFFFFF';
  var circleNumber = 500;
  var phi = (Math.sqrt(5) + 1) / 2 - 1;
  var goldenAngle = phi * 2 * Math.PI;
  var outerRadius = width * 0.95;
  var innerRadius = 2;

  var cx = width / 2;
  var cy = height / 2;

  for (var i = 1; i <= circleNumber; ++i) {
    var ratio = i / circleNumber;
    var angle = i * goldenAngle;

    // Change the radius of the "outer" circle with each loop
    var spiralRadius = ratio * outerRadius;
    var x = cx + Math.cos(angle) * spiralRadius;
    var y = cy + Math.sin(angle) * spiralRadius;

    // draw tiny circle at x,y
    context.beginPath();
    context.arc(x, y, innerRadius + i * 0.015, 0, 2 * Math.PI, false);
    context.fillStyle = colors[i % colors.length];
    context.fill();
  }
}
