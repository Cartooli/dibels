// Main application logic for DIBELS Practice Lab
class DIBELSApp {
    constructor() {
        this.currentGrade = null;
        this.currentSubtest = null;
        this.practiceOptions = {};
        this.isPracticeActive = false;
        this.init();
    }

    // Initialize the application
    init() {
        this.setupEventListeners();
        this.setupGradeSelection();
        this.setupSubtestSelection();
        this.setupPracticeOptions();
        this.setupPracticeControls();
        this.setupEducatorMode();
        this.setupFooterLinks();
    }

    // Setup event listeners
    setupEventListeners() {
        // Grade selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('grade-btn')) {
                this.selectGrade(e.target.dataset.grade);
            }
        });

        // Subtest selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('subtest-btn') || e.target.closest('.subtest-btn')) {
                const button = e.target.classList.contains('subtest-btn') ? e.target : e.target.closest('.subtest-btn');
                this.selectSubtest(button.dataset.subtest);
            }
        });

        // Start practice
        document.addEventListener('click', (e) => {
            if (e.target.id === 'start-practice') {
                this.startPractice();
            }
        });

        // Practice controls
        document.addEventListener('click', (e) => {
            if (e.target.id === 'pause-btn') {
                this.pausePractice();
            } else if (e.target.id === 'reset-btn') {
                this.resetPractice();
            } else if (e.target.id === 'new-set-btn') {
                this.newPracticeSet();
            } else if (e.target.id === 'back-to-menu') {
                this.backToMenu();
            }
        });

        // Scoring
        document.addEventListener('click', (e) => {
            if (e.target.id === 'calculate-score') {
                this.calculateScore();
            }
        });

        // Timer events
        window.practiceTimer.onTick((timeLeft) => {
            this.updateTimerDisplay(timeLeft);
        });

        window.practiceTimer.onComplete(() => {
            this.endPractice();
        });
    }

    // Setup grade selection
    setupGradeSelection() {
        const gradeButtons = document.querySelectorAll('.grade-btn');
        gradeButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectGrade(btn.dataset.grade);
            });
        });
    }

    // Setup subtest selection
    setupSubtestSelection() {
        // This will be populated dynamically based on grade selection
    }

    // Setup practice options
    setupPracticeOptions() {
        const optionInputs = document.querySelectorAll('.option-item input');
        optionInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.updatePracticeOptions();
            });
        });
    }

    // Setup practice controls
    setupPracticeControls() {
        // Practice controls are set up in event listeners
    }

    // Setup educator mode
    setupEducatorMode() {
        const educatorBtn = document.getElementById('educator-mode-btn');
        if (educatorBtn) {
            educatorBtn.addEventListener('click', () => {
                this.showEducatorMode();
            });
        }
    }

    // Setup footer links
    setupFooterLinks() {
        const aboutBtn = document.getElementById('about-btn');
        const settingsBtn = document.getElementById('settings-btn');
        const progressBtn = document.getElementById('progress-btn');
        
        if (aboutBtn) {
            aboutBtn.addEventListener('click', () => {
                this.showAbout();
            });
        }
        
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showSettings();
            });
        }
        
        if (progressBtn) {
            progressBtn.addEventListener('click', () => {
                this.showProgress();
            });
        }
    }

    // Select grade
    selectGrade(grade) {
        this.currentGrade = grade;
        
        // Update UI
        document.querySelectorAll('.grade-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        document.querySelector(`[data-grade="${grade}"]`).classList.add('selected');
        
        // Show subtest selection
        this.showSubtestSelection(grade);
    }

    // Show subtest selection for grade
    showSubtestSelection(grade) {
        const subtestSelection = document.getElementById('subtest-selection');
        const subtestButtons = document.getElementById('subtest-buttons');
        
        if (!subtestSelection || !subtestButtons) return;
        
        // Get available subtests for grade
        const availableSubtests = DIBELS_CONTENT.gradeSubtests[grade] || [];
        
        // Clear existing buttons
        subtestButtons.innerHTML = '';
        
        // Create subtest buttons
        availableSubtests.forEach(subtest => {
            const description = DIBELS_CONTENT.subtestDescriptions[subtest];
            const button = document.createElement('button');
            button.className = 'subtest-btn';
            button.dataset.subtest = subtest;
            button.innerHTML = `
                <div class="subtest-name">${description.name}</div>
                <div class="subtest-desc">${description.description}</div>
            `;
            subtestButtons.appendChild(button);
        });
        
        // Show subtest selection
        subtestSelection.classList.remove('hidden');
        
        // Show practice options
        this.showPracticeOptions();
    }

    // Select subtest
    selectSubtest(subtest) {
        console.log('Selecting subtest:', subtest);
        this.currentSubtest = subtest;
        
        // Update UI
        document.querySelectorAll('.subtest-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        const selectedButton = document.querySelector(`[data-subtest="${subtest}"]`);
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }
        
        // Update practice options based on subtest
        this.updatePracticeOptionsForSubtest(subtest);
        
        console.log('Current grade:', this.currentGrade, 'Current subtest:', this.currentSubtest);
    }

    // Show practice options
    showPracticeOptions() {
        const practiceOptions = document.getElementById('practice-options');
        if (practiceOptions) {
            practiceOptions.classList.remove('hidden');
        }
    }

    // Update practice options for subtest
    updatePracticeOptionsForSubtest(subtest) {
        const revealAnswers = document.getElementById('reveal-answers');
        const audioModeling = document.getElementById('audio-modeling');
        
        if (revealAnswers) {
            // Enable reveal answers for PSF and NWF
            revealAnswers.disabled = !['PSF', 'NWF'].includes(subtest);
        }
        
        if (audioModeling) {
            // Enable audio modeling for ORF and WRF
            audioModeling.disabled = !['ORF', 'WRF'].includes(subtest);
        }
    }

    // Update practice options
    updatePracticeOptions() {
        this.practiceOptions = {
            timed: document.getElementById('timed-mode')?.checked || false,
            showTimer: document.getElementById('show-timer')?.checked || false,
            revealAnswers: document.getElementById('reveal-answers')?.checked || false,
            audioModeling: document.getElementById('audio-modeling')?.checked || false
        };
    }

    // Start practice
    startPractice() {
        console.log('Starting practice - Grade:', this.currentGrade, 'Subtest:', this.currentSubtest);
        if (!this.currentGrade || !this.currentSubtest) {
            console.log('Missing grade or subtest selection');
            alert('Please select a grade and subtest first.');
            return;
        }
        
        this.updatePracticeOptions();
        
        // Initialize subtest
        const success = window.subtestManager.initSubtest(
            this.currentSubtest,
            this.currentGrade,
            this.practiceOptions
        );
        
        if (!success) {
            alert('Failed to initialize practice session.');
            return;
        }
        
        // Show practice interface
        this.showPracticeInterface();
        
        // Start practice
        window.subtestManager.startPractice();
        
        this.isPracticeActive = true;
        
        // Update accessibility
        window.accessibilityManager.setupPracticeAccessibility();
        window.accessibilityManager.updateFocusableElements();
    }

    // Show practice interface
    showPracticeInterface() {
        // Hide welcome section
        document.getElementById('welcome-section').classList.add('hidden');
        
        // Show practice section
        const practiceSection = document.getElementById('practice-section');
        practiceSection.classList.remove('hidden');
        
        // Update practice title
        const practiceTitle = document.getElementById('practice-title');
        const practiceSubtitle = document.getElementById('practice-subtitle');
        const description = DIBELS_CONTENT.subtestDescriptions[this.currentSubtest];
        
        if (practiceTitle) {
            practiceTitle.textContent = description.name;
        }
        if (practiceSubtitle) {
            practiceSubtitle.textContent = `Grade ${this.currentGrade} - ${description.description}`;
        }
        
        // Show/hide timer based on options
        const timerContainer = document.querySelector('.timer-container');
        if (timerContainer) {
            if (this.practiceOptions.showTimer) {
                timerContainer.classList.remove('hidden');
            } else {
                timerContainer.classList.add('hidden');
            }
        }
        
        // Add print button
        this.addPrintButton();
    }

    // Pause practice
    pausePractice() {
        if (window.practiceTimer.getIsRunning()) {
            window.practiceTimer.pause();
            document.getElementById('pause-btn').textContent = 'Resume';
        } else {
            window.practiceTimer.start();
            document.getElementById('pause-btn').textContent = 'Pause';
        }
    }

    // Reset practice
    resetPractice() {
        window.practiceTimer.reset();
        window.subtestManager.reset();
        this.startPractice();
    }

    // New practice set
    newPracticeSet() {
        this.startPractice();
    }

    // Back to menu
    backToMenu() {
        // Stop any ongoing practice
        window.practiceTimer.stop();
        window.audioManager.stop();
        
        // Reset state
        this.currentGrade = null;
        this.currentSubtest = null;
        this.isPracticeActive = false;
        
        // Hide practice section
        document.getElementById('practice-section').classList.add('hidden');
        
        // Show welcome section
        document.getElementById('welcome-section').classList.remove('hidden');
        
        // Reset UI
        document.querySelectorAll('.grade-btn').forEach(btn => btn.classList.remove('selected'));
        document.querySelectorAll('.subtest-btn').forEach(btn => btn.classList.remove('selected'));
        document.getElementById('subtest-selection').classList.add('hidden');
        document.getElementById('practice-options').classList.add('hidden');
    }

    // End practice
    endPractice() {
        this.isPracticeActive = false;
        
        // Get results
        const results = window.subtestManager.getResults();
        
        // Show scoring panel
        document.getElementById('scoring-panel').classList.remove('hidden');
        
        // Update accessibility
        window.accessibilityManager.setupScoringAccessibility();
        
        // Announce completion
        window.accessibilityManager.announce('Practice session completed. Please enter your scoring information.');
        
        // Play completion sound
        window.audioManager.playCorrectSound();
    }

    // Calculate score
    calculateScore() {
        const correctInput = document.getElementById('correct-responses');
        const errorsInput = document.getElementById('errors');
        const scoreResult = document.getElementById('score-result');
        
        if (!correctInput || !errorsInput || !scoreResult) return;
        
        const correct = parseInt(correctInput.value) || 0;
        const errors = parseInt(errorsInput.value) || 0;
        const total = correct + errors;
        
        if (total === 0) {
            scoreResult.textContent = 'Please enter correct responses and errors.';
            return;
        }
        
        const accuracy = (correct / total) * 100;
        const score = correct - errors; // DIBELS scoring typically subtracts errors
        
        scoreResult.innerHTML = `
            <div><strong>Total Responses:</strong> ${total}</div>
            <div><strong>Accuracy:</strong> ${accuracy.toFixed(1)}%</div>
            <div><strong>Score:</strong> ${score}</div>
        `;
        
        // Announce score
        window.accessibilityManager.announce(`Practice completed. Score: ${score}. Accuracy: ${accuracy.toFixed(1)} percent.`);
    }

    // Update timer display
    updateTimerDisplay(timeLeft) {
        const timer = document.getElementById('timer');
        if (timer) {
            timer.textContent = timeLeft;
            
            // Add warning class when time is low
            if (timeLeft <= 10) {
                timer.classList.add('warning');
                if (timeLeft <= 5) {
                    window.audioManager.playWarningSound();
                }
            } else {
                timer.classList.remove('warning');
            }
        }
    }

    // Add print button
    addPrintButton() {
        const practiceControls = document.querySelector('.practice-controls');
        if (practiceControls && !document.getElementById('print-btn')) {
            const printBtn = document.createElement('button');
            printBtn.id = 'print-btn';
            printBtn.className = 'control-btn';
            printBtn.textContent = 'Print Sheet';
            printBtn.addEventListener('click', () => {
                window.printManager.printCurrentContent();
            });
            practiceControls.appendChild(printBtn);
        }
    }

    // Show educator mode
    showEducatorMode() {
        // Hide other sections
        document.getElementById('welcome-section').classList.add('hidden');
        document.getElementById('practice-section').classList.add('hidden');
        
        // Show educator section
        document.getElementById('educator-section').classList.remove('hidden');
        
        // Setup educator modules
        this.setupEducatorModules();
    }

    // Setup educator modules
    setupEducatorModules() {
        const moduleButtons = document.querySelectorAll('.module-btn');
        moduleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const module = btn.dataset.module;
                this.showEducatorModule(module);
            });
        });
    }

    // Show educator module
    showEducatorModule(module) {
        switch (module) {
            case 'administration':
                this.showAdministrationGuide();
                break;
            case 'scoring':
                this.showScoringPractice();
                break;
            case 'errors':
                this.showErrorAnalysis();
                break;
        }
    }

    // Show administration guide
    showAdministrationGuide() {
        const guide = `
            <div class="educator-content">
                <h3>DIBELS Administration Guide</h3>
                <div class="guide-section">
                    <h4>General Administration Principles</h4>
                    <ul>
                        <li>Ensure a quiet, distraction-free environment</li>
                        <li>Position yourself so you can see the student's responses</li>
                        <li>Use a stopwatch or timer for accurate timing</li>
                        <li>Follow standardized procedures exactly</li>
                        <li>Provide encouragement but avoid giving hints</li>
                        <li>Allow adequate practice items before testing</li>
                        <li>Maintain a neutral, encouraging demeanor</li>
                    </ul>
                </div>
                <div class="guide-section">
                    <h4>Subtest-Specific Guidelines</h4>
                    <ul>
                        <li><strong>LNF:</strong> Present letters in random order, 1 second per letter</li>
                        <li><strong>PSF:</strong> Use clear pronunciation, avoid emphasis on individual sounds</li>
                        <li><strong>NWF:</strong> Present nonsense words clearly, emphasize blending</li>
                        <li><strong>WRF:</strong> Use grade-appropriate word lists, 3 seconds per word</li>
                        <li><strong>ORF:</strong> Use grade-appropriate passages, 1 minute timing</li>
                        <li><strong>Maze:</strong> Follow timing guidelines precisely, 3 minutes total</li>
                    </ul>
                </div>
                <div class="guide-section">
                    <h4>Scoring Guidelines</h4>
                    <ul>
                        <li>Mark errors immediately as they occur</li>
                        <li>Count self-corrections as correct if made within 3 seconds</li>
                        <li>Count hesitations longer than 3 seconds as errors</li>
                        <li>Stop at the time limit, even mid-word</li>
                        <li>Calculate accuracy: (Correct / Total) × 100</li>
                        <li>Record exact responses for error analysis</li>
                        <li>Use standardized scoring rubrics</li>
                    </ul>
                </div>
                <div class="guide-section">
                    <h4>Common Administration Errors to Avoid</h4>
                    <ul>
                        <li>Giving hints or prompts during testing</li>
                        <li>Allowing extra time beyond specified limits</li>
                        <li>Incorrectly pronouncing test items</li>
                        <li>Recording responses inaccurately</li>
                        <li>Providing feedback during the assessment</li>
                        <li>Rushing through directions</li>
                    </ul>
                </div>
                <button class="close-modal" onclick="this.closest('.educator-modal').remove()">Close</button>
            </div>
        `;
        
        this.showEducatorModal(guide);
    }

    // Show scoring practice
    showScoringPractice() {
        const practice = `
            <div class="educator-content">
                <h3>Scoring Practice</h3>
                <p>Practice scoring with sample student responses. Try scoring these examples and check your accuracy:</p>
                
                <div class="scoring-practice">
                    <div class="sample-response">
                        <h4>Sample LNF Response</h4>
                        <p><strong>Student read:</strong> "A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T, U, V, W, X, Y, Z"</p>
                        <p><strong>Time:</strong> 45 seconds</p>
                        <div class="scoring-inputs">
                            <label>Correct: <input type="number" id="practice-correct" value="26"></label>
                            <label>Errors: <input type="number" id="practice-errors" value="0"></label>
                            <button class="control-btn" onclick="calculatePracticeScore()">Calculate Score</button>
                        </div>
                        <div id="practice-score-result"></div>
                    </div>
                    
                    <div class="sample-response">
                        <h4>Sample PSF Response</h4>
                        <p><strong>Word:</strong> "cat"</p>
                        <p><strong>Student response:</strong> "/k/ /a/ /t/"</p>
                        <p><strong>Correct answer:</strong> 3 phonemes</p>
                        <div class="scoring-inputs">
                            <label>Phonemes: <input type="number" id="psf-correct" value="3"></label>
                            <button class="control-btn" onclick="calculatePSFScore()">Check Answer</button>
                        </div>
                        <div id="psf-score-result"></div>
                    </div>
                    
                    <div class="sample-response">
                        <h4>Sample ORF Response</h4>
                        <p><strong>Passage:</strong> "The cat sat on the mat."</p>
                        <p><strong>Student read:</strong> "The cat sat on the mat."</p>
                        <p><strong>Time:</strong> 6 seconds</p>
                        <div class="scoring-inputs">
                            <label>Words Correct: <input type="number" id="orf-correct" value="6"></label>
                            <label>Errors: <input type="number" id="orf-errors" value="0"></label>
                            <button class="control-btn" onclick="calculateORFScore()">Calculate WCPM</button>
                        </div>
                        <div id="orf-score-result"></div>
                    </div>
                </div>
                
                <div class="guide-section">
                    <h4>Scoring Tips</h4>
                    <ul>
                        <li>Count only words read correctly within the time limit</li>
                        <li>Self-corrections count as correct if made within 3 seconds</li>
                        <li>Hesitations longer than 3 seconds count as errors</li>
                        <li>For ORF, calculate Words Correct Per Minute (WCPM)</li>
                        <li>For PSF, count individual phonemes, not syllables</li>
                    </ul>
                </div>
                
                <button class="close-modal" onclick="this.closest('.educator-modal').remove()">Close</button>
            </div>
        `;
        
        this.showEducatorModal(practice);
    }

    // Show error analysis
    showErrorAnalysis() {
        const analysis = `
            <div class="educator-content">
                <h3>Error Analysis Guide</h3>
                <div class="error-types">
                    <h4>Common Error Types</h4>
                    <ul>
                        <li><strong>Substitution:</strong> Student says different word/sound (e.g., "cat" → "bat")</li>
                        <li><strong>Omission:</strong> Student skips word/sound (e.g., "cat" → "at")</li>
                        <li><strong>Insertion:</strong> Student adds extra word/sound (e.g., "cat" → "cats")</li>
                        <li><strong>Hesitation:</strong> Student pauses >3 seconds</li>
                        <li><strong>Self-correction:</strong> Student corrects own error within 3 seconds</li>
                        <li><strong>Repetition:</strong> Student repeats word/sound multiple times</li>
                    </ul>
                </div>
                <div class="error-patterns">
                    <h4>Error Patterns to Note</h4>
                    <ul>
                        <li>Consistent letter reversals (b/d, p/q, m/w)</li>
                        <li>Difficulty with specific letter sounds (/r/, /l/, /th/)</li>
                        <li>Struggles with vowel sounds (short vs. long vowels)</li>
                        <li>Problems with consonant blends (bl, cr, st, etc.)</li>
                        <li>Difficulty with multisyllabic words</li>
                        <li>Confusion with similar-looking letters (b/p, d/q)</li>
                        <li>Difficulty with digraphs (sh, ch, th, wh)</li>
                    </ul>
                </div>
                <div class="guide-section">
                    <h4>Intervention Strategies by Error Type</h4>
                    <ul>
                        <li><strong>Letter Reversals:</strong> Use visual cues, tracing, and kinesthetic activities</li>
                        <li><strong>Sound Confusion:</strong> Focus on auditory discrimination and articulation</li>
                        <li><strong>Blend Difficulties:</strong> Practice blending sounds step-by-step</li>
                        <li><strong>Vowel Problems:</strong> Use visual vowel charts and mouth position practice</li>
                        <li><strong>Multisyllabic Words:</strong> Teach syllable division and chunking strategies</li>
                    </ul>
                </div>
                <div class="guide-section">
                    <h4>Recording and Tracking Errors</h4>
                    <ul>
                        <li>Record exact student responses during testing</li>
                        <li>Note patterns across multiple assessments</li>
                        <li>Track progress over time</li>
                        <li>Use error analysis to inform instruction</li>
                        <li>Share findings with intervention teams</li>
                    </ul>
                </div>
                <button class="close-modal" onclick="this.closest('.educator-modal').remove()">Close</button>
            </div>
        `;
        
        this.showEducatorModal(analysis);
    }

    // Show educator modal
    showEducatorModal(content) {
        const modal = document.createElement('div');
        modal.className = 'educator-modal';
        modal.innerHTML = `
            <div class="modal-content">
                ${content}
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Add modal styles
        const style = document.createElement('style');
        style.textContent = `
            .educator-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
            
            .modal-content {
                background: white;
                border-radius: var(--radius-xl);
                padding: 2rem;
                max-width: 600px;
                max-height: 80vh;
                overflow-y: auto;
                box-shadow: var(--shadow-lg);
            }
            
            .educator-content h3 {
                margin-top: 0;
                color: var(--gray-900);
            }
            
            .guide-section, .error-types, .error-patterns {
                margin: 1.5rem 0;
            }
            
            .guide-section h4, .error-types h4, .error-patterns h4 {
                color: var(--primary-color);
                margin-bottom: 0.5rem;
            }
            
            .scoring-practice {
                margin: 1rem 0;
            }
            
            .sample-response {
                background: var(--gray-50);
                padding: 1rem;
                border-radius: var(--radius-lg);
                margin: 1rem 0;
            }
            
            .scoring-inputs {
                display: flex;
                gap: 1rem;
                align-items: center;
                margin: 1rem 0;
            }
            
            .scoring-inputs label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
        `;
        document.head.appendChild(style);
    }

    // Show settings
    showSettings() {
        // Hide other sections
        document.getElementById('welcome-section').classList.add('hidden');
        document.getElementById('practice-section').classList.add('hidden');
        document.getElementById('educator-section').classList.add('hidden');
        document.getElementById('progress-section').classList.add('hidden');
        
        // Show settings section
        document.getElementById('settings-section').classList.remove('hidden');
        
        // Setup settings event listeners
        this.setupSettingsEventListeners();
        
        // Load current settings
        this.loadSettings();
    }

    // Show progress
    showProgress() {
        // Hide other sections
        document.getElementById('welcome-section').classList.add('hidden');
        document.getElementById('practice-section').classList.add('hidden');
        document.getElementById('educator-section').classList.add('hidden');
        document.getElementById('settings-section').classList.add('hidden');
        
        // Show progress section
        document.getElementById('progress-section').classList.remove('hidden');
        
        // Load progress data
        this.loadProgressData();
    }

    // Setup settings event listeners
    setupSettingsEventListeners() {
        // Font size
        const fontSizeSelect = document.getElementById('font-size-select');
        if (fontSizeSelect) {
            fontSizeSelect.addEventListener('change', (e) => {
                this.setFontSize(e.target.value);
            });
        }

        // High contrast
        const highContrastToggle = document.getElementById('high-contrast-toggle');
        if (highContrastToggle) {
            highContrastToggle.addEventListener('change', (e) => {
                this.toggleHighContrast(e.target.checked);
            });
        }

        // Reduced motion
        const reducedMotionToggle = document.getElementById('reduced-motion-toggle');
        if (reducedMotionToggle) {
            reducedMotionToggle.addEventListener('change', (e) => {
                this.toggleReducedMotion(e.target.checked);
            });
        }

        // Default timer
        const defaultTimer = document.getElementById('default-timer');
        if (defaultTimer) {
            defaultTimer.addEventListener('change', (e) => {
                this.setDefaultTimer(parseInt(e.target.value));
            });
        }

        // Auto-save
        const autoSaveToggle = document.getElementById('auto-save-toggle');
        if (autoSaveToggle) {
            autoSaveToggle.addEventListener('change', (e) => {
                this.setAutoSave(e.target.checked);
            });
        }

        // Sound effects
        const soundEffectsToggle = document.getElementById('sound-effects-toggle');
        if (soundEffectsToggle) {
            soundEffectsToggle.addEventListener('change', (e) => {
                this.setSoundEffects(e.target.checked);
            });
        }

        // Data management
        const exportDataBtn = document.getElementById('export-data-btn');
        const importDataBtn = document.getElementById('import-data-btn');
        const importFile = document.getElementById('import-file');
        const clearDataBtn = document.getElementById('clear-data-btn');
        const closeSettingsBtn = document.getElementById('close-settings-btn');

        if (exportDataBtn) {
            exportDataBtn.addEventListener('click', () => {
                this.exportData();
            });
        }

        if (importDataBtn) {
            importDataBtn.addEventListener('click', () => {
                importFile.click();
            });
        }

        if (importFile) {
            importFile.addEventListener('change', (e) => {
                this.importData(e.target.files[0]);
            });
        }

        if (clearDataBtn) {
            clearDataBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                    this.clearAllData();
                }
            });
        }

        if (closeSettingsBtn) {
            closeSettingsBtn.addEventListener('click', () => {
                this.backToMenu();
            });
        }
    }

    // Settings methods
    loadSettings() {
        const settings = window.progressTracker.getSettings();
        
        // Font size
        const fontSizeSelect = document.getElementById('font-size-select');
        if (fontSizeSelect && settings.fontSize) {
            fontSizeSelect.value = settings.fontSize;
        }

        // High contrast
        const highContrastToggle = document.getElementById('high-contrast-toggle');
        if (highContrastToggle) {
            highContrastToggle.checked = settings.highContrast || false;
        }

        // Reduced motion
        const reducedMotionToggle = document.getElementById('reduced-motion-toggle');
        if (reducedMotionToggle) {
            reducedMotionToggle.checked = settings.reducedMotion || false;
        }

        // Default timer
        const defaultTimer = document.getElementById('default-timer');
        if (defaultTimer) {
            defaultTimer.value = settings.defaultTimer || 60;
        }

        // Auto-save
        const autoSaveToggle = document.getElementById('auto-save-toggle');
        if (autoSaveToggle) {
            autoSaveToggle.checked = settings.autoSave !== false;
        }

        // Sound effects
        const soundEffectsToggle = document.getElementById('sound-effects-toggle');
        if (soundEffectsToggle) {
            soundEffectsToggle.checked = settings.soundEffects !== false;
        }
    }

    setFontSize(size) {
        document.documentElement.style.setProperty('--font-size-base', size);
        window.progressTracker.saveSettings({ fontSize: size });
    }

    toggleHighContrast(enabled) {
        if (enabled) {
            document.body.classList.add('high-contrast');
        } else {
            document.body.classList.remove('high-contrast');
        }
        window.progressTracker.saveSettings({ highContrast: enabled });
    }

    toggleReducedMotion(enabled) {
        if (enabled) {
            document.body.classList.add('reduced-motion');
        } else {
            document.body.classList.remove('reduced-motion');
        }
        window.progressTracker.saveSettings({ reducedMotion: enabled });
    }

    setDefaultTimer(seconds) {
        window.progressTracker.saveSettings({ defaultTimer: seconds });
    }

    setAutoSave(enabled) {
        window.progressTracker.saveSettings({ autoSave: enabled });
    }

    setSoundEffects(enabled) {
        window.progressTracker.saveSettings({ soundEffects: enabled });
    }

    exportData() {
        window.progressTracker.exportData();
    }

    async importData(file) {
        try {
            await window.progressTracker.importData(file);
            alert('Data imported successfully!');
            this.loadSettings();
            this.loadProgressData();
        } catch (error) {
            alert('Error importing data: ' + error.message);
        }
    }

    clearAllData() {
        window.progressTracker.clearAllData();
        alert('All data cleared successfully!');
        this.loadSettings();
        this.loadProgressData();
    }

    // Progress methods
    loadProgressData() {
        const analytics = window.progressTracker.getAnalytics();
        
        // Overall stats
        document.getElementById('total-sessions').textContent = analytics.totalSessions;
        document.getElementById('total-time').textContent = Math.round(analytics.totalTime / 60000) + ' minutes';
        document.getElementById('average-score').textContent = Math.round(analytics.averageScore);
        document.getElementById('average-accuracy').textContent = Math.round(analytics.averageAccuracy) + '%';

        // Recent sessions
        this.displayRecentSessions(analytics.recentSessions);

        // Grade stats
        this.displayGradeStats(analytics.byGrade);
    }

    displayRecentSessions(sessions) {
        const container = document.getElementById('recent-sessions');
        if (sessions.length === 0) {
            container.innerHTML = '<p>No sessions yet. Start practicing to see your progress!</p>';
            return;
        }

        container.innerHTML = sessions.map(session => `
            <div class="session-item">
                <div class="session-header">
                    <div class="session-title">Grade ${session.grade} - ${session.subtest}</div>
                    <div class="session-date">${new Date(session.date).toLocaleDateString()}</div>
                </div>
                <div class="session-stats">
                    <div class="session-stat">
                        <div class="session-stat-label">Duration</div>
                        <div class="session-stat-value">${Math.round(session.duration / 1000)}s</div>
                    </div>
                    <div class="session-stat">
                        <div class="session-stat-label">Score</div>
                        <div class="session-stat-value">${session.score || 0}</div>
                    </div>
                    <div class="session-stat">
                        <div class="session-stat-label">Accuracy</div>
                        <div class="session-stat-value">${Math.round(session.accuracy || 0)}%</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    displayGradeStats(gradeStats) {
        const container = document.getElementById('grade-stats');
        if (Object.keys(gradeStats).length === 0) {
            container.innerHTML = '<p>No grade data available yet.</p>';
            return;
        }

        container.innerHTML = `
            <div class="grade-performance">
                ${Object.entries(gradeStats).map(([grade, stats]) => `
                    <div class="grade-item">
                        <div class="grade-name">Grade ${grade}</div>
                        <div class="grade-stats">
                            <div class="grade-stat">
                                <div class="grade-stat-label">Sessions</div>
                                <div class="grade-stat-value">${stats.sessions}</div>
                            </div>
                            <div class="grade-stat">
                                <div class="grade-stat-label">Avg Score</div>
                                <div class="grade-stat-value">${Math.round(stats.averageScore)}</div>
                            </div>
                            <div class="grade-stat">
                                <div class="grade-stat-label">Avg Accuracy</div>
                                <div class="grade-stat-value">${Math.round(stats.averageAccuracy)}%</div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Show about
    showAbout() {
        const about = `
            <div class="about-content">
                <h3>About DIBELS Practice Lab</h3>
                <p>DIBELS Practice Lab is a free, open-source web application designed to help educators, interventionists, and families practice DIBELS 8 subtests with students in grades K-8.</p>
                
                <h4>Features</h4>
                <ul>
                    <li>Practice all 6 DIBELS 8 subtests</li>
                    <li>Grade-appropriate content (K-8)</li>
                    <li>Timed and untimed practice modes</li>
                    <li>Audio modeling and read-aloud features</li>
                    <li>Printable practice sheets</li>
                    <li>Educator training modules</li>
                    <li>Accessibility features</li>
                    <li>Progress tracking and analytics</li>
                    <li>PWA support for offline use</li>
                    <li>Keyboard navigation</li>
                </ul>
                
                <h4>Open Source</h4>
                <p>This project is open source and available under the MIT License. All content is designed as an open educational resource (OER).</p>
                
                <h4>No Data Collection</h4>
                <p>This application does not collect, store, or transmit any personal data. All practice is conducted locally in your browser.</p>
                
                <button class="control-btn" onclick="this.parentElement.parentElement.remove()">Close</button>
            </div>
        `;
        
        this.showEducatorModal(about);
    }
}

// Global functions for educator modules
window.calculatePracticeScore = function() {
    const correct = parseInt(document.getElementById('practice-correct').value) || 0;
    const errors = parseInt(document.getElementById('practice-errors').value) || 0;
    const total = correct + errors;
    const accuracy = total > 0 ? (correct / total) * 100 : 0;
    const score = correct - errors;
    
    const result = document.getElementById('practice-score-result');
    if (result) {
        result.innerHTML = `
            <div class="scoring-result">
                <div><strong>Total Responses:</strong> ${total}</div>
                <div><strong>Accuracy:</strong> ${accuracy.toFixed(1)}%</div>
                <div><strong>Score:</strong> ${score}</div>
            </div>
        `;
    }
};

window.calculatePSFScore = function() {
    const phonemes = parseInt(document.getElementById('psf-correct').value) || 0;
    const correct = 3; // "cat" has 3 phonemes
    
    const result = document.getElementById('psf-score-result');
    if (result) {
        if (phonemes === correct) {
            result.innerHTML = `
                <div class="scoring-result" style="background: var(--success-color);">
                    <p>✓ Correct! "cat" has 3 phonemes: /k/ /a/ /t/</p>
                </div>
            `;
        } else {
            result.innerHTML = `
                <div class="scoring-result" style="background: var(--accent-color);">
                    <p>✗ Incorrect. "cat" has 3 phonemes: /k/ /a/ /t/</p>
                </div>
            `;
        }
    }
};

window.calculateORFScore = function() {
    const correct = parseInt(document.getElementById('orf-correct').value) || 0;
    const errors = parseInt(document.getElementById('orf-errors').value) || 0;
    const time = 6; // 6 seconds
    const wcpm = Math.round((correct / time) * 60);
    
    const result = document.getElementById('orf-score-result');
    if (result) {
        result.innerHTML = `
            <div class="scoring-result">
                <p><strong>Words Correct:</strong> ${correct} | <strong>Errors:</strong> ${errors} | <strong>WCPM:</strong> ${wcpm}</p>
            </div>
        `;
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dibelsApp = new DIBELSApp();
});
