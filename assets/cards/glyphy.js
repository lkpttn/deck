// Glyphy
var canvas = document.getElementById('glyphy');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

gliphy();

function gliphy() {
  // Backgrounds
  context.fillStyle = '#0D1440';
  context.fillRect(0, 0, width, height);

  // Colors
  context.strokeStyle = '#BF1736';
  context.lineWidth = 3;

  for (let i = 0; i < 5; i++) {
    context.save();
    drawGlyph(width / 2, 90 + i * 80, 30, 5);
    context.restore();
  }

  function drawGlyph(x, y, radius, sides) {
    context.translate(x, y);
    let circlePoints = createCirclePoints(radius, sides);
    var lines = [];

    // Create lines to points on each side and to center
    for (let i = 0; i < circlePoints.length; i++) {
      let nextPoint;
      if (i + 1 > circlePoints.length - 1) {
        nextPoint = circlePoints[0];
      } else {
        nextPoint = circlePoints[i + 1];
      }

      let line = lineBetweenPoints(circlePoints[i], nextPoint);
      lines.push(line);

      let centerLine = lineBetweenPoints(circlePoints[i], [0, 0]);
      lines.push(centerLine);
    }

    lines.forEach(line => {
      drawLine(line);
    });
  }

  // FUNCTIONS ********************************************

  // Draw a line between two given points
  function lineBetweenPoints(firstPoint, secondPoint) {
    var line = {
      start: { x: firstPoint[0], y: firstPoint[1] },
      end: { x: secondPoint[0], y: secondPoint[1] },
      visibility: Math.random() >= 0.65,
    };

    return line;
  }

  // Draw a line between two given points
  function drawLine(line) {
    const { start, end, visibility } = line;

    if (visibility) {
      context.beginPath();
      context.moveTo(start.x, start.y);
      context.lineTo(end.x, end.y);
      context.stroke();
    }
  }

  // Create an array of n points around a circle
  function createCirclePoints(radius, number) {
    var points = [];
    for (let i = 0; i < number; i++) {
      // Calculate the position of each point
      // The angle is i * (360 / number)
      let angle = i * (360 / number);
      let x = radius * Math.cos((-angle * Math.PI) / 180);
      let y = radius * Math.sin((-angle * Math.PI) / 180);

      // Add point to array
      points.push([x, y]);
    }
    return points;
  }
}
