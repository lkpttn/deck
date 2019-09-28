// Tapu Fini
var canvas = document.getElementById('tapufini');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#112F41';
context.fillRect(0, 0, width, height);

context.globalCompositeOperation = 'screen';
context.lineWidth = 10;

tapufini();

function tapufini() {
  // Vars
  var amplitude = rangeFloor(10, 20);
  var frequency = rangeFloor(20, 70);
  var colors = [
    '#FFB713',
    '#009F45',
    '#FF3A5C',
    '#4646DF',
    '#F44918',
    '#FEAC00',
    '#FF5630',
    '#396C7D',
    '#83757D',
    '#2C3F54',
    '#F0F0EC',
    '#2A2A41',
    '#766B4F',
    '#F4AAAB',
    '#CF3B45',
    '#4F94CF',
    '#E51D20',
    '#2C416E',
    '#EE751A',
    '#FECF1A',
  ];

  let x = 0;

  while (x < width + 100) {
    let color = pick(colors);
    drawSine(x, color);
    x = x + 17;
  }

  // FUNCTIONS ************************

  function drawSine(x, color) {
    let waveY = -10;
    context.beginPath();
    while (waveY < height + 10) {
      // Draw a very short line to the next point output by the sine function
      let waveX = x + amplitude * Math.sin(waveY / frequency);
      context.lineTo(waveX, waveY);
      waveY++;
    }
    context.strokeStyle = color;
    context.stroke();
  }

  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }

  function pick(array) {
    // Pick a random item out of an array
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }
}
