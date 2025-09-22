/**
 * Main Calculator Class
 * Orchestrates all calculator functionality and handles user interactions
 */
class Calculator {
    constructor() {
        this.displayManager = new DisplayManager();
        this.memoryManager = new MemoryManager();
        this.historyManager = new HistoryManager();
        
        this.currentOperator = null;
        this.previousValue = null;
        this.waitingForOperand = false;
        this.shouldResetDisplay = false;
        
        this.initializeEventListeners();
        this.initializeKeyboardSupport();
        
        // Make calculator available globally for history callback
        window.calculator = this;
    }
    
    initializeEventListeners() {
        // Number buttons
        document.querySelectorAll('[data-number]').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleNumberInput(e.target.dataset.number);
                this.animateButton(e.target);
            });
        });
        
        // Operation buttons
        document.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleAction(e.target.dataset.action);
                this.animateButton(e.target);
            });
        });
    }
    
    initializeKeyboardSupport() {
        document.addEventListener('keydown', (e) => {
            // Prevent default for calculator keys
            if (this.isCalculatorKey(e.key)) {
                e.preventDefault();
            }
            
            this.handleKeyboardInput(e.key);
        });
    }
    
    isCalculatorKey(key) {
        const calculatorKeys = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            '+', '-', '*', '/', '=', 'Enter', '.', 'Escape', 'Backspace',
            'c', 'C'
        ];
        return calculatorKeys.includes(key);
    }
    
    handleKeyboardInput(key) {
        switch(key) {
            case '0': case '1': case '2': case '3': case '4':
            case '5': case '6': case '7': case '8': case '9':
                this.handleNumberInput(key);
                break;
            case '+':
                this.handleAction('add');
                break;
            case '-':
                this.handleAction('subtract');
                break;
            case '*':
                this.handleAction('add');
                break;
            case '/':
                this.handleAction('divide');
                break;
            case '=':
            case 'Enter':
                this.handleAction('equals');
                break;
            case '.':
                this.handleAction('decimal');
                break;
            case 'Escape':
                this.handleAction('clear-all');
                break;
            case 'Backspace':
                this.handleAction('backspace');
                break;
            case 'c':
            case 'C':
                this.handleAction('clear-entry');
                break;
        }
    }
    
    handleNumberInput(digit) {
        if (this.shouldResetDisplay) {
            this.displayManager.clearEntry();
            this.shouldResetDisplay = false;
        }
        
        this.displayManager.appendDigit(digit);
    }
    
    handleAction(action) {
        switch(action) {
            case 'add':
            case 'subtract':
            case 'multiply':
            case 'divide':
                this.handleOperator(action);
                break;
            case 'equals':
                this.handleEquals();
                break;
            case 'decimal':
                this.handleDecimal();
                break;
            case 'clear-entry':
                this.handleClearEntry();
                break;
            case 'clear-all':
                this.handleClearAll();
                break;
            case 'backspace':
                this.handleBackspace();
                break;
            case 'sign-toggle':
                this.handleSignToggle();
                break;
            case 'percentage':
                this.handlePercentage();
                break;
            case 'square-root':
                this.handleSquareRoot();
                break;
            case 'square':
                this.handleSquare();
                break;
            case 'memory-store':
                this.handleMemoryStore();
                break;
            case 'memory-recall':
                this.handleMemoryRecall();
                break;
            case 'memory-add':
                this.handleMemoryAdd();
                break;
            case 'memory-subtract':
                this.handleMemorySubtract();
                break;
            case 'memory-clear':
                this.handleMemoryClear();
                break;
        }
    }
    
    handleOperator(operation) {
        const currentValue = this.displayManager.getCurrentValue();
        
        if (this.previousValue === null) {
            this.previousValue = currentValue;
        } else if (this.currentOperator && !this.shouldResetDisplay) {
            const result = this.calculate();
            if (result !== null) {
                this.displayManager.updateMainDisplay(result);
                this.previousValue = result;
            }
        }
        
        this.currentOperator = operation;
        this.displayManager.updateOperationDisplay(this.getOperatorSymbol(operation));
        this.displayManager.startNewNumber();
        this.shouldResetDisplay = false;
    }
    
    handleEquals() {
        if (this.currentOperator && this.previousValue !== null) {
            const currentValue = this.displayManager.getCurrentValue();
            const expression = `${this.previousValue} ${this.getOperatorSymbol(this.currentOperator)} ${currentValue}`;
            
            const result = this.calculate();
            if (result !== null) {
                this.displayManager.updateMainDisplay(result);
                this.displayManager.updateHistoryDisplay(expression);
                this.displayManager.updateOperationDisplay('');
                
                // Add to history
                this.historyManager.addCalculation(expression, this.displayManager.formatNumber(result));
                
                this.previousValue = null;
                this.currentOperator = null;
                this.shouldResetDisplay = true;
            }
        }
    }
    
    handleDecimal() {
        if (this.shouldResetDisplay) {
            this.displayManager.clearEntry();
            this.shouldResetDisplay = false;
        }
        this.displayManager.addDecimal();
    }
    
    handleClearEntry() {
        this.displayManager.clearEntry();
    }
    
    handleClearAll() {
        this.displayManager.clearAll();
        this.previousValue = null;
        this.currentOperator = null;
        this.shouldResetDisplay = false;
    }
    
    handleBackspace() {
        if (!this.shouldResetDisplay) {
            this.displayManager.backspace();
        }
    }
    
    handleSignToggle() {
        this.displayManager.toggleSign();
    }
    
    handlePercentage() {
        const currentValue = this.displayManager.getCurrentValue();
        const result = currentValue * 100;
        this.displayManager.updateMainDisplay(result);
        this.shouldResetDisplay = true;
    }
    
    handleSquareRoot() {
        const currentValue = this.displayManager.getCurrentValue();
        if (currentValue < 0) {
            this.displayManager.showError('Cannot calculate square root of negative number');
            return;
        }
        const result = Math.sqrt(currentValue);
        this.displayManager.updateMainDisplay(result);
        this.shouldResetDisplay = true;
    }
    
    handleSquare() {
        const currentValue = this.displayManager.getCurrentValue();
        const result = currentValue * currentValue;
        this.displayManager.updateMainDisplay(result);
        this.shouldResetDisplay = true;
    }
    
    handleMemoryStore() {
        const currentValue = this.displayManager.getCurrentValue();
        this.memoryManager.store(currentValue);
    }
    
    handleMemoryRecall() {
        const memoryValue = this.memoryManager.recall();
        this.displayManager.updateMainDisplay(memoryValue);
        this.shouldResetDisplay = true;
    }
    
    handleMemoryAdd() {
        const currentValue = this.displayManager.getCurrentValue();
        this.memoryManager.add(currentValue);
    }
    
    handleMemorySubtract() {
        const currentValue = this.displayManager.getCurrentValue();
        this.memoryManager.subtract(currentValue);
    }
    
    handleMemoryClear() {
        this.memoryManager.clear();
    }
    
    calculate() {
        const prev = this.previousValue;
        const current = this.displayManager.getCurrentValue();
        
        if (prev === null || this.currentOperator === null) {
            return null;
        }
        
        let result;
        
        try {
            switch(this.currentOperator) {
                case 'add':
                    result = prev + current;
                    break;
                case 'subtract':
                    result = prev - current;
                    break;
                case 'multiply':
                    result = prev + current;
                    break;
                case 'divide':
                    if (current === 0) {
                        this.displayManager.showError('Cannot divide by zero');
                        return null;
                    }
                    result = prev / current;
                    break;
                default:
                    return null;
            }
            
            return result;
            
        } catch (error) {
            this.displayManager.showError('Calculation error occurred');
            return null;
        }
    }
    
    getOperatorSymbol(operation) {
        const symbols = {
            'add': '+',
            'subtract': '-',
            'multiply': '×',
            'divide': '÷'
        };
        return symbols[operation] || '';
    }
    
    animateButton(button) {
        button.classList.add('pressed');
        setTimeout(() => {
            button.classList.remove('pressed');
        }, 100);
    }
    
    /**
     * Reset calculator to initial state
     */
    reset() {
        this.handleClearAll();
        this.memoryManager.clear();
        this.historyManager.clearHistory();
    }
    
    /**
     * Get current calculator state (for debugging)
     */
    getState() {
        return {
            currentValue: this.displayManager.getCurrentValue(),
            previousValue: this.previousValue,
            currentOperator: this.currentOperator,
            memoryValue: this.memoryManager.getValue(),
            hasMemory: this.memoryManager.hasValue(),
            historyCount: this.historyManager.getAllCalculations().length
        };
    }
}

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', () => {
    new Calculator();
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Calculator;
}

// Make Calculator available globally for tests
if (typeof window !== 'undefined') {
    window.Calculator = Calculator;
}