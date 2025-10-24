# Module Interfaces and Data Flow

## State Module Public API

```javascript
// state.js exports

export function getGrid() { /* returns current 9x9 grid */ }

export function getInitialGrid() { /* returns immutable starting puzzle */ }

export function getCellValue(row, col) { /* returns 0-9 */ }

export function setCellValue(row, col, value) {
  /* Updates cell, triggers validation, updates UI */
}

export function isGivenClue(row, col) {
  /* Compares against initialGrid */
}

export function clearCell(row, col) {
  /* Sets cell to 0 */
}

export function getErrors() {
  /* Returns Set<string> of "row,col" coordinates */
}

export function setErrors(errorSet) {
  /* Updates error state */
}

export function loadPuzzle(grid) {
  /* Loads new puzzle, resets game state */
}

export function isGridComplete() {
  /* Returns true if no empty cells */
}

export function isGridSolved() {
  /* Returns true if complete and no errors */
}
```

## Validation Module Public API

```javascript
// validation.js exports

export function validateGrid(grid) {
  /* Returns Set<string> of error cell coordinates */
}

export function hasNoErrors(grid) {
  /* Returns boolean */
}

// Internal helper functions (not exported)
function getRowConflicts(grid, row, col, value) { }
function getColConflicts(grid, row, col, value) { }
function getBoxConflicts(grid, row, col, value) { }
```

## Generator Module Public API

```javascript
// generator.js exports

export function generatePuzzle() {
  /* Returns 9x9 grid with ~40-50 clues */
}

// Internal functions (not exported)
function generateSolvedGrid() { }
function removeCells(solvedGrid, targetClues) { }
function solvePuzzle(grid) { }
function hasUniqueSolution(grid) { }
function countSolutions(grid, maxSolutions) { }
```

## UI Module Public API

```javascript
// ui.js exports

export function renderGrid(grid, errors, initialGrid) {
  /* Updates entire grid display */
}

export function highlightSelectedCell(row, col) {
  /* Adds 'selected' CSS class */
}

export function clearSelection() {
  /* Removes 'selected' CSS class */
}

export function showMessage(text, type) {
  /* Displays user feedback message */
}

export function showLoadingIndicator() { }

export function hideLoadingIndicator() { }

export function attachEventListeners(callbacks) {
  /* Sets up DOM event handlers with callback functions */
}
```