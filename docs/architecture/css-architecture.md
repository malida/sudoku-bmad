# CSS Architecture

## Styling Approach

**Layout Strategy:**
- CSS Grid for the 9x9 Sudoku grid (9 columns × 9 rows)
- Flexbox for overall page layout (centering, controls)
- Thicker borders every 3 cells to delineate 3x3 boxes

**Key CSS Classes:**
- `.sudoku-grid` - Grid container (display: grid)
- `.cell` - Individual cell styling
- `.cell.given-clue` - Given clue cells (bold, distinct color)
- `.cell.user-entry` - User-entered numbers (regular weight)
- `.cell.selected` - Currently selected cell (highlight)
- `.cell.error` - Cell with validation error (red background/border)
- `.btn` - Button base styles
- `.message` - Feedback message container
- `.hidden` - Display: none utility class

**Visual Design:**
- Clean, minimal aesthetic
- High contrast for readability
- Clear visual hierarchy (grid is focal point)
- Red for errors, blue for selection, gray for given clues

## styles/sudoku.css (Key Sections)

```css
/* Base styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f5f5;
}

.app-container {
  max-width: 600px;
  padding: 2rem;
}

/* Sudoku Grid */
.sudoku-grid {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  gap: 0;
  width: 100%;
  max-width: 500px;
  aspect-ratio: 1;
  margin: 1rem auto;
  border: 3px solid #333;
  background: white;
}

.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ddd;
  font-size: 1.5rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.15s ease;
}

/* Thick borders for 3x3 boxes */
.cell:nth-child(3n) {
  border-right: 2px solid #333;
}

.cell:nth-child(n+19):nth-child(-n+27),
.cell:nth-child(n+46):nth-child(-n+54) {
  border-bottom: 2px solid #333;
}

/* Cell states */
.cell.given-clue {
  font-weight: bold;
  color: #333;
  background: #f9f9f9;
  cursor: default;
}

.cell.user-entry {
  font-weight: normal;
  color: #0066cc;
}

.cell.selected {
  background: #e3f2fd;
  outline: 2px solid #0066cc;
}

.cell.error {
  background: #ffebee;
  color: #c62828;
}

/* Controls */
.controls {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background: #0066cc;
  color: white;
}

.btn-primary:hover {
  background: #0052a3;
}

/* Messages */
.message {
  text-align: center;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 4px;
  font-weight: 500;
}

.message.success {
  background: #e8f5e9;
  color: #2e7d32;
}

.message.error {
  background: #ffebee;
  color: #c62828;
}

.message.info {
  background: #e3f2fd;
  color: #1565c0;
}

.hidden {
  display: none;
}

/* Loading indicator */
.loading {
  text-align: center;
  padding: 1rem;
  color: #666;
}
```