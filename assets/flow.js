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
      card.className = 'card previous';
      card.style.left = `${30 + i * 2}%`;
    } else if (i === x) {
      card.className = 'card selected';
      card.style.left = '50%';
    } else {
      card.className = 'card after';
      card.style.left = `${65 + i * 2}%`;
    }
  }
}

selectCard(2);

// Dynamically choose the rotation point and translation based on how far the card is
// from the selected card

// Put the selected card in the center of the screen, move all other cards to fit
