// Easterly
var canvas = document.getElementById('easterly');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

easterly();

function easterly() {
  // Vars
  const step = 10;
  const sizes = [125, 150, 175, 200, 225, 250];
  var colors = ['#4F94CF', '#b92a30', '#EE751A', '#FECF1A'];
  var box = [];
  let x = 0;
  let y = -40;
  let i = 0;

  // Backgrounds
  context.fillStyle = '#1D495F';
  context.fillRect(0, 0, width, height);

  while (x < width) {
    // Add boxes to an array for each i
    let tempHeightNumber = height + 40;
    box[i] = [];

    for (let j = 0; 0 < tempHeightNumber; j++) {
      let boxHeight = pick(sizes);
      tempHeightNumber -= boxHeight;
      box[i].push({
        x,
        boxHeight,
      });
    }
    // We need to increment our i and x by different amounts
    i++;
    x += 150;
  }

  for (let i = 0; i < box.length; i++) {
    for (let j = 0; j < box[i].length; j++) {
      let x = box[i][j].x;
      let boxHeight = box[i][j].boxHeight;
      let color = colors[i % colors.length];
      nestRects(x, y, 150, boxHeight, 7, color);
      // We need to calculate the y position of the next box
      // Using the combined length of the previous ones
      y = y + boxHeight;
    }
    if (y >= height) y = -20;
  }

  function nestRects(x, y, width, height, number, color) {
    for (let i = 0; i < number; i++) {
      let currentStep = i * step;
      context.fillStyle = shadeColor(color, -i * 12);
      context.fillRect(
        x + currentStep,
        y + currentStep,
        width - currentStep * 2,
        height - currentStep * 2,
      );
    }
  }

  // Takes a color and percentage to spit out a new darker or lighter version
  function shadeColor(color, percent) {
    color = color.substr(1);
    var num = parseInt(color, 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      G = ((num >> 8) & 0x00ff) + amt,
      B = (num & 0x0000ff) + amt;
    return (
      '#' +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
        (B < 255 ? (B < 1 ? 0 : B) : 255)
      )
        .toString(16)
        .slice(1)
    );
  }

  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }

  function pick(array) {
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }
}
