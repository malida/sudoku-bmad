# Development Workflow

## Local Development Setup

### Prerequisites

```bash
# No prerequisites! Just a modern browser and text editor.
# Recommended: VS Code with Live Server extension for auto-reload
```

### Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd sudoku-bmad

# No npm install, no build step - just open in browser!

# Option 1: Open index.html directly in browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux

# Option 2: Use VS Code Live Server (recommended)
# Install "Live Server" extension
# Right-click index.html → "Open with Live Server"

# Option 3: Use Python simple HTTP server (avoids CORS issues with ES6 modules)
python3 -m http.server 8000
# Then open http://localhost:8000
```

### Development Commands

```bash
# No build commands needed!

# Run tests (manual)
# 1. Open application in browser
# 2. Open browser DevTools console
# 3. Interact with application and verify functionality

# Check for syntax errors (optional - use ESLint)
npx eslint scripts/*.js  # If you want linting (not required)

# Format code (optional - use Prettier)
npx prettier --write scripts/*.js styles/*.css index.html
```

## Environment Configuration

**No environment variables needed** - this is a fully static, self-contained application with no configuration, API keys, or secrets.