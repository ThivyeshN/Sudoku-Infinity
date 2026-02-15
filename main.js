const board = document.getElementById('sudoku-board');

// Sudoku grid array
let sudokuGrid = Array.from({ length: 9 }, () => Array(9).fill(0));

// Function to check if placing a number is valid
function isValid(grid, row, col, num) {
  // Check row & column
  for (let i = 0; i < 9; i++) {
    if (grid[row][i] === num || grid[i][col] === num) return false;
  }
  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if (grid[startRow + r][startCol + c] === num) return false;
    }
  }
  return true;
}

// Backtracking Sudoku Solver / Generator
function fillGrid(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        let numbers = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
        for (let num of numbers) {
          if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (fillGrid(grid)) return true;
            grid[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

// Remove numbers to create a puzzle
function removeNumbers(grid, clues = 40) { // default 40 clues = medium
  let attempts = 81 - clues;
  while (attempts > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (grid[row][col] !== 0) {
      grid[row][col] = 0;
      attempts--;
    }
  }
}

// Display grid on page
function displayGrid(grid) {
  board.innerHTML = '';
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      if (grid[row][col] !== 0) {
        cell.textContent = grid[row][col];
        cell.style.fontWeight = 'bold';
      } else {
        cell.addEventListener('click', () => selectCell(cell));
      }
      board.appendChild(cell);
    }
  }
}

// Helper function
function isValidEntry(grid, row, col, num) {
  // Check row & column
  for (let i = 0; i < 9; i++) {
    if (i !== col && grid[row][i] === num) return false;
    if (i !== row && grid[i][col] === num) return false;
  }
  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      if ((startRow + r !== row || startCol + c !== col) &&
          grid[startRow + r][startCol + c] === num) return false;
    }
  }
  return true;
}

// Cell input
function selectCell(cell) {
  const num = prompt("Enter a number (1-9):");
  if (num >= 1 && num <= 9) {
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    // Temporarily place the number in the grid
    sudokuGrid[row][col] = parseInt(num);

    // Check if number is valid
    if (isValidEntry(sudokuGrid, row, col, parseInt(num))) {
      cell.textContent = num;
      cell.style.color = 'black'; // valid
    } else {
      cell.style.color = 'red'; // invalid
    }

  } else if (num === null || num === '') {
    cell.textContent = '';
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    sudokuGrid[row][col] = 0;
    cell.style.color = 'black';
  } else {
    alert("Invalid input! Use numbers 1-9 only.");
  }
}

// New Game button
document.getElementById('new-game').addEventListener('click', () => {
  const difficulty = parseInt(document.getElementById('difficulty').value); // get number of clues
  sudokuGrid = Array.from({ length: 9 }, () => Array(9).fill(0));
  fillGrid(sudokuGrid);
  removeNumbers(sudokuGrid, difficulty); // now uses selected difficulty
  displayGrid(sudokuGrid);
});

// Initial puzzle load
fillGrid(sudokuGrid);
removeNumbers(sudokuGrid, 40);
displayGrid(sudokuGrid);
