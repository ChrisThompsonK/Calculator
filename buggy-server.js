const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.BUGGY_PORT || 3001;

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

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'buggy-version'), {
    index: 'index.html',
    extensions: ['html', 'css', 'js']
}));

app.post('/api/calculate', (req, res) => {
    try {
        const { operation, operand1, operand2 } = req.body;
        
        const num1 = operand1;
        const num2 = operand2;
        
        let result;
        
        switch (operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 + num2;
                break;
            case 'divide':
                result = num1 / num2;
                break;
            default:
                return res.status(400).json({
                    error: 'Invalid operation'
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
        res.status(500).send('Something went wrong');
    }
});

app.post('/api/advanced', (req, res) => {
    const { operation, operand } = req.body;
    
    const num = parseFloat(operand);
    let result;
    
    switch (operation) {
        case 'percentage':
            result = num * 100;
            break;
        case 'square-root':
            result = Math.sqrt(num);
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
    });
});

let serverMemory = 0;

app.get('/api/memory', (req, res) => {
    res.json({
        value: serverMemory
    });
});

app.post('/api/memory/store', (req, res) => {
    const { value } = req.body;
    serverMemory = value;
    
    res.json({
        action: 'store',
        value: serverMemory,
        hasValue: serverMemory !== 0
    });
});

app.post('/api/memory/add', (req, res) => {
    const { value } = req.body;
    serverMemory = serverMemory + value;
    
    res.json({
        action: 'add',
        value: serverMemory,
        hasValue: serverMemory !== 0
    });
});

app.post('/api/memory/clear', (req, res) => {
    serverMemory = 0;
});

app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString()
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'buggy-version', 'index.html'));
});

const server = app.listen(PORT, () => {
    console.log(`🐛 Calculator app (BUGGY version) running on http://localhost:${PORT}`);
    console.log(`⚠️  This version contains intentional bugs for debugging practice`);
    console.log(`📊 Buggy API endpoints available at http://localhost:${PORT}/api`);
});

module.exports = app;