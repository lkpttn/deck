// Pitch Perfect
var canvas = document.getElementById('pitchperfect');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

strange();

function strange() {
  // Backgrounds
  context.fillStyle = '#011628';
  context.fillRect(0, 0, width, height);

  // Center the canvas
  context.translate(width / 2, height / 2);

  // Create an array of points around a circle
  const circlePoints = createCirclePoints(300, 36);

  // Draw a line 11 points around the circle
  var innerGradient = context.createRadialGradient(0, 0, 30, 0, 0, 300);
  innerGradient.addColorStop(0.1, '#FF9EE2');
  innerGradient.addColorStop(1, '#A59EFF');
  context.strokeStyle = innerGradient;
  for (let i = 0; i < circlePoints.length; i++) {
    drawBetweenPoints(i, i + 15);
  }

  // Change colors and do it again, 15 points around
  var outerGradient = context.createRadialGradient(0, 0, 30, 0, 0, 200);
  outerGradient.addColorStop(0.1, '#DFABFF');
  outerGradient.addColorStop(1, '#AE90E8');
  context.strokeStyle = outerGradient;
  for (let i = 0; i < circlePoints.length; i++) {
    drawBetweenPoints(i, i + 11);
  }

  // Draw a line between two given points
  function drawBetweenPoints(firstPoint, secondPoint) {
    let first = firstPoint;
    let second = secondPoint;
    if (second > circlePoints.length - 1) {
      second = second - circlePoints.length;
      console.log(second);
    }

    context.beginPath();
    context.moveTo(circlePoints[first][0], circlePoints[first][1]);
    context.lineTo(circlePoints[second][0], circlePoints[second][1]);
    context.stroke();
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
    console.log(points);
    return points;
  }
}
