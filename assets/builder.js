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

astro();

function astro() {
  // Vars
  const margin = 30;
  var countX = 5;
  var countY = 10;
  var points = createGrid();

  // Backgrounds
  context.fillStyle = '#000';
  context.fillRect(0, 0, width, height);

  context.scale(1.3, 1.3);
  context.translate(-100, 0);
  context.rotate((Math.PI / 180) * -17);

  points.forEach(points => {
    // Deconstruct into variables
    // u and v values are between 0..1
    const { postion, shape } = points;
    const [u, v] = postion;

    // Lerp will distribute the point on our canvas based on
    // it's value between 0..1
    var x = lerp(margin, width - margin, u);
    var y = lerp(margin, height - margin, v);

    // A little bit of rounding to help with subpixel rendering
    // drawCircle(Math.round(x), Math.round(y), radius);
    if (shape === 'Star') {
      drawStar(x, y, 15, 4, '#FFF');
    } else if (shape === 'Moon') {
      drawCrescent(x, y, 15, '#FFF');
    }
  });

  function drawStar(x, y, outer, inner, color) {
    var angle = Math.PI / 4;

    context.fillStyle = color;
    context.beginPath();

    for (var i = 0; i < 2 * 4; i++) {
      var r = i & 1 ? inner : outer;
      var point_x = x + Math.cos(i * angle) * r;
      var point_y = y + Math.sin(i * angle) * r;

      if (!i) context.moveTo(point_x, point_y);
      else context.lineTo(point_x, point_y);
    }

    context.closePath();
    context.fill();
  }

  function drawCrescent(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fill();

    context.fillStyle = '#000';
    context.beginPath();
    context.arc(
      x + radius / 2,
      y - radius / 2.5,
      radius,
      0,
      Math.PI * 2,
      false,
    );
    context.fill();
  }

  function createGrid() {
    const points = [];

    // Will return a set of points between 0..1
    for (let x = 0; x < countX; x++) {
      for (let y = 0; y < countY; y++) {
        const u = countX <= 1 ? 0.5 : x / (countX - 1);
        const v = countY <= 1 ? 0.5 : y / (countY - 1);
        let shape;
        if ((isEven(y) && isEven(x)) || (isOdd(y) && isOdd(x))) {
          shape = 'Star';
        } else {
          shape = 'Moon';
        }
        points.push({
          shape: shape, // Star or moon
          postion: [u, v],
        });
      }
    }
    return points;
  }

  // Math stuff
  function lerp(min, max, t) {
    return min * (1 - t) + max * t;
  }

  function isEven(n) {
    return n % 2 == 0;
  }

  function isOdd(n) {
    return Math.abs(n % 2) == 1;
  }
}
