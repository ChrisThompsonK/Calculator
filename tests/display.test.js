/**
 * Display Manager Tests
 * Tests for display functionality and number formatting
 */

// Import the display manager
require('../scripts/display.js');

describe('DisplayManager', () => {
    let displayManager;

    beforeEach(() => {
        displayManager = new DisplayManager();
    });

    describe('Basic Display Operations', () => {
        test('should initialize with default values', () => {
            expect(displayManager.getCurrentValue()).toBe(0);
            expect(displayManager.getCurrentValueString()).toBe('0');
            expect(document.getElementById('mainDisplay').textContent).toBe('0');
        });

        test('should update main display correctly', () => {
            displayManager.updateMainDisplay('123');
            expect(document.getElementById('mainDisplay').textContent).toBe('123');
            expect(displayManager.getCurrentValueString()).toBe('123');
        });

        test('should handle null and undefined values', () => {
            displayManager.updateMainDisplay(null);
            expect(displayManager.getCurrentValueString()).toBe('0');
            
            displayManager.updateMainDisplay(undefined);
            expect(displayManager.getCurrentValueString()).toBe('0');
        });

        test('should update history display', () => {
            displayManager.updateHistoryDisplay('5 + 3');
            expect(document.getElementById('historyDisplay').textContent).toBe('5 + 3');
        });

        test('should update operation display', () => {
            displayManager.updateOperationDisplay('+');
            expect(document.getElementById('operationDisplay').textContent).toBe('+');
        });
    });

    describe('Number Input', () => {
        test('should append digits correctly', () => {
            displayManager.appendDigit('1');
            displayManager.appendDigit('2');
            displayManager.appendDigit('3');
            expect(displayManager.getCurrentValueString()).toBe('123');
        });

        test('should replace zero with first digit', () => {
            displayManager.appendDigit('5');
            expect(displayManager.getCurrentValueString()).toBe('5');
        });

        test('should respect maximum digit limit', () => {
            // Add 20 digits (more than max of 15)
            for (let i = 0; i < 20; i++) {
                displayManager.appendDigit('9');
            }
            expect(displayManager.getCurrentValueString().length).toBeLessThanOrEqual(15);
        });

        test('should handle new number flag correctly', () => {
            displayManager.appendDigit('5');
            displayManager.startNewNumber();
            displayManager.appendDigit('3');
            expect(displayManager.getCurrentValueString()).toBe('3');
        });
    });

    describe('Decimal Operations', () => {
        test('should add decimal point', () => {
            displayManager.appendDigit('1');
            displayManager.addDecimal();
            displayManager.appendDigit('5');
            expect(displayManager.getCurrentValueString()).toBe('1.5');
        });

        test('should not add multiple decimal points', () => {
            displayManager.appendDigit('1');
            displayManager.addDecimal();
            displayManager.addDecimal(); // Should be ignored
            displayManager.appendDigit('5');
            expect(displayManager.getCurrentValueString()).toBe('1.5');
        });

        test('should start with 0. when decimal is first input', () => {
            displayManager.addDecimal();
            expect(displayManager.getCurrentValueString()).toBe('0.');
        });
    });

    describe('Clear Operations', () => {
        test('should clear entry', () => {
            displayManager.appendDigit('1');
            displayManager.appendDigit('2');
            displayManager.appendDigit('3');
            displayManager.clearEntry();
            expect(displayManager.getCurrentValueString()).toBe('0');
        });

        test('should clear all displays', () => {
            displayManager.updateMainDisplay('123');
            displayManager.updateHistoryDisplay('old calc');
            displayManager.updateOperationDisplay('+');
            
            displayManager.clearAll();
            
            expect(displayManager.getCurrentValueString()).toBe('0');
            expect(document.getElementById('historyDisplay').textContent).toBe('');
            expect(document.getElementById('operationDisplay').textContent).toBe('');
        });
    });

    describe('Backspace Operations', () => {
        test('should remove last digit', () => {
            displayManager.appendDigit('1');
            displayManager.appendDigit('2');
            displayManager.appendDigit('3');
            displayManager.backspace();
            expect(displayManager.getCurrentValueString()).toBe('12');
        });

        test('should handle decimal point removal', () => {
            displayManager.appendDigit('1');
            displayManager.addDecimal();
            displayManager.backspace();
            expect(displayManager.getCurrentValueString()).toBe('1');
            expect(displayManager.hasDecimal).toBe(false);
        });

        test('should reset to zero when last digit removed', () => {
            displayManager.appendDigit('5');
            displayManager.backspace();
            expect(displayManager.getCurrentValueString()).toBe('0');
        });
    });

    describe('Sign Toggle', () => {
        test('should toggle positive to negative', () => {
            displayManager.appendDigit('5');
            displayManager.toggleSign();
            expect(displayManager.getCurrentValueString()).toBe('-5');
        });

        test('should toggle negative to positive', () => {
            displayManager.appendDigit('5');
            displayManager.toggleSign();
            displayManager.toggleSign();
            expect(displayManager.getCurrentValueString()).toBe('5');
        });

        test('should not affect zero', () => {
            displayManager.toggleSign();
            expect(displayManager.getCurrentValueString()).toBe('0');
        });
    });

    describe('Number Formatting', () => {
        test('should format regular numbers', () => {
            expect(displayManager.formatNumber(123.456)).toBe('123.456');
        });

        test('should handle scientific notation for large numbers', () => {
            const largeNumber = Math.pow(10, 16);
            const formatted = displayManager.formatNumber(largeNumber);
            expect(formatted).toContain('e');
        });

        test('should handle scientific notation for small numbers', () => {
            const smallNumber = Math.pow(10, -7);
            const formatted = displayManager.formatNumber(smallNumber);
            expect(formatted).toContain('e');
        });

        test('should return "Error" for invalid numbers', () => {
            expect(displayManager.formatNumber(NaN)).toBe('Error');
            expect(displayManager.formatNumber(Infinity)).toBe('Error');
        });
    });

    describe('Error Handling', () => {
        test('should show error modal', () => {
            displayManager.showError('Test error');
            expect(document.getElementById('errorModal').style.display).toBe('block');
            expect(document.getElementById('errorMessage').textContent).toBe('Test error');
        });

        test('should hide error modal', () => {
            displayManager.showError('Test error');
            displayManager.hideError();
            expect(document.getElementById('errorModal').style.display).toBe('none');
        });
    });

    describe('Utility Functions', () => {
        test('should detect zero correctly', () => {
            expect(displayManager.isZero()).toBe(true);
            displayManager.appendDigit('5');
            expect(displayManager.isZero()).toBe(false);
        });

        test('should get current value as number', () => {
            displayManager.appendDigit('1');
            displayManager.appendDigit('2');
            displayManager.addDecimal();
            displayManager.appendDigit('5');
            expect(displayManager.getCurrentValue()).toBe(12.5);
        });
    });
});