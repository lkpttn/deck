// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

blur();

function blur() {
  context.fillStyle = 'rgba(2, 63, 181, 1)';
  context.fillRect(0, 0, width, height);

  context.arc(width / 2, height / 2 + 50, 70, 0, Math.PI, false);

  context.fillStyle = 'rgba(255, 185, 56, 1)';
  context.fill();

  for (let i = 0; i < 15; i++) {
    context.beginPath();
    context.filter = `blur(${1 + i * 7}px)`;
    context.arc(width / 2, height / 2 + 50 - i * 8, 70, 0, Math.PI * 2, false);
    context.fillStyle = `rgba(255, 185, 56, ${1 - i * 0.05})`;

    context.fill();
  }
}
