class Timer {
    constructor() {
        this.timeLeft = 60;
        this.initialDuration = 60;
        this.isRunning = false;
        this.intervalId = null;
        this.startTime = null;
        this.callbacks = {
            onTick: [],
            onComplete: []
        };
    }

    setDuration(seconds) {
        this.timeLeft = seconds;
        this.initialDuration = seconds;
        this.updateDisplay();
    }

    start() {
        if (this.isRunning) return;

        if (!this.startTime) {
            this.startTime = Date.now();
        }

        this.isRunning = true;
        this.intervalId = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();

            this.callbacks.onTick.forEach(callback => {
                if (callback) callback(this.timeLeft);
            });

            if (this.timeLeft <= 0) {
                this.stop();
                this.callbacks.onComplete.forEach(callback => {
                    if (callback) callback();
                });
            }
        }, 1000);
    }

    pause() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
    }

    stop() {
        this.pause();
        this.timeLeft = 0;
        this.updateDisplay();
    }

    reset(seconds = 60) {
        this.timeLeft = seconds;
        this.initialDuration = seconds;
        this.startTime = null;
        this.pause();
        this.intervalId = null;
        this.updateDisplay();
    }

    updateDisplay() {
        const timerElement = document.getElementById('timer');
        if (timerElement) {
            timerElement.textContent = this.timeLeft;

            if (this.timeLeft <= 10) {
                timerElement.classList.add('warning');
            } else {
                timerElement.classList.remove('warning');
            }
        }
    }

    onTick(callback) {
        this.callbacks.onTick.push(callback);
    }

    onComplete(callback) {
        this.callbacks.onComplete.push(callback);
    }

    clearCallbacks() {
        this.callbacks.onTick = [];
        this.callbacks.onComplete = [];
    }

    getTimeLeft() {
        return this.timeLeft;
    }

    getIsRunning() {
        return this.isRunning;
    }

    getTimeElapsed() {
        return this.initialDuration - this.timeLeft;
    }

    getActualElapsedTime() {
        if (this.startTime) {
            return Date.now() - this.startTime;
        }
        return 0;
    }

    getInitialDuration() {
        return this.initialDuration;
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
}

window.practiceTimer = new Timer();

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
