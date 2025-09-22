/**
 * History Manager Tests
 * Tests for calculation history functionality
 */

// Import the history manager
require('../scripts/history.js');

describe('HistoryManager', () => {
    let historyManager;

    beforeEach(() => {
        historyManager = new HistoryManager();
        // Clear localStorage before each test
        localStorage.clear();
    });

    describe('History Initialization', () => {
        test('should initialize with empty history', () => {
            expect(historyManager.getAllCalculations()).toHaveLength(0);
            expect(historyManager.getLastCalculation()).toBeNull();
        });

        test('should initialize history panel as hidden', () => {
            expect(historyManager.isHistoryVisible).toBe(false);
            expect(document.getElementById('historyPanel').classList.contains('active')).toBe(false);
        });
    });

    describe('Adding Calculations', () => {
        test('should add calculations to history', () => {
            historyManager.addCalculation('5 + 3', '8');
            
            const calculations = historyManager.getAllCalculations();
            expect(calculations).toHaveLength(1);
            expect(calculations[0].expression).toBe('5 + 3');
            expect(calculations[0].result).toBe('8');
            expect(calculations[0].timestamp).toBeDefined();
        });

        test('should add multiple calculations', () => {
            historyManager.addCalculation('5 + 3', '8');
            historyManager.addCalculation('10 - 2', '8');
            historyManager.addCalculation('4 * 2', '8');
            
            expect(historyManager.getAllCalculations()).toHaveLength(3);
        });

        test('should add new calculations to the beginning', () => {
            historyManager.addCalculation('first', '1');
            historyManager.addCalculation('second', '2');
            
            const calculations = historyManager.getAllCalculations();
            expect(calculations[0].expression).toBe('second');
            expect(calculations[1].expression).toBe('first');
        });

        test('should get last calculation correctly', () => {
            historyManager.addCalculation('5 + 3', '8');
            historyManager.addCalculation('10 - 2', '8');
            
            const lastCalc = historyManager.getLastCalculation();
            expect(lastCalc.expression).toBe('10 - 2');
        });
    });

    describe('History Limits', () => {
        test('should limit history to maximum items', () => {
            // Add more than the maximum (50 items)
            for (let i = 0; i < 60; i++) {
                historyManager.addCalculation(`${i} + 1`, `${i + 1}`);
            }
            
            expect(historyManager.getAllCalculations()).toHaveLength(50);
        });

        test('should keep most recent calculations when at limit', () => {
            // Add 52 calculations
            for (let i = 0; i < 52; i++) {
                historyManager.addCalculation(`${i} + 1`, `${i + 1}`);
            }
            
            const calculations = historyManager.getAllCalculations();
            expect(calculations).toHaveLength(50);
            // Most recent should be first
            expect(calculations[0].expression).toBe('51 + 1');
            expect(calculations[49].expression).toBe('2 + 1');
        });
    });

    describe('History Display', () => {
        test('should show empty message when no history', () => {
            historyManager.updateHistoryDisplay();
            
            const historyList = document.getElementById('historyList');
            expect(historyList.children).toHaveLength(1);
            expect(historyList.children[0].textContent).toBe('No calculations yet');
        });

        test('should display calculations in history list', () => {
            historyManager.addCalculation('5 + 3', '8');
            historyManager.addCalculation('10 * 2', '20');
            
            const historyList = document.getElementById('historyList');
            expect(historyList.children).toHaveLength(2);
            
            // Check first item (most recent)
            expect(historyList.children[0].textContent).toContain('10 * 2 = 20');
            // Check second item
            expect(historyList.children[1].textContent).toContain('5 + 3 = 8');
        });

        test('should include timestamps in display', () => {
            historyManager.addCalculation('5 + 3', '8');
            
            const historyList = document.getElementById('historyList');
            const historyItem = historyList.children[0];
            
            // Should contain timestamp
            expect(historyItem.innerHTML).toMatch(/\d{1,2}:\d{2}:\d{2}/);
        });
    });

    describe('History Panel Toggle', () => {
        test('should toggle history panel visibility', () => {
            const historyPanel = document.getElementById('historyPanel');
            const toggleButton = document.querySelector('[data-action="history-toggle"]');
            
            // Initially hidden
            expect(historyPanel.classList.contains('active')).toBe(false);
            expect(toggleButton.textContent).toBe('History');
            
            // Toggle to show
            historyManager.toggleHistory();
            expect(historyPanel.classList.contains('active')).toBe(true);
            expect(toggleButton.textContent).toBe('Hide');
            
            // Toggle to hide
            historyManager.toggleHistory();
            expect(historyPanel.classList.contains('active')).toBe(false);
            expect(toggleButton.textContent).toBe('History');
        });

        test('should update internal state when toggling', () => {
            expect(historyManager.isHistoryVisible).toBe(false);
            
            historyManager.toggleHistory();
            expect(historyManager.isHistoryVisible).toBe(true);
            
            historyManager.toggleHistory();
            expect(historyManager.isHistoryVisible).toBe(false);
        });
    });

    describe('Clear History', () => {
        test('should clear all calculations', () => {
            historyManager.addCalculation('5 + 3', '8');
            historyManager.addCalculation('10 - 2', '8');
            
            historyManager.clearHistory();
            
            expect(historyManager.getAllCalculations()).toHaveLength(0);
            expect(historyManager.getLastCalculation()).toBeNull();
        });

        test('should update display after clearing', () => {
            historyManager.addCalculation('5 + 3', '8');
            historyManager.clearHistory();
            
            const historyList = document.getElementById('historyList');
            expect(historyList.children).toHaveLength(1);
            expect(historyList.children[0].textContent).toBe('No calculations yet');
        });
    });

    describe('Local Storage Integration', () => {
        test('should save history to localStorage', () => {
            historyManager.addCalculation('5 + 3', '8');
            
            expect(localStorage.setItem).toHaveBeenCalledWith(
                'calculatorHistory', 
                expect.stringContaining('5 + 3')
            );
        });

        test('should handle localStorage errors gracefully', () => {
            // Mock localStorage to throw an error
            const originalSetItem = localStorage.setItem;
            localStorage.setItem = jest.fn(() => {
                throw new Error('Storage full');
            });
            
            // Should not throw
            expect(() => {
                historyManager.addCalculation('5 + 3', '8');
            }).not.toThrow();
            
            // Restore original
            localStorage.setItem = originalSetItem;
        });

        test('should load history from localStorage', () => {
            const mockHistory = [
                { expression: '5 + 3', result: '8', timestamp: '12:00:00' }
            ];
            
            localStorage.getItem.mockReturnValue(JSON.stringify(mockHistory));
            
            const newHistoryManager = new HistoryManager();
            expect(newHistoryManager.getAllCalculations()).toHaveLength(1);
            expect(newHistoryManager.getLastCalculation().expression).toBe('5 + 3');
        });

        test('should handle corrupted localStorage data', () => {
            localStorage.getItem.mockReturnValue('invalid json');
            
            // Should not throw and should initialize empty
            const newHistoryManager = new HistoryManager();
            expect(newHistoryManager.getAllCalculations()).toHaveLength(0);
        });
    });

    describe('History Export', () => {
        test('should export empty history message', () => {
            const exported = historyManager.exportHistory();
            expect(exported).toBe('No calculations in history');
        });

        test('should export history as formatted text', () => {
            historyManager.addCalculation('5 + 3', '8');
            historyManager.addCalculation('10 * 2', '20');
            
            const exported = historyManager.exportHistory();
            
            expect(exported).toContain('Calculator History');
            expect(exported).toContain('5 + 3 = 8');
            expect(exported).toContain('10 * 2 = 20');
            expect(exported).toContain('1.');
            expect(exported).toContain('2.');
        });

        test('should include timestamps in export', () => {
            historyManager.addCalculation('5 + 3', '8');
            
            const exported = historyManager.exportHistory();
            expect(exported).toMatch(/\d{1,2}:\d{2}:\d{2}/);
        });
    });

    describe('Edge Cases', () => {
        test('should handle empty expressions and results', () => {
            historyManager.addCalculation('', '');
            
            const calculations = historyManager.getAllCalculations();
            expect(calculations).toHaveLength(1);
            expect(calculations[0].expression).toBe('');
            expect(calculations[0].result).toBe('');
        });

        test('should handle special characters in expressions', () => {
            historyManager.addCalculation('√25', '5');
            historyManager.addCalculation('5²', '25');
            
            const calculations = historyManager.getAllCalculations();
            expect(calculations[1].expression).toBe('√25');
            expect(calculations[0].expression).toBe('5²');
        });

        test('should handle very long expressions', () => {
            const longExpression = '1'.repeat(1000);
            historyManager.addCalculation(longExpression, '1');
            
            const calculations = historyManager.getAllCalculations();
            expect(calculations[0].expression).toBe(longExpression);
        });
    });
});