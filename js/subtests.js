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
                <div class="letter-grid">
                    ${content.map(letter => `<span class="letter-item">${letter}</span>`).join('')}
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
            
            .letter-item {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 60px;
                height: 60px;
                background: white;
                border: 2px solid var(--gray-200);
                border-radius: var(--radius-lg);
                font-size: 2rem;
                font-weight: 600;
                color: #000000;
                cursor: pointer;
                transition: all var(--transition-fast);
                user-select: none;
            }
            
            .letter-item:hover {
                border-color: var(--primary-color);
                background: var(--gray-50);
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
            
            .word-item {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 1rem;
                background: white;
                border: 2px solid var(--gray-200);
                border-radius: var(--radius-lg);
                font-size: 1.5rem;
                font-weight: 600;
                color: #000000;
                cursor: pointer;
                transition: all var(--transition-fast);
                user-select: none;
                text-align: center;
            }
            
            .word-item:hover {
                border-color: var(--primary-color);
                background: var(--gray-50);
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
            <div class="wrf-content">
                <div class="word-grid">
                    ${content.map(word => `<span class="word-item">${word}</span>`).join('')}
                </div>
            </div>
        `;

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
                background: white;
                border: 2px solid var(--gray-200);
                border-radius: var(--radius-lg);
                font-size: 1.25rem;
                font-weight: 500;
                color: #000000;
                cursor: pointer;
                transition: all var(--transition-fast);
                user-select: none;
                text-align: center;
            }
            
            .word-item:hover {
                border-color: var(--primary-color);
                background: var(--gray-50);
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
            <div class="orf-content">
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

        this.addSubtestStyles(`
            .passage-container {
                max-width: 800px;
                margin: 0 auto;
                text-align: left;
            }
            
            .passage-container h4 {
                text-align: center;
                margin-bottom: 2rem;
                color: #000000;
            }
            
            .passage-text {
                font-size: 1.25rem;
                line-height: 1.8;
                color: #000000;
                background: white;
                padding: 2rem;
                border-radius: var(--radius-lg);
                border: 2px solid var(--gray-200);
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

        this.setupMazeEventListeners();
    }

    // Render maze passage with blanks
    renderMazePassage(content) {
        const words = content.text.split(' ');
        let result = '';
        
        for (let i = 0; i < words.length; i++) {
            const question = content.questions.find(q => q.position === i);
            if (question) {
                result += `<span class="maze-blank">
                    <select class="maze-select" data-position="${i}">
                        <option value="">Choose...</option>
                        ${question.options.map(option => 
                            `<option value="${option}">${option}</option>`
                        ).join('')}
                    </select>
                </span> `;
            } else {
                result += words[i] + ' ';
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
                }
            });
        }
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

    // Simple phoneme breakdown (placeholder)
    breakIntoPhonemes(word) {
        // This is a simplified version - real implementation would use proper phoneme analysis
        const vowels = 'aeiou';
        let phonemes = [];
        let current = '';
        
        for (let char of word.toLowerCase()) {
            current += char;
            if (vowels.includes(char)) {
                phonemes.push(current);
                current = '';
            }
        }
        if (current) phonemes.push(current);
        
        return phonemes;
    }

    // Check maze answers
    checkMazeAnswers() {
        const selects = document.querySelectorAll('.maze-select');
        let correct = 0;
        let total = selects.length;
        
        selects.forEach(select => {
            const position = parseInt(select.dataset.position);
            const question = this.currentContent.content.questions.find(q => q.position === position);
            const selectedValue = select.value;
            
            if (question && selectedValue === question.options[0]) {
                correct++;
                select.style.background = 'var(--success-color)';
                select.style.color = 'white';
            } else if (question && selectedValue) {
                select.style.background = 'var(--accent-color)';
                select.style.color = 'white';
            }
        });
        
        alert(`You got ${correct} out of ${total} correct!`);
    }

    // Show maze answers
    showMazeAnswers() {
        const selects = document.querySelectorAll('.maze-select');
        
        selects.forEach(select => {
            const position = parseInt(select.dataset.position);
            const question = this.currentContent.content.questions.find(q => q.position === position);
            
            if (question) {
                select.value = question.options[0];
                select.style.background = 'var(--success-color)';
                select.style.color = 'white';
            }
        });
    }

    // Show scoring panel
    showScoringPanel() {
        const scoringPanel = document.getElementById('scoring-panel');
        if (scoringPanel) {
            scoringPanel.style.display = 'block';
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
}

// Create global subtest manager instance
window.subtestManager = new SubtestManager();
