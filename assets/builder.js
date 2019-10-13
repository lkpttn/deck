// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

gliphy();

function gliphy() {
  var colors = [
    '#FFB713', // Gold
    '#5200C5', // Purple
    '#009F45', // Green
    '#FF3A5C', // Redish
    '#4646DF', // Blue
    '#F44918', // Orange
  ];

  // Backgrounds
  context.fillStyle = '#000000';
  context.fillRect(0, 0, width, height);
  context.translate(width / 2, height / 2);

  // Colors
  var innerGradient = context.createRadialGradient(0, 0, 30, 0, 0, 300);
  innerGradient.addColorStop(0.1, '#FF9EE2');
  innerGradient.addColorStop(1, '#A59EFF');
  context.strokeStyle = innerGradient;

  // Create an array of points around a circle
  const circlePoints = createCirclePoints(100, 5);

  // Add a center point
  circlePoints.push([0, 0]);
  let lines = [];

  // Create lines from each point to every other point
  circlePoints.forEach(point => {
    for (let i = 0; i < circlePoints.length; i++) {
      let line = lineBetweenPoints(point, circlePoints[i]);

      // Store these lines in an array
      lines.push(line);
    }
  });

  lines.forEach(line => {
    drawLine(line);
  });

  // FUNCTIONS ********************************************

  // Draw a line between two given points
  function lineBetweenPoints(firstPoint, secondPoint) {
    let second = secondPoint;
    if (second > circlePoints.length - 1) {
      second = second - circlePoints.length;
      console.log(second);
    }

    var line = {
      start: { x: firstPoint[0], y: firstPoint[1] },
      end: { x: second[0], y: second[1] },
      visibility: Math.random() >= 0.75,
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
