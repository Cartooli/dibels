// DIBELS Subtest implementations
class SubtestManager {
    constructor() {
        this.currentSubtest = null;
        this.currentGrade = null;
        this.currentContent = null;
        this.practiceOptions = {};
        this.responses = [];
        this.startTime = null;
        this.endTime = null;
    }

    // Initialize a subtest
    initSubtest(subtest, grade, options = {}) {
        this.currentSubtest = subtest;
        this.currentGrade = grade;
        this.practiceOptions = options;
        this.responses = [];
        this.startTime = null;
        this.endTime = null;

        // Generate content based on subtest type
        this.currentContent = ContentGenerator.generateContent(subtest, grade, options);
        
        if (!this.currentContent) {
            console.error('Failed to generate content for subtest:', subtest);
            return false;
        }

        return true;
    }

    // Start the practice session
    startPractice() {
        this.startTime = Date.now();
        this.renderContent();
        this.setupEventListeners();
        
        // Start timer if timed mode is enabled
        if (this.practiceOptions.timed) {
            window.practiceTimer.setDuration(this.currentContent.timeLimit);
            window.practiceTimer.onComplete(() => this.endPractice());
            window.practiceTimer.start();
        }
    }

    // End the practice session
    endPractice() {
        this.endTime = Date.now();
        window.practiceTimer.stop();
        this.showScoringPanel();
    }

    // Render content based on subtest type
    renderContent() {
        const contentElement = document.getElementById('practice-content');
        if (!contentElement) return;
        
        // Validate content exists and is not empty
        if (!this.currentContent || !this.currentContent.content) {
            contentElement.innerHTML = `
                <div class="error-message">
                    <h3>Content Error</h3>
                    <p>Failed to generate practice content. Please try again.</p>
                    <button class="control-btn" onclick="window.dibelsApp.backToMenu()">Back to Menu</button>
                </div>
            `;
            return;
        }
        
        // Validate content is not empty array/object
        const content = this.currentContent.content;
        if ((Array.isArray(content) && content.length === 0) ||
            (typeof content === 'object' && Object.keys(content).length === 0)) {
            contentElement.innerHTML = `
                <div class="error-message">
                    <h3>Content Error</h3>
                    <p>No practice items available for this subtest and grade combination.</p>
                    <button class="control-btn" onclick="window.dibelsApp.backToMenu()">Back to Menu</button>
                </div>
            `;
            return;
        }

        switch (this.currentSubtest) {
            case 'LNF':
                this.renderLNF(contentElement);
                break;
            case 'PSF':
                this.renderPSF(contentElement);
                break;
            case 'NWF':
                this.renderNWF(contentElement);
                break;
            case 'WRF':
                this.renderWRF(contentElement);
                break;
            case 'ORF':
                this.renderORF(contentElement);
                break;
            case 'Maze':
                this.renderMaze(contentElement);
                break;
        }
    }

    // Render Letter Naming Fluency
    renderLNF(container) {
        const { content, instructions } = this.currentContent;
        
        container.innerHTML = `
            <div class="subtest-instructions">
                <h3>Letter Naming Fluency</h3>
                <p>${instructions}</p>
            </div>
            <div class="lnf-content">
                <div class="letter-grid" role="grid" aria-label="Letter naming practice grid">
                    ${content.map((letter, index) => `<span class="letter-item" role="gridcell" tabindex="-1" data-nav-index="${index}" aria-label="Letter ${letter}">${letter}</span>`).join('')}
                </div>
            </div>
        `;

        // Add CSS for letter grid
        this.addSubtestStyles(`
            .letter-grid {
                display: grid;
                grid-template-columns: repeat(10, 1fr);
                gap: 1rem;
                max-width: 800px;
                margin: 0 auto;
            }
            
            @media (max-width: 768px) {
                .letter-grid {
                    grid-template-columns: repeat(5, 1fr);
                    gap: 0.75rem;
                }
            }
            
            @media (max-width: 480px) {
                .letter-grid {
                    grid-template-columns: repeat(4, 1fr);
                    gap: 0.5rem;
                }
            }
            
            .letter-item {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 60px;
                height: 60px;
                background: var(--bg-secondary);
                border: 2px solid var(--border-color);
                border-radius: var(--radius-lg);
                font-size: 2rem;
                font-weight: 600;
                color: var(--text-primary);
                cursor: pointer;
                transition: all var(--transition-fast);
                user-select: none;
            }
            
            .letter-item:hover {
                border-color: var(--primary-color);
                background: var(--primary-color);
                color: var(--text-primary);
            }
            
            .letter-item.correct {
                background: var(--success-color);
                color: white;
                border-color: var(--success-color);
            }
            
            .letter-item.incorrect {
                background: var(--accent-color);
                color: white;
                border-color: var(--accent-color);
            }
            
            .letter-item.skipped {
                background: var(--warning-color);
                color: white;
                border-color: var(--warning-color);
            }
        `);
    }

    // Render Phonemic Segmentation Fluency
    renderPSF(container) {
        const { content, instructions } = this.currentContent;
        
        container.innerHTML = `
            <div class="subtest-instructions">
                <h3>Phonemic Segmentation Fluency</h3>
                <p>${instructions}</p>
            </div>
            <div class="psf-content">
                <div class="word-display">
                    <div class="current-word" id="current-word">${content[0]}</div>
                    <div class="word-progress">
                        <span id="word-number">1</span> of ${content.length}
                    </div>
                </div>
                <div class="psf-controls">
                    <button class="control-btn" id="next-word">Next Word</button>
                    <button class="control-btn" id="show-answer">Show Answer</button>
                </div>
                <div class="answer-display" id="answer-display" style="display: none;">
                    <h4>Correct Answer:</h4>
                    <div class="phoneme-breakdown" id="phoneme-breakdown"></div>
                </div>
            </div>
        `;

        this.currentWordIndex = 0;
        this.setupPSFEventListeners();
    }

    // Render Nonsense Word Fluency
    renderNWF(container) {
        const { content, instructions } = this.currentContent;
        
        container.innerHTML = `
            <div class="subtest-instructions">
                <h3>Nonsense Word Fluency</h3>
                <p>${instructions}</p>
            </div>
            <div class="nwf-content">
                <div class="word-grid">
                    ${content.map(word => `<span class="word-item">${word}</span>`).join('')}
                </div>
            </div>
        `;

        this.addSubtestStyles(`
            .word-grid {
                display: grid;
                grid-template-columns: repeat(8, 1fr);
                gap: 1rem;
                max-width: 800px;
                margin: 0 auto;
            }
            
            @media (max-width: 768px) {
                .word-grid {
                    grid-template-columns: repeat(4, 1fr);
                    gap: 0.75rem;
                }
            }
            
            @media (max-width: 480px) {
                .word-grid {
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0.5rem;
                }
            }
            
            .word-item {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                background: var(--bg-secondary);
                border: 2px solid var(--border-color);
                border-radius: var(--radius-lg);
                font-size: 1.5rem;
                font-weight: 600;
                color: var(--text-primary);
                cursor: pointer;
                transition: all var(--transition-fast);
                user-select: none;
                text-align: center;
            }
            
            .word-item:hover {
                border-color: var(--primary-color);
                background: var(--primary-color);
                color: var(--text-primary);
            }
            
            .word-item.read {
                background: var(--success-color);
                color: white;
                border-color: var(--success-color);
            }
        `);
    }

    // Render Word Reading Fluency
    renderWRF(container) {
        const { content, instructions } = this.currentContent;
        
        container.innerHTML = `
            <div class="subtest-instructions">
                <h3>Word Reading Fluency</h3>
                <p>${instructions}</p>
            </div>
            <div class="wrf-content" id="wrf-content">
                <div class="word-grid">
                    ${content.map(word => `<span class="word-item">${word}</span>`).join('')}
                </div>
            </div>
        `;
        
        // Add audio controls if audio modeling is enabled
        if (this.practiceOptions.audioModeling && window.audioControls) {
            const wrfContent = container.querySelector('#wrf-content');
            if (wrfContent) {
                window.audioControls.addAudioControls(wrfContent, content, 'WRF');
            }
        }

        this.addSubtestStyles(`
            .word-grid {
                display: grid;
                grid-template-columns: repeat(6, 1fr);
                gap: 1rem;
                max-width: 800px;
                margin: 0 auto;
            }
            
            .word-item {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                background: var(--bg-secondary);
                border: 2px solid var(--border-color);
                border-radius: var(--radius-lg);
                font-size: 1.25rem;
                font-weight: 500;
                color: var(--text-primary);
                cursor: pointer;
                transition: all var(--transition-fast);
                user-select: none;
                text-align: center;
            }
            
            .word-item:hover {
                border-color: var(--primary-color);
                background: var(--primary-color);
                color: var(--text-primary);
            }
            
            .word-item.read {
                background: var(--success-color);
                color: white;
                border-color: var(--success-color);
            }
        `);
    }

    // Render Oral Reading Fluency
    renderORF(container) {
        const { content, instructions } = this.currentContent;
        
        container.innerHTML = `
            <div class="subtest-instructions">
                <h3>Oral Reading Fluency</h3>
                <p>${instructions}</p>
            </div>
            <div class="orf-content" id="orf-content">
                <div class="passage-container">
                    <h4>${content.title}</h4>
                    <div class="passage-text" id="passage-text">
                        ${content.text.split(' ').map((word, index) => 
                            `<span class="passage-word" data-word-index="${index}">${word}</span>`
                        ).join(' ')}
                    </div>
                </div>
                <div class="orf-controls">
                    <button class="control-btn" id="start-reading">Start Reading</button>
                    <button class="control-btn" id="stop-reading">Stop Reading</button>
                </div>
            </div>
        `;
        
        // Add audio controls if audio modeling is enabled
        if (this.practiceOptions.audioModeling && window.audioControls) {
            const orfContent = container.querySelector('#orf-content');
            if (orfContent) {
                window.audioControls.addAudioControls(orfContent, content, 'ORF');
            }
        }
        
        // Setup word tracking for WCPM
        this.setupORFTracking();

        this.addSubtestStyles(`
            .passage-container {
                max-width: 800px;
                margin: 0 auto;
                text-align: left;
            }
            
            .passage-container h4 {
                text-align: center;
                margin-bottom: 2rem;
                color: var(--text-primary);
            }
            
            .passage-text {
                font-size: 1.25rem;
                line-height: 1.8;
                color: var(--text-primary);
                background: var(--bg-secondary);
                padding: 2rem;
                border-radius: var(--radius-lg);
                border: 2px solid var(--border-color);
            }
            
            .passage-word {
                margin-right: 0.25rem;
                padding: 0.125rem;
                border-radius: var(--radius-sm);
                transition: all var(--transition-fast);
            }
            
            .passage-word.current {
                background: var(--primary-color);
                color: white;
            }
            
            .passage-word.read {
                background: var(--success-color);
                color: white;
            }
            
            .passage-word.error {
                background: var(--accent-color);
                color: white;
            }
        `);
    }

    // Render Maze Comprehension
    renderMaze(container) {
        const { content, instructions } = this.currentContent;
        
        container.innerHTML = `
            <div class="subtest-instructions">
                <h3>Maze Comprehension</h3>
                <p>${instructions}</p>
            </div>
            <div class="maze-content">
                <div class="passage-container">
                    <h4>${content.title}</h4>
                    <div class="maze-passage" id="maze-passage">
                        ${this.renderMazePassage(content)}
                    </div>
                </div>
                <div class="maze-controls">
                    <button class="control-btn" id="check-answers">Check Answers</button>
                    <button class="control-btn" id="show-answers">Show Answers</button>
                </div>
            </div>
        `;

        // Add CSS for maze passage
        this.addSubtestStyles(`
            .passage-container {
                max-width: 800px;
                margin: 0 auto;
                text-align: left;
            }
            
            .passage-container h4 {
                text-align: center;
                margin-bottom: 2rem;
                color: var(--text-primary);
            }
            
            .maze-passage {
                font-size: 1.25rem;
                line-height: 1.8;
                color: var(--text-primary);
                background: var(--bg-secondary);
                padding: 2rem;
                border-radius: var(--radius-lg);
                border: 2px solid var(--border-color);
            }
            
            .maze-blank {
                display: inline-block;
                margin: 0 0.25rem;
            }
            
            .maze-select {
                background: var(--bg-primary);
                color: var(--text-primary);
                border: 2px solid var(--border-color);
                border-radius: var(--radius-sm);
                padding: 0.25rem 0.5rem;
                font-size: 1rem;
                min-width: 120px;
            }
            
            .maze-select:focus {
                outline: 2px solid var(--primary-color);
                border-color: var(--primary-color);
            }
            
            .maze-controls {
                display: flex;
                gap: 1rem;
                justify-content: center;
                margin-top: 2rem;
            }
            
            .maze-results {
                background: var(--bg-secondary);
                border: 2px solid var(--border-color);
                border-radius: var(--radius-xl);
                padding: 1.5rem;
                margin-top: 2rem;
            }
            
            .result-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1rem;
                border-bottom: 2px solid var(--border-color);
                padding-bottom: 0.75rem;
            }
            
            .result-header h4 {
                margin: 0;
                color: var(--text-primary);
                font-size: 1.25rem;
            }
            
            .result-score {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--primary-color);
            }
            
            .result-breakdown {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                margin-bottom: 1rem;
            }
            
            .result-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 0.75rem;
                border-radius: var(--radius-lg);
            }
            
            .result-item.correct {
                background: var(--success-color);
                color: white;
            }
            
            .result-item.incorrect {
                background: var(--accent-color);
                color: white;
            }
            
            .result-item.unanswered {
                background: var(--warning-color);
                color: white;
            }
            
            .result-label {
                font-size: 0.875rem;
                font-weight: 500;
                margin-bottom: 0.25rem;
            }
            
            .result-value {
                font-size: 1.5rem;
                font-weight: 700;
            }
            
            .result-accuracy {
                text-align: center;
                padding: 1rem;
                background: var(--primary-color);
                color: white;
                border-radius: var(--radius-lg);
                font-size: 1.125rem;
                font-weight: 600;
            }
            
            .accuracy-label {
                margin-right: 0.5rem;
            }
            
            .accuracy-value {
                font-size: 1.5rem;
                font-weight: 700;
            }
        `);

        this.setupMazeEventListeners();
    }

    // Render maze passage with blanks
    renderMazePassage(content) {
        const text = content.text;
        let result = '';
        let questionIndex = 0;
        
        // Split by words but preserve the [option1/option2/option3] format
        const parts = text.split(/(\s+)/);
        
        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];
            
            // Check if this part contains maze choices [option1/option2/option3]
            const mazeMatch = part.match(/\[([^\]]+)\]/);
            if (mazeMatch) {
                const options = mazeMatch[1].split('/');
                const correctAnswer = content.correctAnswers && content.correctAnswers[questionIndex];
                
                if (!correctAnswer) {
                    console.warn(`Maze: Missing correct answer for question ${questionIndex}`);
                }
                
                result += `<span class="maze-blank">
                    <select class="maze-select" data-position="${questionIndex}" data-correct="${correctAnswer || ''}">
                        <option value="">Choose...</option>
                        ${options.map(option => 
                            `<option value="${option.trim()}">${option.trim()}</option>`
                        ).join('')}
                    </select>
                </span>`;
                questionIndex++;
            } else {
                result += part;
            }
        }
        
        return result;
    }

    // Setup event listeners for PSF
    setupPSFEventListeners() {
        const nextWordBtn = document.getElementById('next-word');
        const showAnswerBtn = document.getElementById('show-answer');
        
        if (nextWordBtn) {
            nextWordBtn.addEventListener('click', () => this.nextPSFWord());
        }
        
        if (showAnswerBtn) {
            showAnswerBtn.addEventListener('click', () => this.showPSFAnswer());
        }
    }

    // Setup event listeners for Maze
    setupMazeEventListeners() {
        const checkAnswersBtn = document.getElementById('check-answers');
        const showAnswersBtn = document.getElementById('show-answers');
        
        if (checkAnswersBtn) {
            checkAnswersBtn.addEventListener('click', () => this.checkMazeAnswers());
        }
        
        if (showAnswersBtn) {
            showAnswersBtn.addEventListener('click', () => this.showMazeAnswers());
        }
    }

    // Setup general event listeners
    setupEventListeners() {
        // Add click handlers for interactive elements
        const contentElement = document.getElementById('practice-content');
        if (contentElement) {
            contentElement.addEventListener('click', (e) => {
                if (e.target.classList.contains('letter-item')) {
                    this.handleLetterClick(e.target);
                } else if (e.target.classList.contains('word-item')) {
                    this.handleWordClick(e.target);
                } else if (e.target.classList.contains('passage-word')) {
                    this.handlePassageWordClick(e.target);
                }
            });
        }
    }
    
    // Setup ORF word tracking
    setupORFTracking() {
        this.orfWordIndex = 0;
        this.orfStartTime = null;
        this.orfWordTimes = [];
        
        const startBtn = document.getElementById('start-reading');
        const stopBtn = document.getElementById('stop-reading');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startORFTracking();
            });
        }
        
        if (stopBtn) {
            stopBtn.addEventListener('click', () => {
                this.stopORFTracking();
            });
        }
    }
    
    // Start ORF tracking
    startORFTracking() {
        this.orfStartTime = Date.now();
        this.orfWordIndex = 0;
        this.orfWordTimes = [];
        
        // Highlight first word
        const firstWord = document.querySelector('.passage-word[data-word-index="0"]');
        if (firstWord) {
            firstWord.classList.add('current');
        }
    }
    
    // Stop ORF tracking
    stopORFTracking() {
        if (this.orfStartTime) {
            const duration = (Date.now() - this.orfStartTime) / 1000;
            const wordsRead = this.orfWordIndex;
            const wcpm = Math.round((wordsRead / duration) * 60);
            
            // Calculate errors (words marked as errors)
            const errorWords = document.querySelectorAll('.passage-word.error').length;
            const correctWords = wordsRead - errorWords;
            const actualWCPM = Math.round((correctWords / duration) * 60);
            
            // Show results
            alert(`Words read: ${wordsRead}\nTime: ${duration.toFixed(1)}s\nWCPM: ${actualWCPM}`);
        }
    }
    
    // Handle passage word click
    handlePassageWordClick(element) {
        const wordIndex = parseInt(element.dataset.wordIndex);
        
        // Remove current class from all words
        document.querySelectorAll('.passage-word.current').forEach(w => {
            w.classList.remove('current');
        });
        
        // Mark as read or error (right-click for error)
        if (!element.classList.contains('read') && !element.classList.contains('error')) {
            element.classList.add('read');
            this.orfWordIndex++;
            
            // Record timing
            if (this.orfStartTime) {
                this.orfWordTimes.push({
                    word: element.textContent,
                    index: wordIndex,
                    time: Date.now() - this.orfStartTime,
                    correct: true
                });
            }
            
            // Highlight next word
            const nextWord = document.querySelector(`.passage-word[data-word-index="${wordIndex + 1}"]`);
            if (nextWord) {
                nextWord.classList.add('current');
            }
        } else if (element.classList.contains('read')) {
            // Toggle to error on second click
            element.classList.remove('read');
            element.classList.add('error');
        } else if (element.classList.contains('error')) {
            // Reset on third click
            element.classList.remove('error');
            this.orfWordIndex--;
        }
        
        this.responses.push({
            word: element.textContent,
            index: wordIndex,
            response: element.classList.contains('read') ? 'correct' : 'error',
            timestamp: Date.now()
        });
    }

    // Handle letter click (LNF)
    handleLetterClick(element) {
        if (element.classList.contains('correct') || 
            element.classList.contains('incorrect') || 
            element.classList.contains('skipped')) {
            return;
        }
        
        // For now, mark as correct (in real implementation, would check against expected response)
        element.classList.add('correct');
        this.responses.push({
            letter: element.textContent,
            response: 'correct',
            timestamp: Date.now()
        });
    }

    // Handle word click (NWF, WRF)
    handleWordClick(element) {
        if (element.classList.contains('read')) {
            return;
        }
        
        element.classList.add('read');
        this.responses.push({
            word: element.textContent,
            response: 'read',
            timestamp: Date.now()
        });
    }

    // Next word for PSF
    nextPSFWord() {
        this.currentWordIndex++;
        const currentWordElement = document.getElementById('current-word');
        const wordNumberElement = document.getElementById('word-number');
        const answerDisplay = document.getElementById('answer-display');
        
        if (this.currentWordIndex < this.currentContent.content.length) {
            currentWordElement.textContent = this.currentContent.content[this.currentWordIndex];
            wordNumberElement.textContent = this.currentWordIndex + 1;
            answerDisplay.style.display = 'none';
        } else {
            this.endPractice();
        }
    }

    // Show answer for PSF
    showPSFAnswer() {
        const currentWord = this.currentContent.content[this.currentWordIndex];
        const answerDisplay = document.getElementById('answer-display');
        const phonemeBreakdown = document.getElementById('phoneme-breakdown');
        
        // Simple phoneme breakdown (in real implementation, would use more sophisticated analysis)
        const phonemes = this.breakIntoPhonemes(currentWord);
        phonemeBreakdown.innerHTML = phonemes.map(phoneme => 
            `<span class="phoneme">/${phoneme}/</span>`
        ).join(' ');
        
        answerDisplay.style.display = 'block';
    }

    // Phoneme breakdown with dictionary
    breakIntoPhonemes(word) {
        // Common word phoneme dictionary
        const phonemeDict = {
            'cat': ['k', 'æ', 't'],
            'dog': ['d', 'ɔ', 'g'],
            'bat': ['b', 'æ', 't'],
            'mat': ['m', 'æ', 't'],
            'sat': ['s', 'æ', 't'],
            'rat': ['r', 'æ', 't'],
            'hat': ['h', 'æ', 't'],
            'pat': ['p', 'æ', 't'],
            'sun': ['s', 'ʌ', 'n'],
            'run': ['r', 'ʌ', 'n'],
            'fun': ['f', 'ʌ', 'n'],
            'bun': ['b', 'ʌ', 'n'],
            'pig': ['p', 'ɪ', 'g'],
            'big': ['b', 'ɪ', 'g'],
            'dig': ['d', 'ɪ', 'g'],
            'fig': ['f', 'ɪ', 'g'],
            'top': ['t', 'ɑ', 'p'],
            'hop': ['h', 'ɑ', 'p'],
            'mop': ['m', 'ɑ', 'p'],
            'pop': ['p', 'ɑ', 'p'],
            'red': ['r', 'ɛ', 'd'],
            'bed': ['b', 'ɛ', 'd'],
            'led': ['l', 'ɛ', 'd'],
            'fed': ['f', 'ɛ', 'd'],
            'sit': ['s', 'ɪ', 't'],
            'hit': ['h', 'ɪ', 't'],
            'bit': ['b', 'ɪ', 't'],
            'fit': ['f', 'ɪ', 't'],
            'cup': ['k', 'ʌ', 'p'],
            'pup': ['p', 'ʌ', 'p'],
            'bug': ['b', 'ʌ', 'g'],
            'hug': ['h', 'ʌ', 'g'],
            'mug': ['m', 'ʌ', 'g'],
            'rug': ['r', 'ʌ', 'g'],
            'tub': ['t', 'ʌ', 'b']
        };
        
        const lowerWord = word.toLowerCase();
        
        // Check dictionary first
        if (phonemeDict[lowerWord]) {
            return phonemeDict[lowerWord];
        }
        
        // Fallback algorithm for unknown words
        // Basic CVC pattern recognition
        const chars = lowerWord.split('');
        const vowels = 'aeiou';
        const phonemes = [];
        
        for (let i = 0; i < chars.length; i++) {
            const char = chars[i];
            const nextChar = chars[i + 1];
            
            // Handle common digraphs
            if (char === 's' && nextChar === 'h') {
                phonemes.push('sh');
                i++;
            } else if (char === 'c' && nextChar === 'h') {
                phonemes.push('ch');
                i++;
            } else if (char === 't' && nextChar === 'h') {
                phonemes.push('th');
                i++;
            } else if (char === 'w' && nextChar === 'h') {
                phonemes.push('wh');
                i++;
            } else {
                phonemes.push(char);
            }
        }
        
        return phonemes;
    }

    // Check maze answers
    checkMazeAnswers() {
        const selects = document.querySelectorAll('.maze-select');
        let correct = 0;
        let incorrect = 0;
        let unanswered = 0;
        const total = selects.length;
        
        selects.forEach(select => {
            const correctAnswer = select.dataset.correct;
            const selectedValue = select.value;
            
            // Skip if correct answer is not set (data issue)
            if (!correctAnswer) {
                console.warn('Maze: Select element missing correct answer');
                return;
            }
            
            if (selectedValue === correctAnswer) {
                correct++;
                select.style.background = 'var(--success-color)';
                select.style.color = 'white';
                select.style.borderColor = 'var(--success-color)';
            } else if (selectedValue) {
                incorrect++;
                select.style.background = 'var(--accent-color)';
                select.style.color = 'white';
                select.style.borderColor = 'var(--accent-color)';
            } else {
                unanswered++;
                select.style.background = 'var(--warning-color)';
                select.style.color = 'white';
                select.style.borderColor = 'var(--warning-color)';
            }
        });
        
        // Display results in a result panel
        this.displayMazeResults(correct, incorrect, unanswered, total);
    }

    // Display maze results
    displayMazeResults(correct, incorrect, unanswered, total) {
        // Find or create results container
        let resultsContainer = document.getElementById('maze-results');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.id = 'maze-results';
            resultsContainer.className = 'maze-results';
            
            const mazeControls = document.querySelector('.maze-controls');
            if (mazeControls) {
                mazeControls.after(resultsContainer);
            }
        }
        
        // Maze accuracy is calculated based on attempted items only (correct + incorrect)
        // This matches the scoring logic in scoring.js
        const attempted = correct + incorrect;
        const accuracy = attempted > 0 ? Math.round((correct / attempted) * 100) : 0;
        
        resultsContainer.innerHTML = `
            <div class="result-header">
                <h4>Results</h4>
                <div class="result-score">${correct} / ${total}</div>
            </div>
            <div class="result-breakdown">
                <div class="result-item correct">
                    <span class="result-label">Correct:</span>
                    <span class="result-value">${correct}</span>
                </div>
                <div class="result-item incorrect">
                    <span class="result-label">Incorrect:</span>
                    <span class="result-value">${incorrect}</span>
                </div>
                <div class="result-item unanswered">
                    <span class="result-label">Unanswered:</span>
                    <span class="result-value">${unanswered}</span>
                </div>
            </div>
            <div class="result-accuracy">
                <span class="accuracy-label">Accuracy:</span>
                <span class="accuracy-value">${accuracy}%</span>
            </div>
        `;
        
        resultsContainer.style.display = 'block';
    }

    // Show maze answers
    showMazeAnswers() {
        const selects = document.querySelectorAll('.maze-select');
        
        selects.forEach(select => {
            const correctAnswer = select.dataset.correct;
            
            if (correctAnswer) {
                select.value = correctAnswer;
                select.style.background = 'var(--success-color)';
                select.style.color = 'white';
                select.style.borderColor = 'var(--success-color)';
            }
        });
        
        // Show all answers, so display message
        const total = selects.length;
        this.displayMazeResults(total, 0, 0, total);
    }

    // Show scoring panel
    showScoringPanel() {
        const scoringPanel = document.getElementById('scoring-panel');
        if (scoringPanel) {
            scoringPanel.classList.remove('hidden');
        }
    }

    // Add subtest-specific styles
    addSubtestStyles(css) {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    // Get practice results
    getResults() {
        const duration = this.endTime ? (this.endTime - this.startTime) / 1000 : 0;
        const correctResponses = this.responses.filter(r => r.response === 'correct' || r.response === 'read').length;
        const totalResponses = this.responses.length;
        
        return {
            subtest: this.currentSubtest,
            grade: this.currentGrade,
            duration: duration,
            correctResponses: correctResponses,
            totalResponses: totalResponses,
            accuracy: totalResponses > 0 ? (correctResponses / totalResponses) * 100 : 0,
            responses: this.responses
        };
    }
    
    // Get current practice content for printing
    getCurrentContent() {
        return {
            subtest: this.currentSubtest,
            grade: this.currentGrade,
            content: this.currentContent,
            options: this.practiceOptions
        };
    }
    
    // Reset subtest
    reset() {
        this.responses = [];
        this.startTime = null;
        this.endTime = null;
        this.orfWordIndex = 0;
        this.orfStartTime = null;
        this.orfWordTimes = [];
    }
}

// Create global subtest manager instance
window.subtestManager = new SubtestManager();
