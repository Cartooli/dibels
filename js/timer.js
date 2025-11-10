// Timer functionality for DIBELS Practice Lab
class Timer {
    constructor() {
        this.timeLeft = 60;
        this.isRunning = false;
        this.intervalId = null;
        this.callbacks = {
            onTick: [],
            onComplete: []
        };
    }

    // Set the timer duration
    setDuration(seconds) {
        this.timeLeft = seconds;
        this.updateDisplay();
    }

    // Start the timer
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            // Call all onTick callbacks
            this.callbacks.onTick.forEach(callback => {
                if (callback) callback(this.timeLeft);
            });
            
            if (this.timeLeft <= 0) {
                this.stop();
                // Call all onComplete callbacks
                this.callbacks.onComplete.forEach(callback => {
                    if (callback) callback();
                });
            }
        }, 1000);
    }

    // Pause the timer
    pause() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
    }

    // Stop the timer
    stop() {
        this.pause();
        this.timeLeft = 0;
        this.updateDisplay();
    }

    // Reset the timer
    reset(seconds = 60) {
        this.timeLeft = seconds;
        this.pause();
        this.intervalId = null;
        this.updateDisplay();
    }

    // Update the timer display
    updateDisplay() {
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = this.timeLeft;
            
            // Add visual warning when time is running low
            if (this.timeLeft <= 10) {
                timerElement.classList.add('warning');
            } else {
                timerElement.classList.remove('warning');
            }
        }
    }

    // Set callback functions
    onTick(callback) {
        this.callbacks.onTick.push(callback);
    }

    onComplete(callback) {
        this.callbacks.onComplete.push(callback);
    }
    
    // Clear all callbacks
    clearCallbacks() {
        this.callbacks.onTick = [];
        this.callbacks.onComplete = [];
    }

    // Get current time left
    getTimeLeft() {
        return this.timeLeft;
    }

    // Check if timer is running
    getIsRunning() {
        return this.isRunning;
    }

    // Format time as MM:SS
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

// Create global timer instance
window.practiceTimer = new Timer();

// Add CSS for timer warning state
const style = document.createElement('style');
style.textContent = `
    .timer.warning {
        color: var(--accent-color) !important;
        animation: pulse 1s infinite;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);
