// Kaleidoscope
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

kaleidoscope();

// Take pixels into array (collection)
function kaleidoscope() {
  // Variables
  let size = 50;
  var colors = [
    '#7F5D90', // purple
    '#E3805E', // orange
    '#FEE962', // yellow
  ];

  // Rotate from the center, then offset the canvas a bit
  context.translate(width / 2, height / 2);
  context.rotate(Math.PI / 6);
  context.translate(-width / 2 - 100, -height / 2 - 100);

  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      // Draw the rows slightly offset
      if (i % 2 == 0) {
        drawHex(i * size * 1.5, j * size * 1.7, size, colors);
      } else {
        // For some reason, you gotta move it over by 85% of size. Math
        drawHex(i * size * 1.5, size * 0.85 + j * size * 1.7, size, colors);
      }
    }
  }

  function drawHex(x, y, size, colors) {
    // Draw the background (and top right)
    context.beginPath();
    context.moveTo(x + size * Math.cos(0), y + size * Math.sin(0));

    // Use the trig to find the location of the next coordinate
    for (let side = 0; side < 6; side++) {
      context.lineTo(
        x + size * Math.cos((side * 2 * Math.PI) / 6),
        y + size * Math.sin((side * 2 * Math.PI) / 6),
      );
    }
    context.fillStyle = colors[0];
    context.fill();

    subdivideHex('bottom', colors[1]);
    subdivideHex('left', colors[2]);

    function subdivideHex(area, color) {
      // Draw a shape on sides 0,1,2 or sides 3,4,5
      var side;
      var limit;
      if (area === 'bottom') {
        side = 0;
        limit = 3;
      } else if (area === 'left') {
        side = 2;
        limit = 5;
      }
      context.beginPath();
      context.moveTo(x, y);
      for (let i = side; i < limit; i++) {
        context.lineTo(
          x + size * Math.cos((i * 2 * Math.PI) / 6),
          y + size * Math.sin((i * 2 * Math.PI) / 6),
        );
      }
      context.lineTo(x, y);
      context.fillStyle = color;
      context.fill();
    }
  }
}
