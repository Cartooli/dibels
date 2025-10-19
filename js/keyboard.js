// DIBELS Practice Lab - Keyboard Navigation System
class KeyboardNavigation {
    constructor() {
        this.currentFocusIndex = 0;
        this.focusableElements = [];
        this.isEnabled = true;
        this.shortcuts = new Map();
        this.init();
    }

    init() {
        this.setupKeyboardShortcuts();
        this.setupFocusManagement();
        this.setupKeyboardHandlers();
        this.updateFocusableElements();
        
        // Update focusable elements when DOM changes
        const observer = new MutationObserver(() => {
            this.updateFocusableElements();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    setupKeyboardShortcuts() {
        // Global shortcuts
        this.shortcuts.set('Escape', () => this.handleEscape());
        this.shortcuts.set('F1', () => this.showKeyboardShortcuts());
        this.shortcuts.set('Alt+h', () => this.toggleHighContrast());
        this.shortcuts.set('Alt+t', () => this.toggleTheme());
        this.shortcuts.set('Alt+f', () => this.toggleFontSize());
        
        // Practice shortcuts
        this.shortcuts.set('Space', () => this.handleSpace());
        this.shortcuts.set('Enter', () => this.handleEnter());
        this.shortcuts.set('ArrowUp', () => this.navigateUp());
        this.shortcuts.set('ArrowDown', () => this.navigateDown());
        this.shortcuts.set('ArrowLeft', () => this.navigateLeft());
        this.shortcuts.set('ArrowRight', () => this.navigateRight());
        this.shortcuts.set('Tab', () => this.navigateNext());
        this.shortcuts.set('Shift+Tab', () => this.navigatePrevious());
        
        // Practice control shortcuts
        this.shortcuts.set('p', () => this.pausePractice());
        this.shortcuts.set('r', () => this.resetPractice());
        this.shortcuts.set('n', () => this.newPracticeSet());
        this.shortcuts.set('m', () => this.backToMenu());
        this.shortcuts.set('s', () => this.startPractice());
        
        // Timer shortcuts
        this.shortcuts.set('+', () => this.increaseTimer());
        this.shortcuts.set('-', () => this.decreaseTimer());
        this.shortcuts.set('=', () => this.toggleTimer());
    }

    setupFocusManagement() {
        // Ensure focus is visible
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });

        // Remove keyboard navigation class on mouse use
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    setupKeyboardHandlers() {
        document.addEventListener('keydown', (e) => {
            if (!this.isEnabled) return;

            const key = this.getKeyCombo(e);
            const handler = this.shortcuts.get(key);
            
            if (handler) {
                e.preventDefault();
                handler();
            }
        });
    }

    getKeyCombo(event) {
        const modifiers = [];
        if (event.ctrlKey) modifiers.push('Ctrl');
        if (event.altKey) modifiers.push('Alt');
        if (event.shiftKey) modifiers.push('Shift');
        if (event.metaKey) modifiers.push('Meta');
        
        const key = event.key;
        return modifiers.length > 0 ? `${modifiers.join('+')}+${key}` : key;
    }

    updateFocusableElements() {
        const selectors = [
            'button:not([disabled])',
            'input:not([disabled])',
            'select:not([disabled])',
            'textarea:not([disabled])',
            'a[href]',
            '[tabindex]:not([tabindex="-1"])',
            '.grade-btn',
            '.subtest-btn',
            '.option-item',
            '.module-card',
            '.control-btn',
            '.letter-item',
            '.word-item'
        ];

        this.focusableElements = Array.from(document.querySelectorAll(selectors.join(', ')))
            .filter(el => !el.hidden && el.offsetParent !== null);
    }

    // Navigation methods
    navigateNext() {
        this.currentFocusIndex = (this.currentFocusIndex + 1) % this.focusableElements.length;
        this.focusCurrentElement();
    }

    navigatePrevious() {
        this.currentFocusIndex = this.currentFocusIndex === 0 
            ? this.focusableElements.length - 1 
            : this.currentFocusIndex - 1;
        this.focusCurrentElement();
    }

    navigateUp() {
        const currentElement = this.focusableElements[this.currentFocusIndex];
        if (currentElement) {
            const rect = currentElement.getBoundingClientRect();
            const elementsAbove = this.focusableElements.filter(el => {
                const elRect = el.getBoundingClientRect();
                return elRect.top < rect.top && 
                       elRect.left <= rect.right && 
                       elRect.right >= rect.left;
            });
            
            if (elementsAbove.length > 0) {
                const closest = elementsAbove.reduce((closest, el) => {
                    const elRect = el.getBoundingClientRect();
                    const distance = Math.abs(elRect.bottom - rect.top);
                    return distance < closest.distance ? { element: el, distance } : closest;
                }, { element: elementsAbove[0], distance: Infinity });
                
                this.currentFocusIndex = this.focusableElements.indexOf(closest.element);
                this.focusCurrentElement();
            }
        }
    }

    navigateDown() {
        const currentElement = this.focusableElements[this.currentFocusIndex];
        if (currentElement) {
            const rect = currentElement.getBoundingClientRect();
            const elementsBelow = this.focusableElements.filter(el => {
                const elRect = el.getBoundingClientRect();
                return elRect.top > rect.bottom && 
                       elRect.left <= rect.right && 
                       elRect.right >= rect.left;
            });
            
            if (elementsBelow.length > 0) {
                const closest = elementsBelow.reduce((closest, el) => {
                    const elRect = el.getBoundingClientRect();
                    const distance = Math.abs(elRect.top - rect.bottom);
                    return distance < closest.distance ? { element: el, distance } : closest;
                }, { element: elementsBelow[0], distance: Infinity });
                
                this.currentFocusIndex = this.focusableElements.indexOf(closest.element);
                this.focusCurrentElement();
            }
        }
    }

    navigateLeft() {
        const currentElement = this.focusableElements[this.currentFocusIndex];
        if (currentElement) {
            const rect = currentElement.getBoundingClientRect();
            const elementsLeft = this.focusableElements.filter(el => {
                const elRect = el.getBoundingClientRect();
                return elRect.right < rect.left && 
                       elRect.top <= rect.bottom && 
                       elRect.bottom >= rect.top;
            });
            
            if (elementsLeft.length > 0) {
                const closest = elementsLeft.reduce((closest, el) => {
                    const elRect = el.getBoundingClientRect();
                    const distance = Math.abs(elRect.right - rect.left);
                    return distance < closest.distance ? { element: el, distance } : closest;
                }, { element: elementsLeft[0], distance: Infinity });
                
                this.currentFocusIndex = this.focusableElements.indexOf(closest.element);
                this.focusCurrentElement();
            }
        }
    }

    navigateRight() {
        const currentElement = this.focusableElements[this.currentFocusIndex];
        if (currentElement) {
            const rect = currentElement.getBoundingClientRect();
            const elementsRight = this.focusableElements.filter(el => {
                const elRect = el.getBoundingClientRect();
                return elRect.left > rect.right && 
                       elRect.top <= rect.bottom && 
                       elRect.bottom >= rect.top;
            });
            
            if (elementsRight.length > 0) {
                const closest = elementsRight.reduce((closest, el) => {
                    const elRect = el.getBoundingClientRect();
                    const distance = Math.abs(elRect.left - rect.right);
                    return distance < closest.distance ? { element: el, distance } : closest;
                }, { element: elementsRight[0], distance: Infinity });
                
                this.currentFocusIndex = this.focusableElements.indexOf(closest.element);
                this.focusCurrentElement();
            }
        }
    }

    focusCurrentElement() {
        if (this.focusableElements[this.currentFocusIndex]) {
            this.focusableElements[this.currentFocusIndex].focus();
        }
    }

    // Action handlers
    handleEscape() {
        // Close any open modals or return to main menu
        const modals = document.querySelectorAll('.educator-modal');
        if (modals.length > 0) {
            modals[modals.length - 1].remove();
        } else if (document.getElementById('practice-section') && !document.getElementById('practice-section').classList.contains('hidden')) {
            this.backToMenu();
        }
    }

    handleSpace() {
        const focusedElement = document.activeElement;
        if (focusedElement) {
            if (focusedElement.classList.contains('grade-btn') || 
                focusedElement.classList.contains('subtest-btn') ||
                focusedElement.classList.contains('option-item') ||
                focusedElement.classList.contains('module-card')) {
                focusedElement.click();
            } else if (focusedElement.classList.contains('letter-item') || 
                       focusedElement.classList.contains('word-item')) {
                focusedElement.click();
            }
        }
    }

    handleEnter() {
        const focusedElement = document.activeElement;
        if (focusedElement) {
            if (focusedElement.tagName === 'BUTTON' || focusedElement.tagName === 'A') {
                focusedElement.click();
            } else if (focusedElement.type === 'checkbox') {
                focusedElement.checked = !focusedElement.checked;
                focusedElement.dispatchEvent(new Event('change'));
            }
        }
    }

    // Practice control handlers
    pausePractice() {
        const pauseBtn = document.getElementById('pause-btn');
        if (pauseBtn && !pauseBtn.closest('.hidden')) {
            pauseBtn.click();
        }
    }

    resetPractice() {
        const resetBtn = document.getElementById('reset-btn');
        if (resetBtn && !resetBtn.closest('.hidden')) {
            resetBtn.click();
        }
    }

    newPracticeSet() {
        const newSetBtn = document.getElementById('new-set-btn');
        if (newSetBtn && !newSetBtn.closest('.hidden')) {
            newSetBtn.click();
        }
    }

    backToMenu() {
        const backBtn = document.getElementById('back-to-menu');
        if (backBtn && !backBtn.closest('.hidden')) {
            backBtn.click();
        }
    }

    startPractice() {
        const startBtn = document.getElementById('start-practice');
        if (startBtn && !startBtn.closest('.hidden')) {
            startBtn.click();
        }
    }

    // Utility handlers
    increaseTimer() {
        const timer = document.getElementById('timer');
        if (timer) {
            const currentTime = parseInt(timer.textContent);
            timer.textContent = Math.min(currentTime + 10, 300); // Max 5 minutes
        }
    }

    decreaseTimer() {
        const timer = document.getElementById('timer');
        if (timer) {
            const currentTime = parseInt(timer.textContent);
            timer.textContent = Math.max(currentTime - 10, 10); // Min 10 seconds
        }
    }

    toggleTimer() {
        const timerContainer = document.querySelector('.timer-container');
        if (timerContainer) {
            timerContainer.classList.toggle('hidden');
        }
    }

    toggleHighContrast() {
        document.body.classList.toggle('high-contrast');
        localStorage.setItem('highContrast', document.body.classList.contains('high-contrast'));
    }

    toggleTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.click();
        }
    }

    toggleFontSize() {
        const currentSize = document.documentElement.style.getPropertyValue('--font-size-base') || '1rem';
        const sizes = ['0.875rem', '1rem', '1.125rem', '1.25rem'];
        const currentIndex = sizes.indexOf(currentSize);
        const nextIndex = (currentIndex + 1) % sizes.length;
        document.documentElement.style.setProperty('--font-size-base', sizes[nextIndex]);
        localStorage.setItem('fontSize', sizes[nextIndex]);
    }

    showKeyboardShortcuts() {
        const shortcuts = [
            { key: 'F1', description: 'Show keyboard shortcuts' },
            { key: 'Tab', description: 'Navigate to next element' },
            { key: 'Shift+Tab', description: 'Navigate to previous element' },
            { key: 'Arrow Keys', description: 'Navigate in direction' },
            { key: 'Space/Enter', description: 'Activate focused element' },
            { key: 'Escape', description: 'Close modal or return to menu' },
            { key: 'Alt+T', description: 'Toggle theme' },
            { key: 'Alt+H', description: 'Toggle high contrast' },
            { key: 'Alt+F', description: 'Toggle font size' },
            { key: 'P', description: 'Pause practice' },
            { key: 'R', description: 'Reset practice' },
            { key: 'N', description: 'New practice set' },
            { key: 'M', description: 'Back to menu' },
            { key: 'S', description: 'Start practice' },
            { key: '+/-', description: 'Increase/decrease timer' },
            { key: '=', description: 'Toggle timer display' }
        ];

        const modal = document.createElement('div');
        modal.className = 'educator-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>Keyboard Shortcuts</h3>
                <div class="shortcuts-list">
                    ${shortcuts.map(shortcut => `
                        <div class="shortcut-item">
                            <kbd>${shortcut.key}</kbd>
                            <span>${shortcut.description}</span>
                        </div>
                    `).join('')}
                </div>
                <button class="close-modal" onclick="this.closest('.educator-modal').remove()">Close</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add styles for shortcuts modal
        const style = document.createElement('style');
        style.textContent = `
            .shortcuts-list {
                display: grid;
                gap: 1rem;
                margin: 2rem 0;
            }
            .shortcut-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.5rem;
                background: var(--bg-tertiary);
                border-radius: var(--radius-md);
            }
            kbd {
                background: var(--primary-color);
                color: white;
                padding: 0.25rem 0.5rem;
                border-radius: var(--radius-sm);
                font-family: monospace;
                font-size: 0.875rem;
            }
        `;
        document.head.appendChild(style);
    }

    // Public methods
    enable() {
        this.isEnabled = true;
    }

    disable() {
        this.isEnabled = false;
    }

    focusFirstElement() {
        if (this.focusableElements.length > 0) {
            this.currentFocusIndex = 0;
            this.focusCurrentElement();
        }
    }

    focusLastElement() {
        if (this.focusableElements.length > 0) {
            this.currentFocusIndex = this.focusableElements.length - 1;
            this.focusCurrentElement();
        }
    }
}

// Initialize keyboard navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.keyboardNavigation = new KeyboardNavigation();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KeyboardNavigation;
}
