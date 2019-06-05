// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

holy();

function holy() {
  // Vars
  var margin = 10;
  var radius = 0.03;
  var targets = [];
  var points = createGrid();

  // Backgrounds
  context.fillStyle = 'cadetblue';
  context.fillRect(0, 0, width, height);

  // Pick random points
  // for (let i = 0; i < 100; i++) {
  //   targets.push(pick(points));
  // }

  context.globalCompositeOperation = 'destination-out';

  points.forEach(points => {
    const u = points[0];
    const v = points[1];

    const x = lerp(margin, width - margin, u);
    const y = lerp(margin, height - margin, v);

    const color = 'rgba(0,0,0,1.0)';
    context.fillStyle = color;

    // context.beginPath();
    // context.arc(x, y, (radius * width) / 2, 0, Math.PI * 2, false);
    drawCircle(x, y, 5);
  });

  context.globalCompositeOperation = 'destination-over';

  let grd = context.createLinearGradient(0, width / 2, height, width / 2);
  grd.addColorStop(0.0, 'honeydew');
  grd.addColorStop(1, 'aqua');

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
    const count = 20;

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
