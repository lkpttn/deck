// Sunset
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

sunset();

function sunset() {
  // Vars
  const margin = 20;
  // The different sizes an individual window can be
  const windowWidths = [20, 36, 50, 73, 120];
  const windowHeights = [40, 60, 80];
  var backgroundColor = '#FFB77C';
  var colors = [
    '#002F40', // Dark Blue
    '#005F73', // Medium Blue
    '#00ACB9', // Light Blue
    '#664D5C', // Dull Red
    '#BC6A60', // Medium Red
    '#D9A8AF', // Light Red
    '#EB783C', // Medium Orange
    '#FFA051', // Light Orange
    '#FECA55', // Yellow
  ];

  // Backgrounds
  let bgGrd = context.createLinearGradient(0, 0, 0, height);
  bgGrd.addColorStop(0, backgroundColor);
  bgGrd.addColorStop(1, shadeColor(backgroundColor, -10));
  context.fillStyle = bgGrd;
  context.fillRect(0, 0, width, height);

  // Double loop to draw windows
  for (let i = 0; i < height - margin * 2; ) {
    let boxWidth = pick(windowWidths);
    let boxHeight = pick(windowHeights);

    for (let j = 0; j < width - margin; ) {
      let x = margin + j;
      let y = margin + i;
      // Draw the boxes
      if (Math.random() > 0.7) {
        let grd = context.createLinearGradient(x, y, x, y + boxHeight);
        grd.addColorStop(0, pick(colors));
        grd.addColorStop(1, shadeColor(pick(colors), -20));
        context.fillStyle = grd;
      } else {
        context.fillStyle = pick(colors);
      }
      context.fillRect(x, y, boxWidth, boxHeight);
      context.fillStyle = '#03060b';
      context.fillRect(x, y, boxWidth, 7);

      j = j + boxWidth + margin;
    }
    i = i + boxHeight + margin;
  }

  // Functions
  // Return a random whole number between min and max
  function rangeFloor(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  // Pick a random item out of an array
  function pick(array) {
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }

  // Makes a new array, removing a specific value
  function arrayRemove(array, value) {
    return array.filter(function(element) {
      return element != value;
    });
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
}
