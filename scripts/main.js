/**
 * Main Application Module
 * Application entry point and coordinator
 */

import * as state from './state.js';
import * as ui from './ui.js';

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
}

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', init);