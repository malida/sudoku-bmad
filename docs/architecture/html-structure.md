# HTML Structure

## index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sudoku</title>
  <link rel="stylesheet" href="styles/sudoku.css">
</head>
<body>
  <main class="app-container">
    <header class="app-header">
      <h1>Sudoku</h1>
    </header>

    <div class="game-container">
      <!-- Grid generated dynamically by ui.js -->
      <div id="sudoku-grid" class="sudoku-grid">
        <!-- 81 cells (9x9) created by JavaScript -->
      </div>

      <div id="message" class="message hidden">
        <!-- Success/error messages displayed here -->
      </div>

      <div class="controls">
        <button id="new-puzzle-btn" class="btn btn-primary">New Puzzle</button>
        <button id="check-solution-btn" class="btn btn-secondary">Check Solution</button>
      </div>

      <div id="loading" class="loading hidden">
        <p>Generating puzzle...</p>
      </div>
    </div>
  </main>

  <script type="module" src="scripts/main.js"></script>
</body>
</html>
```

**Key Points:**
- Minimal semantic HTML structure
- `type="module"` on script tag enables ES6 imports
- Grid cells created dynamically (avoids 81 hardcoded divs)
- All interactive elements have IDs for easy selection