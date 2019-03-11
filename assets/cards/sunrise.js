// Sunrise
var canvas = document.getElementById('sunrise');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

context.fillStyle = '#FFFFFF';
context.fillRect(0, 0, width, height);

// Draw again on a click
canvas.addEventListener('click', function() {
  sunrise();
});

sunrise();

function sunrise() {
  var colors = ['#4F94CF', '#E51D20', '#2C416E', '#EE751A', '#FECF1A'];
  // Create the grid of squares
  let measure = 50;
  let widthIterator = width / measure;
  let heightIterator = height / measure;

  for (let x = 0; x < widthIterator; x++) {
    for (let y = 0; y < heightIterator; y++) {
      // Draw a rectangle
      makeSun(x * measure, y * measure, colors);
    }
  }

  function makeSun(x, y, colors) {
    context.save();
    // Background box
    context.beginPath();
    context.fillStyle = pick(colors);
    context.fillRect(x, y, measure, measure);

    // Draw interior circles
    // We can alter the translation to get the corner effect, since the next
    // boxes will be drawn on top of the rest of our circles
    context.translate(x + measure / 2, y + measure / 2);

    // Outer circle
    context.beginPath();
    context.arc(0, 0, rangeFloor(15, 25), 0, Math.PI * 2, false);
    context.fillStyle = pick(colors);
    context.fill();

    // Inner circle
    context.beginPath();
    context.arc(0, 0, rangeFloor(5, 10), 0, Math.PI * 2, false);
    context.fillStyle = pick(colors);
    context.fill();

    context.restore();
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
