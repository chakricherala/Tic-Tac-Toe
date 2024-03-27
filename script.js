const gridContainer = document.querySelector('.grid-container');

// Game state variables
let currentPlayer = 'X';
let gameOver = false;

// Function to check if a cell is empty
const isEmptyCell = (cell) => !cell.textContent;

// Function to handle button clicks
function handleClick(event) {
  const button = event.target;

  // Check if game is over or cell is already filled
  if (gameOver || !isEmptyCell(button)) {
    return;
  }

  // Update cell content and check for win
  button.textContent = currentPlayer;
  if (checkWin(currentPlayer)) {
    alert(`${currentPlayer} wins!`);
    gameOver = true;
    disableButtons();
  } else if (isDraw()) {
    alert("It's a draw!");
    gameOver = true;
    disableButtons();
  } else {
    // Only switch player if there's no win or draw
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

// Function to check for a winning condition
function checkWin(player) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombinations) {
    const cell1 = gridContainer.children[combo[0]];
    const cell2 = gridContainer.children[combo[1]];
    const cell3 = gridContainer.children[combo[2]];

    if (cell1.textContent === player && cell2.textContent === player && cell3.textContent === player) {
      return true;
    }
  }

  return false;
}

// Function to check for a draw (all cells filled)
function isDraw() {
  for (let i = 0; i < gridContainer.children.length; i++) {
    if (isEmptyCell(gridContainer.children[i])) {
      return false; // Empty cell found, not a draw
    }
  }
  return true; // All cells filled, it's a draw
}

// Function to disable all buttons
function disableButtons() {
  for (let i = 0; i < gridContainer.children.length; i++) {
    gridContainer.children[i].disabled = true;
  }
}

// Function to reset the game
function resetGame() {
  for (let i = 0; i < gridContainer.children.length; i++) {
    gridContainer.children[i].textContent = '';
    gridContainer.children[i].disabled = false;
  }
  currentPlayer = 'X';
  gameOver = false;
}

// Add event listeners to the buttons
for (let i = 0; i < gridContainer.children.length; i++) {
  gridContainer.children[i].addEventListener('click', handleClick);
}

// Add an event listener to the reset button (if present)
const resetButton = document.querySelector('.reset-button');
if (resetButton) {
  resetButton.addEventListener('click', resetGame);
}
