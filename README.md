# Sudoku Web App

A client-side Sudoku game built with vanilla JavaScript, HTML5, and CSS3. No dependencies, no build process - just pure web fundamentals.

## Live Demo

🔗 [Play Sudoku](https://malida.github.io/sudoku-bmad/)

*(Update this link after GitHub Pages deployment)*

## Technologies Used

- **JavaScript (ES6+)** - Modern vanilla JavaScript with native modules
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with CSS Grid layout

## Features

- Classic 9x9 Sudoku gameplay
- Real-time validation
- Puzzle generation with unique solutions
- Clean, responsive interface

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