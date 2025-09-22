# Calculator App - Product Requirements Document (PRD)

## Project Overview
A web-based calculator application designed for educational purposes, specifically to teach debugging skills to apprentice developers. The app will be built with intentional bugs across various categories to create realistic debugging scenarios.

## Target Audience
- **Primary**: Apprentice developers participating in bug hunting workshops
- **Secondary**: Instructors/mentors running debugging training sessions

## Project Goals
1. **Educational**: Provide hands-on debugging experience with realistic bugs
2. **Practical**: Demonstrate common programming pitfalls and best practices
3. **Engaging**: Create an interactive learning environment through bug hunting

## User Stories

### End User Stories
- As a user, I want to perform basic arithmetic operations (+, -, *, /)
- As a user, I want to input numbers using on-screen buttons or keyboard
- As a user, I want to see my calculation history
- As a user, I want to clear the current calculation or all history
- As a user, I want to use memory functions (M+, M-, MR, MC)
- As a user, I want to calculate percentages and square roots
- As a user, I want visual feedback when buttons are pressed
- As a user, I want to see error messages for invalid operations

### Learning Stories (Workshop Context)
- As an apprentice, I want to identify and fix logic errors in calculations
- As an apprentice, I want to debug UI/UX issues affecting user experience
- As an apprentice, I want to practice using browser developer tools
- As an instructor, I want categorized bugs with varying difficulty levels
- As an instructor, I want documentation of all bugs and their solutions

## Core Features

### 1. Basic Calculator Functions
- **Number Input**: 0-9, decimal point
- **Basic Operations**: Addition (+), Subtraction (-), Multiplication (*), Division (/)
- **Control Functions**: Clear (C), Clear All (CA), Equals (=)
- **Display**: Current number, operation, and result

### 2. Advanced Features
- **Memory Functions**: 
  - Memory Store (MS)
  - Memory Recall (MR) 
  - Memory Add (M+)
  - Memory Subtract (M-)
  - Memory Clear (MC)
- **Scientific Functions**:
  - Percentage (%)
  - Square Root (√)
  - Sign Toggle (+/-)
- **History**: Display of recent calculations
- **Keyboard Support**: Number keys, operators, Enter, Escape

### 3. User Interface
- **Responsive Design**: Works on desktop and mobile
- **Visual Feedback**: Button press animations and hover effects
- **Error Handling**: Clear error messages for invalid operations
- **Accessibility**: Keyboard navigation and screen reader support

## Technical Requirements

### Technology Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Testing**: Jest for unit tests
- **Build Tools**: Simple static files (no complex build process needed)
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

### Architecture
```
Calculator/
├── index.html          # Main HTML structure
├── styles/
│   ├── main.css       # Core styles
│   └── responsive.css # Mobile/tablet styles
├── scripts/
│   ├── calculator.js  # Main calculator logic
│   ├── display.js     # Display management
│   ├── memory.js      # Memory functions
│   └── history.js     # History tracking
├── tests/
│   ├── calculator.test.js
│   ├── display.test.js
│   └── memory.test.js
└── docs/
    ├── PRD.md
    ├── bug-guide.md   # Instructor guide
    └── solutions.md   # Bug solutions
```

### Performance Requirements
- **Load Time**: < 2 seconds on standard broadband
- **Response Time**: Button presses respond within 100ms
- **Memory Usage**: Minimal JavaScript memory footprint
- **Calculation Precision**: Handle floating-point operations accurately

## Intentional Bug Categories

### 1. Logic Errors (High Priority for Learning)
- **Calculation Bugs**: Incorrect operator precedence, division by zero handling
- **State Management**: Memory functions not working correctly
- **Edge Cases**: Large numbers, negative numbers, decimal precision issues

### 2. UI/UX Issues (Medium Priority)
- **Display Problems**: Numbers not showing correctly, overflow issues
- **Button Functionality**: Buttons not responding, wrong operations triggered
- **Visual Bugs**: Styling issues, responsive design problems

### 3. JavaScript Errors (High Priority)
- **Type Errors**: String/number confusion, undefined variable access
- **Scope Issues**: Variable hoisting problems, closure issues
- **Event Handling**: Click events not working, keyboard input problems

### 4. Data Validation (Medium Priority)
- **Input Validation**: Accepting invalid characters, multiple decimal points
- **Boundary Conditions**: Maximum/minimum number limits
- **Error States**: Poor error message handling

### 5. Performance Issues (Low Priority)
- **Memory Leaks**: Event listeners not removed, history growing indefinitely
- **Inefficient Code**: Unnecessary DOM queries, blocking operations

## Bug Difficulty Levels

### Beginner Bugs (Easy to Find)
- Obvious visual issues (buttons not styled correctly)
- Console errors that are immediately visible
- Simple logic errors with clear symptoms

### Intermediate Bugs (Require Investigation)
- Subtle calculation errors
- State management issues
- Responsive design problems

### Advanced Bugs (Deep Debugging Required)
- Floating-point precision issues
- Complex event handling problems
- Performance and memory issues

## Success Metrics

### Workshop Success
- **Engagement**: 90%+ of participants actively debug
- **Learning**: Each participant finds and fixes at least 3 bugs
- **Skill Development**: Participants demonstrate improved debugging methodology

### Technical Success
- **Functionality**: Calculator works correctly when all bugs are fixed
- **Code Quality**: Clean, readable, well-commented code
- **Test Coverage**: 80%+ test coverage for core functions

## Timeline

### Phase 1: Core Development (Week 1)
- Set up project structure
- Implement basic calculator functionality
- Create initial test suite

### Phase 2: Feature Enhancement (Week 1)
- Add advanced features (memory, history, scientific functions)
- Implement responsive design
- Complete comprehensive testing

### Phase 3: Bug Introduction (Week 2)
- Strategically introduce bugs across all categories
- Test bug scenarios
- Document each bug and solution

### Phase 4: Workshop Preparation (Week 2)
- Create instructor guide and materials
- Prepare bug hunting worksheets
- Final testing and validation

## Workshop Materials

### For Participants
- **Starter Code**: Calculator with bugs to find and fix
- **Bug Report Template**: Structured format for documenting findings
- **Debugging Checklist**: Systematic approach to bug hunting
- **Resources**: Links to debugging tools and techniques

### For Instructors
- **Bug Inventory**: Complete list of all intentional bugs
- **Solution Guide**: Step-by-step fixes for each bug
- **Difficulty Progression**: Suggested order for revealing bugs
- **Assessment Rubric**: Criteria for evaluating participant progress

## Risk Assessment

### Technical Risks
- **Complexity**: Bugs might be too difficult/easy for the target audience
- **Dependencies**: Browser compatibility issues
- **Mitigation**: Thorough testing across skill levels and browsers

### Educational Risks
- **Frustration**: Participants getting stuck on difficult bugs
- **Pacing**: Workshop timing issues
- **Mitigation**: Clear difficulty progression and instructor support materials

## Future Enhancements
- **Multiple Themes**: Different visual styles
- **Calculator Modes**: Scientific, programmer, graphing calculator modes
- **Collaborative Features**: Team debugging exercises
- **Advanced Bugs**: More sophisticated error scenarios for senior developers

---

*This PRD serves as the foundation for building an educational calculator that will provide valuable hands-on debugging experience for apprentice developers.*