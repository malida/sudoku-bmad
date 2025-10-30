/**
 * generator.js
 *
 * Sudoku puzzle generation and solving algorithms.
 * Implements backtracking solver and puzzle generation logic.
 */

// ============================================================================
// Internal Helper Functions
// ============================================================================

/**
 * Finds the first empty cell (value 0) in the grid.
 *
 * @param {number[][]} grid - 9x9 Sudoku grid
 * @returns {{row: number, col: number}|null} Cell coordinates or null if grid is complete
 */
function findEmptyCell(grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        return { row, col };
      }
    }
  }
  return null; // Grid is complete
}

/**
 * Checks if placing a number at the given position is valid according to Sudoku rules.
 * Validates row, column, and 3x3 box constraints.
 *
 * @param {number[][]} grid - 9x9 Sudoku grid
 * @param {number} row - Row index (0-8)
 * @param {number} col - Column index (0-8)
 * @param {number} num - Number to place (1-9)
 * @returns {boolean} True if placement is valid, false otherwise
 */
function isValidPlacement(grid, row, col, num) {
  // Check row for duplicates
  for (let c = 0; c < 9; c++) {
    if (grid[row][c] === num) {
      return false;
    }
  }

  // Check column for duplicates
  for (let r = 0; r < 9; r++) {
    if (grid[r][col] === num) {
      return false;
    }
  }

  // Check 3x3 box for duplicates
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (grid[r][c] === num) {
        return false;
      }
    }
  }

  return true; // Placement is valid
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 * Provides true uniform randomization for puzzle variety.
 *
 * @param {Array} array - Array to shuffle
 * @returns {Array} The shuffled array (same reference, modified in place)
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

/**
 * Generates an array of all 81 cell coordinates in the 9x9 grid.
 *
 * @returns {Array<{row: number, col: number}>} Array of 81 coordinate objects
 */
function getAllCellCoordinates() {
  const coordinates = [];
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      coordinates.push({ row, col });
    }
  }
  return coordinates;
}

/**
 * Generates a completely filled valid 9x9 Sudoku grid (solved puzzle).
 * Uses backtracking with randomized number selection to ensure variety.
 *
 * @returns {number[][]} A valid, completely filled 9x9 Sudoku grid
 */
function generateSolvedGrid() {
  // Create empty 9x9 grid
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

  /**
   * Recursive helper to fill the grid with backtracking.
   * Uses randomized number selection for variety.
   *
   * @param {number[][]} g - Grid to fill
   * @returns {boolean} True if grid was successfully filled
   */
  function fillGrid(g) {
    const emptyCell = findEmptyCell(g);

    // Base case: no empty cells means grid is complete
    if (emptyCell === null) {
      return true;
    }

    const { row, col } = emptyCell;

    // Create and shuffle numbers 1-9 for randomization
    const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);

    // Try each number in random order
    for (const num of numbers) {
      if (isValidPlacement(g, row, col, num)) {
        g[row][col] = num; // Place number

        // Recursively fill remaining cells
        if (fillGrid(g)) {
          return true; // Successfully filled
        }

        // Backtrack: remove number and try next
        g[row][col] = 0;
      }
    }

    // No valid number found, trigger backtracking
    return false;
  }

  fillGrid(grid);
  return grid;
}

// ============================================================================
// Public API Functions
// ============================================================================

/**
 * Solves a Sudoku puzzle using backtracking algorithm.
 * Returns the solved grid or null if no solution exists.
 *
 * @param {number[][]} grid - 9x9 Sudoku grid with some cells filled (1-9) and empty cells (0)
 * @returns {number[][]|null} Solved grid or null if unsolvable
 */
export function solvePuzzle(grid) {
  // Deep copy to avoid mutation of input grid
  const gridCopy = JSON.parse(JSON.stringify(grid));

  // Recursive backtracking solver
  function solve(g) {
    const emptyCell = findEmptyCell(g);

    // Base case: no empty cells means puzzle is solved
    if (emptyCell === null) {
      return g;
    }

    const { row, col } = emptyCell;

    // Try numbers 1-9
    for (let num = 1; num <= 9; num++) {
      if (isValidPlacement(g, row, col, num)) {
        g[row][col] = num; // Place number

        // Recursively solve with this placement
        const result = solve(g);
        if (result !== null) {
          return result; // Solution found
        }

        // Backtrack: remove number and try next
        g[row][col] = 0;
      }
    }

    // No valid number found, trigger backtracking
    return null;
  }

  return solve(gridCopy);
}

/**
 * Counts the number of solutions for a given Sudoku grid.
 * Stops early when reaching maxCount for performance optimization.
 *
 * @param {number[][]} grid - 9x9 Sudoku grid
 * @param {number} maxCount - Maximum number of solutions to find before stopping
 * @returns {number} Number of solutions found (up to maxCount)
 */
export function countSolutions(grid, maxCount) {
  // Deep copy to avoid mutation
  const gridCopy = JSON.parse(JSON.stringify(grid));
  let count = 0;

  // Recursive solution counter
  function countHelper(g) {
    // Early exit optimization
    if (count >= maxCount) {
      return;
    }

    const emptyCell = findEmptyCell(g);

    // Base case: solution found
    if (emptyCell === null) {
      count++;
      return;
    }

    const { row, col } = emptyCell;

    // Try numbers 1-9
    for (let num = 1; num <= 9; num++) {
      if (isValidPlacement(g, row, col, num)) {
        g[row][col] = num; // Place number
        countHelper(g); // Recursively count solutions
        g[row][col] = 0; // Backtrack
      }
    }
  }

  countHelper(gridCopy);
  return count;
}

/**
 * Determines if a Sudoku grid has exactly one unique solution.
 * Used for validating puzzle quality during generation.
 *
 * @param {number[][]} grid - 9x9 Sudoku grid
 * @returns {boolean} True if exactly one solution exists, false otherwise
 */
export function hasUniqueSolution(grid) {
  const solutionCount = countSolutions(grid, 2); // Find up to 2 solutions
  return solutionCount === 1;
}

/**
 * Generates a valid Sudoku puzzle with a unique solution.
 *
 * Algorithm:
 * 1. Generate a complete solved grid using backtracking with randomization
 * 2. Deep copy the solved grid to create the puzzle
 * 3. Shuffle all cell coordinates for random removal order
 * 4. Remove cells one by one in random order
 * 5. After each removal, verify the puzzle still has exactly one solution
 * 6. If unique solution: keep the removal
 * 7. If multiple solutions: restore the cell value
 * 8. Continue until target number of clues is reached based on difficulty
 *
 * @param {string} difficulty - Difficulty level: 'easy', 'medium', or 'hard' (default: 'medium')
 * @returns {number[][]} A valid Sudoku puzzle with unique solution
 * @throws {Error} If puzzle generation exceeds 2 seconds
 */
export function generatePuzzle(difficulty = 'medium') {
  const startTime = Date.now();
  const TIMEOUT_MS = 2000; // 2 second timeout per NFR1

  // Difficulty to clue count mapping
  const CLUE_COUNTS = {
    easy: 55,    // More clues = easier
    medium: 45,  // Current default
    hard: 30     // Fewer clues = harder
  };

  const TARGET_CLUES = CLUE_COUNTS[difficulty] || CLUE_COUNTS.medium;

  // Check timeout helper
  function checkTimeout() {
    if (Date.now() - startTime > TIMEOUT_MS) {
      throw new Error('Puzzle generation timed out after 2 seconds');
    }
  }

  // Step 1: Generate complete solved grid
  const solvedGrid = generateSolvedGrid();
  checkTimeout();

  // Step 2: Deep copy to create puzzle grid
  const puzzleGrid = JSON.parse(JSON.stringify(solvedGrid));

  // Step 3: Get all cell coordinates and shuffle for random removal order
  const allCells = getAllCellCoordinates();
  shuffleArray(allCells);

  // Step 4: Initialize clue counter (starts with 81 filled cells)
  let cluesRemaining = 81;

  // Step 5: Try to remove cells while maintaining unique solution
  for (const { row, col } of allCells) {
    checkTimeout();

    // Stop if we've reached target number of clues
    if (cluesRemaining <= TARGET_CLUES) {
      break;
    }

    // Step 6: Temporarily remove the cell value
    const removedValue = puzzleGrid[row][col];
    puzzleGrid[row][col] = 0;

    // Step 7: Check if puzzle still has unique solution
    if (hasUniqueSolution(puzzleGrid)) {
      // Unique solution maintained - keep the removal
      cluesRemaining--;
    } else {
      // Multiple solutions exist - restore the value
      puzzleGrid[row][col] = removedValue;
    }
  }

  return puzzleGrid;
}