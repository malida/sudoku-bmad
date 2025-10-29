# Sudoku Web App

A clean, distraction-free Sudoku puzzle game with algorithmic puzzle generation. Built with vanilla JavaScript, HTML5, and CSS3 - no frameworks, no dependencies, no tracking.

## Live Demo

🔗 [Play Now](https://malida.github.io/sudoku-bmad/)

## Features

- **Unlimited Puzzles** - Algorithmically generated puzzles with guaranteed unique solutions
- **Real-Time Validation** - Instant feedback on rule violations with red highlighting
- **Solution Verification** - Check your completed puzzle with one click
- **Clean Interface** - Minimal, distraction-free design focused on gameplay
- **Zero Cost** - Free to play, no ads, no tracking, no sign-up
- **No Dependencies** - Pure vanilla JavaScript with ES6 modules
- **Fast Performance** - Puzzle generation in under 2 seconds, instant UI response

## How to Play

1. **Select a Cell** - Click any empty cell to select it (blue highlight)
2. **Enter a Number** - Type 1-9 on your keyboard to fill the cell
3. **Fix Errors** - Red highlighting indicates rule violations (duplicates in row/column/box)
4. **Backspace to Clear** - Press Backspace, Delete, or 0 to clear a cell
5. **Check Solution** - Click "Check Solution" when all cells are filled
6. **New Puzzle** - Click "New Puzzle" to generate a fresh puzzle anytime

**Sudoku Rules:**
- Fill the 9×9 grid with numbers 1-9
- Each row must contain all numbers 1-9 (no duplicates)
- Each column must contain all numbers 1-9 (no duplicates)
- Each 3×3 box must contain all numbers 1-9 (no duplicates)

## Technology Stack

- **JavaScript (ES6+)** - Modern vanilla JavaScript with native modules
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with CSS Grid layout
- **GitHub Pages** - Zero-cost static hosting

## Getting Started

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/[username]/sudoku-bmad.git
   cd sudoku-bmad
   ```

2. Open `index.html` in your browser:
   - **Option 1:** Double-click `index.html`
   - **Option 2:** Use a local server:
     ```bash
     python3 -m http.server 8000
     # Then visit http://localhost:8000
     ```

That's it! No npm install, no build step required.

## Project Structure

```
sudoku-bmad/
├── index.html          # Main entry point
├── styles/
│   └── sudoku.css      # Application styles
├── scripts/
│   ├── main.js         # Application coordinator
│   ├── state.js        # Game state management
│   ├── validation.js   # Sudoku rule validation
│   ├── generator.js    # Puzzle generation algorithms
│   └── ui.js           # DOM rendering and events
└── docs/               # Documentation
    ├── prd.md
    └── architecture.md
```

## Documentation

- **[Product Requirements](docs/prd.md)** - Full product specification
- **[Architecture](docs/architecture.md)** - Technical design and implementation details

## License

MIT