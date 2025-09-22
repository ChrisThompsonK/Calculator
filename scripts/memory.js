/**
 * Memory Management Module
 * Handles memory functions (MC, MR, M+, M-, MS)
 */
class MemoryManager {
    constructor() {
        this.memoryValue = 0;
        this.memoryIndicator = document.getElementById('memoryIndicator');
        this.hasMemoryValue = false;
    }
    
    /**
     * Store a value in memory
     * @param {number} value - The value to store
     */
    store(value) {
        this.memoryValue = value;
        this.hasMemoryValue = true;
        this.updateMemoryIndicator();
    }
    
    /**
     * Recall the value from memory
     * @returns {number} The stored memory value
     */
    recall() {
        return this.memoryValue;
    }
    
    /**
     * Add a value to memory
     * @param {number} value - The value to add to memory
     */
    add(value) {
        this.memoryValue += value;
        this.hasMemoryValue = this.memoryValue !== 0;
        this.updateMemoryIndicator();
    }
    
    /**
     * Subtract a value from memory
     * @param {number} value - The value to subtract from memory
     */
    subtract(value) {
        this.memoryValue -= value;
        this.hasMemoryValue = this.memoryValue !== 0;
        this.updateMemoryIndicator();
    }
    
    /**
     * Clear memory
     */
    clear() {
        this.memoryValue = 0;
        this.hasMemoryValue = false;
        this.updateMemoryIndicator();
    }
    
    /**
     * Update the memory indicator visibility
     */
    updateMemoryIndicator() {
        if (this.hasMemoryValue && this.memoryValue !== 0) {
            this.memoryIndicator.classList.add('active');
        } else {
            this.memoryIndicator.classList.remove('active');
        }
    }
    
    /**
     * Check if memory has a value
     * @returns {boolean} True if memory contains a non-zero value
     */
    hasValue() {
        return this.hasMemoryValue && this.memoryValue !== 0;
    }
    
    /**
     * Get the current memory value
     * @returns {number} The current memory value
     */
    getValue() {
        return this.memoryValue;
    }
}

// Export for use in other modules
window.MemoryManager = MemoryManager;