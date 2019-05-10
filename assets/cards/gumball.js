// Gumball
var canvas = document.getElementById('gumball');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

gumball();

function gumball() {
  context.fillStyle = 'rgb(249, 195, 182)';
  context.fillRect(0, 0, width, height);

  let grd = context.createLinearGradient(0, height, width, 0);
  grd.addColorStop(0.1, 'rgb(182, 206, 235)');
  grd.addColorStop(1, 'rgb(64, 24, 119)');
  context.fillStyle = grd;

  context.rotate((30 * Math.PI) / 180);
  context.fillRect(200, -150, 100, 600);
}
