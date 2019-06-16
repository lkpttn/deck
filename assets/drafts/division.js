// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

builder();

function builder() {
  // Vars
  var step = 10;
  var lines = [];
  var margin = 80;

  var colors = ['#D9C99A', '#D96704', '#D97762', '#BF544B'];

  context.fillStyle = '#0D0D0D';
  context.fillRect(0, 0, width, height);

  // Make the lines
  for (let i = margin; i <= height - margin * 3.5; i += 20) {
    var line = [];
    for (let j = 0; j <= height; j += step) {
      // The absolute value of the point to the center
      var distanceToCenter = Math.abs(j - height / 2);
      // Increase the amount of variance closer to the center of the canvas
      var variance = Math.max(height / 2 - 100 - distanceToCenter, 0);
      var random = (range(-1, 1) * variance) / 3;
      var point = { x: i + random, y: j };
      line.push(point);
    }
    lines.push(line);
  }

  // Draw the lines
  for (var i = 0; i < lines.length; i++) {
    context.beginPath();
    context.moveTo(lines[i][0].x, lines[i][0].y);

    // Learn to understand this
    for (var j = 0; j < lines[i].length - 2; j++) {
      var xc = (lines[i][j].x + lines[i][j + 1].x) / 2;
      var yc = (lines[i][j].y + lines[i][j + 1].y) / 2;
      context.quadraticCurveTo(lines[i][j].x, lines[i][j].y, xc, yc);
    }

    // Final closure
    context.quadraticCurveTo(
      lines[i][j].x,
      lines[i][j].y,
      lines[i][j + 1].x,
      lines[i][j + 1].y,
    );

    context.strokeStyle = colors[i % colors.length];
    context.lineWidth = 4;
    // context.globalAlpha = 0.8;

    context.stroke();
  }

  function range(min, max) {
    // Return a random number between min and max
    return Math.random() * (max - min) + min;
  }
}
