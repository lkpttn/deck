// Builder
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

skull();

function skull() {
  // Vars
  var centerX = width / 2;
  var centerY = height / 2;
  var cornerRadius = 20;

  // Set faux rounded corners
  context.lineJoin = 'round';
  context.lineWidth = cornerRadius;

  // Backgrounds
  context.fillStyle = '#FFF';
  context.fillRect(0, 0, width, height);

  // Left eye
  fillCircle(0, 0, 125, 'black');

  // Right eye
  fillCircle(300, 0, 125, 'black');

  // Nose
  // cornerRadius = 30;
  context.beginPath();
  context.moveTo(centerX - 60, centerY + 35);
  context.lineTo(centerX, centerY - 60);
  context.lineTo(centerX + 60, centerY + 35);
  context.closePath();
  context.strokeStyle = 'black';
  context.fillStyle = 'black';
  context.stroke();
  context.fill();

  // Mouth
  roundedRect(0, 400, 500, 200, 'black');
  fillCircle(0, 430, 75, 'black');
  fillCircle(width, 430, 75, 'black');
  roundedRect(68, 388, 164, 20, 'white');
  roundedRect(68, 450, 164, 200, 'white');

  // Teeth
  for (let i = 0; i < 3; i++) {
    roundedRect(88 + i * 50, 465, 25, 45, 'black');
  }

  // Overlay
  context.globalCompositeOperation = 'multiply';
  context.fillStyle = '#f2f2f2';
  context.fillRect(centerX, 0, width / 2, height);

  // FUNCTIONS ************
  function fillCircle(x, y, radius, color) {
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.fillStyle = color;
    context.fill();
  }

  function roundedRect(x, y, width, height, color) {
    context.beginPath();
    context.rect(
      x + cornerRadius / 2,
      y + cornerRadius / 2,
      width - cornerRadius,
      height - cornerRadius,
    );
    context.fillStyle = color;
    context.strokeStyle = color;
    context.fill();
    context.stroke();
  }
}
