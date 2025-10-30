/**
 * Main Application Module
 * Application entry point and coordinator
 */

import * as state from './state.js';
import * as ui from './ui.js';
import * as validation from './validation.js';
import * as generator from './generator.js';

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

    // Validate grid and update errors
    const errors = validation.validateGrid(state.getGrid());
    state.setErrors(errors);

    // Re-render with updated errors
    ui.renderGrid(state.getGrid(), state.getErrors(), state.getInitialGrid());
    // Restore selection after re-render
    ui.highlightSelectedCell(selected.row, selected.col);
  }
  // Handle clear cell (Backspace, Delete, 0)
  else if (key === 'Backspace' || key === 'Delete' || key === '0') {
    event.preventDefault(); // Prevent browser navigation on Backspace
    state.clearCell(selected.row, selected.col);

    // Validate grid and update errors
    const errors = validation.validateGrid(state.getGrid());
    state.setErrors(errors);

    // Re-render with updated errors
    ui.renderGrid(state.getGrid(), state.getErrors(), state.getInitialGrid());
    // Restore selection after re-render
    ui.highlightSelectedCell(selected.row, selected.col);
  }
  // Ignore all other keys
}

/**
 * Handles number pad button clicks
 * @param {Event} event - Click event
 */
function handleNumberPadClick(event) {
  // Event delegation - only handle button clicks
  if (!event.target.classList.contains('number-pad-btn')) {
    return;
  }

  const selected = state.getSelectedCell();

  // No cell selected or given clue selected - ignore
  if (!selected || state.isGivenClue(selected.row, selected.col)) {
    return;
  }

  const buttonValue = event.target.dataset.value;

  if (buttonValue === 'clear') {
    // Clear cell
    state.clearCell(selected.row, selected.col);
  } else {
    // Number 1-9
    state.setCellValue(selected.row, selected.col, parseInt(buttonValue));
  }

  // Validate and re-render (same as keyboard handler)
  const errors = validation.validateGrid(state.getGrid());
  state.setErrors(errors);
  ui.renderGrid(state.getGrid(), state.getErrors(), state.getInitialGrid());
  ui.highlightSelectedCell(selected.row, selected.col);
}

/**
 * Handles Check Solution button click
 */
function handleCheckSolution() {
  // Check if grid is complete
  if (!state.isGridComplete()) {
    ui.showMessage('Puzzle is incomplete', 'info');
    return;
  }

  // Grid is complete, check for errors
  if (state.getErrors().size > 0) {
    ui.showMessage('Puzzle contains errors', 'error');
    return;
  }

  // Correct solution!
  ui.showMessage('Congratulations! Puzzle solved!', 'success');
}

/**
 * Handles New Puzzle button click
 */
function handleNewPuzzle() {
  // Show loading message
  ui.showMessage('Generating puzzle...', 'info');

  try {
    // Get selected difficulty
    const difficulty = document.getElementById('difficulty').value;

    // Generate new puzzle with selected difficulty
    const newPuzzle = generator.generatePuzzle(difficulty);

    // Load new puzzle (this also clears selection)
    state.loadPuzzle(newPuzzle);

    // Clear UI selection
    ui.clearSelection();

    // Re-render grid with new puzzle
    ui.renderGrid(state.getGrid(), state.getErrors(), state.getInitialGrid());

    // Show success message
    ui.showMessage('New puzzle loaded!', 'success');
  } catch (error) {
    console.error('Puzzle generation failed:', error);
    ui.showMessage('Puzzle generation failed. Please try again.', 'error');
  }
}

/**
 * Loads a puzzle on initial page load
 */
function loadPuzzleOnInit() {
  ui.showMessage('Generating puzzle...', 'info');

  try {
    // Get selected difficulty (defaults to 'medium' if not found)
    const difficulty = document.getElementById('difficulty')?.value || 'medium';
    const puzzle = generator.generatePuzzle(difficulty);
    state.loadPuzzle(puzzle);
    ui.renderGrid(state.getGrid(), state.getErrors(), state.getInitialGrid());

    // Hide loading message after successful load
    setTimeout(() => ui.hideMessage(), 500);
  } catch (error) {
    console.error('Initial puzzle generation failed:', error);
    ui.showMessage('Failed to load puzzle. Click New Puzzle to try again.', 'error');
  }
}

/**
 * Initializes the application
 */
function init() {
  // Attach event listeners
  const gridContainer = document.getElementById('sudoku-grid');
  if (gridContainer) {
    gridContainer.addEventListener('click', handleCellClick);
  }

  document.addEventListener('keydown', handleKeyPress);

  // Attach button listeners
  const checkSolutionBtn = document.getElementById('check-solution-btn');
  if (checkSolutionBtn) {
    checkSolutionBtn.addEventListener('click', handleCheckSolution);
  }

  const newPuzzleBtn = document.getElementById('new-puzzle-btn');
  if (newPuzzleBtn) {
    newPuzzleBtn.addEventListener('click', handleNewPuzzle);
  }

  const numberPad = document.getElementById('number-pad');
  if (numberPad) {
    numberPad.addEventListener('click', handleNumberPadClick);
  }

  // Generate and load initial puzzle
  loadPuzzleOnInit();
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', init);