// Rose
var canvas = document.getElementById('rose');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

rose();

function rose() {
  // Backgrounds
  context.fillStyle = '#0D1E34';
  context.fillRect(0, 0, width, height);

  context.translate(width / 2, height / 2);

  const circlePoints = createCirclePoints(140, 8);
  var colors = [
    '#FDAC00', // Orange
    '#EEB720', // Yellow
    '#55A56C', // Green
    '#F47579', // Pink
  ];

  for (let i = 0; i < circlePoints.length; i++) {
    context.strokeStyle = colors[i % colors.length];
    drawToPoints(i, circlePoints);
  }

  function drawToPoints(point, array) {
    let origin = array[point];

    context.beginPath();
    context.moveTo(origin[0], origin[1]);
    // Draw a line to all points in array
    for (let j = 0; j < circlePoints.length; j++) {
      let destination = circlePoints[j];
      context.lineTo(destination[0], destination[1]);
      context.moveTo(origin[0], origin[1]);
    }

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
