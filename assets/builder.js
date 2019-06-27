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
  context.fillStyle = '#011628';
  context.fillRect(0, 0, width, height);

  context.translate(width / 2, height / 2);

  const circlePoints = createCirclePoints(300, 36);

  // circlePoints.forEach(point => {
  //   const x = point[0];
  //   const y = point[1];

  //   context.beginPath();
  //   context.arc(x, y, 3, 0, Math.PI * 2, false);
  //   context.fillStyle = '#7D6B7D';
  //   context.fill();
  // });

  // Change colors and do it again, 15 points around
  var innerGradient = context.createRadialGradient(0, 0, 30, 0, 0, 300);
  innerGradient.addColorStop(0.1, '#FF9EE2');
  innerGradient.addColorStop(1, '#A59EFF');
  context.strokeStyle = innerGradient;
  for (let i = 0; i < circlePoints.length; i++) {
    drawBetweenPoints(i, i + 15);
  }

  // Draw a line 11 points around the circle
  var outerGradient = context.createRadialGradient(0, 0, 30, 0, 0, 200);
  outerGradient.addColorStop(0.1, '#DFABFF');
  outerGradient.addColorStop(1, '#AE90E8');
  context.strokeStyle = outerGradient;
  for (let i = 0; i < circlePoints.length; i++) {
    drawBetweenPoints(i, i + 11);
  }

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

// PURPLE PINK
// Change colors and do it again, 15 points around
//  var innerGradient = context.createRadialGradient(0, 0, 30, 0, 0, 300);
//  innerGradient.addColorStop(0.1, '#FF9EE2');
//  innerGradient.addColorStop(1, '#A59EFF');
//  context.strokeStyle = innerGradient;
//  for (let i = 0; i < circlePoints.length; i++) {
//    drawBetweenPoints(i, i + 15);
//  }

//  // Draw a line 11 points around the circle
//  var outerGradient = context.createRadialGradient(0, 0, 30, 0, 0, 200);
//  outerGradient.addColorStop(0.1, '#DFABFF');
//  outerGradient.addColorStop(1, '#AE90E8');
//  context.strokeStyle = outerGradient;
//  for (let i = 0; i < circlePoints.length; i++) {
//    drawBetweenPoints(i, i + 11);
//  }
