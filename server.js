const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;
const BUGGY_PORT = process.env.BUGGY_PORT || 3001;

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

// Serve static files from the root directory (working version)
app.use(express.static(path.join(__dirname), {
    index: 'index.html',
    extensions: ['html', 'css', 'js']
}));

// API Routes for calculator operations (server-side debugging practice)
app.post('/api/calculate', (req, res) => {
    try {
        const { operation, operand1, operand2 } = req.body;
        
        // Input validation
        if (!operation || operand1 === undefined || operand2 === undefined) {
            return res.status(400).json({
                error: 'Missing required parameters: operation, operand1, operand2'
            });
        }
        
        // Convert to numbers
        const num1 = parseFloat(operand1);
        const num2 = parseFloat(operand2);
        
        if (isNaN(num1) || isNaN(num2)) {
            return res.status(400).json({
                error: 'Invalid number format'
            });
        }
        
        let result;
        
        switch (operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                if (num2 === 0) {
                    return res.status(400).json({
                        error: 'Division by zero is not allowed'
                    });
                }
                result = num1 / num2;
                break;
            default:
                return res.status(400).json({
                    error: 'Invalid operation. Supported operations: add, subtract, multiply, divide'
                });
        }
        
        // Check for overflow or invalid results
        if (!isFinite(result)) {
            return res.status(400).json({
                error: 'Result is too large or invalid'
            });
        }
        
        res.json({
            operation,
            operand1: num1,
            operand2: num2,
            result,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Calculation error:', error);
        res.status(500).json({
            error: 'Internal server error during calculation'
        });
    }
});

// API route for advanced operations
app.post('/api/advanced', (req, res) => {
    try {
        const { operation, operand } = req.body;
        
        if (!operation || operand === undefined) {
            return res.status(400).json({
                error: 'Missing required parameters: operation, operand'
            });
        }
        
        const num = parseFloat(operand);
        
        if (isNaN(num)) {
            return res.status(400).json({
                error: 'Invalid number format'
            });
        }
        
        let result;
        
        switch (operation) {
            case 'percentage':
                result = num / 100;
                break;
            case 'square-root':
                if (num < 0) {
                    return res.status(400).json({
                        error: 'Cannot calculate square root of negative number'
                    });
                }
                result = Math.sqrt(num);
                break;
            case 'square':
                result = num * num;
                break;
            case 'sign-toggle':
                result = -num;
                break;
            default:
                return res.status(400).json({
                    error: 'Invalid operation. Supported operations: percentage, square-root, square, sign-toggle'
                });
        }
        
        if (!isFinite(result)) {
            return res.status(400).json({
                error: 'Result is too large or invalid'
            });
        }
        
        res.json({
            operation,
            operand: num,
            result,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error('Advanced calculation error:', error);
        res.status(500).json({
            error: 'Internal server error during calculation'
        });
    }
});

// Memory operations API
let serverMemory = 0;

app.get('/api/memory', (req, res) => {
    res.json({
        value: serverMemory,
        hasValue: serverMemory !== 0
    });
});

app.post('/api/memory/store', (req, res) => {
    const { value } = req.body;
    const num = parseFloat(value);
    
    if (isNaN(num)) {
        return res.status(400).json({
            error: 'Invalid number format'
        });
    }
    
    serverMemory = num;
    res.json({
        action: 'store',
        value: serverMemory,
        hasValue: serverMemory !== 0
    });
});

app.post('/api/memory/add', (req, res) => {
    const { value } = req.body;
    const num = parseFloat(value);
    
    if (isNaN(num)) {
        return res.status(400).json({
            error: 'Invalid number format'
        });
    }
    
    serverMemory += num;
    res.json({
        action: 'add',
        value: serverMemory,
        hasValue: serverMemory !== 0
    });
});

app.post('/api/memory/subtract', (req, res) => {
    const { value } = req.body;
    const num = parseFloat(value);
    
    if (isNaN(num)) {
        return res.status(400).json({
            error: 'Invalid number format'
        });
    }
    
    serverMemory -= num;
    res.json({
        action: 'subtract',
        value: serverMemory,
        hasValue: serverMemory !== 0
    });
});

app.post('/api/memory/clear', (req, res) => {
    serverMemory = 0;
    res.json({
        action: 'clear',
        value: serverMemory,
        hasValue: false
    });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        version: require('./package.json').version
    });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
    res.status(404).json({
        error: 'API endpoint not found'
    });
});

// Serve the main calculator
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler for other routes
app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'index.html'));
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Server error:', error);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
});

// Start the main server
const server = app.listen(PORT, () => {
    console.log(`🧮 Calculator app (working version) running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
    console.log(`🔍 Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
    });
});

module.exports = app;