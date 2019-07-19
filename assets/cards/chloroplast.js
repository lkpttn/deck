// Chloroplast
var canvas = document.getElementById('chloroplast');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

chloroplast();

function chloroplast() {
  // Vars
  var pills = [];
  const pillWidth = 30;
  const gap = 10;
  let x = 0;
  let y = 0;
  let i = 0;

  var colors = [
    '#A5FFCF', // Mint
    '#59FFA7', // Bright Mint
    '#05C9B1', // Blue
    '#47CC85', // Medium Mint?
  ];

  // Backgrounds
  context.fillStyle = '#2C8053';
  context.fillRect(0, 0, width, height);

  // Just a tiny offset for aesthetics
  context.translate(5, -10);

  while (x < width) {
    // Add vertical pills to an array for each i
    let tempHeightNumber = height;
    pills[i] = [];

    for (let j = 0; 0 < tempHeightNumber; j++) {
      let length = rangeFloor(50, 150);
      tempHeightNumber -= length;
      pills[i].push({
        x,
        length,
      });
    }

    // We need to increment our i and x by different amounts
    i++;
    x += pillWidth;
  }

  // Draw pill sizes
  for (let i = 0; i < pills.length; i++) {
    for (let j = 0; j < pills[i].length; j++) {
      let x = pills[i][j].x;
      let length = pills[i][j].length;
      drawRoundRect(x, y, pillWidth - gap, length, 25);
      // We need to calculate the y position of the next pill
      // Using the combined length of the previous ones
      y = y + length + gap;
    }
    if (y > height) y = 0;
  }

  function drawRoundRect(x, y, width, height, radius) {
    // Check to see if radius will spill over
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;

    // Drawing
    // arcTo allows us to round the edges of our shape
    context.beginPath();
    context.moveTo(x + radius, y);
    context.arcTo(x + width, y, x + width, y + height, radius);
    context.arcTo(x + width, y + height, x, y + height, radius);
    context.arcTo(x, y + height, x, y, radius);
    context.arcTo(x, y, x + width, y, radius);
    context.fillStyle = pick(colors);
    context.fill();
  }

  // Math stuff
  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Pick a random item out of an array
  function pick(array) {
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }
}
