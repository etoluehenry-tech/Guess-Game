// Start the game with a random number between 1 and 100
let targetNumber = getRandomNumber();
let guessCount = 0;
let highScore = null;

// Get the HTML elements we will use
const guessForm = document.getElementById("guessForm");
const guessInput = document.getElementById("guessInput");
const messageLow = document.getElementById("messageLow");
const messageHigh = document.getElementById("messageHigh");
const messageCorrect = document.getElementById("messageCorrect");
const guessCountDisplay = document.getElementById("guessCount");
const highScoreDisplay = document.getElementById("highScore");
const resetBtn = document.getElementById("resetBtn");

// Name for the saved high score in browser storage
const HIGH_SCORE_KEY = "guessGameHighScore";

// Create a random number from 1 to 100
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// Hide all the result messages
function hideMessages() {
    messageLow.classList.add("hidden");
    messageHigh.classList.add("hidden");
    messageCorrect.classList.add("hidden");
}

// Update the visible guess count and best score
function updateDisplay() {
    guessCountDisplay.textContent = `Number of guesses: ${guessCount}`;
    highScoreDisplay.textContent = highScore !== null ? `Best score: ${highScore}` : "Best score: —";
}

// Load the saved high score from the browser
function loadHighScore() {
    const savedScore = parseInt(localStorage.getItem(HIGH_SCORE_KEY), 10);
    highScore = Number.isFinite(savedScore) ? savedScore : null;
    updateDisplay();
}

// Check the user's guess when the form is submitted
function checkGuess(event) {
    event.preventDefault(); // Stop the page from refreshing

    const userGuess = Number(guessInput.value);

    // Make sure the input is a valid number between 1 and 100
    if (Number.isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        alert("Please enter a valid number from 1 to 100.");
        return;
    }

    guessCount++; // Count this guess
    hideMessages(); // Clear old messages before showing the new one

    // If the guess is correct
    if (userGuess === targetNumber) {
        messageCorrect.classList.remove("hidden");
        messageCorrect.textContent = `🎉 Correct! The number was ${targetNumber}.`;

        // Save a new high score if this is better
        if (highScore === null || guessCount < highScore) {
            highScore = guessCount;
            localStorage.setItem(HIGH_SCORE_KEY, highScore);
        }

        guessForm.style.display = "none";
    } else if (userGuess < targetNumber) {
        // The guess is too low
        messageLow.classList.remove("hidden");
        messageLow.textContent = "Too low! Try a higher number.";
    } else {
        // The guess is too high
        messageHigh.classList.remove("hidden");
        messageHigh.textContent = "Too high! Try a lower number.";
    }

    updateDisplay();
    guessInput.value = "";
    guessInput.focus();
}

// Reset the game to a new number and clear the score display
function resetGame() {
    targetNumber = getRandomNumber();
    guessCount = 0;
    hideMessages();
    guessInput.value = "";
    guessForm.style.display = "block";
    updateDisplay();
    guessInput.focus();
}

// Load any saved high score when the page opens
loadHighScore();

// Listen for form submissions
guessForm.addEventListener("submit", checkGuess);
resetBtn.addEventListener("click", resetGame);