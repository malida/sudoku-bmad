/**
 * Story 2.2: Puzzle Generation Algorithm Tests
 * Manual testing script to validate all acceptance criteria
 */

import { generatePuzzle, solvePuzzle, hasUniqueSolution } from './scripts/generator.js';

// Helper functions
function countClues(grid) {
  return grid.flat().filter(n => n !== 0).length;
}

function formatGrid(grid) {
  return grid.map(row => row.join(' ')).join('\n');
}

console.log('='.repeat(70));
console.log('Story 2.2: Puzzle Generation Algorithm - Test Suite');
console.log('='.repeat(70));
console.log();

// Test 1: Basic Generation (AC: 1, 8)
console.log('Test 1: Basic Generation (AC: 1, 8)');
console.log('-'.repeat(70));
try {
  const puzzle = generatePuzzle();
  const clues = countClues(puzzle);
  const isValid = puzzle.length === 9 && puzzle.every(row => row.length === 9);
  const hasOnlyValidNumbers = puzzle.flat().every(n => n >= 0 && n <= 9);

  console.log(`✓ Grid dimensions: ${puzzle.length}x${puzzle[0].length}`);
  console.log(`✓ Valid numbers (0-9): ${hasOnlyValidNumbers}`);
  console.log(`✓ Clue count: ${clues} (target: 40-50)`);
  console.log(`  First row: [${puzzle[0].join(', ')}]`);
  console.log(`Result: ${isValid && hasOnlyValidNumbers && clues >= 40 && clues <= 50 ? 'PASS ✓' : 'FAIL ✗'}`);
} catch (error) {
  console.log(`✗ Error: ${error.message}`);
  console.log('Result: FAIL ✗');
}
console.log();

// Test 2: Performance - Generate 10 puzzles (AC: 7)
console.log('Test 2: Performance - 10 Puzzles (AC: 7)');
console.log('-'.repeat(70));
try {
  const times = [];
  for (let i = 0; i < 10; i++) {
    const start = Date.now();
    generatePuzzle();
    const elapsed = Date.now() - start;
    times.push(elapsed);
    console.log(`  Puzzle ${i + 1}: ${elapsed}ms`);
  }

  const maxTime = Math.max(...times);
  const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
  const allUnder2s = times.every(t => t < 2000);

  console.log(`Average time: ${avgTime.toFixed(0)}ms`);
  console.log(`Max time: ${maxTime}ms`);
  console.log(`All under 2000ms: ${allUnder2s}`);
  console.log(`Result: ${allUnder2s ? 'PASS ✓' : 'FAIL ✗'}`);
} catch (error) {
  console.log(`✗ Error: ${error.message}`);
  console.log('Result: FAIL ✗');
}
console.log();

// Test 3: Puzzle Variety (AC: 2)
console.log('Test 3: Puzzle Variety (AC: 2)');
console.log('-'.repeat(70));
try {
  const puzzles = [];
  for (let i = 0; i < 5; i++) {
    puzzles.push(generatePuzzle());
  }

  const stringified = puzzles.map(p => JSON.stringify(p));
  const allUnique = new Set(stringified).size === 5;

  console.log('Generated 5 puzzles');
  console.log(`  Puzzle 1 first row: [${puzzles[0][0].join(', ')}]`);
  console.log(`  Puzzle 2 first row: [${puzzles[1][0].join(', ')}]`);
  console.log(`  Puzzle 3 first row: [${puzzles[2][0].join(', ')}]`);
  console.log(`All different: ${allUnique}`);
  console.log(`Result: ${allUnique ? 'PASS ✓' : 'FAIL ✗'}`);
} catch (error) {
  console.log(`✗ Error: ${error.message}`);
  console.log('Result: FAIL ✗');
}
console.log();

// Test 4: Solvability (AC: 9)
console.log('Test 4: Solvability (AC: 9)');
console.log('-'.repeat(70));
try {
  const solvable = [];
  for (let i = 0; i < 5; i++) {
    const puzzle = generatePuzzle();
    const copy = JSON.parse(JSON.stringify(puzzle));
    const solution = solvePuzzle(copy);
    const isSolved = solution !== null && solution.flat().every(n => n !== 0);
    solvable.push(isSolved);
    console.log(`  Puzzle ${i + 1}: ${isSolved ? 'Solvable ✓' : 'Not solvable ✗'}`);
  }

  const allSolvable = solvable.every(s => s);
  console.log(`All solvable: ${allSolvable}`);
  console.log(`Result: ${allSolvable ? 'PASS ✓' : 'FAIL ✗'}`);
} catch (error) {
  console.log(`✗ Error: ${error.message}`);
  console.log('Result: FAIL ✗');
}
console.log();

// Test 5: Unique Solution (AC: 10)
console.log('Test 5: Unique Solution (AC: 10)');
console.log('-'.repeat(70));
try {
  const results = [];
  for (let i = 0; i < 5; i++) {
    const puzzle = generatePuzzle();
    const isUnique = hasUniqueSolution(puzzle);
    results.push(isUnique);
    console.log(`  Puzzle ${i + 1}: ${isUnique ? 'Unique solution ✓' : 'Not unique ✗'}`);
  }

  const allUnique = results.every(r => r);
  console.log(`All have unique solutions: ${allUnique}`);
  console.log(`Result: ${allUnique ? 'PASS ✓' : 'FAIL ✗'}`);
} catch (error) {
  console.log(`✗ Error: ${error.message}`);
  console.log('Result: FAIL ✗');
}
console.log();

// Test 6: Clue Count Range (AC: 4)
console.log('Test 6: Clue Count Range (AC: 4)');
console.log('-'.repeat(70));
try {
  const clueCounts = [];
  for (let i = 0; i < 10; i++) {
    const puzzle = generatePuzzle();
    const clues = countClues(puzzle);
    clueCounts.push(clues);
  }

  const min = Math.min(...clueCounts);
  const max = Math.max(...clueCounts);
  const avg = clueCounts.reduce((a, b) => a + b, 0) / clueCounts.length;
  const allInRange = clueCounts.every(c => c >= 40 && c <= 50);

  console.log(`Min clues: ${min} (target: ≥40)`);
  console.log(`Max clues: ${max} (target: ≤50)`);
  console.log(`Average: ${avg.toFixed(1)}`);
  console.log(`All in range (40-50): ${allInRange}`);
  console.log(`Counts: ${clueCounts.join(', ')}`);
  console.log(`Result: ${allInRange ? 'PASS ✓' : 'FAIL ✗'}`);
} catch (error) {
  console.log(`✗ Error: ${error.message}`);
  console.log('Result: FAIL ✗');
}
console.log();

// Test 7: Sample Generated Puzzle Display
console.log('Test 7: Sample Generated Puzzle');
console.log('-'.repeat(70));
try {
  const puzzle = generatePuzzle();
  const clues = countClues(puzzle);

  console.log(`Clues: ${clues}`);
  console.log();
  console.log(formatGrid(puzzle));
  console.log();
  console.log('Result: PASS ✓');
} catch (error) {
  console.log(`✗ Error: ${error.message}`);
  console.log('Result: FAIL ✗');
}
console.log();

console.log('='.repeat(70));
console.log('All tests complete!');
console.log('='.repeat(70));