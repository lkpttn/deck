// GMT+10
var canvas = document.getElementById('gmt10');
var context = canvas.getContext('2d');

canvas.width = 300;
canvas.height = 500;

var width = canvas.width;
var height = canvas.height;

GMT10();

function GMT10() {
  const count = 18;
  const margin = 30;
  const points = [];

  context.fillStyle = '#00A758';
  context.fillRect(0, 0, width, height);

  context.lineWidth = 3;
  context.lineCap = 'round';

  // Nested for loop to create x and y coordinates
  const createGrid = () => {
    // Nested for loop to create x and y coordinates
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // Working in uv space instead of final pixel coordinates
        // For added flexibility
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push([u, v]);
      }
    }
    return points;
  };

  var grid = createGrid();

  grid.forEach(data => {
    // Destructure the data parameter so we can access the grid object properties
    const [u, v] = data;

    const x = lerp(margin, width - margin, u);
    const y = lerp(margin, height - margin, v);
    var distanceXToCenter = Math.abs(x - width / 2);

    // fill the grid with lines
    context.beginPath();
    context.moveTo(x, y + 5);
    context.lineTo(x, y + 5 - rangeFloor(1, 20 - distanceXToCenter / 10));
    context.strokeStyle = `rgb(${255 -
      distanceXToCenter}, 255, ${distanceXToCenter})`;
    context.stroke();
  });

  // Math stuff
  function lerp(min, max, t) {
    return min * (1 - t) + max * t;
  }

  // Return a random whole number between min and max
  function rangeFloor(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
}
