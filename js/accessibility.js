// Accessibility features for DIBELS Practice Lab
class AccessibilityManager {
    constructor() {
        this.isHighContrast = false;
        this.fontSize = 1;
        this.isKeyboardNavigation = false;
        this.currentFocusIndex = 0;
        this.focusableElements = [];
        this.screenReader = null;
        this.init();
    }

    // Initialize accessibility features
    init() {
        this.detectScreenReader();
        this.setupKeyboardNavigation();
        this.setupHighContrastToggle();
        this.setupFontSizeControls();
        this.setupFocusManagement();
        this.addAccessibilityStyles();
        this.setupTimerAnnouncements();
    }
    
    // Setup timer announcements
    setupTimerAnnouncements() {
        // Announce timer warnings at key intervals
        if (window.practiceTimer) {
            window.practiceTimer.onTick((timeLeft) => {
                if (timeLeft === 30) {
                    this.announce('30 seconds remaining');
                } else if (timeLeft === 10) {
                    this.announce('10 seconds remaining');
                } else if (timeLeft === 5) {
                    this.announce('5 seconds remaining', 'assertive');
                }
            });
            
            window.practiceTimer.onComplete(() => {
                this.announce('Time is up. Practice session complete.', 'assertive');
            });
        }
    }

    // Detect if screen reader is present
    detectScreenReader() {
        // Simple detection - in real implementation, would use more sophisticated methods
        this.screenReader = window.speechSynthesis && window.speechSynthesis.getVoices().length > 0;
    }

    // Setup keyboard navigation
    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                this.isKeyboardNavigation = true;
                document.body.classList.add('keyboard-navigation');
            }
        });

        document.addEventListener('mousedown', () => {
            this.isKeyboardNavigation = false;
            document.body.classList.remove('keyboard-navigation');
        });

        // Handle arrow key navigation for practice content
        document.addEventListener('keydown', (e) => {
            if (this.isKeyboardNavigation && this.focusableElements.length > 0) {
                switch (e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        this.moveFocus(1);
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        this.moveFocus(-1);
                        break;
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        this.activateFocusedElement();
                        break;
                }
            }
        });
    }

    // Setup high contrast toggle
    setupHighContrastToggle() {
        const toggle = document.createElement('button');
        toggle.id = 'high-contrast-toggle';
        toggle.className = 'accessibility-toggle';
        toggle.innerHTML = '🔍 High Contrast';
        toggle.addEventListener('click', () => this.toggleHighContrast());
        
        const accessibilityPanel = this.getOrCreateAccessibilityPanel();
        accessibilityPanel.appendChild(toggle);
    }

    // Setup font size controls
    setupFontSizeControls() {
        const fontSizeContainer = document.createElement('div');
        fontSizeContainer.className = 'font-size-controls';
        fontSizeContainer.innerHTML = `
            <label for="font-size-slider">Font Size:</label>
            <input type="range" id="font-size-slider" min="0.8" max="2" step="0.1" value="1">
            <span id="font-size-value">100%</span>
        `;

        const slider = fontSizeContainer.querySelector('#font-size-slider');
        slider.addEventListener('input', (e) => {
            this.setFontSize(parseFloat(e.target.value));
        });

        const accessibilityPanel = this.getOrCreateAccessibilityPanel();
        accessibilityPanel.appendChild(fontSizeContainer);
    }

    // Setup focus management
    setupFocusManagement() {
        // Update focusable elements when content changes
        const observer = new MutationObserver(() => {
            this.updateFocusableElements();
        });
        
        observer.observe(document.body, { childList: true, subtree: true });
    }

    // Get or create accessibility panel
    getOrCreateAccessibilityPanel() {
        let panel = document.getElementById('accessibility-panel');
        if (!panel) {
            panel = document.createElement('div');
            panel.id = 'accessibility-panel';
            panel.className = 'accessibility-panel';
            panel.innerHTML = '<h3>Accessibility Options</h3>';
            
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.appendChild(panel);
            }
        }
        return panel;
    }

    // Toggle high contrast mode
    toggleHighContrast() {
        this.isHighContrast = !this.isHighContrast;
        document.body.classList.toggle('high-contrast', this.isHighContrast);
        
        const toggle = document.getElementById('high-contrast-toggle');
        if (toggle) {
            toggle.innerHTML = this.isHighContrast ? '🔍 Normal Contrast' : '🔍 High Contrast';
        }
    }

    // Set font size
    setFontSize(size) {
        this.fontSize = size;
        document.documentElement.style.fontSize = `${size}rem`;
        
        const valueDisplay = document.getElementById('font-size-value');
        if (valueDisplay) {
            valueDisplay.textContent = `${Math.round(size * 100)}%`;
        }
    }

    // Update focusable elements
    updateFocusableElements() {
        this.focusableElements = Array.from(document.querySelectorAll(
            'button, input, select, textarea, [tabindex]:not([tabindex="-1"]), .letter-item, .word-item, .passage-word'
        ));
        this.currentFocusIndex = 0;
    }

    // Move focus to next/previous element
    moveFocus(direction) {
        if (this.focusableElements.length === 0) return;
        
        this.currentFocusIndex += direction;
        
        if (this.currentFocusIndex < 0) {
            this.currentFocusIndex = this.focusableElements.length - 1;
        } else if (this.currentFocusIndex >= this.focusableElements.length) {
            this.currentFocusIndex = 0;
        }
        
        const element = this.focusableElements[this.currentFocusIndex];
        if (element) {
            element.focus();
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    // Activate focused element
    activateFocusedElement() {
        const element = this.focusableElements[this.currentFocusIndex];
        if (element) {
            if (element.tagName === 'BUTTON') {
                element.click();
            } else if (element.classList.contains('letter-item') || element.classList.contains('word-item')) {
                element.click();
            }
        }
    }

    // Add accessibility styles
    addAccessibilityStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* High contrast mode */
            .high-contrast {
                --primary-color: #0000ff;
                --secondary-color: #008000;
                --accent-color: #ff0000;
                --gray-600: #000000;
                --gray-700: #000000;
                --gray-800: #000000;
                --gray-900: #000000;
            }
            
            .high-contrast .grade-btn,
            .high-contrast .subtest-btn,
            .high-contrast .option-item {
                border-width: 3px;
            }
            
            /* Keyboard navigation */
            .keyboard-navigation *:focus {
                outline: 3px solid var(--primary-color) !important;
                outline-offset: 2px !important;
            }
            
            .keyboard-navigation .letter-item:focus,
            .keyboard-navigation .word-item:focus {
                transform: scale(1.1);
                box-shadow: 0 0 0 3px var(--primary-color);
            }
            
            /* Accessibility panel */
            .accessibility-panel {
                background: #f1f5f9; /* Fallback */
                background: var(--bg-secondary);
                border: 2px solid #e2e8f0; /* Fallback */
                border: 2px solid var(--border-color);
                border-radius: var(--radius-lg);
                padding: 1rem;
                margin: 1rem 0;
            }
            
            .accessibility-panel h3 {
                margin: 0 0 1rem 0;
                color: #000000; /* Fallback */
                color: var(--text-primary);
            }
            
            /* Dark mode accessibility panel */
            [data-theme="dark"] .accessibility-panel {
                background: var(--bg-secondary);
                border-color: var(--border-color);
            }
            
            [data-theme="dark"] .accessibility-panel h3 {
                color: var(--text-primary);
            }
            
            .accessibility-toggle {
                background: var(--primary-color);
                color: white;
                border: none;
                border-radius: var(--radius-md);
                padding: 0.5rem 1rem;
                margin: 0.25rem;
                cursor: pointer;
                font-size: 0.9rem;
            }
            
            .accessibility-toggle:hover {
                background: var(--primary-dark);
            }
            
            .font-size-controls {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin: 0.5rem 0;
            }
            
            .font-size-controls label {
                font-weight: 500;
                color: #000000; /* Fallback */
                color: var(--text-primary);
            }
            
            /* Dark mode font size controls */
            [data-theme="dark"] .font-size-controls label {
                color: var(--text-primary);
            }
            
            .font-size-controls input[type="range"] {
                width: 150px;
            }
            
            .font-size-controls span {
                font-weight: 500;
                min-width: 40px;
            }
            
            /* Screen reader only content */
            .sr-only {
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0, 0, 0, 0);
                white-space: nowrap;
                border: 0;
            }
            
            /* Focus indicators */
            .focusable:focus {
                outline: 2px solid var(--primary-color);
                outline-offset: 2px;
            }
            
            /* Skip links */
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: var(--primary-color);
                color: white;
                padding: 8px;
                text-decoration: none;
                border-radius: 4px;
                z-index: 1000;
            }
            
            .skip-link:focus {
                top: 6px;
            }
            
            /* ARIA live regions */
            .aria-live {
                position: absolute;
                left: -10000px;
                width: 1px;
                height: 1px;
                overflow: hidden;
            }
            
            /* Reduced motion */
            @media (prefers-reduced-motion: reduce) {
                * {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            }
            
            /* Print accessibility */
            @media print {
                .accessibility-panel {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Announce text to screen readers
    announce(text, priority = 'polite') {
        // Use dedicated announcement region
        let announcementRegion = document.getElementById('sr-announcements');
        
        if (!announcementRegion) {
            // Fallback: create announcement region if it doesn't exist
            announcementRegion = document.createElement('div');
            announcementRegion.id = 'sr-announcements';
            announcementRegion.className = 'sr-only';
            announcementRegion.setAttribute('role', 'status');
            announcementRegion.setAttribute('aria-live', 'polite');
            announcementRegion.setAttribute('aria-atomic', 'true');
            document.body.appendChild(announcementRegion);
        }
        
        // Update priority if needed
        announcementRegion.setAttribute('aria-live', priority);
        
        // Set the text
        announcementRegion.textContent = text;
        
        // Clear after a delay to allow for new announcements
        setTimeout(() => {
            if (announcementRegion.textContent === text) {
                announcementRegion.textContent = '';
            }
        }, 3000);
    }

    // Announce accuracy with contextual information
    announceAccuracy(accuracy, scoreData) {
        if (!scoreData || typeof scoreData !== 'object') {
            console.warn('Invalid scoreData provided to announceAccuracy');
            return;
        }
        
        const accuracyLevel = window.scoringEngine?.getAccuracyLevel(accuracy);
        // Safely format display text - handle objects, undefined, null
        const displayText = this.formatValueForDisplay(scoreData.display, 'Score calculated');
        const message = `Accuracy: ${accuracy} percent. ${displayText}. ${accuracyLevel?.label || ''}`;
        this.announce(message, 'polite');
    }

    // Format value for display - handles objects, arrays, null, undefined
    formatValueForDisplay(value, fallback = 'N/A') {
        if (value === null || value === undefined) {
            return fallback;
        }
        
        // Handle objects
        if (typeof value === 'object') {
            // If it's an array, join it
            if (Array.isArray(value)) {
                return value.length > 0 ? value.join(', ') : fallback;
            }
            // If it's a Date, format it
            if (value instanceof Date) {
                return value.toLocaleDateString();
            }
            // For other objects, return fallback to avoid [object Object]
            return fallback;
        }
        
        // Convert to string for primitive values
        return String(value);
    }

    // Announce accuracy changes in real-time
    announceAccuracyChange(accuracy, level) {
        if (accuracy > 0) {
            const message = `Current accuracy: ${accuracy.toFixed(1)} percent. ${level}`;
            this.announce(message, 'polite');
        }
    }

    // Add skip links
    addSkipLinks() {
        const skipLinks = document.createElement('div');
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">Skip to main content</a>
            <a href="#practice-content" class="skip-link">Skip to practice content</a>
            <a href="#practice-controls" class="skip-link">Skip to controls</a>
        `;
        document.body.insertBefore(skipLinks, document.body.firstChild);
    }

    // Make element focusable
    makeFocusable(element) {
        if (!element.hasAttribute('tabindex')) {
            element.setAttribute('tabindex', '0');
        }
        element.classList.add('focusable');
    }

    // Add ARIA labels
    addAriaLabels() {
        // Add labels to interactive elements
        const gradeButtons = document.querySelectorAll('.grade-btn');
        gradeButtons.forEach((btn, index) => {
            btn.setAttribute('aria-label', `Select grade ${btn.textContent}`);
        });

        const subtestButtons = document.querySelectorAll('.subtest-btn');
        subtestButtons.forEach((btn, index) => {
            const name = btn.querySelector('.subtest-name')?.textContent || btn.textContent;
            const desc = btn.querySelector('.subtest-desc')?.textContent || '';
            btn.setAttribute('aria-label', `${name}. ${desc}`);
        });

        const controlButtons = document.querySelectorAll('.control-btn');
        controlButtons.forEach((btn, index) => {
            if (!btn.getAttribute('aria-label')) {
                btn.setAttribute('aria-label', btn.textContent);
            }
        });
    }

    // Setup practice content accessibility
    setupPracticeAccessibility() {
        // Add ARIA live region for practice updates
        const liveRegion = document.createElement('div');
        liveRegion.id = 'practice-announcements';
        liveRegion.className = 'aria-live';
        liveRegion.setAttribute('aria-live', 'polite');
        document.body.appendChild(liveRegion);

        // Make practice elements focusable
        const practiceContent = document.getElementById('practice-content');
        if (practiceContent) {
            const interactiveElements = practiceContent.querySelectorAll('.letter-item, .word-item, .passage-word');
            interactiveElements.forEach(element => {
                this.makeFocusable(element);
            });
        }
    }

    // Update practice announcements
    updatePracticeAnnouncement(message) {
        const liveRegion = document.getElementById('practice-announcements');
        if (liveRegion) {
            liveRegion.textContent = message;
        }
    }

    // Setup timer accessibility
    setupTimerAccessibility() {
        const timer = document.getElementById('timer');
        if (timer) {
            timer.setAttribute('aria-live', 'polite');
            timer.setAttribute('aria-label', 'Time remaining');
        }
    }

    // Setup scoring accessibility
    setupScoringAccessibility() {
        const scoringPanel = document.getElementById('scoring-panel');
        if (scoringPanel) {
            const inputs = scoringPanel.querySelectorAll('input');
            inputs.forEach(input => {
                input.setAttribute('aria-label', input.previousElementSibling?.textContent || input.placeholder);
            });
        }
    }

    // Initialize all accessibility features
    initializeAll() {
        this.addSkipLinks();
        this.addAriaLabels();
        this.setupPracticeAccessibility();
        this.setupTimerAccessibility();
        this.setupScoringAccessibility();
        this.updateFocusableElements();
    }
}

// Create global accessibility manager instance
window.accessibilityManager = new AccessibilityManager();

// Initialize accessibility when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.accessibilityManager.initializeAll();
});

// Add accessibility button to footer
document.addEventListener('DOMContentLoaded', () => {
    const accessibilityBtn = document.getElementById('accessibility-btn');
    if (accessibilityBtn) {
        accessibilityBtn.addEventListener('click', () => {
            const panel = document.getElementById('accessibility-panel');
            if (panel) {
                panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
            }
        });
    }
});
