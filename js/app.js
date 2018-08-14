/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
var toggledCards = [];
var moves = 0;
var matched = 0;

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const deck = document.querySelector('.deck');
function shuffleDeck() {
  const cardsToShuffle = Array.from(document.querySelectorAll('.deck li'));
  const shuffledCards = shuffle(cardsToShuffle);
  for (card of shuffledCards) {
    deck.appendChild(card);
  }
}
shuffleDeck();

deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (
    clickTarget.classList.contains('card') &&
    clickTarget.classList.contains('match') === false &&
    toggledCards.length < 2 &&
    toggledCards.includes(clickTarget) === false
  ) {
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (toggledCards.length === 2) {
      matchCheck(clickTarget);
      countMove();
      checkStar();
    }
  }
});

function toggleCard(clickTarget) {
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
}

function addToggleCard(clickTarget) {
  toggledCards.push(clickTarget);
  console.log(toggledCards);
}

function matchCheck() {
  if (toggledCards[0].firstElementChild.className === toggledCards[1].firstElementChild.className ) {
    toggledCards[0].classList.toggle('match');
    toggledCards[1].classList.toggle('match');
    toggledCards = [];
    matched++;
    if (matched === 8) {
      finished();
    }
  } else {
    setTimeout(() => {
    toggleCard(toggledCards[0]);
    toggleCard(toggledCards[1]);
    toggledCards = [];
  }, 1200);}
}

function countMove() {
  moves++;
  var movesCount = document.querySelector('.moves');
  movesCount.innerHTML = moves;
  console.log(moves);
}

function checkStar() {
  if (moves === 20 || moves === 40
  ) { hideStar();
    }
}

function hideStar() {
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    if (star.style.display !== "none") {
      star.style.display = "none";
      break;
    }
  }
}

function toggleFinal() {
  var final = document.querySelector('.final_background');
  final.classList.toggle('hide');
}

function writeFinalStats() {
  var movesStat = document.querySelector(".final_moves");
  var starsStat = document.querySelector(".final_stars");
  var stars = getStars();
  movesStat.innerHTML = `${moves}`;
  starsStat.innerHTML = `${stars}`;
}

function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !=='none') {
      starCount++;
    }
  }
  return starCount;
}

function newGameReset() {
  resetMoves();
  resetStars();
  resetCards();
  shuffleDeck();
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
  stars = 0;
  var starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}

function finished() {
  writeFinalStats();
  toggleFinal();
}

function replayGame() {
  newGameReset();
  toggleFinal();
}

function resetCards() {
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
}

document.querySelector('.restart').addEventListener('click', newGameReset);
document.querySelector('.replay').addEventListener('click', replayGame);

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
