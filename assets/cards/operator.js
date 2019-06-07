// Operator
var canvas = document.getElementById('operator');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

operator();

function operator() {
  // Vars
  const margin = 30;
  const radius = 6;
  const count = 12;
  var points = createGrid();

  // Backgrounds
  context.fillStyle = '#1a1917';
  context.fillRect(0, 0, width, height);

  // Existing content is kept where it doesn't overlap with the shape
  // aka everything else we draw will punch a hole in the background
  context.globalCompositeOperation = 'destination-out';

  points.forEach(points => {
    // Deconstruct into variables
    // u and v values are between 0..1
    var u = points[0];
    var v = points[1];

    // Lerp will distribute the point on our canvas based on
    // it's value between 0..1
    var x = lerp(margin, width - margin, u);
    var y = lerp(margin, height - margin, v);

    // A little bit of rounding to help with subpixel rendering
    drawCircle(Math.round(x), Math.round(y), radius);
  });

  // New shapes will be drawn behind the existing content
  // We use this to draw the gradient behind the layer with holes
  context.globalCompositeOperation = 'destination-over';

  let grd = context.createLinearGradient(0, 0, width, height);
  grd.addColorStop(0.0, '#FFBB41');
  grd.addColorStop(0.5, '#6F81D6');
  grd.addColorStop(1.0, '#ED7850');

  context.fillStyle = grd;
  context.fillRect(0, 0, width, height);

  function drawCircle(x, y, radius) {
    context.save();
    context.translate(x, y);
    context.beginPath();
    context.arc(0, 0, radius, 0, 2 * Math.PI, false);
    context.lineWidth = 3;
    context.fill();
    context.restore();
  }

  function createGrid() {
    const points = [];

    // Will return a set of points between 0..1
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);

        points.push([u, v]);
      }
    }
    return points;
  }

  // Math stuff
  function lerp(min, max, t) {
    return min * (1 - t) + max * t;
  }
}
