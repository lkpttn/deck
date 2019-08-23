// Koinobori
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

zoned();

function zoned() {
  // Vars
  var grd = context.createLinearGradient(0, 0, width, height);
  grd.addColorStop(0.0, '#E47D7F');
  grd.addColorStop(0.5, '#6F81D6');
  grd.addColorStop(1.0, '#7AAEAD');

  var grd2 = context.createLinearGradient(0, 0, width, height);
  grd2.addColorStop(0.0, '#609096');
  grd2.addColorStop(0.5, '#FAF9FB');
  grd2.addColorStop(1.0, '#FCD4A9');

  // Backgrounds
  context.fillStyle = '#fff';
  context.fillRect(0, 0, width, height);

  drawRings(60, grd, 18);
  drawRings(50, grd2, 3);

  function drawRings(offset, gradient, lineWidth) {
    // Existing content is kept where it doesn't overlap with the shape
    // aka everything else we draw will punch a hole in the background
    context.globalCompositeOperation = 'destination-out';
    context.translate(width / 2, height / 2);

    // Draw rings
    for (let i = 0; i < 15; i++) {
      context.beginPath();
      context.arc(0, 0, offset + i * 20, 0, Math.PI * 2, false);
      context.strokeStyle = 'white';
      context.lineWidth = lineWidth;
      context.stroke();
    }

    // New shapes will be drawn behind the existing content
    // We use this to draw the gradient behind the layer with holes
    context.globalCompositeOperation = 'destination-over';
    context.translate(-width / 2, -height / 2);

    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);
  }
}
