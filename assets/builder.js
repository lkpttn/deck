// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

sunflower();

function sunflower() {
  // Backgrounds
  context.fillStyle = '#000000';
  context.fillRect(0, 0, width, height);

  context.fillStyle = '#FFFFFF';
  var circleNumber = 300;
  var phi = (Math.sqrt(5) + 1) / 2 - 1;
  var goldenAngle = phi * 2 * Math.PI;
  var outerRadius = width * 0.45;
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
    context.arc(x, y, innerRadius, 0, 2 * Math.PI, false);
    context.fill();
  }
}
