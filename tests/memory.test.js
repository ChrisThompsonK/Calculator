/**
 * Memory Manager Tests
 * Tests for memory functionality (MC, MR, M+, M-, MS)
 */

// Import the memory manager
require('../scripts/memory.js');

describe('MemoryManager', () => {
    let memoryManager;

    beforeEach(() => {
        memoryManager = new MemoryManager();
    });

    describe('Memory Storage', () => {
        test('should initialize with zero memory', () => {
            expect(memoryManager.getValue()).toBe(0);
            expect(memoryManager.hasValue()).toBe(false);
        });

        test('should store values correctly', () => {
            memoryManager.store(42);
            expect(memoryManager.getValue()).toBe(42);
            expect(memoryManager.hasValue()).toBe(true);
        });

        test('should recall stored values', () => {
            memoryManager.store(123.45);
            expect(memoryManager.recall()).toBe(123.45);
        });

        test('should handle negative values', () => {
            memoryManager.store(-789);
            expect(memoryManager.getValue()).toBe(-789);
            expect(memoryManager.hasValue()).toBe(true);
        });

        test('should handle zero storage', () => {
            memoryManager.store(42);
            memoryManager.store(0);
            expect(memoryManager.getValue()).toBe(0);
            expect(memoryManager.hasValue()).toBe(false);
        });
    });

    describe('Memory Arithmetic', () => {
        test('should add to memory', () => {
            memoryManager.store(10);
            memoryManager.add(5);
            expect(memoryManager.getValue()).toBe(15);
        });

        test('should subtract from memory', () => {
            memoryManager.store(10);
            memoryManager.subtract(3);
            expect(memoryManager.getValue()).toBe(7);
        });

        test('should handle adding to empty memory', () => {
            memoryManager.add(25);
            expect(memoryManager.getValue()).toBe(25);
            expect(memoryManager.hasValue()).toBe(true);
        });

        test('should handle subtracting from empty memory', () => {
            memoryManager.subtract(15);
            expect(memoryManager.getValue()).toBe(-15);
            expect(memoryManager.hasValue()).toBe(true);
        });

        test('should handle operations resulting in zero', () => {
            memoryManager.store(10);
            memoryManager.subtract(10);
            expect(memoryManager.getValue()).toBe(0);
            expect(memoryManager.hasValue()).toBe(false);
        });

        test('should handle decimal operations', () => {
            memoryManager.store(1.5);
            memoryManager.add(2.3);
            expect(memoryManager.getValue()).toBeCloseTo(3.8);
        });
    });

    describe('Memory Clear', () => {
        test('should clear memory', () => {
            memoryManager.store(999);
            memoryManager.clear();
            expect(memoryManager.getValue()).toBe(0);
            expect(memoryManager.hasValue()).toBe(false);
        });

        test('should clear memory even with zero value', () => {
            memoryManager.store(0);
            memoryManager.clear();
            expect(memoryManager.getValue()).toBe(0);
            expect(memoryManager.hasValue()).toBe(false);
        });
    });

    describe('Memory Indicator', () => {
        test('should show indicator when memory has value', () => {
            const indicator = document.getElementById('memoryIndicator');
            
            memoryManager.store(42);
            expect(indicator.classList.contains('active')).toBe(true);
        });

        test('should hide indicator when memory is empty', () => {
            const indicator = document.getElementById('memoryIndicator');
            
            memoryManager.store(42);
            memoryManager.clear();
            expect(indicator.classList.contains('active')).toBe(false);
        });

        test('should hide indicator when memory becomes zero', () => {
            const indicator = document.getElementById('memoryIndicator');
            
            memoryManager.store(42);
            memoryManager.subtract(42);
            expect(indicator.classList.contains('active')).toBe(false);
        });

        test('should update indicator correctly during operations', () => {
            const indicator = document.getElementById('memoryIndicator');
            
            // Start with no memory
            expect(indicator.classList.contains('active')).toBe(false);
            
            // Add to memory
            memoryManager.add(10);
            expect(indicator.classList.contains('active')).toBe(true);
            
            // Subtract to make zero
            memoryManager.subtract(10);
            expect(indicator.classList.contains('active')).toBe(false);
        });
    });

    describe('Memory State Persistence', () => {
        test('should maintain memory through multiple operations', () => {
            memoryManager.store(100);
            memoryManager.add(50);
            memoryManager.subtract(25);
            memoryManager.add(75);
            
            expect(memoryManager.getValue()).toBe(200);
            expect(memoryManager.hasValue()).toBe(true);
        });

        test('should handle large numbers', () => {
            const largeNumber = 1e10;
            memoryManager.store(largeNumber);
            expect(memoryManager.getValue()).toBe(largeNumber);
        });

        test('should handle very small numbers', () => {
            const smallNumber = 1e-10;
            memoryManager.store(smallNumber);
            expect(memoryManager.getValue()).toBe(smallNumber);
            expect(memoryManager.hasValue()).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        test('should handle infinity', () => {
            memoryManager.store(Infinity);
            expect(memoryManager.getValue()).toBe(Infinity);
            expect(memoryManager.hasValue()).toBe(true);
        });

        test('should handle negative infinity', () => {
            memoryManager.store(-Infinity);
            expect(memoryManager.getValue()).toBe(-Infinity);
            expect(memoryManager.hasValue()).toBe(true);
        });

        test('should handle NaN', () => {
            memoryManager.store(NaN);
            expect(isNaN(memoryManager.getValue())).toBe(true);
            // NaN should still be considered as having a value for indicator purposes
            expect(memoryManager.hasValue()).toBe(true);
        });

        test('should handle rapid successive operations', () => {
            memoryManager.store(1);
            for (let i = 0; i < 100; i++) {
                memoryManager.add(1);
            }
            expect(memoryManager.getValue()).toBe(101);
        });
    });
});