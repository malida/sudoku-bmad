/**
 * Main Application Module
 * Application entry point and coordinator
 */

import * as state from './state.js';
import * as ui from './ui.js';

/**
 * Handles cell click events
 * @param {Event} event - Click event
 */
function handleCellClick(event) {
  // Ensure we clicked on a cell
  if (!event.target.classList.contains('cell')) {
    return;
  }

  const row = parseInt(event.target.dataset.row);
  const col = parseInt(event.target.dataset.col);

  // Don't allow selection of given clue cells
  if (state.isGivenClue(row, col)) {
    return;
  }

  // Update state and UI
  state.setSelectedCell(row, col);
  ui.highlightSelectedCell(row, col);
}

/**
 * Handles keyboard input events
 * @param {KeyboardEvent} event - Keyboard event
 */
function handleKeyPress(event) {
  const selected = state.getSelectedCell();

  // Exit if no cell is selected
  if (!selected) {
    return;
  }

  const key = event.key;

  // Handle numbers 1-9
  if (/^[1-9]$/.test(key)) {
    state.setCellValue(selected.row, selected.col, parseInt(key));
    ui.renderGrid(state.getGrid(), state.getErrors(), state.getInitialGrid());
    // Restore selection after re-render
    ui.highlightSelectedCell(selected.row, selected.col);
  }
  // Handle clear cell (Backspace, Delete, 0)
  else if (key === 'Backspace' || key === 'Delete' || key === '0') {
    event.preventDefault(); // Prevent browser navigation on Backspace
    state.clearCell(selected.row, selected.col);
    ui.renderGrid(state.getGrid(), state.getErrors(), state.getInitialGrid());
    // Restore selection after re-render
    ui.highlightSelectedCell(selected.row, selected.col);
  }
  // Ignore all other keys
}

/**
 * Initializes the application
 */
function init() {
  // Get current state
  const grid = state.getGrid();
  const errors = state.getErrors();
  const initialGrid = state.getInitialGrid();

  // Render the grid
  ui.renderGrid(grid, errors, initialGrid);

  // Attach event listeners
  const gridContainer = document.getElementById('sudoku-grid');
  if (gridContainer) {
    gridContainer.addEventListener('click', handleCellClick);
  }

  document.addEventListener('keydown', handleKeyPress);
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', init);