/**
 * Test Setup File
 * Configures the testing environment for DOM manipulation tests
 */

// Mock localStorage for testing
const localStorageMock = {
    getItem: jest.fn(() => null),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;

// Mock console.warn to prevent noise in tests
global.console.warn = jest.fn();

// Setup DOM structure for tests
beforeEach(() => {
    document.body.innerHTML = `
        <div class="calculator-container">
            <div class="calculator">
                <div class="display-section">
                    <div class="history-display" id="historyDisplay"></div>
                    <div class="main-display" id="mainDisplay">0</div>
                    <div class="operation-display" id="operationDisplay"></div>
                </div>
                
                <div class="memory-indicator" id="memoryIndicator">M</div>
                
                <div class="button-grid">
                    <button class="btn memory-btn" data-action="memory-clear">MC</button>
                    <button class="btn memory-btn" data-action="memory-recall">MR</button>
                    <button class="btn memory-btn" data-action="memory-add">M+</button>
                    <button class="btn memory-btn" data-action="memory-subtract">M-</button>
                    
                    <button class="btn clear-btn" data-action="clear-entry">CE</button>
                    <button class="btn clear-btn" data-action="clear-all">C</button>
                    <button class="btn operation-btn" data-action="backspace">⌫</button>
                    <button class="btn operation-btn" data-action="divide">÷</button>
                    
                    <button class="btn number-btn" data-number="7">7</button>
                    <button class="btn number-btn" data-number="8">8</button>
                    <button class="btn number-btn" data-number="9">9</button>
                    <button class="btn operation-btn" data-action="multiply">×</button>
                    
                    <button class="btn number-btn" data-number="4">4</button>
                    <button class="btn number-btn" data-number="5">5</button>
                    <button class="btn number-btn" data-number="6">6</button>
                    <button class="btn operation-btn" data-action="subtract">-</button>
                    
                    <button class="btn number-btn" data-number="1">1</button>
                    <button class="btn number-btn" data-number="2">2</button>
                    <button class="btn number-btn" data-number="3">3</button>
                    <button class="btn operation-btn" data-action="add">+</button>
                    
                    <button class="btn function-btn" data-action="sign-toggle">±</button>
                    <button class="btn number-btn" data-number="0">0</button>
                    <button class="btn function-btn" data-action="decimal">.</button>
                    <button class="btn equals-btn" data-action="equals">=</button>
                    
                    <button class="btn function-btn" data-action="percentage">%</button>
                    <button class="btn function-btn" data-action="square-root">√</button>
                    <button class="btn function-btn" data-action="square">x²</button>
                    <button class="btn function-btn" data-action="history-toggle">History</button>
                </div>
                
                <div class="history-panel" id="historyPanel">
                    <div class="history-header">
                        <h3>Calculation History</h3>
                        <button class="btn clear-history-btn" id="clearHistoryBtn">Clear History</button>
                    </div>
                    <div class="history-list" id="historyList"></div>
                </div>
            </div>
            
            <div class="error-modal" id="errorModal">
                <div class="error-content">
                    <span class="error-close" id="errorClose">&times;</span>
                    <h3>Error</h3>
                    <p id="errorMessage"></p>
                </div>
            </div>
        </div>
    `;
});

// Clean up after each test
afterEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
    localStorageMock.clear.mockClear();
    document.body.innerHTML = '';
});