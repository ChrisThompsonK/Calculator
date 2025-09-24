
class MemoryManager {
    constructor() {
        this.memoryValue = 0;
        this.memoryIndicator = document.getElementById('memoryIndicator');
        this.hasMemoryValue = false;
    }
    
    
    store(value) {
        this.memoryValue = value;
        this.hasMemoryValue = true;
        this.updateMemoryIndicator();
    }
    
    
    recall() {
        return this.memoryValue;
    }
    
    
    add(value) {
        this.memoryValue = this.memoryValue + value;
        this.hasMemoryValue = this.memoryValue !== 0;
        this.updateMemoryIndicator();
    }
    
    
    subtract(value) {
        this.memoryValue -= value;
        this.hasMemoryValue = this.memoryValue !== 0;
        this.updateMemoryIndicator();
    }
    
    
    clear() {
        this.memoryValue = 0;
        this.hasMemoryValue = false;
    }
    
    
    updateMemoryIndicator() {
        if (this.hasMemoryValue && this.memoryValue !== 0) {
            this.memoryIndicator.classList.add('active');
        } else {
            this.memoryIndicator.classList.remove('active');
        }
    }
    
    
    hasValue() {
        return this.hasMemoryValue && this.memoryValue !== 0;
    }
    
    
    getValue() {
        return this.memoryValue;
    }
}


window.MemoryManager = MemoryManager;