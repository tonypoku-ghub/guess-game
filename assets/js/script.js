var startButton = document.querySelector(".start-button");
var resetButton = document.querySelector(".reset-button");
var timer_count = document.querySelector(".timer-count");
var timer_remaining_div = document.querySelector("#time-remaining");
var word_blanks = document.querySelector(".word-blanks");
var win_display = document.querySelector(".win");
var lose_display = document.querySelector(".lose");
var timeInterval = null;

//initial customizable values
var wordOptions = ["test", "climb"];
var timeLimit = 60;
var timeLeft = 0;

// The computer generated word
var pickWord = [];

// The word guessed by user so far
var guessWord = [];

// listen for keypress
document.addEventListener("keydown", function onKeyPress(event) {
  if (event.key && timeLeft > 0) {
    console.log("key pressed: " + event.key);

    printGuessWord(event.key);

    tallyResults();
  }
});

startButton.addEventListener("click", countdown);
resetButton.addEventListener("click", resetGame);

// Timer that counts down from 10
function countdown() {
  initGame();

  pickWord = pickRandomWord();

  // shallow copy and blank out chars to start
  guessWord = pickWord.slice(); // shallow copy
  guessWord.fill("_"); // replace with underscore

  printGuessWord("");

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timer_count.textContent = timeLeft;

      // Decrement `timeLeft` by 1
      timeLeft--;

      // display during countdown
      displayMessage("seconds remaining");
    } else {
      timer_count.textContent = "";

      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);

      // Display after countdown
      displayMessage("Game Over - You Lost");

      tallyResults();
    }
  }, 1000);
}

function pickRandomWord() {
  // chooses random string from array of word options
  index = Math.floor(Math.random(wordOptions) * length);

  // splits array into single string
  singleWord = wordOptions[index];
  console.log(singleWord);

  // splits string into single characters//
  chars = singleWord.split("");
  console.log(chars);

  return chars;
}

// Display game status
function displayMessage(message) {
  timer_remaining_div.textContent = message;
}

// Reprint guess word on screen, after key press, to see if guess was correct
function printGuessWord(guessChar) {
  for (var i = 0; i < pickWord.length; i++) {
    if (pickWord[i] === guessChar) {
      guessWord[i] = guessChar;
    } else {
      if (!guessWord[i]) {
        guessWord[i] = "_";
      }
    }
  }

  word_blanks.textContent = guessWord.toString().replaceAll(",", " ");
}

function tallyResults() {
  var win = false;

  if (guessWord && !guessWord.includes("_")) {
    win = true;
  } else if (timeLeft <= 0) {
    win = false;
  } else {
    return;
  }

  if (win) {
    playerScore.updateScore("win");
    displayMessage("Game Over - You Won");
  } else {
    playerScore.updateScore("loss");
    displayMessage("Game Over - You Lost");
  }

  win_display.textContent = playerScore.wins;
  lose_display.textContent = playerScore.losses;

  initGame();
}

// Initialize the game
function initGame() {
  timeLeft = timeLimit;
  guessWord = "";

  timer_count.textContent = timeLeft;
  displayMessage("seconds remaining");

  if (timeInterval) {
    clearInterval(timeInterval);
  }
}

// Reset game and score
function resetGame() {
  initGame();
  playerScore.resetScore();
}

playerScore = {
  wins: 0,
  losses: 0,
  updateScore: function (score) {
    if (score.toLowerCase() === "win") {
      this.wins++;
    } else {
      this.losses++;
    }
  },
  resetScore: function () {
    wins = 0;
    losses = 0;
  },
};
