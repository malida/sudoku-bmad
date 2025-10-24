/**
 * UI Module
 * Handles DOM manipulation and rendering for the Sudoku grid
 */

import { getGrid, getErrors, getInitialGrid } from './state.js';

/**
 * Renders a single cell element
 * @param {number} row - Row index (0-8)
 * @param {number} col - Column index (0-8)
 * @param {number} value - Cell value (0-9, where 0 is empty)
 * @param {boolean} isGiven - Whether this is a given clue
 * @param {boolean} hasError - Whether this cell has an error
 * @returns {HTMLElement} The cell div element
 */
function renderCell(row, col, value, isGiven, hasError) {
  const cell = document.createElement('div');
  cell.className = 'cell';
  cell.dataset.row = row;
  cell.dataset.col = col;

  if (isGiven) {
    cell.classList.add('given-clue');
  } else if (value !== 0) {
    // User-entered value (not a given clue but has a value)
    cell.classList.add('user-entry');
  }

  if (hasError) {
    cell.classList.add('error');
  }

  if (value !== 0) {
    cell.textContent = value;
  }

  return cell;
}

/**
 * Renders the complete Sudoku grid
 * @param {number[][]} grid - 9x9 array representing the grid
 * @param {Set<string>} errors - Set of error cell coordinates
 * @param {number[][]} initialGrid - The initial puzzle state
 */
export function renderGrid(grid, errors, initialGrid) {
  const gridContainer = document.getElementById('sudoku-grid');

  if (!gridContainer) {
    console.error('Grid container not found');
    return;
  }

  // Clear existing grid content
  gridContainer.innerHTML = '';

  // Loop through 9×9 cells
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const value = grid[row][col];
      const isGiven = initialGrid[row][col] !== 0;
      const hasError = errors.has(`${row},${col}`);

      const cell = renderCell(row, col, value, isGiven, hasError);
      gridContainer.appendChild(cell);
    }
  }
}

/**
 * Shows a message to the user
 * @param {string} text - Message text to display
 * @param {string} type - Message type ('success', 'error', 'info')
 */
export function showMessage(text, type = 'info') {
  const messageEl = document.getElementById('message');

  if (!messageEl) {
    console.error('Message element not found');
    return;
  }

  messageEl.textContent = text;
  messageEl.className = `message ${type}`;
  messageEl.classList.remove('hidden');

  // Auto-hide after 3 seconds
  setTimeout(() => {
    messageEl.classList.add('hidden');
  }, 3000);
}

/**
 * Clears all cell selections
 */
export function clearSelection() {
  const selectedCells = document.querySelectorAll('.cell.selected');
  selectedCells.forEach(cell => cell.classList.remove('selected'));
}

/**
 * Highlights the selected cell
 * @param {number} row - Row index (0-8)
 * @param {number} col - Column index (0-8)
 */
export function highlightSelectedCell(row, col) {
  // Remove previous selection
  clearSelection();

  // Add selection to new cell
  const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
  if (cell) {
    cell.classList.add('selected');
  }
}