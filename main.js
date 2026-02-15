// Grab the board container
const board = document.getElementById('sudoku-board');

// Function to create empty 9x9 grid
function createGrid() {
  board.innerHTML = ''; // Clear previous cells
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.textContent = ''; // empty for now
      cell.addEventListener('click', () => selectCell(cell));
      board.appendChild(cell);
    }
  }
}

// Select a cell and allow number input
function selectCell(cell) {
  const num = prompt("Enter a number (1-9):");
  if (num >= 1 && num <= 9) {
    cell.textContent = num;
  } else if (num === null || num === '') {
    cell.textContent = '';
  } else {
    alert("Invalid input! Use numbers 1-9 only.");
  }
}

// New Game button
document.getElementById('new-game').addEventListener('click', () => {
  createGrid();
});

// Initial grid load
createGrid();
