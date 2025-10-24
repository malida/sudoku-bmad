/**
 * Validation Module
 * Sudoku rule validation logic
 */

/**
 * Validates the entire Sudoku grid and returns all cells with errors
 * @param {number[][]} grid - 9x9 array representing the Sudoku grid
 * @returns {Set<string>} Set of error cell coordinates in "row,col" format
 */
export function validateGrid(grid) {
  const errors = new Set();

  // Check all rows for duplicates
  for (let row = 0; row < 9; row++) {
    const seen = new Map(); // value -> [col1, col2, ...]
    for (let col = 0; col < 9; col++) {
      const value = grid[row][col];
      if (value !== 0) {
        if (!seen.has(value)) {
          seen.set(value, []);
        }
        seen.get(value).push(col);
      }
    }
    // Add all cells with duplicates to error set
    for (const [value, cols] of seen.entries()) {
      if (cols.length > 1) {
        cols.forEach(col => errors.add(`${row},${col}`));
      }
    }
  }

  // Check all columns for duplicates
  for (let col = 0; col < 9; col++) {
    const seen = new Map(); // value -> [row1, row2, ...]
    for (let row = 0; row < 9; row++) {
      const value = grid[row][col];
      if (value !== 0) {
        if (!seen.has(value)) {
          seen.set(value, []);
        }
        seen.get(value).push(row);
      }
    }
    // Add all cells with duplicates to error set
    for (const [value, rows] of seen.entries()) {
      if (rows.length > 1) {
        rows.forEach(row => errors.add(`${row},${col}`));
      }
    }
  }

  // Check all 3x3 boxes for duplicates
  for (let boxRow = 0; boxRow < 9; boxRow += 3) {
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      const seen = new Map(); // value -> [{row, col}, ...]

      // Iterate through the 3x3 box
      for (let r = boxRow; r < boxRow + 3; r++) {
        for (let c = boxCol; c < boxCol + 3; c++) {
          const value = grid[r][c];
          if (value !== 0) {
            if (!seen.has(value)) {
              seen.set(value, []);
            }
            seen.get(value).push({ row: r, col: c });
          }
        }
      }

      // Add all cells with duplicates to error set
      for (const [value, cells] of seen.entries()) {
        if (cells.length > 1) {
          cells.forEach(cell => errors.add(`${cell.row},${cell.col}`));
        }
      }
    }
  }

  return errors;
}

/**
 * Checks if the grid has no validation errors
 * @param {number[][]} grid - 9x9 array representing the Sudoku grid
 * @returns {boolean} True if no errors exist
 */
export function hasNoErrors(grid) {
  const errors = validateGrid(grid);
  return errors.size === 0;
}