// Builder
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
  const windowHeights = [20, 40, 80];
  var colors = [
    '#FFD14E', // Yellow
    '#FF9C00', // Bright Orange
    '#EB7420', // Orange
    '#CA0005', // Bright Red
    '#A40315', // Dark Red
    '#034B5E', // Dark Blue
    '#656597', // Light Purple
    '#46426C', // Dark Purple
    '#004135', // Dark Green
    '#ADA6AD', // Purple Grey
    '#685A54', // Light Brown
    '#03060B', // Dark Brown
  ];
  var backgroundColor = pick(colors);
  var windowColors = arrayRemove(colors, backgroundColor);
  console.log(backgroundColor);
  console.log(windowColors);

  // Backgrounds
  context.fillStyle = backgroundColor;
  context.fillRect(0, 0, width, height);

  // Row of windows
  // Pick a window size, lerp as many as will fit across the width

  var y = margin;

  for (let i = 0; i < 10; i++) {
    let windowWidth = pick(windowWidths);
    let windowHeight = pick(windowHeights);
    for (let j = 0; j < Math.floor(width / windowWidth); j++) {
      context.fillStyle = pick(windowColors);
      context.fillRect(
        margin + j * windowWidth + margin * j,
        y + margin * i,
        windowWidth,
        windowHeight,
      );
    }

    if (y + windowHeight < height - margin) {
      y += windowHeight;
    } else {
      console.log('Overflowing');
    }
  }

  // Functions
  function rangeFloor(min, max) {
    // Return a random whole number between min and max
    return Math.floor(Math.random() * (max - min) + min);
  }

  function pick(array) {
    // Pick a random item out of an array
    if (array.length === 0) return undefined;
    return array[rangeFloor(0, array.length)];
  }

  function arrayRemove(array, value) {
    return array.filter(function(element) {
      return element != value;
    });
  }
}
