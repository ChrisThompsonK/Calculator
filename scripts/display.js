/**
 * Display Management Module
 * Handles all display-related functionality for the calculator
 */
class DisplayManager {
    constructor() {
        this.mainDisplay = document.getElementById('mainDisplay');
        this.historyDisplay = document.getElementById('historyDisplay');
        this.operationDisplay = document.getElementById('operationDisplay');
        this.errorModal = document.getElementById('errorModal');
        this.errorMessage = document.getElementById('errorMessage');
        this.errorClose = document.getElementById('errorClose');
        
        this.currentValue = '0';
        this.isNewNumber = true;
        this.hasDecimal = false;
        this.maxDigits = 15;
        
        this.initializeEventListeners();
    }
    
    initializeEventListeners() {
        // Error modal close handlers
        this.errorClose.addEventListener('click', () => this.hideError());
        this.errorModal.addEventListener('click', (e) => {
            if (e.target === this.errorModal) {
                this.hideError();
            }
        });
        
        // Keyboard support for error modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.errorModal.style.display === 'block') {
                this.hideError();
            }
        });
    }
    
    /**
     * Update the main display with a new value
     * @param {string} value - The value to display
     */
    updateMainDisplay(value) {
        if (value === undefined || value === null) {
            value = '0';
        }
        
        // Convert to string and handle large numbers
        let displayValue = String(value);
        
        // Handle scientific notation for very large/small numbers
        if (Math.abs(parseFloat(displayValue)) >= Math.pow(10, this.maxDigits) || 
            (Math.abs(parseFloat(displayValue)) < Math.pow(10, -6) && parseFloat(displayValue) !== 0)) {
            displayValue = parseFloat(displayValue).toExponential(6);
        }
        
        // Limit display length
        if (displayValue.length > this.maxDigits) {
            displayValue = displayValue.substring(0, this.maxDigits);
        }
        
        this.currentValue = displayValue;
        this.mainDisplay.textContent = displayValue;
        
        // Check if display has decimal point
        this.hasDecimal = displayValue.includes('.');
    }
    
    /**
     * Update the history display (shows previous calculation)
     * @param {string} expression - The expression to display
     */
    updateHistoryDisplay(expression) {
        this.historyDisplay.textContent = expression || '';
    }
    
    /**
     * Update the operation display (shows current operation)
     * @param {string} operation - The operation to display
     */
    updateOperationDisplay(operation) {
        this.operationDisplay.textContent = operation || '';
    }
    
    /**
     * Append a digit to the current display
     * @param {string} digit - The digit to append
     */
    appendDigit(digit) {
        if (this.isNewNumber) {
            this.currentValue = digit;
            this.isNewNumber = false;
            this.hasDecimal = false;
        } else {
            if (this.currentValue.length < this.maxDigits) {
                if (this.currentValue === '0' && digit !== '.') {
                    this.currentValue = digit;
                } else {
                    this.currentValue += digit;
                }
            }
        }
        
        this.updateMainDisplay(this.currentValue);
    }
    
    /**
     * Add decimal point to current number
     */
    addDecimal() {
        if (!this.hasDecimal) {
            if (this.isNewNumber) {
                this.currentValue = '0.';
                this.isNewNumber = false;
            } else {
                this.currentValue += '.';
            }
            this.hasDecimal = true;
            this.updateMainDisplay(this.currentValue);
        }
    }
    
    /**
     * Remove the last digit (backspace functionality)
     */
    backspace() {
        if (this.currentValue.length > 1) {
            const removedChar = this.currentValue.slice(-1);
            this.currentValue = this.currentValue.slice(0, -1);
            
            if (removedChar === '.') {
                this.hasDecimal = false;
            }
        } else {
            this.currentValue = '0';
            this.hasDecimal = false;
        }
        
        this.updateMainDisplay(this.currentValue);
    }
    
    /**
     * Clear the current entry
     */
    clearEntry() {
        this.currentValue = '0';
        this.isNewNumber = true;
        this.hasDecimal = false;
        this.updateMainDisplay(this.currentValue);
    }
    
    /**
     * Clear all displays
     */
    clearAll() {
        this.clearEntry();
        this.updateHistoryDisplay('');
        this.updateOperationDisplay('');
    }
    
    /**
     * Mark that a new number should be started
     */
    startNewNumber() {
        this.isNewNumber = true;
        this.hasDecimal = false;
    }
    
    /**
     * Get the current display value as a number
     * @returns {number} The current display value
     */
    getCurrentValue() {
        return parseFloat(this.currentValue) || 0;
    }
    
    /**
     * Get the current display value as a string
     * @returns {string} The current display value
     */
    getCurrentValueString() {
        return this.currentValue;
    }
    
    /**
     * Show an error message
     * @param {string} message - The error message to display
     */
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorModal.style.display = 'block';
    }
    
    /**
     * Hide the error modal
     */
    hideError() {
        this.errorModal.style.display = 'none';
    }
    
    /**
     * Toggle the sign of the current number
     */
    toggleSign() {
        if (this.currentValue !== '0') {
            if (this.currentValue.startsWith('-')) {
                this.currentValue = this.currentValue.substring(1);
            } else {
                this.currentValue = '-' + this.currentValue;
            }
            this.updateMainDisplay(this.currentValue);
        }
    }
    
    /**
     * Format a number for display
     * @param {number} num - The number to format
     * @returns {string} The formatted number
     */
    formatNumber(num) {
        if (isNaN(num) || !isFinite(num)) {
            return 'Error';
        }
        
        // Handle very large or very small numbers
        if (Math.abs(num) >= Math.pow(10, this.maxDigits) || 
            (Math.abs(num) < Math.pow(10, -6) && num !== 0)) {
            return num.toExponential(6);
        }
        
        // Remove unnecessary decimal places
        let result = num.toString();
        if (result.includes('.')) {
            result = parseFloat(result).toString();
        }
        
        return result;
    }
    
    /**
     * Check if the current value is zero
     * @returns {boolean} True if current value is zero
     */
    isZero() {
        return this.getCurrentValue() === 0;
    }
}

// Export for use in other modules
window.DisplayManager = DisplayManager;