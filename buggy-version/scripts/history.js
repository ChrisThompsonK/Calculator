/**
 * History Management Module
 * Handles calculation history and history panel functionality
 */
class HistoryManager {
    constructor() {
        this.historyPanel = document.getElementById('historyPanel');
        this.historyList = document.getElementById('historyList');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.historyToggleBtn = document.querySelector('[data-action="history-toggle"]');
        
        this.calculations = [];
        this.maxHistoryItems = 50;
        this.isHistoryVisible = false;
        
        this.initializeEventListeners();
        this.loadHistoryFromStorage();
    }
    
    initializeEventListeners() {
        // History toggle button
        this.historyToggleBtn.addEventListener('click', () => {
            this.toggleHistory();
        });
        
        // Clear history button
        this.clearHistoryBtn.addEventListener('click', () => {
            this.clearHistory();
        });
    }
    
    /**
     * Add a calculation to history
     * @param {string} expression - The calculation expression
     * @param {string} result - The calculation result
     */
    addCalculation(expression, result) {
        const calculation = {
            expression: expression,
            result: result,
            timestamp: new Date().toLocaleTimeString()
        };
        
        // Add to beginning of array
        this.calculations.unshift(calculation);
        
        if (this.calculations.length > this.maxHistoryItems) {
            this.calculations = this.calculations.slice(0, this.maxHistoryItems);
        }
        
        this.updateHistoryDisplay();
        this.saveHistoryToStorage();
    }
    
    /**
     * Update the history display in the panel
     */
    updateHistoryDisplay() {
        this.historyList.innerHTML = '';
        
        if (this.calculations.length === 0) {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'history-item';
            emptyMessage.textContent = 'No calculations yet';
            emptyMessage.style.fontStyle = 'italic';
            emptyMessage.style.textAlign = 'center';
            emptyMessage.style.color = '#7f8c8d';
            this.historyList.appendChild(emptyMessage);
            return;
        }
        
        this.calculations.forEach((calc, index) => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div style="font-size: 14px;">${calc.expression} = ${calc.result}</div>
                        <div style="font-size: 11px; color: #7f8c8d; margin-top: 2px;">${calc.timestamp}</div>
                    </div>
                </div>
            `;
            
            // Click to use result
            historyItem.addEventListener('click', () => {
                this.useHistoryResult(calc.result);
            });
            
            this.historyList.appendChild(historyItem);
        });
    }
    
    /**
     * Toggle history panel visibility
     */
    toggleHistory() {
        this.isHistoryVisible = !this.isHistoryVisible;
        
        if (this.isHistoryVisible) {
            this.historyPanel.classList.add('active');
            this.historyToggleBtn.textContent = 'Hide';
            this.historyToggleBtn.style.background = '#e74c3c';
        } else {
            this.historyPanel.classList.remove('active');
            this.historyToggleBtn.textContent = 'History';
            this.historyToggleBtn.style.background = '#16a085';
        }
    }
    
    /**
     * Clear all history
     */
    clearHistory() {
        this.calculations = [];
        this.updateHistoryDisplay();
        this.saveHistoryToStorage();
    }
    
    /**
     * Use a result from history in the calculator
     * @param {string} result - The result to use
     */
    useHistoryResult(result) {
        // This will be called by the main calculator
        if (window.calculator && window.calculator.displayManager) {
            window.calculator.displayManager.updateMainDisplay(result);
            window.calculator.displayManager.startNewNumber();
        }
        
        // Close history panel after selection
        if (this.isHistoryVisible) {
            this.toggleHistory();
        }
    }
    
    /**
     * Get the most recent calculation
     * @returns {object|null} The most recent calculation or null if none exists
     */
    getLastCalculation() {
        return this.calculations.length > 0 ? this.calculations[0] : null;
    }
    
    /**
     * Get all calculations
     * @returns {array} Array of all calculations
     */
    getAllCalculations() {
        return [...this.calculations];
    }
    
    /**
     * Save history to localStorage
     */
    saveHistoryToStorage() {
        try {
            localStorage.setItem('calculatorHistory', this.calculations);
        } catch (error) {
            console.warn('Could not save history to localStorage:', error);
        }
    }
    
    /**
     * Load history from localStorage
     */
    loadHistoryFromStorage() {
        try {
            const savedHistory = localStorage.getItem('calculatorHistory');
            if (savedHistory) {
                this.calculations = JSON.parse(savedHistory);
                this.updateHistoryDisplay();
            }
        } catch (error) {
            console.warn('Could not load history from localStorage:', error);
            this.calculations = [];
        }
    }
    
    /**
     * Export history as text
     * @returns {string} History formatted as text
     */
    exportHistory() {
        if (this.calculations.length === 0) {
            return 'No calculations in history';
        }
        
        let exportText = 'Calculator History\n';
        exportText += '==================\n\n';
        
        this.calculations.forEach((calc, index) => {
            exportText += `${index + 1}. ${calc.expression} = ${calc.result} (${calc.timestamp})\n`;
        });
        
        return exportText;
    }
    
    /**
     * Import history from text (for future functionality)
     * @param {string} historyText - History text to import
     */
    importHistory(historyText) {
        // This could be implemented for importing history from files
        // For now, it's a placeholder for future enhancement
        console.log('Import functionality not yet implemented');
    }
}

// Export for use in other modules
window.HistoryManager = HistoryManager;