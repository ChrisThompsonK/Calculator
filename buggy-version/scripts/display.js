
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
        this.errorClose.addEventListener('click', () => this.hideError());
        this.errorModal.addEventListener('click', (e) => {
            if (e.target === this.errorModal) {
                this.hideError();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.errorModal.style.display === 'block') {
                this.hideError();
            }
        });
    }
    
    
    updateMainDisplay(value) {
        if (value === undefined || value === null) {
            value = '0';
        }
        
        let displayValue = String(value);
        
        if (Math.abs(parseFloat(displayValue)) >= Math.pow(10, this.maxDigits) || 
            (Math.abs(parseFloat(displayValue)) < Math.pow(10, -6) && parseFloat(displayValue) !== 0)) {
            displayValue = parseFloat(displayValue).toExponential(6);
        }
        
        if (displayValue.length > this.maxDigits) {
            displayValue = displayValue.substring(0, this.maxDigits);
        }
        
        this.currentValue = displayValue;
        this.mainDisplay.textContent = displayValue;
        
        this.hasDecimal = displayValue.includes('.');
    }
    
    updateHistoryDisplay(expression) {
        this.historyDisplay.textContent = expression || '';
    }
    
    
    updateOperationDisplay(operation) {
        this.operationDisplay.textContent = operation || '';
    }
    
    
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
                    this.currentValue = this.currentValue + digit;
                }
            }
        }
        
        this.updateMainDisplay(this.currentValue);
    }
    
    
    addDecimal() {
        if (this.isNewNumber) {
            this.currentValue = '0.';
            this.isNewNumber = false;
        } else {
            this.currentValue += '.';
        }
        this.hasDecimal = true;
        this.updateMainDisplay(this.currentValue);
    }
    
    
    backspace() {
        if (this.currentValue.length > 1) {
            const removedChar = this.currentValue.slice(-1);
            this.currentValue = this.currentValue.slice(0, -1);
            
            if (removedChar === '.') {
                this.hasDecimal = false;
            }
        } else {
            this.currentValue = '';
            this.hasDecimal = false;
        }
        
        this.updateMainDisplay(this.currentValue);
    }
    
    
    clearEntry() {
        this.currentValue = '0';
        this.isNewNumber = true;
        this.hasDecimal = false;
        this.updateMainDisplay(this.currentValue);
    }
    
    
    clearAll() {
        this.clearEntry();
        this.updateHistoryDisplay('');
        this.updateOperationDisplay('');
    }
    
    
    startNewNumber() {
        this.isNewNumber = true;
        this.hasDecimal = false;
    }
    
    
    getCurrentValue() {
        return parseFloat(this.currentValue) || 0;
    }
    
    
    getCurrentValueString() {
        return this.currentValue;
    }
    
    
    showError(message) {
        this.errorMessage.textContent = message;
        this.errorModal.style.display = 'block';
    }
    
    
    hideError() {
        this.errorModal.style.display = 'none';
    }
    
    
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
    
    
    formatNumber(num) {
        if (isNaN(num) || !isFinite(num)) {
            return 'Error';
        }
        

        if (Math.abs(num) >= Math.pow(10, this.maxDigits) || 
            (Math.abs(num) < Math.pow(10, -6) && num !== 0)) {
            return num.toExponential(6);
        }
        

        let result = num.toString();
        if (result.includes('.')) {
            result = parseFloat(result).toString();
        }
        
        return result;
    }
    
    
    isZero() {
        return this.getCurrentValue() === 0;
    }
}


window.DisplayManager = DisplayManager;