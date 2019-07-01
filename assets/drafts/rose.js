// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

strange();

function strange() {
  // Backgrounds
  context.fillStyle = '#000000';
  context.fillRect(0, 0, width, height);

  context.translate(width / 2, height / 2);

  // context.transform(1, 0.1, 0.6, 1, 0, 0);
  // const circlePoints = createCirclePoints(300, 8);

  const circlePoints = createCirclePoints(120, 8);
  var colors = [
    '#FF4748',
    '#FF6C5B',
    '#FF9070',
    '#FFAF86',
    '#FFCA9D',
    '#FFDFB4',
    '#FFF0CC',
  ];

  circlePoints.forEach((point, i) => {
    let x = point[0];
    let y = point[1];

    context.save();
    context.beginPath();
    context.globalAlpha = 0.5;
    context.arc(x, y, 125, 0, Math.PI * 2, false);
    context.strokeStyle = colors[i % colors.length];
    context.stroke();
    context.restore();
  });

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
