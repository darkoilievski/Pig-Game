'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
// THE SAME THING AS ABOVE SELECTING AN ID BUT THE DIFFERENCE IS,
//  YOU DONT NEED THE # SYMBOL ANYMORE
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
// How to make the game stop when there is a winner, whenever it's false it will stop
let playing = true;
// How to switch between players
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // How to add or remove class with toggle
  // The toggle method checks if the element has the class below
  // and if it doesnt it add's it and if it does it removes it
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const startPlaying = function () {
  // 1. Generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  //  2. Display dice
  diceEl.classList.remove('hidden');
  // How to dipslay the random dice number with the right picture
  diceEl.src = `dice-${dice}.png`;
  //  3. Chek for rolled 1: if true, switch to next player
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    switchPlayer();
  }
};

const holdScore = function () {
  // 1. Add current score to active player's score
  scores[activePlayer] += currentScore; //BElow is an explanation

  // scores[1] = scores[1] + currentScore this is the meaning of the code above
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  // 2. Check if the player's score is >= 100
  if (scores[activePlayer] >= 20) {
    // Finish the game
    diceEl.classList.add('hidden');
    playing = false;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player-active');
  } else {
    //switch to next player
    switchPlayer();
  }
};

// Setting both scores to 0
score0El.textContent = 0;
score1El.textContent = 0;
// Removing the dice from the initial screen
diceEl.classList.add('hidden');

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    startPlaying();
  }
});

//  4. Hold the score
btnHold.addEventListener('click', function () {
  holdScore();
});

// Reset the game - CHALLENGE (WITH HELP IN THE Q/A)
btnNew.addEventListener('click', function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  scores[0] = 0;
  scores[1] = 0;
  player0El.classList.add('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player1El.classList.remove('player--winner');
  playing = true;
});
