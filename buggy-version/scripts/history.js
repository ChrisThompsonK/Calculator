
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

        this.historyToggleBtn.addEventListener('click', () => {
            this.toggleHistory();
        });
        

        this.clearHistoryBtn.addEventListener('click', () => {
            this.clearHistory();
        });
    }
    
    
    addCalculation(expression, result) {
        const calculation = {
            expression: expression,
            result: result,
            timestamp: new Date().toLocaleTimeString()
        };
        

        this.calculations.unshift(calculation);
        
        if (this.calculations.length > this.maxHistoryItems) {
            this.calculations = this.calculations.slice(0, this.maxHistoryItems);
        }
        
        this.updateHistoryDisplay();
        this.saveHistoryToStorage();
    }
    
    
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
            

            historyItem.addEventListener('click', () => {
                this.useHistoryResult(calc.result);
            });
            
            this.historyList.appendChild(historyItem);
        });
    }
    
    
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
    
    
    clearHistory() {
        this.calculations = [];
        this.updateHistoryDisplay();
        this.saveHistoryToStorage();
    }
    
    
    useHistoryResult(result) {

        if (window.calculator && window.calculator.displayManager) {
            window.calculator.displayManager.updateMainDisplay(result);
            window.calculator.displayManager.startNewNumber();
        }
        

        if (this.isHistoryVisible) {
            this.toggleHistory();
        }
    }
    
    
    getLastCalculation() {
        return this.calculations.length > 0 ? this.calculations[0] : null;
    }
    
    
    getAllCalculations() {
        return [...this.calculations];
    }
    
    
    saveHistoryToStorage() {
        try {
            localStorage.setItem('calculatorHistory', this.calculations);
        } catch (error) {
            console.warn('Could not save history to localStorage:', error);
        }
    }
    
    
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
    
    
    importHistory(historyText) {


        console.log('Import functionality not yet implemented');
    }
}


window.HistoryManager = HistoryManager;