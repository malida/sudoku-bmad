# Testing Strategy

## Testing Approach

**Manual Testing Only (Per PRD):**
Testing will be manual and exploratory, verifying each functional requirement through direct browser interaction.

## Test Organization

**Testing Checklist:**

1. **Grid Display (Story 1.2):**
   - Verify 9x9 grid renders correctly
   - Check 3x3 box borders are visible
   - Confirm given clues are styled distinctly

2. **Cell Selection (Story 1.3):**
   - Click empty cells and verify selection highlight
   - Confirm given clue cells cannot be selected
   - Test keyboard input (1-9, Delete, Backspace)

3. **Validation (Story 1.4):**
   - Enter duplicate numbers in same row → verify red highlight
   - Enter duplicate numbers in same column → verify red highlight
   - Enter duplicate numbers in same 3x3 box → verify red highlight
   - Fix errors and verify red highlight clears

4. **Solution Verification (Story 1.5):**
   - Click "Check Solution" with incomplete grid → verify message
   - Complete grid with errors → verify error message
   - Complete grid correctly → verify success message

5. **Puzzle Generation (Story 2.2, 2.3):**
   - Click "New Puzzle" → verify puzzle generates within 2 seconds
   - Generate multiple puzzles → verify they're different
   - Verify generated puzzles are solvable

6. **Browser Compatibility (NFR3):**
   - Test on Chrome (latest 2 versions)
   - Test on Firefox (latest 2 versions)
   - Test on Safari (latest 2 versions)
   - Test on Edge (latest 2 versions)

7. **Mobile Responsiveness:**
   - Open on mobile device (iPhone, Android)
   - Verify grid is visible and usable
   - Test touch input (tapping cells, keyboard)

## Testing Examples (Manual Test Cases)

**Test Case 1: Basic Gameplay Flow**
1. Open application in browser
2. Observe: A Sudoku puzzle is displayed automatically
3. Click an empty cell
4. Expected: Cell is highlighted (blue background)
5. Type a number 1-9
6. Expected: Number appears in cell
7. Type the same number in another cell in the same row
8. Expected: Both cells turn red (error highlight)
9. Change one of the numbers to a different value
10. Expected: Red highlight disappears

**Test Case 2: Puzzle Generation**
1. Click "New Puzzle" button
2. Expected: Loading message appears briefly
3. Expected: New puzzle appears within 2 seconds
4. Expected: New puzzle is different from previous
5. Repeat 3-5 times to verify variety

**Post-MVP Enhancement:**
If the project continues beyond MVP, consider adding:
- Unit tests for validation logic (Jest)
- Unit tests for generator/solver algorithms
- E2E tests for critical flows (Playwright)