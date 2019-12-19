// Builder
var canvas = document.getElementById('card-canvas');
var context = canvas.getContext('2d');

// New Retina canvas
canvas.width = 600;
canvas.height = 1000;
canvas.style.width = '300px';
canvas.style.height = '500px';
context.scale(2, 2);

var width = canvas.width / 2;
var height = canvas.height / 2;

walker();

// Take pixels into array (collection)
function walker() {
  // Variables
  let x = width / 2;
  let y = height / 2;
  let frame = 0;
  const stepSize = 10;
  const angles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
  const colors = ['#241e44', '#25315e', '#3a5c85', '#56a1bf', '#97dbd2'];
  let animation = true;

  // Backgrounds
  context.fillStyle = '#19102e';
  context.fillRect(0, 0, width, height);

  draw();

  canvas.addEventListener('click', function(event) {
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

    context.beginPath();
    context.arc(x, y, 2, 0, Math.PI * 2, false);
    context.fillStyle = colors[frame % colors.length];
    context.fill();

    frame += 1;

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
