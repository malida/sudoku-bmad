/**
 * State Management Module
 * Manages the Sudoku game state including grid data, errors, and completion status
 */

// Hardcoded valid Sudoku puzzles
const HARDCODED_PUZZLES = [
  // Puzzle 1
  [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
  ],
  // Puzzle 2
  [
    [0, 0, 9, 7, 4, 8, 0, 0, 0],
    [7, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 1, 0, 9, 0, 0, 0],
    [0, 0, 7, 0, 0, 0, 2, 4, 0],
    [0, 6, 4, 0, 1, 0, 5, 9, 0],
    [0, 9, 8, 0, 0, 0, 3, 0, 0],
    [0, 0, 0, 8, 0, 3, 0, 2, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 6],
    [0, 0, 0, 2, 7, 5, 9, 0, 0]
  ],
  // Puzzle 3
  [
    [0, 0, 0, 6, 0, 0, 4, 0, 0],
    [7, 0, 0, 0, 0, 3, 6, 0, 0],
    [0, 0, 0, 0, 9, 1, 0, 8, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 5, 0, 1, 8, 0, 0, 0, 3],
    [0, 0, 0, 3, 0, 6, 0, 4, 5],
    [0, 4, 0, 2, 0, 0, 0, 6, 0],
    [9, 0, 3, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 1, 0, 0]
  ]
];

// Track current puzzle index
let currentPuzzleIndex = 0;

// Game state object
const SudokuGrid = {
  grid: [],
  initialGrid: [],
  errors: new Set(),
  isComplete: false,
  isSolved: false
};

// Selected cell state
let selectedCell = null; // { row: number, col: number } | null

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
  selectedCell = null; // Clear selection on new puzzle
}

/**
 * Returns the current error set
 * @returns {Set<string>} Set of error cell coordinates in "row,col" format
 */
export function getErrors() {
  return SudokuGrid.errors;
}

/**
 * Sets the error set for the grid
 * @param {Set<string>} errorSet - Set of error cell coordinates in "row,col" format
 */
export function setErrors(errorSet) {
  SudokuGrid.errors = errorSet;
}

/**
 * Sets the selected cell
 * @param {number} row - Row index (0-8)
 * @param {number} col - Column index (0-8)
 */
export function setSelectedCell(row, col) {
  selectedCell = { row, col };
}

/**
 * Returns the currently selected cell
 * @returns {{row: number, col: number} | null} Selected cell coordinates or null
 */
export function getSelectedCell() {
  return selectedCell;
}

/**
 * Clears the cell selection
 */
export function clearSelection() {
  selectedCell = null;
}

/**
 * Checks if a cell is a given clue (immutable)
 * @param {number} row - Row index (0-8)
 * @param {number} col - Column index (0-8)
 * @returns {boolean} True if cell is a given clue
 */
export function isGivenClue(row, col) {
  if (row < 0 || row > 8 || col < 0 || col > 8) {
    return false;
  }
  return SudokuGrid.initialGrid[row][col] !== 0;
}

/**
 * Sets the value of a cell (only if not a given clue)
 * @param {number} row - Row index (0-8)
 * @param {number} col - Column index (0-8)
 * @param {number} value - Value to set (1-9)
 */
export function setCellValue(row, col, value) {
  if (row < 0 || row > 8 || col < 0 || col > 8) {
    return;
  }
  if (!isGivenClue(row, col)) {
    SudokuGrid.grid[row][col] = value;
  }
}

/**
 * Clears a cell (sets to 0, only if not a given clue)
 * @param {number} row - Row index (0-8)
 * @param {number} col - Column index (0-8)
 */
export function clearCell(row, col) {
  if (row < 0 || row > 8 || col < 0 || col > 8) {
    return;
  }
  if (!isGivenClue(row, col)) {
    SudokuGrid.grid[row][col] = 0;
  }
}

/**
 * Checks if the grid is complete (all cells filled)
 * @returns {boolean} True if no empty cells exist
 */
export function isGridComplete() {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (SudokuGrid.grid[row][col] === 0) {
        return false; // Found empty cell
      }
    }
  }
  return true; // No empty cells
}

/**
 * Checks if the grid is correctly solved (complete and no errors)
 * @returns {boolean} True if puzzle is solved correctly
 */
export function isGridSolved() {
  return isGridComplete() && SudokuGrid.errors.size === 0;
}

/**
 * Gets the next puzzle in sequence (cycles through available puzzles)
 * @returns {number[][]} The next puzzle grid
 */
export function getNextPuzzle() {
  currentPuzzleIndex = (currentPuzzleIndex + 1) % HARDCODED_PUZZLES.length;
  return HARDCODED_PUZZLES[currentPuzzleIndex];
}

// Initialize state with first hardcoded puzzle
loadPuzzle(HARDCODED_PUZZLES[0]);
