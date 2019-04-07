// Klint
var canvas = document.getElementById('klint');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#BB4A3A';
context.fillRect(0, 0, width, height);

klint();

function klint() {
  var centerW = width / 2;
  var centerH = height / 2;

  // First half circle
  context.fillStyle = 'white';
  context.arc(centerW, centerH, 100, Math.PI / 2, (Math.PI * 3) / 2, false);
  context.fill();

  // Black circle
  context.beginPath();
  context.fillStyle = 'black';
  context.arc(centerW, centerH, 65, Math.PI / 2, (Math.PI * 3) / 2, false);
  context.fill();

  // Blue circle
  context.beginPath();
  context.fillStyle = '#6593BD';
  context.arc(centerW, centerH, 100, (Math.PI * 3) / 2, Math.PI / 2, false);
  context.fill();

  // Yellow circle
  context.beginPath();
  context.fillStyle = '#EBC767';
  context.arc(centerW, centerH, 65, (Math.PI * 3) / 2, Math.PI / 2, false);
  context.fill();

  // Red circle
  context.beginPath();
  context.fillStyle = '#EF9782';
  context.arc(centerW, centerH, 35, (Math.PI * 3) / 2, Math.PI / 2, false);
  context.fill();

  // Red triangle
  context.beginPath();
  context.fillStyle = '#BB4A3A';
  context.moveTo(centerW, centerH - 5);
  context.lineTo(centerW, centerH + 5);
  context.lineTo(centerW - 5, centerH + 5);
  context.fill();

  // Red triangle
  context.beginPath();
  context.fillStyle = 'black';
  context.moveTo(centerW, centerH - 5);
  context.lineTo(centerW + 5, centerH + 5);
  context.lineTo(centerW, centerH + 5);
  context.fill();
}
