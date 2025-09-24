# Calculator App - Bug Hunting Workshop

A web-based calculator application designed for educational purposes to teach debugging skills to apprentice developers.

## 🎯 Workshop Overview

This project contains two versions of a calculator application:
- **Working Version**: A fully functional calculator with comprehensive features
- **Buggy Version**: The same calculator with 16 intentional bugs for debugging practice

## 🚀 Getting Started

### Quick Start (Node.js Express App)
```bash
# Install dependencies
npm install

# Start development environment (both working and buggy servers)
npm run dev

# Open in browser:
# Working version: http://localhost:3000
# Buggy version:   http://localhost:3001
```

### For Students
1. Open the buggy version at `http://localhost:3001` in your browser
2. Use the calculator and identify issues
3. Use browser developer tools to investigate problems
4. Use VS Code debugger for server-side debugging
5. Fill out the bug report template in `docs/bug-report-template.md`

### For Instructors
1. **Start Here**: Review `trainer-docs/README.md` for complete setup guide
2. **Choose Difficulty**: Use setup scripts in `trainer-docs/` to configure workshop mode
3. **Bug Reference**: Complete solutions available in `trainer-docs/trainer-bug-reference.md`
4. **Workshop Modes**: 
   - Full Help (default) - Complete guides available
   - Zero Help - `./trainer-docs/setup-zero-help.sh` (intermediate)
   - Ultra Zero Help - `./trainer-docs/setup-ultra-zero-help.sh` (expert)
5. **Safety**: All scripts tested and documented in `trainer-docs/SCRIPT-TESTING-REPORT.md`

## 📁 Project Structure

```
Calculator/
├── index.html              # Working calculator (served via Express)
├── styles/                 # CSS files for working version
├── scripts/                # JavaScript files for working version
├── buggy-version/          # Version with intentional bugs (served via Express)
│   ├── index.html
│   ├── styles/
│   └── scripts/
├── server.js              # Express.js server (working version)
├── buggy-server.js        # Express.js server (buggy version)
├── dev-start.js           # Development environment orchestrator
├── tests/                 # Test suites
├── docs/                  # Student documentation
│   ├── bug-hunting-guide.md # Debugging methodology guide
│   └── bug-report-template.md # Student worksheet
├── trainer-docs/          # Trainer-only documentation & tools
│   ├── README.md          # Trainer quick start guide
│   ├── TRAINER-MODES-GUIDE.md # Workshop difficulty modes
│   ├── trainer-bug-reference.md # Complete bug solutions
│   ├── setup-zero-help.sh # Remove help files (intermediate mode)
│   ├── setup-ultra-zero-help.sh # Maximum stealth mode
│   ├── restore-help.sh    # Restore all documentation
│   └── test-all-scripts.sh # Safety testing for setup scripts
└── package.json           # Dependencies and scripts
```

## 🧮 Calculator Features

### Core Functionality
- ✅ Basic arithmetic operations (+, -, ×, ÷)
- ✅ Number input with decimal support
- ✅ Clear and clear-all functions
- ✅ Keyboard support
- ✅ Error handling

### Advanced Features
- ✅ Memory functions (MS, MR, M+, M-, MC)
- ✅ Scientific functions (%, √, x²)
- ✅ Calculation history with persistence
- ✅ Responsive design
- ✅ Visual feedback and animations
- ✅ Server-side API endpoints for calculations
- ✅ Express.js backend with security middleware

## 🔌 API Endpoints

The Express.js servers provide REST API endpoints for enhanced functionality:

### Core Calculation API
```
POST /api/calculate
Body: { "expression": "5 + 3 * 2" }
Response: { "result": 11, "expression": "5 + 3 * 2" }

POST /api/evaluate
Body: { "operation": "add", "a": 5, "b": 3 }
Response: { "result": 8, "operation": "add" }
```

### Memory Operations API
```
POST /api/memory/store
Body: { "value": 42 }
Response: { "success": true, "stored": 42 }

GET /api/memory/recall
Response: { "value": 42 }

POST /api/memory/add
POST /api/memory/subtract
POST /api/memory/clear
```

### History Management API
```
GET /api/history
Response: { "history": [...] }

POST /api/history/add
Body: { "expression": "5+3", "result": 8 }

DELETE /api/history/clear
```

### System Endpoints
```
GET /api/health
Response: { "status": "healthy", "timestamp": "..." }

GET /api/version
Response: { "version": "1.0.0", "node": "..." }
```

## 🐛 Bug Categories in Workshop

The buggy version contains 16 intentional bugs across five categories:

### 🔴 Logic Errors (High Priority)
- Incorrect operator implementations
- Wrong calculation logic
- Percentage calculation errors

### 🟡 UI/UX Issues (Medium Priority)
- Visual design problems
- Layout alignment issues
- Button styling conflicts

### 🟠 JavaScript Errors (High Priority)
- Type coercion issues
- Event handling problems
- Data validation failures

### 🔵 Data Validation (Medium Priority)
- Input validation missing
- Edge case handling
- Boundary condition errors

### 🟣 Performance/Design (Low Priority)
- Responsive design conflicts
- CSS specificity issues
- Data persistence problems

## 🛠️ Development Setup

### Prerequisites
- Node.js (v16 or higher)
- npm (comes with Node.js)
- Modern web browser (Chrome, Firefox, Safari, Edge)
- VS Code (recommended for debugging)

### Installation & Setup
```bash
# Clone or navigate to the project directory
cd Calculator

# Install dependencies
npm install

# Start development environment
npm run dev
```

### Available Scripts
```bash
# Development (starts both servers with hot reload)
npm run dev

# Start working server only
npm run start

# Start buggy server only
npm run start:buggy

# Run tests
npm test

# Run tests in watch mode
npm run test:watch
```

### Server Information
- **Working Calculator**: http://localhost:3000
  - Full API endpoints at `/api/*`
  - Health check: `/api/health`
  - Server-side debugging available

- **Buggy Calculator**: http://localhost:3001
  - Contains intentional server-side bugs
  - Same API endpoints (some with bugs)
  - Perfect for debugging practice

### VS Code Debugging
1. Install the "Node.js" extension in VS Code
2. Use "Run and Debug" panel
3. Create launch configuration for "Attach to Node"
4. Set breakpoints in server files
5. Attach debugger to running server process

## 🎓 Learning Objectives

By completing this workshop, students will:

1. **Master Debugging Methodology**
   - Systematic problem identification
   - Root cause analysis
   - Effective use of debugging tools

2. **Understand Common Bug Patterns**
   - Logic errors and operator precedence
   - Type coercion and data validation
   - UI/UX consistency issues

3. **Develop Testing Skills**
   - Functional testing strategies
   - Edge case identification
   - Cross-browser compatibility

4. **Improve Code Quality Awareness**
   - Error handling best practices
   - Input validation importance
   - User experience considerations

## 📊 Assessment Levels

### ⭐ Beginner (3-5 bugs found)
- Identifies obvious visual and functional issues
- Uses basic testing methods
- Shows understanding of fundamental concepts

### ⭐⭐ Intermediate (6-10 bugs found)
- Demonstrates systematic debugging approach
- Effectively uses browser developer tools
- Shows good problem-solving methodology

### ⭐⭐⭐ Advanced (11+ bugs found)
- Identifies subtle and complex issues
- Shows deep understanding of debugging
- Helps others and suggests improvements

## 🔧 Tools and Techniques

### Essential Browser Tools
- **Console Tab**: JavaScript errors and logging
- **Elements Tab**: HTML/CSS inspection
- **Application Tab**: localStorage and storage
- **Network Tab**: Resource loading and API calls

### Server-Side Debugging (VS Code)
- **VS Code Debugger**: Attach to Node.js process
- **Breakpoints**: Set breakpoints in server files
- **Call Stack**: Trace execution flow
- **Variables Panel**: Inspect server state
- **Debug Console**: Execute server-side commands

### API Testing Tools
- **Browser Network Tab**: Monitor API requests/responses
- **Curl Commands**: Test endpoints directly
- **Postman/Insomnia**: Advanced API testing
- **Server Logs**: Check Express.js console output

### Debugging Strategies
1. **Reproduce Consistently**: Make the bug happen reliably
2. **Check Both Sides**: Client-side (browser) and server-side (Node.js)
3. **Isolate the Problem**: Narrow down the location
4. **Understand Root Cause**: Why does it happen?
5. **Fix Minimally**: Make targeted changes
6. **Verify Thoroughly**: Test the solution on both servers

## 🚀 Extension Activities

### For Advanced Students
- Add automated tests for bug detection
- Implement performance monitoring
- Create accessibility improvements
- Design additional features

### For Instructors
- Customize bugs for specific learning goals
- Create team-based debugging challenges
- Develop automated assessment tools
- Build follow-up workshops

## 📚 Additional Resources

- [MDN Web Docs - Debugging JavaScript](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/What_went_wrong)
- [Chrome DevTools Guide](https://developers.google.com/web/tools/chrome-devtools)
- [Software Testing Fundamentals](http://softwaretestingfundamentals.com/)
- [Clean Code Principles](https://github.com/ryanmcdermott/clean-code-javascript)

## 📝 License

This educational project is created for the Engineering Academy and is intended for educational use only.

## 🤝 Contributing

This is an educational resource. Instructors and educators are welcome to:
- Adapt the content for their specific needs
- Add additional bugs or features
- Improve the documentation
- Share feedback and improvements

---

**Happy Debugging! 🐛➡️✅**
