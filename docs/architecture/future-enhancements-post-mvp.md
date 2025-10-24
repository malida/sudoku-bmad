# Future Enhancements (Post-MVP)

While out of scope for MVP, the architecture supports these potential extensions:

**Phase 2 Features (from PRD):**
- **Difficulty Levels:** Modify generator to target different clue counts (easy: 45-50, medium: 35-40, hard: 28-32)
- **Undo/Redo:** Add action history array in state.js; implement undo/redo stack
- **Pencil Marks:** Extend grid data structure to include candidate arrays per cell
- **Save State:** Add localStorage persistence in state.js
- **Keyboard Navigation:** Add arrow key handlers for cell selection without mouse

**Performance Optimizations:**
- **Web Workers:** Move puzzle generation to background thread for non-blocking UI
- **Memoization:** Cache solved grids to speed up subsequent generation
- **Incremental Rendering:** Only re-render changed cells instead of entire grid

**Code Quality Enhancements:**
- **TypeScript Migration:** Add type safety without runtime overhead
- **Unit Tests:** Jest tests for validation and generator modules
- **E2E Tests:** Playwright for critical user flows
- **Build Process:** Vite for bundling/minification (still zero-cost deployment)

**Accessibility:**
- Keyboard navigation with Tab/Arrow keys
- ARIA labels for screen readers
- High contrast mode
- Focus indicators