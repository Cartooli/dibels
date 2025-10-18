// Audio functionality for DIBELS Practice Lab
class AudioManager {
    constructor() {
        this.audioContext = null;
        this.synthesis = null;
        this.isSupported = this.checkSupport();
        this.voiceSettings = {
            rate: 0.8,
            pitch: 1.0,
            volume: 0.8
        };
    }

    // Check if audio features are supported
    checkSupport() {
        return 'speechSynthesis' in window && 'AudioContext' in window;
    }

    // Initialize audio context
    init() {
        if (!this.isSupported) {
            console.warn('Audio features not supported in this browser');
            return false;
        }

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.synthesis = window.speechSynthesis;
            return true;
        } catch (error) {
            console.error('Failed to initialize audio:', error);
            return false;
        }
    }

    // Speak text using speech synthesis
    speak(text, options = {}) {
        if (!this.synthesis) {
            console.warn('Speech synthesis not available');
            return;
        }

        // Cancel any ongoing speech
        this.synthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        
        // Set voice properties
        utterance.rate = options.rate || this.voiceSettings.rate;
        utterance.pitch = options.pitch || this.voiceSettings.pitch;
        utterance.volume = options.volume || this.voiceSettings.volume;
        
        // Set voice if specified
        if (options.voice) {
            utterance.voice = options.voice;
        } else {
            // Try to use a child-friendly voice
            const voices = this.synthesis.getVoices();
            const childVoice = voices.find(voice => 
                voice.name.includes('Child') || 
                voice.name.includes('Kid') ||
                voice.name.includes('Young')
            );
            if (childVoice) {
                utterance.voice = childVoice;
            }
        }

        // Set language
        utterance.lang = options.lang || 'en-US';

        // Add event listeners
        utterance.onstart = () => {
            if (options.onStart) options.onStart();
        };
        
        utterance.onend = () => {
            if (options.onEnd) options.onEnd();
        };
        
        utterance.onerror = (event) => {
            console.error('Speech synthesis error:', event.error);
            if (options.onError) options.onError(event.error);
        };

        // Speak
        this.synthesis.speak(utterance);
    }

    // Stop current speech
    stop() {
        if (this.synthesis) {
            this.synthesis.cancel();
        }
    }

    // Speak a letter with proper pronunciation
    speakLetter(letter, options = {}) {
        const letterMap = {
            'a': 'ay', 'b': 'bee', 'c': 'see', 'd': 'dee', 'e': 'ee',
            'f': 'eff', 'g': 'gee', 'h': 'aitch', 'i': 'eye', 'j': 'jay',
            'k': 'kay', 'l': 'ell', 'm': 'em', 'n': 'en', 'o': 'oh',
            'p': 'pee', 'q': 'cue', 'r': 'ar', 's': 'ess', 't': 'tee',
            'u': 'you', 'v': 'vee', 'w': 'double you', 'x': 'ex', 'y': 'why', 'z': 'zee'
        };

        const pronunciation = letterMap[letter.toLowerCase()] || letter;
        this.speak(pronunciation, options);
    }

    // Speak a word with proper pronunciation
    speakWord(word, options = {}) {
        this.speak(word, options);
    }

    // Speak phonemes for PSF
    speakPhonemes(phonemes, options = {}) {
        const phonemeText = phonemes.map(p => `/${p}/`).join(' ');
        this.speak(phonemeText, options);
    }

    // Speak reading passage for ORF
    speakPassage(passage, options = {}) {
        this.speak(passage, {
            ...options,
            rate: 0.7, // Slower for reading comprehension
            pitch: 1.1
        });
    }

    // Play audio for correct response
    playCorrectSound() {
        this.playTone(440, 200); // A4 note
    }

    // Play audio for incorrect response
    playIncorrectSound() {
        this.playTone(220, 200); // A3 note
    }

    // Play audio for timer warning
    playWarningSound() {
        this.playTone(880, 100); // A5 note
    }

    // Play a tone
    playTone(frequency, duration) {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000);

        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }

    // Get available voices
    getVoices() {
        if (!this.synthesis) return [];
        return this.synthesis.getVoices();
    }

    // Set voice settings
    setVoiceSettings(settings) {
        this.voiceSettings = { ...this.voiceSettings, ...settings };
    }

    // Create audio model for ORF passage
    createAudioModel(passage, options = {}) {
        const words = passage.split(' ');
        let currentWordIndex = 0;

        const speakNextWord = () => {
            if (currentWordIndex < words.length) {
                this.speak(words[currentWordIndex], {
                    ...options,
                    onEnd: () => {
                        currentWordIndex++;
                        setTimeout(speakNextWord, 100); // Small pause between words
                    }
                });
            }
        };

        return {
            start: () => speakNextWord(),
            stop: () => this.stop(),
            isPlaying: () => this.synthesis && this.synthesis.speaking
        };
    }

    // Create audio model for word list
    createWordListModel(words, options = {}) {
        let currentWordIndex = 0;

        const speakNextWord = () => {
            if (currentWordIndex < words.length) {
                this.speak(words[currentWordIndex], {
                    ...options,
                    onEnd: () => {
                        currentWordIndex++;
                        setTimeout(speakNextWord, 500); // Pause between words
                    }
                });
            }
        };

        return {
            start: () => speakNextWord(),
            stop: () => this.stop(),
            isPlaying: () => this.synthesis && this.synthesis.speaking
        };
    }

    // Enable/disable audio features
    setEnabled(enabled) {
        if (!enabled) {
            this.stop();
        }
        this.enabled = enabled;
    }

    // Check if audio is enabled
    isEnabled() {
        return this.enabled !== false;
    }
}

// Create global audio manager instance
window.audioManager = new AudioManager();

// Initialize audio when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.audioManager.init();
});

// Add audio control buttons to the UI
class AudioControls {
    constructor() {
        this.audioManager = window.audioManager;
        this.isPlaying = false;
        this.currentModel = null;
    }

    // Add audio controls to practice content
    addAudioControls(container, content, type) {
        if (!this.audioManager.isSupported) return;

        const controlsContainer = document.createElement('div');
        controlsContainer.className = 'audio-controls';
        controlsContainer.innerHTML = `
            <div class="audio-controls-header">
                <h4>Audio Modeling</h4>
                <div class="audio-controls-buttons">
                    <button class="control-btn" id="play-audio">Play Audio</button>
                    <button class="control-btn" id="stop-audio">Stop Audio</button>
                    <button class="control-btn" id="repeat-audio">Repeat</button>
                </div>
            </div>
            <div class="audio-settings">
                <label>
                    Speed: 
                    <input type="range" id="audio-speed" min="0.5" max="1.5" step="0.1" value="0.8">
                    <span id="speed-value">0.8</span>
                </label>
                <label>
                    Volume: 
                    <input type="range" id="audio-volume" min="0" max="1" step="0.1" value="0.8">
                    <span id="volume-value">0.8</span>
                </label>
            </div>
        `;

        container.appendChild(controlsContainer);
        this.setupEventListeners(content, type);
    }

    // Setup event listeners for audio controls
    setupEventListeners(content, type) {
        const playBtn = document.getElementById('play-audio');
        const stopBtn = document.getElementById('stop-audio');
        const repeatBtn = document.getElementById('repeat-audio');
        const speedSlider = document.getElementById('audio-speed');
        const volumeSlider = document.getElementById('audio-volume');

        if (playBtn) {
            playBtn.addEventListener('click', () => this.playAudio(content, type));
        }

        if (stopBtn) {
            stopBtn.addEventListener('click', () => this.stopAudio());
        }

        if (repeatBtn) {
            repeatBtn.addEventListener('click', () => this.repeatAudio(content, type));
        }

        if (speedSlider) {
            speedSlider.addEventListener('input', (e) => {
                this.audioManager.setVoiceSettings({ rate: parseFloat(e.target.value) });
                document.getElementById('speed-value').textContent = e.target.value;
            });
        }

        if (volumeSlider) {
            volumeSlider.addEventListener('input', (e) => {
                this.audioManager.setVoiceSettings({ volume: parseFloat(e.target.value) });
                document.getElementById('volume-value').textContent = e.target.value;
            });
        }
    }

    // Play audio based on content type
    playAudio(content, type) {
        this.stopAudio(); // Stop any current audio

        switch (type) {
            case 'LNF':
                this.currentModel = this.audioManager.createWordListModel(content, {
                    onEnd: () => this.updatePlayButton()
                });
                break;
            case 'PSF':
                this.currentModel = this.audioManager.createWordListModel(content, {
                    onEnd: () => this.updatePlayButton()
                });
                break;
            case 'NWF':
                this.currentModel = this.audioManager.createWordListModel(content, {
                    onEnd: () => this.updatePlayButton()
                });
                break;
            case 'WRF':
                this.currentModel = this.audioManager.createWordListModel(content, {
                    onEnd: () => this.updatePlayButton()
                });
                break;
            case 'ORF':
                this.currentModel = this.audioManager.createAudioModel(content.text, {
                    onEnd: () => this.updatePlayButton()
                });
                break;
        }

        if (this.currentModel) {
            this.currentModel.start();
            this.isPlaying = true;
            this.updatePlayButton();
        }
    }

    // Stop audio
    stopAudio() {
        if (this.currentModel) {
            this.currentModel.stop();
        }
        this.audioManager.stop();
        this.isPlaying = false;
        this.updatePlayButton();
    }

    // Repeat audio
    repeatAudio(content, type) {
        this.playAudio(content, type);
    }

    // Update play button state
    updatePlayButton() {
        const playBtn = document.getElementById('play-audio');
        const stopBtn = document.getElementById('stop-audio');

        if (playBtn && stopBtn) {
            if (this.isPlaying) {
                playBtn.style.display = 'none';
                stopBtn.style.display = 'inline-block';
            } else {
                playBtn.style.display = 'inline-block';
                stopBtn.style.display = 'none';
            }
        }
    }
}

// Create global audio controls instance
window.audioControls = new AudioControls();

// Add CSS for audio controls
const audioStyle = document.createElement('style');
audioStyle.textContent = `
    .audio-controls {
        background: var(--gray-50);
        border: 2px solid var(--gray-200);
        border-radius: var(--radius-lg);
        padding: 1rem;
        margin: 1rem 0;
    }
    
    .audio-controls-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
    }
    
    .audio-controls-header h4 {
        margin: 0;
        color: var(--gray-700);
    }
    
    .audio-controls-buttons {
        display: flex;
        gap: 0.5rem;
    }
    
    .audio-settings {
        display: flex;
        gap: 2rem;
        align-items: center;
    }
    
    .audio-settings label {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        color: var(--gray-600);
    }
    
    .audio-settings input[type="range"] {
        width: 100px;
    }
    
    .audio-settings span {
        font-weight: 500;
        min-width: 30px;
    }
`;
document.head.appendChild(audioStyle);
