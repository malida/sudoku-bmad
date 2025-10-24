# Data Models

## SudokuGrid

**Purpose:** Represents the complete game state including the puzzle grid, given clues, user entries, and validation state.

**Key Attributes:**
- `grid: number[][]` - 9x9 two-dimensional array (0 represents empty cell, 1-9 are values)
- `initialGrid: number[][]` - Immutable copy of puzzle's starting state (distinguishes given clues from user entries)
- `errors: Set<string>` - Cell coordinates with validation errors (format: "row,col")
- `isComplete: boolean` - Whether all cells are filled
- `isSolved: boolean` - Whether puzzle is correctly solved

**Relationships:**
- Single global instance managed by state.js
- Referenced by validation.js for rule checking
- Referenced by ui.js for rendering
- Modified by generator.js when creating new puzzles

### TypeScript Interface

```typescript
interface SudokuGrid {
  grid: number[][];           // Current state: 9x9 array, 0 = empty, 1-9 = value
  initialGrid: number[][];    // Immutable puzzle starting state
  errors: Set<string>;        // Error cell coordinates "row,col"
  isComplete: boolean;        // All cells filled
  isSolved: boolean;          // Correctly solved
}

interface CellCoordinate {
  row: number;   // 0-8
  col: number;   // 0-8
}
```

**Note:** While this project uses vanilla JavaScript (no TypeScript), these interfaces document the expected data shapes for developer clarity and future TypeScript migration if desired.