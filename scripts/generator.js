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