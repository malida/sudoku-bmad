# Coding Standards

## Critical Rules

- **Module Imports:** Always use explicit imports at top of file; no dynamic imports for core modules

- **State Mutations:** All state changes must go through state.js public API; never modify state object directly from other modules

- **Error Handling:** Wrap generator functions in try-catch; display user-friendly error messages via ui.showMessage()

- **Console Logging:** Use console.log for development; remove or comment out before deployment (no production logs per NFR8)

- **DOM Queries:** Cache DOM element references in ui.js; avoid repeated querySelectorAll() calls in loops

- **Grid Indexing:** Always use 0-based indexing (0-8 for rows/cols); validate indices are in range before array access

- **Deep Copying:** Use JSON.parse(JSON.stringify()) for cloning grids; avoid accidental mutations of initialGrid

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Files | kebab-case | `puzzle-generator.js` (if multi-word) |
| Functions | camelCase | `generatePuzzle()`, `validateCell()` |
| Variables | camelCase | `selectedCell`, `errorSet` |
| Constants | UPPER_SNAKE_CASE | `GRID_SIZE`, `TARGET_CLUES` |
| CSS Classes | kebab-case | `.sudoku-grid`, `.given-clue` |
| CSS IDs | kebab-case | `#new-puzzle-btn` |

## Code Organization Standards

**File Organization:**
- One module per file
- Imports at top
- Constants after imports
- Helper functions (internal) before public API
- Exports at bottom

**Function Standards:**
- Keep functions focused (single responsibility)
- Aim for < 20 lines per function
- Complex functions (like backtracking) can be longer but should have clear comments
- Pure functions preferred (no side effects)

**Comment Standards:**
- JSDoc for public API functions
- Inline comments for complex algorithms (especially backtracking)
- No redundant comments (code should be self-documenting where possible)

**Example Function Documentation:**

```javascript
/**
 * Validates the entire Sudoku grid and returns all cells with errors.
 *
 * @param {number[][]} grid - 9x9 array representing the Sudoku grid
 * @returns {Set<string>} Set of error cell coordinates in "row,col" format
 */
export function validateGrid(grid) {
  const errors = new Set();
  // ... implementation
  return errors;
}
```