const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.BUGGY_PORT || 3001;

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    },
}));

// CORS middleware
app.use(cors());

// Logging middleware
app.use(morgan('dev'));

// Parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the buggy-version directory
app.use(express.static(path.join(__dirname, 'buggy-version'), {
    index: 'index.html',
    extensions: ['html', 'css', 'js']
}));

// BUGGY API Routes (with intentional server-side bugs for debugging practice)

// BUG API #1: Calculation endpoint with bugs
app.post('/api/calculate', (req, res) => {
    try {
        const { operation, operand1, operand2 } = req.body;
        
        // BUG: Missing proper input validation
        const num1 = operand1; // Should be parseFloat(operand1)
        const num2 = operand2; // Should be parseFloat(operand2)
        
        let result;
        
        switch (operation) {
            case 'add':
                result = num1 + num2; // Will concatenate strings instead of adding numbers
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 + num2; // BUG: Wrong operator (should be *)
                break;
            case 'divide':
                result = num1 / num2; // BUG: No division by zero check
                break;
            default:
                return res.status(400).json({
                    error: 'Invalid operation'
                });
        }
        
        // BUG: No overflow check
        res.json({
            operation,
            operand1: num1,
            operand2: num2,
            result,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        // BUG: Poor error handling
        res.status(500).send('Something went wrong');
    }
});

// BUG API #2: Advanced operations with bugs
app.post('/api/advanced', (req, res) => {
    const { operation, operand } = req.body;
    
    const num = parseFloat(operand);
    let result;
    
    switch (operation) {
        case 'percentage':
            result = num * 100; // BUG: Should be / 100
            break;
        case 'square-root':
            result = Math.sqrt(num); // BUG: No negative number check
            break;
        case 'square':
            result = num * num;
            break;
        case 'sign-toggle':
            result = -num;
            break;
    }
    
    res.json({
        operation,
        operand: num,
        result
        // BUG: Missing timestamp
    });
});

// BUG API #3: Memory operations with bugs
let serverMemory = 0;

app.get('/api/memory', (req, res) => {
    res.json({
        value: serverMemory
        // BUG: Missing hasValue property
    });
});

app.post('/api/memory/store', (req, res) => {
    const { value } = req.body;
    serverMemory = value; // BUG: No type conversion
    
    res.json({
        action: 'store',
        value: serverMemory,
        hasValue: serverMemory !== 0
    });
});

app.post('/api/memory/add', (req, res) => {
    const { value } = req.body;
    serverMemory = serverMemory + value; // BUG: String concatenation instead of addition
    
    res.json({
        action: 'add',
        value: serverMemory,
        hasValue: serverMemory !== 0
    });
});

app.post('/api/memory/clear', (req, res) => {
    serverMemory = 0;
    // BUG: No response sent - will hang
});

// BUG API #4: Health check with issues
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
        // BUG: Missing version, will cause JSON syntax error if uncommented
        // version: require('./package.json').version,
    });
});

// Serve the buggy calculator
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'buggy-version', 'index.html'));
});

// BUG: Missing 404 handlers and error middleware

// Start the buggy server
const server = app.listen(PORT, () => {
    console.log(`🐛 Calculator app (BUGGY version) running on http://localhost:${PORT}`);
    console.log(`⚠️  This version contains intentional bugs for debugging practice`);
    console.log(`📊 Buggy API endpoints available at http://localhost:${PORT}/api`);
});

// BUG: Missing graceful shutdown

module.exports = app;