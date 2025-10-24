/**
 * State Management Module
 * Manages the Sudoku game state including grid data, errors, and completion status
 */

// Hardcoded valid Sudoku puzzle with ~27 given clues
const HARDCODED_PUZZLE = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Game state object
const SudokuGrid = {
  grid: [],
  initialGrid: [],
  errors: new Set(),
  isComplete: false,
  isSolved: false
};

/**
 * Returns the current grid
 * @returns {number[][]} 9x9 array representing current grid state
 */
export function getGrid() {
  return SudokuGrid.grid;
}

/**
 * Returns the initial immutable puzzle grid
 * @returns {number[][]} 9x9 array representing starting puzzle
 */
export function getInitialGrid() {
  return SudokuGrid.initialGrid;
}

/**
 * Returns the value at a specific cell
 * @param {number} row - Row index (0-8)
 * @param {number} col - Column index (0-8)
 * @returns {number} Cell value (0-9, where 0 is empty)
 */
export function getCellValue(row, col) {
  if (row < 0 || row > 8 || col < 0 || col > 8) {
    return 0;
  }
  return SudokuGrid.grid[row][col];
}

/**
 * Loads a new puzzle into the game state
 * @param {number[][]} grid - 9x9 array representing the puzzle
 */
export function loadPuzzle(grid) {
  // Deep copy the grid for both current and initial state
  SudokuGrid.grid = JSON.parse(JSON.stringify(grid));
  SudokuGrid.initialGrid = JSON.parse(JSON.stringify(grid));
  SudokuGrid.errors = new Set();
  SudokuGrid.isComplete = false;
  SudokuGrid.isSolved = false;
}

/**
 * Returns the current error set
 * @returns {Set<string>} Set of error cell coordinates in "row,col" format
 */
export function getErrors() {
  return SudokuGrid.errors;
}

// Initialize state with hardcoded puzzle
loadPuzzle(HARDCODED_PUZZLE);
