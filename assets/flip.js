var front = document.querySelector('.front');
var back = document.querySelector('.back');

// Keep track of where we are in the gallery
var i = 0;

front.addEventListener('click', function() {
  cardFlip(front, i);
});

back.addEventListener('click', function() {
  cardFlip(back, i);
});

// A function needs to load the next cardback and flip the card
function cardFlip(side, x) {
  // Add or remove the transformation classes
  front.classList.toggle('forward');
  back.classList.toggle('backwards');

  // Remove the previous cover class
  // Use side to determine what side was clicked and what side needs the next class
  if (side === front) {
    let previous = x - 1;
    back.classList.remove(`cover${previous.toString()}`);
    console.log('Adding class ' + x.toString());
    back.classList.add(`cover${x.toString()}`);
  } else if (side === back) {
    let previous = x - 1;
    front.classList.remove(`cover${previous.toString()}`);
    console.log('Adding class ' + x.toString());
    front.classList.add(`cover${x.toString()}`);
  }

  i++;
}
