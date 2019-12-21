// Builder
// Unique canvas names for special cards
var walkerCanvas = document.getElementById('walker');
var walkerContext = walkerCanvas.getContext('2d');

// New Retina canvas
walkerCanvas.width = 600;
walkerCanvas.height = 1000;
walkerCanvas.style.width = '300px';
walkerCanvas.style.height = '500px';
walkerContext.scale(2, 2);

var width = walkerCanvas.width / 2;
var height = walkerCanvas.height / 2;

walker();

function walker() {
  // Variables
  let x = width / 2;
  let y = height / 2;
  const stepSize = 10;
  const walkerCount = 20;
  const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
  const colors = ['#241e44', '#25315e', '#3a5c85', '#56a1bf', '#97dbd2'];

  // Backgrounds
  walkerContext.fillStyle = '#19102e';
  walkerContext.fillRect(0, 0, width, height);

  for (let i = 0; i < walkerCount; i++) {
    walkingCircle(x, y, stepSize, i);
  }

  // Starts a new walking circle
  function walkingCircle(x, y, stepSize, color) {
    var animation = true;

    draw();

    walkerCanvas.addEventListener('click', function(event) {
      if (animation == true) {
        animation = false;
      } else if (animation == false) {
        animation = true;
        draw();
      }
    });

    function draw() {
      if (animation == false) {
        return;
      }
      let angle = pick(angles);
      x += Math.cos(angle) * stepSize;
      y += Math.sin(angle) * stepSize;

      // Turn around if you hit the edge of the canvas
      if (x < 0) x = 0;
      if (x > width) x = width;
      if (y < 0) y = 0;
      if (y > height) y = height;

      walkerContext.beginPath();
      walkerContext.arc(x, y, 3, 0, Math.PI * 2, false);
      walkerContext.fillStyle = colors[color % colors.length];
      walkerContext.fill();

      requestAnimationFrame(draw);
    }

    // MATH
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
}
