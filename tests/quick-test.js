/**
 * Quick Integration Test
 * Tests core functionality to validate the calculator works correctly
 */

const { JSDOM } = require('jsdom');

// Set up a fresh DOM environment
const dom = new JSDOM(`
    <!DOCTYPE html>
    <html>
    <body>
        <div id="historyDisplay"></div>
        <div id="mainDisplay">0</div>
        <div id="operationDisplay"></div>
        <div id="memoryIndicator">M</div>
        <div id="historyPanel"></div>
        <div id="historyList"></div>
        <button id="clearHistoryBtn">Clear</button>
        <button data-action="history-toggle">History</button>
        <div id="errorModal" style="display: none;">
            <span id="errorClose">&times;</span>
            <p id="errorMessage"></p>
        </div>
    </body>
    </html>
`);

global.window = dom.window;
global.document = dom.window.document;
global.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {}
};

// Import modules
require('../scripts/display.js');
require('../scripts/memory.js');  
require('../scripts/history.js');
require('../scripts/calculator.js');

describe('Calculator Quick Integration Test', () => {
    test('should perform basic arithmetic correctly', () => {
        const calc = new window.Calculator();
        
        // Test: 5 + 3 = 8
        calc.handleNumberInput('5');
        calc.handleAction('add');
        calc.handleNumberInput('3');
        calc.handleAction('equals');
        
        expect(calc.displayManager.getCurrentValue()).toBe(8);
        
        // Test: 10 * 2 = 20
        calc.handleAction('clear-all');
        calc.handleNumberInput('1');
        calc.handleNumberInput('0');
        calc.handleAction('multiply');
        calc.handleNumberInput('2');
        calc.handleAction('equals');
        
        expect(calc.displayManager.getCurrentValue()).toBe(20);
        
        console.log('✅ Basic arithmetic tests passed');
    });
    
    test('should handle memory operations', () => {
        const calc = new window.Calculator();
        
        // Store 42 in memory
        calc.handleNumberInput('4');
        calc.handleNumberInput('2');
        calc.handleAction('memory-store');
        
        // Clear display and recall
        calc.handleAction('clear-all');
        calc.handleAction('memory-recall');
        
        expect(calc.displayManager.getCurrentValue()).toBe(42);
        expect(calc.memoryManager.hasValue()).toBe(true);
        
        console.log('✅ Memory operations tests passed');
    });
    
    test('should handle errors gracefully', () => {
        const calc = new window.Calculator();
        
        // Test division by zero
        calc.handleNumberInput('5');
        calc.handleAction('divide');
        calc.handleNumberInput('0');
        calc.handleAction('equals');
        
        // Should show error modal
        const errorModal = document.getElementById('errorModal');
        expect(errorModal.style.display).toBe('block');
        
        console.log('✅ Error handling tests passed');
    });
});

console.log('🧮 Calculator functionality validation complete!');