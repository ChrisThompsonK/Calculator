# Calculator Bug Reference Guide for Trainers/Mentors

## Overview
This document serves as the **definitive reference** for all intentional bugs planted in the Calculator app's buggy version. Use this to verify that apprentice developers have correctly identified the bugs during the debugging workshop.

**Total Bugs**: 16 bugs across 5 categories
**Files Affected**: 7 files (4 JavaScript, 2 CSS, 1 HTML)

---

## 🔴 Logic Errors (High Priority) - 4 bugs

### Bug #1: Multiplication performs addition
- **File**: `buggy-version/scripts/calculator.js`
- **Line**: ~290
- **Location**: `calculate()` method, multiply case
- **Code**: `result = prev + current; // Should be * not +`
- **Expected**: `5 × 3 = 15`
- **Actual**: `5 × 3 = 8`
- **Symptoms**: All multiplication operations return addition results
- **Difficulty**: ⭐⭐ Medium - Easy to spot with basic testing

### Bug #2: Missing overflow/invalid result checking
- **File**: `buggy-version/scripts/calculator.js`
- **Line**: ~315
- **Location**: `calculate()` method, return statement
- **Code**: `return result;` (missing validation)
- **Expected**: Handle `Infinity`, `NaN`, very large numbers
- **Actual**: Returns raw result without validation
- **Symptoms**: Calculator can display `Infinity` or `NaN`
- **Difficulty**: ⭐⭐⭐ Hard - Requires edge case testing

### Bug #3: Percentage calculation reversed
- **File**: `buggy-version/scripts/calculator.js`
- **Line**: ~225
- **Location**: `handlePercentage()` method
- **Code**: `const result = currentValue * 100; // Should be / 100`
- **Expected**: `50% = 0.5`
- **Actual**: `50% = 5000`
- **Symptoms**: Percentage gives values 10,000x too large
- **Difficulty**: ⭐⭐ Medium - Obvious when testing percentage function

### Bug #4: Keyboard multiplication uses wrong action
- **File**: `buggy-version/scripts/calculator.js`
- **Line**: ~62
- **Location**: `handleKeyboardInput()` method, '*' case
- **Code**: `this.handleAction('add'); // Should be 'multiply'`
- **Expected**: Pressing `*` key performs multiplication
- **Actual**: Pressing `*` key performs addition
- **Symptoms**: Keyboard shortcut doesn't match button behavior
- **Difficulty**: ⭐⭐ Medium - Only found when testing keyboard input

---

## 🟠 JavaScript Errors (High Priority) - 5 bugs

### Bug #5: String concatenation instead of number building
- **File**: `buggy-version/scripts/display.js`
- **Line**: ~85
- **Location**: `appendDigit()` method
- **Code**: `this.currentValue = this.currentValue + digit;`
- **Expected**: Proper number building logic
- **Actual**: Always treats as string concatenation
- **Symptoms**: No visible symptoms initially (works for display)
- **Difficulty**: ⭐⭐⭐ Hard - Code works but is technically incorrect

### Bug #6: Backspace leaves empty string instead of zero
- **File**: `buggy-version/scripts/display.js`
- **Line**: ~125
- **Location**: `backspace()` method
- **Code**: `this.currentValue = ''; // Should be '0'`
- **Expected**: Display shows `0` after backspacing all digits
- **Actual**: Display shows empty string, causes calculation errors
- **Symptoms**: Blank display, errors on operations after full backspace
- **Difficulty**: ⭐⭐ Medium - Found by backspacing entire number

### Bug #7: Multiple decimal points allowed
- **File**: `buggy-version/scripts/display.js`
- **Line**: ~108
- **Location**: `addDecimal()` method
- **Code**: Missing `if (!this.hasDecimal)` check
- **Expected**: Only one decimal point per number
- **Actual**: Can enter multiple decimal points (e.g., `1.2.3.4`)
- **Symptoms**: Invalid numbers with multiple decimal points
- **Difficulty**: ⭐ Easy - Try entering decimal multiple times

### Bug #8: Memory add uses string concatenation
- **File**: `buggy-version/scripts/memory.js`
- **Line**: ~30
- **Location**: `add()` method
- **Code**: `this.memoryValue = this.memoryValue + value;`
- **Expected**: Mathematical addition
- **Actual**: String concatenation when memory contains strings
- **Symptoms**: M+ creates "55" instead of 10 from (5+5)
- **Difficulty**: ⭐⭐ Medium - Requires memory function testing

### Bug #9: Memory clear doesn't update indicator
- **File**: `buggy-version/scripts/memory.js`
- **Line**: ~45
- **Location**: `clear()` method
- **Code**: Missing `this.updateMemoryIndicator();` call
- **Expected**: Memory indicator (M) disappears after MC
- **Actual**: Memory indicator stays visible even after clearing
- **Symptoms**: Persistent "M" indicator after memory clear
- **Difficulty**: ⭐ Easy - Use memory then clear, indicator stays

---

## 🔵 Data Validation (Medium Priority) - 2 bugs

### Bug #14: History storage missing JSON.stringify
- **File**: `buggy-version/scripts/history.js`
- **Line**: ~160
- **Location**: `saveHistoryToStorage()` method
- **Code**: `localStorage.setItem('calculatorHistory', this.calculations);`
- **Expected**: `JSON.stringify(this.calculations)`
- **Actual**: Stores "[object Object]" instead of JSON
- **Symptoms**: History doesn't persist between sessions
- **Difficulty**: ⭐⭐⭐ Hard - Requires checking localStorage or session restart

### Bug #15: Wrong comparison in history limit
- **File**: `buggy-version/scripts/history.js`
- **Line**: ~44
- **Location**: `addCalculation()` method
- **Code**: `if (this.calculations.length > this.maxHistoryItems)`
- **Expected**: `>=` (greater than or equal)
- **Actual**: `>` (greater than only)
- **Symptoms**: History keeps 51 items instead of 50 max
- **Difficulty**: ⭐⭐⭐ Hard - Requires performing 51+ calculations

---

## 🟡 UI/UX Issues (Medium Priority) - 3 bugs

### Bug #10: All buttons turn red on hover
- **File**: `buggy-version/styles/main.css`
- **Line**: ~115
- **Location**: `.btn:hover` rule
- **Code**: `background: red !important;`
- **Expected**: Each button type keeps its color scheme on hover
- **Actual**: All buttons turn red when hovered
- **Symptoms**: Poor visual design, confusing UX
- **Difficulty**: ⭐ Easy - Hover over any button

### Bug #11: Calculator display left-aligned instead of right
- **File**: `buggy-version/styles/main.css`
- **Line**: ~56
- **Location**: `.main-display` rule
- **Code**: `text-align: left; /* Should be right */`
- **Expected**: Numbers align to the right (calculator standard)
- **Actual**: Numbers align to the left
- **Symptoms**: Unnatural calculator display alignment
- **Difficulty**: ⭐ Easy - Visual inspection of any number

### Bug #16: Mobile layout broken by conflicting max-width
- **File**: `buggy-version/styles/responsive.css`
- **Line**: ~36
- **Location**: Mobile media query, `.calculator-container`
- **Code**: `max-width: 300px; width: 100%; max-width: 800px;`
- **Expected**: Single consistent max-width for mobile
- **Actual**: Conflicting CSS rules break mobile layout
- **Symptoms**: Calculator too wide on mobile devices
- **Difficulty**: ⭐⭐ Medium - Requires mobile device or responsive testing

---

## 🟣 HTML Structure Issues (Low Priority) - 2 bugs

### Bug #12: Wrong action for subtract button
- **File**: `buggy-version/index.html`
- **Line**: ~41
- **Location**: Subtract button definition
- **Code**: `<button ... data-action="add">-</button>`
- **Expected**: `data-action="subtract"`
- **Actual**: Minus button performs addition
- **Symptoms**: Both + and - buttons perform addition
- **Difficulty**: ⭐ Easy - Try any subtraction

### Bug #13: Zero button has wrong data attribute
- **File**: `buggy-version/index.html`
- **Line**: ~49
- **Location**: Zero button definition
- **Code**: `<button ... data-number="00">0</button>`
- **Expected**: `data-number="0"`
- **Actual**: Clicking 0 enters "00"
- **Symptoms**: Zero button enters double-zero
- **Difficulty**: ⭐ Easy - Click the 0 button

---

## 🎯 Bug Discovery Difficulty Levels

### ⭐ Easy (6 bugs) - Basic functionality testing
- Bug #7: Multiple decimal points
- Bug #9: Memory indicator persists
- Bug #10: Red button hover
- Bug #11: Left-aligned display
- Bug #12: Wrong subtract action
- Bug #13: Double-zero button

### ⭐⭐ Medium (6 bugs) - Systematic feature testing
- Bug #1: Multiplication = addition
- Bug #3: Percentage × 100
- Bug #4: Keyboard multiply
- Bug #6: Empty display after backspace
- Bug #8: Memory string concatenation
- Bug #16: Mobile layout broken

### ⭐⭐⭐ Hard (4 bugs) - Edge cases and deep investigation
- Bug #2: Missing overflow checking
- Bug #5: String concatenation logic
- Bug #14: History storage format
- Bug #15: History limit off-by-one

---

## 🏆 Assessment Rubric

### Beginner Level (3-5 bugs found)
Student identifies obvious visual and functional issues:
- Visual problems (bugs #10, #11, #12, #13)
- Basic functionality errors (bugs #1, #3, #7, #9)

### Intermediate Level (6-10 bugs found)
Student demonstrates systematic testing approach:
- All easy bugs plus some medium difficulty
- Shows good problem-solving methodology
- Uses debugging tools effectively

### Advanced Level (11+ bugs found)
Student identifies subtle and complex issues:
- Finds edge cases and validation problems
- Deep investigation reveals technical issues
- Understanding of code quality and best practices

---

## 🔍 Testing Strategies for Each Bug

### Quick Bug Detection Tests
1. **Basic math**: `5 × 3` (Bug #1), `6 - 2` (Bug #12)
2. **Percentage**: `50%` (Bug #3)
3. **Decimal points**: Press `.` multiple times (Bug #7)
4. **Memory**: Store value, clear, check indicator (Bug #9)
5. **Visual**: Hover buttons (Bug #10), check number alignment (Bug #11)
6. **Zero button**: Click `0` (Bug #13)

### Advanced Testing Required
1. **Keyboard**: Use `*` key vs `×` button (Bug #4)
2. **Edge cases**: Cause overflow/NaN (Bug #2)
3. **Backspace**: Delete entire number (Bug #6)
4. **Memory math**: Store 5, add 5, recall (Bug #8)
5. **Session persistence**: Restart browser, check history (Bug #14)
6. **Mobile**: Test on small screen (Bug #16)
7. **History limit**: Perform 51+ calculations (Bug #15)

---

## ✅ Verification Checklist

When a student reports a bug, verify using this checklist:

- [ ] **Bug location matches** this reference guide
- [ ] **Symptoms described** match expected behavior
- [ ] **Student can reproduce** the bug consistently
- [ ] **Root cause understood** (for intermediate/advanced students)
- [ ] **Testing methodology** shows systematic approach

---

## 📝 Notes for Trainers

### Discussion Points
- **Bug Priority**: Why are logic errors more critical than UI issues?
- **Testing Strategy**: How do you systematically test a complex application?
- **Code Quality**: What makes code maintainable and bug-resistant?
- **User Experience**: How do small bugs affect user confidence?

### Extension Activities
- Have students fix one bug and verify their solution
- Discuss automated testing strategies for each bug type
- Create test cases that would have caught these bugs
- Design code review checklists

### Common Student Mistakes
- Finding symptoms but not root causes
- Fixing bugs without understanding why they happened
- Missing edge cases in their testing
- Not considering user experience impact

---

**Last Updated**: September 22, 2025  
**Version**: 1.0  
**Bugs Documented**: 16/16 ✅