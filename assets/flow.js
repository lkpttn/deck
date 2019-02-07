var cardList = document.querySelectorAll('.card');

for (let i = 0; i < cardList.length; i++) {
  cardList[i].addEventListener('click', function() {
    selectCard(i);
  });
}

function selectCard(x) {
  console.log('Clicking card #' + x);
  for (let i = 0; i < cardList.length; i++) {
    var card = cardList[i];
    if (i < x) {
      card.classList.remove('previous');
      card.classList.remove('selected');
      card.classList.remove('after');

      card.classList.add('previous');
    } else if (i === x) {
      card.classList.remove('previous');
      card.classList.remove('selected');
      card.classList.remove('after');

      card.classList.add('selected');
    } else {
      card.classList.remove('previous');
      card.classList.remove('selected');
      card.classList.remove('after');

      card.classList.add('after');
    }
  }
}

selectCard(2);

// Dynamically choose the rotation point and translation based on how far the card is
// from the selected card

// Put the selected card in the center of the screen, move all other cards to fit
