const cells = document.querySelectorAll(".cell");

const statusText = document.getElementById("status");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

const newGameBtn = document.getElementById("newGame");
const resetScoreBtn = document.getElementById("resetScore");

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let gameActive = true;

let scores = {
  X: 0,
  O: 0,
  draw: 0,
};

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Handle box clicks
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (!gameActive || board[index] !== "") {
      return;
    }

    board[index] = currentPlayer;

    cell.textContent = currentPlayer;

    cell.classList.add(currentPlayer.toLowerCase());

    cell.disabled = true;

    checkResult();
  });
});

// Check winner and draw
function checkResult() {
  for (let pattern of winningPatterns) {
    const [a, b, c] = pattern;

    if (board[a] !== "" && board[a] === board[b] && board[b] === board[c]) {
      statusText.textContent = "Player " + currentPlayer + " Wins! 🎉";

      cells[a].classList.add("winner");
      cells[b].classList.add("winner");
      cells[c].classList.add("winner");

      scores[currentPlayer]++;

      updateScore();

      gameActive = false;

      return;
    }
  }

  // Draw condition
  if (board.every((cell) => cell !== "")) {
    statusText.textContent = "It's a Draw! 🤝";

    scores.draw++;

    updateScore();

    gameActive = false;

    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";

  statusText.textContent = "Player " + currentPlayer + "'s Turn";
}

// Update scoreboard
function updateScore() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
  scoreDraw.textContent = scores.draw;
}

// Start new game
function newGame() {
  board = ["", "", "", "", "", "", "", "", ""];

  currentPlayer = "X";

  gameActive = true;

  cells.forEach((cell) => {
    cell.textContent = "";

    cell.disabled = false;

    cell.classList.remove("x", "o", "winner");
  });

  statusText.textContent = "Player X's Turn";
}

// Reset all scores
function resetScores() {
  scores = {
    X: 0,
    O: 0,
    draw: 0,
  };

  updateScore();

  newGame();
}

// Button events
newGameBtn.addEventListener("click", newGame);

resetScoreBtn.addEventListener("click", resetScores);
