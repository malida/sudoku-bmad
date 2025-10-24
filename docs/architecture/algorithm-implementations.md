# Algorithm Implementations

## Backtracking Solver Pseudocode

```javascript
function solvePuzzle(grid) {
  // Find next empty cell (value === 0)
  const emptyCell = findEmptyCell(grid);

  // Base case: no empty cells = solved
  if (!emptyCell) {
    return grid; // Solution found
  }

  const { row, col } = emptyCell;

  // Try numbers 1-9 in this cell
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(grid, row, col, num)) {
      // Place number
      grid[row][col] = num;

      // Recursively solve rest of grid
      if (solvePuzzle(grid)) {
        return grid; // Solution found downstream
      }

      // Backtrack: placement didn't lead to solution
      grid[row][col] = 0;
    }
  }

  // No valid number found: trigger backtracking
  return null;
}

function isValidPlacement(grid, row, col, num) {
  // Check row for duplicate
  for (let c = 0; c < 9; c++) {
    if (grid[row][c] === num) return false;
  }

  // Check column for duplicate
  for (let r = 0; r < 9; r++) {
    if (grid[r][col] === num) return false;
  }

  // Check 3x3 box for duplicate
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let r = boxRow; r < boxRow + 3; r++) {
    for (let c = boxCol; c < boxCol + 3; c++) {
      if (grid[r][c] === num) return false;
    }
  }

  return true; // Valid placement
}
```

## Puzzle Generator Pseudocode

```javascript
function generatePuzzle() {
  // Step 1: Generate complete solved grid
  const solvedGrid = generateSolvedGrid();

  // Step 2: Create copy for puzzle (will remove numbers)
  const puzzleGrid = JSON.parse(JSON.stringify(solvedGrid));

  // Step 3: Get list of all cell coordinates, shuffle randomly
  const cells = getAllCellCoordinates(); // Returns [{row, col}, ...]
  shuffleArray(cells);

  // Step 4: Try removing cells while maintaining unique solution
  const targetClues = 45; // Aim for ~45 given clues (moderate difficulty)
  let cluesRemaining = 81;

  for (const {row, col} of cells) {
    if (cluesRemaining <= targetClues) break;

    // Temporarily remove this number
    const removedValue = puzzleGrid[row][col];
    puzzleGrid[row][col] = 0;

    // Check if puzzle still has unique solution
    if (hasUniqueSolution(puzzleGrid)) {
      // Removal successful, keep it removed
      cluesRemaining--;
    } else {
      // Removal creates multiple solutions, restore value
      puzzleGrid[row][col] = removedValue;
    }
  }

  return puzzleGrid;
}

function generateSolvedGrid() {
  // Start with empty grid
  const grid = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Use backtracking with randomized number order
  function fillGrid(grid) {
    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) return true; // Grid complete

    const { row, col } = emptyCell;

    // Try numbers 1-9 in random order
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    shuffleArray(numbers);

    for (const num of numbers) {
      if (isValidPlacement(grid, row, col, num)) {
        grid[row][col] = num;

        if (fillGrid(grid)) {
          return true; // Success
        }

        grid[row][col] = 0; // Backtrack
      }
    }

    return false; // Trigger backtracking
  }

  fillGrid(grid);
  return grid;
}

function hasUniqueSolution(grid) {
  const solutionCount = countSolutions(grid, 2); // Stop after finding 2
  return solutionCount === 1;
}

function countSolutions(grid, maxCount) {
  let count = 0;

  function solve(grid) {
    if (count >= maxCount) return; // Early exit optimization

    const emptyCell = findEmptyCell(grid);
    if (!emptyCell) {
      count++; // Found a solution
      return;
    }

    const { row, col } = emptyCell;

    for (let num = 1; num <= 9; num++) {
      if (isValidPlacement(grid, row, col, num)) {
        grid[row][col] = num;
        solve(grid);
        grid[row][col] = 0;
      }
    }
  }

  // Work on copy to avoid modifying input
  const gridCopy = JSON.parse(JSON.stringify(grid));
  solve(gridCopy);

  return count;
}
```

**Performance Optimization Notes:**
- `countSolutions` stops early after finding 2 solutions (no need to find all)
- Number order randomization in generator ensures variety
- Target 45 clues balances difficulty with generation speed
- If generation is slow, can reduce uniqueness checks or increase target clues