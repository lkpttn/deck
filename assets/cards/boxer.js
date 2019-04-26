// Boxer
var canvas = document.getElementById('boxer');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

boxer();

function boxer() {
  // Colors
  var yellow = '#FEAC00';
  var colors = [
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
  ];

  // Backgrounds
  context.fillStyle = yellow;
  context.fillRect(0, 0, width, height);

  // Double loop to draw boxes
  for (let i = 0; i < width; ) {
    let boxWidth = rangeFloor(10, 50);

    for (let j = 0; j < height; ) {
      let boxHeight = rangeFloor(10, 100);

      // Randomly add gradients
      if (Math.random() > 0.7) {
        let grd = context.createLinearGradient(i, j, i, j + boxHeight);
        grd.addColorStop(0, pick(colors));
        grd.addColorStop(1, pick(colors));
        context.fillStyle = grd;
      } else {
        context.fillStyle = pick(colors);
      }

      // Draw the boxes
      context.fillRect(i, j, boxWidth, boxHeight);

      j = j + boxHeight;
    }
    i = i + boxWidth;
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
