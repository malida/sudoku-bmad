# Epic 1: Project Foundation & Core Game Loop

**Expanded Goal**: This epic lays the groundwork for the entire project while delivering immediate playable value. We'll set up the repository structure, establish deployment infrastructure, create the visual grid interface, implement user input handling, and enable manual puzzle solving. The epic concludes with a functional Sudoku game using one or more hardcoded puzzles—users can play, complete, and verify their solutions. While puzzle generation is deferred to Epic 2, all core interaction patterns and validation logic are fully implemented here.

## Story 1.1: Repository Setup and Deployment Foundation

As a **developer**,
I want **the project repository initialized with proper structure and deployed to static hosting**,
so that **I have a working deployment pipeline and can immediately see changes live**.

### Acceptance Criteria

1. Git repository is initialized with appropriate `.gitignore` for web projects
2. Repository contains initial folder structure: `/index.html`, `/styles/`, `/scripts/`, `/docs/`
3. Basic `index.html` exists with minimal content (e.g., "Sudoku App" heading)
4. Static hosting is configured on GitHub Pages, Netlify, or Vercel
5. The application is accessible via public URL and displays the basic HTML page
6. Deployment automatically updates when changes are pushed to the repository
7. README.md contains the project name, description, and link to live deployment

## Story 1.2: Sudoku Grid Display

As a **Sudoku player**,
I want **to see a 9x9 Sudoku grid with clear visual structure**,
so that **I can easily distinguish rows, columns, and 3x3 boxes while playing**.

### Acceptance Criteria

1. The HTML structure contains a 9x9 grid of cells (81 total cells)
2. CSS styling clearly delineates the nine 3x3 boxes with thicker borders
3. The grid uses CSS Grid for layout and is centered on the page
4. Each cell is visually distinct with borders separating individual cells
5. The grid is appropriately sized and readable (cells are square, adequate size for numbers)
6. Given clues (pre-filled numbers) are displayed in cells with distinct styling (e.g., bold, different color)
7. Empty cells are visually identifiable as spaces for user input
8. A hardcoded valid Sudoku puzzle is displayed with approximately 25-30 given clues

## Story 1.3: Cell Selection and Input Handling

As a **Sudoku player**,
I want **to click cells and enter numbers 1-9**,
so that **I can fill in my solution to the puzzle**.

### Acceptance Criteria

1. Clicking any empty cell selects it with clear visual feedback (e.g., highlight, border change, background color)
2. Only one cell can be selected at a time
3. Clicking a given clue cell has no effect (cannot be selected or modified)
4. When a cell is selected, typing numbers 1-9 on the keyboard fills that cell with the entered number
5. Typing any other key (letters, symbols, etc.) is ignored
6. Previously entered numbers can be changed by clicking the cell and typing a new number 1-9
7. Pressing Delete, Backspace, or 0 clears the selected cell's content
8. The entered numbers are styled differently from given clues (e.g., regular weight font, different color)
9. Cell selection state persists until another cell is clicked or the selection is explicitly cleared

## Story 1.4: Sudoku Rule Validation

As a **Sudoku player**,
I want **immediate visual feedback when I violate Sudoku rules**,
so that **I can identify and correct my mistakes during solving**.

### Acceptance Criteria

1. When a number is entered, the application checks for duplicates in the same row
2. When a number is entered, the application checks for duplicates in the same column
3. When a number is entered, the application checks for duplicates in the same 3x3 box
4. If a violation is detected, the offending cell(s) are highlighted in red
5. Red highlighting applies to all cells in the conflict (both the newly entered cell and any existing conflicting cells)
6. Red highlighting is removed automatically when the conflict is resolved (by changing or clearing a number)
7. Validation runs in real-time as numbers are entered (no explicit "Check" button required for basic validation)
8. Given clue cells are included in validation checks but cannot themselves be highlighted as errors (since they're immutable)
9. Multiple simultaneous violations are all highlighted (e.g., if a number violates both row and column rules)

## Story 1.5: Solution Verification and New Puzzle

As a **Sudoku player**,
I want **to verify my completed solution and start a new puzzle**,
so that **I know when I've successfully solved the puzzle and can continue playing**.

### Acceptance Criteria

1. A "Check Solution" button is visible and enabled at all times
2. Clicking "Check Solution" verifies that all cells are filled (no empty cells remain)
3. If any cells are empty, a message indicates "Puzzle is incomplete"
4. If all cells are filled, the application verifies no Sudoku rule violations exist
5. If the puzzle is correctly solved, a success message is displayed (e.g., "Congratulations! Puzzle solved!")
6. If the puzzle is filled but contains errors, a message indicates "Puzzle contains errors" (existing red highlighting shows where)
7. A "New Puzzle" button is visible at all times
8. Clicking "New Puzzle" loads a different hardcoded puzzle (at least 2-3 hardcoded puzzles should be available, selected randomly or in sequence)
9. Loading a new puzzle clears all user entries and resets the grid to the new puzzle's given clues
10. The hardcoded puzzles are valid, solvable, and have unique solutions

---
