// Sierpinski
var canvas = document.getElementById('pinski');
var context = canvas.getContext('2d');

// New Retina canvas
canvas.width = 600;
canvas.height = 1000;
canvas.style.width = '300px';
canvas.style.height = '500px';
context.scale(2, 2);

var width = canvas.width / 2;
var height = canvas.height / 2;

pinski();

function pinski() {
  // Vars
  context.lineWidth = 2;
  context.strokeStyle = '#FFF';

  var orange = '#FF5310';
  var lightOrange = '#AB3200';

  // Backgrounds
  context.fillStyle = orange;
  context.fillRect(0, 0, width, height);

  // Pattern
  calcSierCurve(height, 9, lightOrange, { x: -100, y: 0 });
  calcSierCurve(height, 7, lightOrange, { x: -100, y: 0 });

  // Heraldry
  // Swap these out with the above lines for a new design
  // calcSierCurve(width / 2, 3, lightOrange, { x: 0, y: 0 });
  // calcSierCurve(width / 2, 6, lightOrange, { x: width / 2, y: 0 });
  // calcSierCurve(width / 2, 4, lightOrange, { x: width / 2, y: 150 });
  // calcSierCurve(width / 2, 5, lightOrange, { x: 0, y: 150 });
  // calcSierCurve(width, 9, lightOrange, { x: 0, y: 300 });

  function calcSierCurve(length, iterations, color, offset = { x: 0, y: 0 }) {
    // We need two triangles to move through
    // Each triangle is a set of points based of offset
    const triangle1 = [
      { x: 0, y: length },
      { x: 0, y: 0 },
      { x: length, y: 0 },
    ].map(p => translate(p, offset));
    const triangle2 = [
      { x: length, y: 0 },
      { x: length, y: length },
      { x: 0, y: length },
    ].map(p => translate(p, offset));

    // We need to divide the two initial triangles a number of times equal to the iterations
    const half1 = subdivideTriangle(triangle1, iterations);
    const half2 = subdivideTriangle(triangle2, iterations);

    // Make one point array and draw them
    const points = [...half1, ...half2];
    context.beginPath();
    context.strokeStyle = color;
    points.forEach((p, i) => {
      const n = points[(i + 1) % points.length];
      // This helps close the shape
      context.moveTo(p.x, p.y);
      context.lineTo(n.x, n.y);
    });
    context.stroke();
  }

  function subdivideTriangle(position, iterations = 1) {
    const [p1, p2, p3] = position;
    const points = [];

    // Center of triangle
    const center = triangleCenter(...position);
    if (iterations == 0) {
      // If no more iterations, return center
      points.push(center);
    } else {
      // Make two right angle triangles and add points
      const subTriangle1 = [p1, midpoint(p1, p3), p2];
      const subTriangle2 = [p2, midpoint(p1, p3), p3];
      points.push(...subdivideTriangle(subTriangle1, iterations - 1));
      points.push(...subdivideTriangle(subTriangle2, iterations - 1));
    }

    return points;
  }

  function translate({ x, y }, { x: xt, y: yt }) {
    return {
      x: x + xt,
      y: y + yt,
    };
  }

  // Calculate the center of a triangle
  function triangleCenter(a1, a2, a3) {
    const x = (a1.x + a2.x + a3.x) / 3;
    const y = (a1.y + a2.y + a3.y) / 3;
    return { x, y };
  }

  function midpoint(a, b) {
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  }
}
