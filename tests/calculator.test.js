/**
 * Calculator Integration Tests
 * Tests for main calculator functionality and integration between modules
 */

// Import all modules
require('../scripts/display.js');
require('../scripts/memory.js');
require('../scripts/history.js');
require('../scripts/calculator.js');

describe('Calculator Integration', () => {
    let calculator;

    beforeEach(() => {
        // Mock global calculator instance
        window.calculator = null;
        calculator = new Calculator();
    });

    describe('Basic Arithmetic Operations', () => {
        test('should perform addition correctly', () => {
            calculator.handleNumberInput('5');
            calculator.handleAction('add');
            calculator.handleNumberInput('3');
            calculator.handleAction('equals');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(8);
        });

        test('should perform subtraction correctly', () => {
            calculator.handleNumberInput('10');
            calculator.handleAction('subtract');
            calculator.handleNumberInput('4');
            calculator.handleAction('equals');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(6);
        });

        test('should perform multiplication correctly', () => {
            calculator.handleNumberInput('6');
            calculator.handleAction('multiply');
            calculator.handleNumberInput('7');
            calculator.handleAction('equals');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(42);
        });

        test('should perform division correctly', () => {
            calculator.handleNumberInput('15');
            calculator.handleAction('divide');
            calculator.handleNumberInput('3');
            calculator.handleAction('equals');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(5);
        });

        test('should handle decimal calculations', () => {
            calculator.handleNumberInput('2');
            calculator.handleAction('decimal');
            calculator.handleNumberInput('5');
            calculator.handleAction('multiply');
            calculator.handleNumberInput('4');
            calculator.handleAction('equals');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(10);
        });
    });

    describe('Chain Calculations', () => {
        test('should handle multiple operations in sequence', () => {
            calculator.handleNumberInput('5');
            calculator.handleAction('add');
            calculator.handleNumberInput('3');
            calculator.handleAction('multiply');
            calculator.handleNumberInput('2');
            calculator.handleAction('equals');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(16);
        });

        test('should update display during chain operations', () => {
            calculator.handleNumberInput('10');
            calculator.handleAction('add');
            calculator.handleNumberInput('5');
            calculator.handleAction('subtract'); // Should show 15 and continue
            
            expect(calculator.displayManager.getCurrentValue()).toBe(15);
            expect(calculator.previousValue).toBe(15);
        });
    });

    describe('Error Handling', () => {
        test('should handle division by zero', () => {
            calculator.handleNumberInput('5');
            calculator.handleAction('divide');
            calculator.handleNumberInput('0');
            calculator.handleAction('equals');
            
            // Error should be shown, display should not change
            expect(document.getElementById('errorModal').style.display).toBe('block');
        });

        test('should handle square root of negative number', () => {
            calculator.handleNumberInput('5');
            calculator.handleAction('sign-toggle');
            calculator.handleAction('square-root');
            
            expect(document.getElementById('errorModal').style.display).toBe('block');
        });

        test('should recover from errors', () => {
            // Cause an error
            calculator.handleNumberInput('5');
            calculator.handleAction('divide');
            calculator.handleNumberInput('0');
            calculator.handleAction('equals');
            
            // Clear and continue normally
            calculator.handleAction('clear-all');
            calculator.handleNumberInput('3');
            calculator.handleAction('add');
            calculator.handleNumberInput('2');
            calculator.handleAction('equals');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(5);
        });
    });

    describe('Advanced Functions', () => {
        test('should calculate percentage', () => {
            calculator.handleNumberInput('50');
            calculator.handleAction('percentage');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(0.5);
        });

        test('should calculate square root', () => {
            calculator.handleNumberInput('25');
            calculator.handleAction('square-root');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(5);
        });

        test('should calculate square', () => {
            calculator.handleNumberInput('6');
            calculator.handleAction('square');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(36);
        });

        test('should toggle sign', () => {
            calculator.handleNumberInput('42');
            calculator.handleAction('sign-toggle');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(-42);
        });
    });

    describe('Memory Operations Integration', () => {
        test('should store and recall memory', () => {
            calculator.handleNumberInput('123');
            calculator.handleAction('memory-store');
            
            calculator.handleAction('clear-all');
            calculator.handleAction('memory-recall');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(123);
        });

        test('should perform memory arithmetic', () => {
            // Store 10 in memory
            calculator.handleNumberInput('10');
            calculator.handleAction('memory-store');
            
            // Add 5 to memory
            calculator.handleNumberInput('5');
            calculator.handleAction('memory-add');
            
            // Recall should give 15
            calculator.handleAction('memory-recall');
            expect(calculator.displayManager.getCurrentValue()).toBe(15);
        });

        test('should show memory indicator', () => {
            calculator.handleNumberInput('42');
            calculator.handleAction('memory-store');
            
            const indicator = document.getElementById('memoryIndicator');
            expect(indicator.classList.contains('active')).toBe(true);
        });
    });

    describe('History Integration', () => {
        test('should add calculations to history', () => {
            calculator.handleNumberInput('8');
            calculator.handleAction('add');
            calculator.handleNumberInput('7');
            calculator.handleAction('equals');
            
            const history = calculator.historyManager.getAllCalculations();
            expect(history).toHaveLength(1);
            expect(history[0].expression).toBe('8 + 7');
            expect(history[0].result).toBe('15');
        });

        test('should update history display after calculation', () => {
            calculator.handleNumberInput('5');
            calculator.handleAction('multiply');
            calculator.handleNumberInput('4');
            calculator.handleAction('equals');
            
            const historyDisplay = document.getElementById('historyDisplay');
            expect(historyDisplay.textContent).toBe('5 × 4');
        });
    });

    describe('Clear Operations', () => {
        test('should clear entry only', () => {
            calculator.handleNumberInput('123');
            calculator.handleAction('add');
            calculator.handleNumberInput('456');
            calculator.handleAction('clear-entry');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(0);
            expect(calculator.previousValue).toBe(123);
            expect(calculator.currentOperator).toBe('add');
        });

        test('should clear all', () => {
            calculator.handleNumberInput('123');
            calculator.handleAction('add');
            calculator.handleNumberInput('456');
            calculator.handleAction('clear-all');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(0);
            expect(calculator.previousValue).toBe(null);
            expect(calculator.currentOperator).toBe(null);
        });
    });

    describe('Backspace Operations', () => {
        test('should remove digits with backspace', () => {
            calculator.handleNumberInput('123');
            calculator.handleAction('backspace');
            
            expect(calculator.displayManager.getCurrentValueString()).toBe('12');
        });

        test('should not affect completed calculations', () => {
            calculator.handleNumberInput('5');
            calculator.handleAction('add');
            calculator.handleNumberInput('3');
            calculator.handleAction('equals');
            calculator.handleAction('backspace');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(8);
        });
    });

    describe('Keyboard Input', () => {
        test('should handle number key presses', () => {
            calculator.handleKeyboardInput('5');
            calculator.handleKeyboardInput('7');
            
            expect(calculator.displayManager.getCurrentValueString()).toBe('57');
        });

        test('should handle operation key presses', () => {
            calculator.handleKeyboardInput('5');
            calculator.handleKeyboardInput('+');
            calculator.handleKeyboardInput('3');
            calculator.handleKeyboardInput('=');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(8);
        });

        test('should handle Enter as equals', () => {
            calculator.handleKeyboardInput('6');
            calculator.handleKeyboardInput('*');
            calculator.handleKeyboardInput('7');
            calculator.handleKeyboardInput('Enter');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(42);
        });

        test('should handle Escape as clear all', () => {
            calculator.handleNumberInput('123');
            calculator.handleAction('add');
            calculator.handleKeyboardInput('Escape');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(0);
            expect(calculator.previousValue).toBe(null);
        });
    });

    describe('State Management', () => {
        test('should maintain correct state during operations', () => {
            calculator.handleNumberInput('10');
            calculator.handleAction('multiply');
            
            const state = calculator.getState();
            expect(state.currentValue).toBe(10);
            expect(state.previousValue).toBe(10);
            expect(state.currentOperator).toBe('multiply');
        });

        test('should reset state correctly', () => {
            calculator.handleNumberInput('42');
            calculator.handleAction('memory-store');
            calculator.historyManager.addCalculation('test', 'test');
            
            calculator.reset();
            
            const state = calculator.getState();
            expect(state.currentValue).toBe(0);
            expect(state.previousValue).toBe(null);
            expect(state.currentOperator).toBe(null);
            expect(state.hasMemory).toBe(false);
            expect(state.historyCount).toBe(0);
        });
    });

    describe('Edge Cases and Boundary Conditions', () => {
        test('should handle very large numbers', () => {
            const largeNum = '999999999999999';
            largeNum.split('').forEach(digit => {
                calculator.handleNumberInput(digit);
            });
            
            expect(calculator.displayManager.getCurrentValue()).toBe(999999999999999);
        });

        test('should handle very small decimal numbers', () => {
            calculator.handleNumberInput('0');
            calculator.handleAction('decimal');
            calculator.handleNumberInput('0');
            calculator.handleNumberInput('0');
            calculator.handleNumberInput('1');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(0.001);
        });

        test('should handle multiple consecutive operations', () => {
            calculator.handleNumberInput('5');
            calculator.handleAction('add');
            calculator.handleAction('multiply');
            calculator.handleAction('subtract');
            calculator.handleNumberInput('2');
            calculator.handleAction('equals');
            
            expect(calculator.displayManager.getCurrentValue()).toBe(3);
        });

        test('should handle equals without second operand', () => {
            calculator.handleNumberInput('5');
            calculator.handleAction('add');
            calculator.handleAction('equals');
            
            // Should maintain current value
            expect(calculator.displayManager.getCurrentValue()).toBe(5);
        });
    });
});