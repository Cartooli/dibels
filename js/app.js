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
        this.setupPracticeOptions();
        this.setupEducatorMode();
        this.setupFooterLinks();
        this.setupTutorial();
        this.setupKeyboardShortcuts();
        this.setupBottomNavigation();
        this.setupHashRouting();
        this.updateGradeButtonsWithCounts();
        this.updateStreakDisplay();
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

        // Educator modal close and action buttons (delegation)
        document.addEventListener('click', (e) => {
            const closeBtn = e.target.closest('.close-modal, [data-close="modal"]');
            if (closeBtn) {
                const modal = closeBtn.closest('.educator-modal');
                if (modal) {
                    modal.remove();
                    return;
                }
            }
            if (e.target.closest('[data-action="new-practice-set"]')) {
                this.newPracticeSet();
            }
        });

        // Breadcrumb navigation
        document.addEventListener('click', (e) => {
            if (e.target.id === 'breadcrumb-home') {
                // eslint-disable-next-line no-alert
                if (!this.isPracticeActive || confirm('Leave practice and return to grade selection?')) {
                    this.backToMenu();
                }
            } else if (e.target.id === 'breadcrumb-grade') {
                // eslint-disable-next-line no-alert
                if (!this.isPracticeActive || confirm('Leave practice and choose a different subtest?')) {
                    this.backToSubtestSelection();
                }
            }
        });

        // Scoring input validation and real-time accuracy
        document.addEventListener('input', (e) => {
            if (e.target.id === 'correct-responses' || e.target.id === 'errors') {
                const correctInput = document.getElementById('correct-responses');
                const errorsInput = document.getElementById('errors');
                if (correctInput && errorsInput) {
                    this.validateScoreInputs(correctInput, errorsInput);
                    this.updateRealTimeAccuracy(correctInput, errorsInput);
                }
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

    // Setup practice options
    setupPracticeOptions() {
        const optionInputs = document.querySelectorAll('.option-item input');
        optionInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.updatePracticeOptions();
            });
        });
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

    // Update the step indicator (steps: 1 = grade, 2 = subtest, 3 = options/start)
    updateStepIndicator(currentStep) {
        const stepText = document.getElementById('step-text');
        const labels = [
            'Step 1 of 3 — Choose a grade',
            'Step 2 of 3 — Choose a subtest',
            'Step 3 of 3 — Configure & start'
        ];
        if (stepText) stepText.textContent = labels[currentStep - 1] || labels[0];

        for (let i = 1; i <= 3; i++) {
            const pip = document.getElementById(`step-pip-${i}`);
            if (!pip) continue;
            pip.classList.remove('active', 'done');
            if (i < currentStep) pip.classList.add('done');
            else if (i === currentStep) pip.classList.add('active');
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
        this.updateStepIndicator(2);
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
        
        // Setup previous button
        const previousBtn = document.getElementById('previous-grade-btn');
        if (previousBtn) {
            previousBtn.onclick = () => {
                subtestSelection.classList.add('hidden');
                document.getElementById('practice-options')?.classList.add('hidden');
                document.querySelectorAll('.grade-btn').forEach(btn => btn.classList.remove('selected'));
                this.currentGrade = null;
                this.currentSubtest = null;
                this.updateStepIndicator(1);
            };
        }
        
        // Show subtest selection
        subtestSelection.classList.remove('hidden');
        
        // Show practice options
        this.showPracticeOptions();
    }

    // Select subtest
    selectSubtest(subtest) {
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
        this.updateStepIndicator(3);
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
        const revealAnswersLabel = revealAnswers?.closest('.option-item');
        const audioModelingLabel = audioModeling?.closest('.option-item');
        
        if (revealAnswers) {
            const isDisabled = !['PSF', 'NWF'].includes(subtest);
            revealAnswers.disabled = isDisabled;
            
            // Add/update tooltip and disabled class
            if (revealAnswersLabel) {
                if (isDisabled) {
                    revealAnswersLabel.setAttribute('title', 'Reveal Answers is only available for Phonemic Segmentation Fluency (PSF) and Nonsense Word Fluency (NWF) subtests');
                    revealAnswersLabel.setAttribute('aria-label', 'Reveal Answers (not available for this subtest)');
                    revealAnswersLabel.classList.add('disabled');
                } else {
                    revealAnswersLabel.removeAttribute('title');
                    revealAnswersLabel.setAttribute('aria-label', 'Reveal Answers');
                    revealAnswersLabel.classList.remove('disabled');
                }
            }
        }
        
        if (audioModeling) {
            const isDisabled = !['ORF', 'WRF'].includes(subtest);
            audioModeling.disabled = isDisabled;
            
            // Add/update tooltip and disabled class
            if (audioModelingLabel) {
                if (isDisabled) {
                    audioModelingLabel.setAttribute('title', 'Audio Modeling is only available for Oral Reading Fluency (ORF) and Word Reading Fluency (WRF) subtests');
                    audioModelingLabel.setAttribute('aria-label', 'Audio Modeling (not available for this subtest)');
                    audioModelingLabel.classList.add('disabled');
                } else {
                    audioModelingLabel.removeAttribute('title');
                    audioModelingLabel.setAttribute('aria-label', 'Audio Modeling');
                    audioModelingLabel.classList.remove('disabled');
                }
            }
        }
    }

    // Update practice options
    updatePracticeOptions() {
        this.practiceOptions = {
            timed: document.getElementById('timed-mode')?.checked || false,
            showTimer: document.getElementById('show-timer')?.checked || false,
            revealAnswers: document.getElementById('reveal-answers')?.checked || false,
            audioModeling: document.getElementById('audio-modeling')?.checked || false,
            guided: document.getElementById('guided-mode')?.checked || false
        };
    }

    // Start practice
    async startPractice() {
        if (!this.currentGrade || !this.currentSubtest) {
            this.showToast('Please select a grade and subtest first.', 'warning');
            return;
        }
        
        // Add loading spinner to button
        const startBtn = document.getElementById('start-practice');
        if (startBtn) {
            const originalText = startBtn.innerHTML;
            startBtn.classList.add('loading');
            startBtn.disabled = true;
            startBtn.innerHTML = '<span class="button-spinner"></span> Starting...';
            
            // Show loading
            this.showLoading('Preparing practice session...');
            
            this.updatePracticeOptions();
            
            // Small delay to show loading animation
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Initialize subtest
            const success = window.subtestManager.initSubtest(
                this.currentSubtest,
                this.currentGrade,
                this.practiceOptions
            );
            
            if (!success) {
                this.hideLoading();
                startBtn.classList.remove('loading');
                startBtn.disabled = false;
                startBtn.innerHTML = originalText;
                this.showToast('Failed to initialize practice session.', 'error');
                return;
            }
            
            // Show practice interface
            this.showPracticeInterface();
            
            // Start practice
            window.subtestManager.startPractice();
            
            this.isPracticeActive = true;
            
            // Hide loading and restore button
            this.hideLoading();
            startBtn.classList.remove('loading');
            startBtn.disabled = false;
            startBtn.innerHTML = originalText;
            
            // Show success animation
            this.showToast('Practice session started!', 'success', 3000);
            
            // Update accessibility
            window.accessibilityManager.setupPracticeAccessibility();
            window.accessibilityManager.updateFocusableElements();
        }
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

        // Update breadcrumb navigation
        const breadcrumbGrade = document.getElementById('breadcrumb-grade');
        const breadcrumbSubtest = document.getElementById('breadcrumb-subtest');
        if (breadcrumbGrade) {
            breadcrumbGrade.textContent = `Grade ${this.currentGrade}`;
        }
        if (breadcrumbSubtest) {
            breadcrumbSubtest.textContent = description.name;
        }
        
        // Show/hide timer based on options
        const timerContainer = document.querySelector('.timer-container');
        if (timerContainer) {
            if (this.practiceOptions.timed) {
                timerContainer.classList.remove('hidden');
            } else {
                timerContainer.classList.add('hidden');
            }
        }
        
        // Add print button
        this.addPrintButton();
        
        // Focus practice content for accessibility
        setTimeout(() => {
            const practiceContent = document.getElementById('practice-content');
            if (practiceContent) {
                const firstFocusable = practiceContent.querySelector('[tabindex="0"], [tabindex="-1"]');
                if (firstFocusable) {
                    firstFocusable.tabIndex = 0;
                    firstFocusable.focus();
                } else {
                    practiceTitle.focus();
                }
            }
        }, 100);
    }

    // Pause practice
    pausePractice() {
        if (window.practiceTimer.getIsRunning()) {
            window.practiceTimer.pause();
            document.getElementById('pause-btn').textContent = 'Resume';
            this.showPausedOverlay();
        } else {
            window.practiceTimer.start();
            document.getElementById('pause-btn').textContent = 'Pause';
            this.hidePausedOverlay();
        }
    }

    // Show PAUSED overlay inside the practice content area
    showPausedOverlay() {
        const practiceContent = document.getElementById('practice-content');
        if (!practiceContent || practiceContent.querySelector('.paused-overlay')) return;

        const overlay = document.createElement('div');
        overlay.className = 'paused-overlay';
        overlay.setAttribute('role', 'status');
        overlay.setAttribute('aria-live', 'assertive');
        overlay.innerHTML = `
            <span class="paused-label">Paused</span>
            <span class="paused-hint">Press Resume or Space to continue</span>
        `;
        practiceContent.appendChild(overlay);
        window.accessibilityManager?.announce('Practice paused. Press Resume or Space to continue.');
    }

    // Remove PAUSED overlay
    hidePausedOverlay() {
        const overlay = document.getElementById('practice-content')?.querySelector('.paused-overlay');
        if (overlay) overlay.remove();
        window.accessibilityManager?.announce('Practice resumed.');
    }

    // Reset practice
    resetPractice() {
        this.showConfirmationDialog(
            'Reset Practice Session',
            'Are you sure you want to reset? This will restart your practice session and clear your progress.',
            () => {
                window.practiceTimer.reset();
                window.subtestManager.reset();
                this.startPractice();
            }
        );
    }

    // New practice set
    newPracticeSet() {
        this.startPractice();
    }

    // Back to menu
    backToMenu(skipHashUpdate) {
        // Stop any ongoing practice
        window.practiceTimer.stop();
        window.audioManager.stop();
        this.hidePausedOverlay();
        
        // Reset state
        this.currentGrade = null;
        this.currentSubtest = null;
        this.isPracticeActive = false;
        
        // Hide practice section
        document.getElementById('practice-section').classList.add('hidden');
        
        // Hide other sections
        document.getElementById('educator-section')?.classList.add('hidden');
        document.getElementById('settings-section')?.classList.add('hidden');
        document.getElementById('progress-section')?.classList.add('hidden');
        
        // Show welcome section
        document.getElementById('welcome-section').classList.remove('hidden');
        
        // Reset UI
        document.querySelectorAll('.grade-btn').forEach(btn => btn.classList.remove('selected'));
        document.querySelectorAll('.subtest-btn').forEach(btn => btn.classList.remove('selected'));
        document.getElementById('subtest-selection').classList.add('hidden');
        document.getElementById('practice-options').classList.add('hidden');
        
        // Update bottom nav
        this.updateBottomNavActive('home');
        this.updateStepIndicator(1);
        if (!skipHashUpdate) this.replaceHash('home');
    }


    backToSubtestSelection() {
        // Stop any ongoing practice
        window.practiceTimer.stop();
        window.audioManager.stop();
        this.hidePausedOverlay();

        // Keep current grade, clear subtest
        this.currentSubtest = null;
        this.isPracticeActive = false;

        // Hide practice section
        document.getElementById('practice-section').classList.add('hidden');

        // Show welcome section with subtest selection visible
        document.getElementById('welcome-section').classList.remove('hidden');
        document.getElementById('subtest-selection').classList.remove('hidden');
        document.getElementById('practice-options').classList.add('hidden');

        // Update step indicator
        this.updateStepIndicator(2);
    }

    // End practice
    endPractice() {
        this.isPracticeActive = false;
        
        // Get results
        const results = window.subtestManager.getResults();
        
        // Show scoring panel with animation (skip if reduced motion preferred)
        const scoringPanel = document.getElementById('scoring-panel');
        scoringPanel.classList.remove('hidden');
        const reducedMotion = document.body.classList.contains('reduced-motion') ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reducedMotion) {
            scoringPanel.classList.add('show');
        } else {
            setTimeout(() => scoringPanel.classList.add('show'), 10);
            scoringPanel.classList.add('success-celebration');
            setTimeout(() => scoringPanel.classList.remove('success-celebration'), 600);
        }
        
        // Auto-scroll scoring panel into view
        setTimeout(() => {
            scoringPanel.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' });
        }, reducedMotion ? 0 : 450);

        // Update accessibility
        window.accessibilityManager.setupScoringAccessibility();
        
        // Announce completion
        window.accessibilityManager.announce('Practice session completed. Please enter your scoring information.');
        
        // Play completion sound
        window.audioManager.playCorrectSound();

        // Show celebration overlay
        this.showCelebration();
    }

    showCelebration() {
        const overlay = document.getElementById('celebration-overlay');
        if (!overlay) return;

        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const emoji = overlay.querySelector('.celebration-emoji');
        const message = overlay.querySelector('.celebration-message');
        const detail = overlay.querySelector('.celebration-detail');

        // Randomize encouraging messages
        const celebrations = [
            { emoji: '\u2B50', msg: 'Great Work!', detail: 'Keep practicing to build fluency!' },
            { emoji: '\uD83C\uDF1F', msg: 'Well Done!', detail: 'You\'re making great progress!' },
            { emoji: '\uD83C\uDF89', msg: 'Awesome!', detail: 'Practice makes perfect!' },
            { emoji: '\uD83D\uDCAA', msg: 'Nice Effort!', detail: 'Every session helps you grow!' }
        ];
        const pick = celebrations[Math.floor(Math.random() * celebrations.length)];

        if (emoji) emoji.textContent = pick.emoji;
        if (message) message.textContent = pick.msg;
        if (detail) detail.textContent = pick.detail;

        overlay.classList.remove('hidden');

        // Auto-dismiss after 2.5 seconds
        setTimeout(() => {
            overlay.classList.add('hidden');
        }, reducedMotion ? 1500 : 2500);
    }

    // Calculate score
    calculateScore() {
        const correctInput = document.getElementById('correct-responses');
        const errorsInput = document.getElementById('errors');
        const scoreResult = document.getElementById('score-result');
        
        if (!correctInput || !errorsInput || !scoreResult) return;
        
        // Validate inputs
        const validationResult = this.validateScoreInputs(correctInput, errorsInput);
        if (!validationResult.isValid) {
            scoreResult.innerHTML = `<div class="error-message">${validationResult.message}</div>`;
            return;
        }
        
        const correct = parseInt(correctInput.value) || 0;
        const errors = parseInt(errorsInput.value) || 0;
        const total = correct + errors;
        
        if (total === 0) {
            scoreResult.innerHTML = '<div class="error-message">Please enter correct responses and errors.</div>';
            return;
        }
        
        // Get actual time used from timer
        const timeUsed = this.getActualTimeUsed();
        
        // Use scoring engine for accurate DIBELS scoring
        const scoreData = window.scoringEngine.calculateScore(
            this.currentSubtest,
            { 
                correct, 
                errors,
                timeInSeconds: timeUsed
            },
            { mode: 'detailed' }
        );
        
        // Display formatted score with benchmark comparison
        const scoreHTML = window.scoringEngine.formatScoreDisplay(
            scoreData,
            this.currentSubtest,
            this.currentGrade
        );

        // Build error feedback section
        let feedbackHTML = '';
        const accuracy = parseFloat(scoreData.accuracy) || 0;
        if (errors > 0) {
            let suggestion = '';
            if (accuracy >= 95) {
                suggestion = 'Excellent accuracy! A few minor errors — keep up the great work.';
            } else if (accuracy >= 85) {
                suggestion = 'Strong performance! Focus on the tricky items to push even higher.';
            } else if (accuracy >= 70) {
                suggestion = 'Good effort! Consider using Guided Practice mode to build confidence on challenging items.';
            } else {
                suggestion = 'Keep practicing! Try a slower, untimed session with Guided Practice enabled to strengthen foundational skills.';
            }
            feedbackHTML = `<div style="margin-top:var(--space-4);padding:var(--space-3) var(--space-4);background:var(--bg-tertiary);border-radius:var(--radius-md);font-size:var(--font-size-sm);">
                <strong>Feedback:</strong> ${errors} error${errors !== 1 ? 's' : ''} out of ${total} items. ${suggestion}
                <div style="margin-top:var(--space-2);">
                    <button class="control-btn" style="font-size:var(--font-size-sm);padding:var(--space-1) var(--space-3);" data-action="new-practice-set">Practice Again</button>
                </div>
            </div>`;
        }

        scoreResult.innerHTML = scoreHTML + '<span class="success-checkmark">✓</span>' + feedbackHTML;
        
        // Add success animation to result (skip if reduced motion preferred)
        const reduceMotion = document.body.classList.contains('reduced-motion') ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!reduceMotion) {
            scoreResult.classList.add('success-celebration');
            setTimeout(() => scoreResult.classList.remove('success-celebration'), 600);
        }
        
        // Enhanced accessibility announcement
        if (window.accessibilityManager && window.accessibilityManager.announceAccuracy) {
            window.accessibilityManager.announceAccuracy(parseFloat(scoreData.accuracy), scoreData);
        } else {
            const accuracyLevel = window.scoringEngine.getAccuracyLevel(parseFloat(scoreData.accuracy));
            // Safely format display text
            const displayText = (scoreData && typeof scoreData.display === 'string') 
                ? scoreData.display 
                : 'Score calculated';
            const accuracyText = scoreData?.accuracy ?? '0';
            window.accessibilityManager?.announce(
                `Practice completed. ${displayText}. Accuracy: ${accuracyText} percent. ${accuracyLevel.label}.`
            );
        }
    }

    // Get actual time used in practice
    getActualTimeUsed() {
        if (window.practiceTimer && this.practiceOptions.timed) {
            // Get elapsed time from timer
            return window.practiceTimer.getTimeElapsed();
        }
        // For untimed practice, estimate based on actual elapsed time
        if (window.practiceTimer && window.practiceTimer.getActualElapsedTime() > 0) {
            return Math.round(window.practiceTimer.getActualElapsedTime() / 1000);
        }
        return 60; // Default to 60 seconds if timer not available
    }

    // Real-time accuracy calculation
    updateRealTimeAccuracy(correctInput, errorsInput) {
        const correct = parseInt(correctInput.value) || 0;
        const errors = parseInt(errorsInput.value) || 0;
        const total = correct + errors;
        
        // Get or create accuracy indicator
        let indicator = document.getElementById('accuracy-indicator');
        if (!indicator) {
            return; // Will be created in HTML
        }
        
        const fill = document.getElementById('accuracy-fill');
        const text = document.getElementById('accuracy-text');
        
        if (total > 0) {
            const accuracy = ((correct / total) * 100);
            const accuracyLevel = window.scoringEngine.getAccuracyLevel(accuracy);
            
            if (fill) {
                fill.style.width = `${accuracy}%`;
                // Update color based on level
                fill.className = `accuracy-fill ${accuracyLevel.level}`;
            }
            
            if (text) {
                text.textContent = `Accuracy: ${accuracy.toFixed(1)}% - ${accuracyLevel.label}`;
            }
            
            indicator.classList.remove('hidden');
            
            // Announce to screen readers (debounced to avoid too many announcements)
            if (!this.accuracyDebounceTimer) {
                this.accuracyDebounceTimer = setTimeout(() => {
                    if (window.accessibilityManager && window.accessibilityManager.announceAccuracyChange) {
                        window.accessibilityManager.announceAccuracyChange(accuracy, accuracyLevel.label);
                    }
                    this.accuracyDebounceTimer = null;
                }, 2000);
            }
        } else {
            indicator.classList.add('hidden');
            if (text) {
                text.textContent = 'Enter scores to see accuracy';
            }
            if (fill) {
                fill.style.width = '0%';
            }
        }
    }

    // Validate score inputs
    validateScoreInputs(correctInput, errorsInput) {
        const correctError = document.getElementById('correct-responses-error');
        const errorsError = document.getElementById('errors-error');
        
        // Clear previous errors
        if (correctError) correctError.textContent = '';
        if (errorsError) errorsError.textContent = '';
        correctInput.setAttribute('aria-invalid', 'false');
        errorsInput.setAttribute('aria-invalid', 'false');
        
        const correct = correctInput.value.trim();
        const errors = errorsInput.value.trim();
        
        // Check if empty
        if (correct === '' && errors === '') {
            return {
                isValid: false,
                message: 'Please enter values for correct responses and errors.'
            };
        }
        
        // Validate correct responses
        if (correct !== '') {
            const correctNum = parseInt(correct);
            if (isNaN(correctNum)) {
                if (correctError) correctError.textContent = 'Enter a whole number (e.g. 42).';
                correctInput.setAttribute('aria-invalid', 'true');
                return { isValid: false, message: 'Invalid input for correct responses.' };
            }
            if (correctNum < 0) {
                if (correctError) correctError.textContent = 'Must be 0 or more — enter 0 if none were correct.';
                correctInput.setAttribute('aria-invalid', 'true');
                return { isValid: false, message: 'Correct responses cannot be negative.' };
            }
            if (correctNum > 1000) {
                if (correctError) correctError.textContent = 'Too large — enter a number between 0 and 1000.';
                correctInput.setAttribute('aria-invalid', 'true');
                return { isValid: false, message: 'Value exceeds maximum (1000).' };
            }
        }

        // Validate errors
        if (errors !== '') {
            const errorsNum = parseInt(errors);
            if (isNaN(errorsNum)) {
                if (errorsError) errorsError.textContent = 'Enter a whole number (e.g. 5).';
                errorsInput.setAttribute('aria-invalid', 'true');
                return { isValid: false, message: 'Invalid input for errors.' };
            }
            if (errorsNum < 0) {
                if (errorsError) errorsError.textContent = 'Must be 0 or more — enter 0 if there were no errors.';
                errorsInput.setAttribute('aria-invalid', 'true');
                return { isValid: false, message: 'Errors cannot be negative.' };
            }
            if (errorsNum > 1000) {
                if (errorsError) errorsError.textContent = 'Too large — enter a number between 0 and 1000.';
                errorsInput.setAttribute('aria-invalid', 'true');
                return { isValid: false, message: 'Value exceeds maximum (1000).' };
            }
        }
        
        // Add helpful accuracy warning for low accuracy
        if (correct !== '' && errors !== '') {
            const correctNum = parseInt(correct);
            const errorsNum = parseInt(errors);
            const total = correctNum + errorsNum;
            
            if (total > 10) {
                const accuracy = (correctNum / total) * 100;
                const warningContainer = document.getElementById('accuracy-warning');
                
                if (accuracy < 50 && warningContainer) {
                    warningContainer.innerHTML = `
                        <div class="accuracy-warning-message">
                            ⚠️ Low accuracy detected (${accuracy.toFixed(1)}%). Consider reviewing common errors.
                        </div>
                    `;
                    warningContainer.classList.remove('hidden');
                } else if (warningContainer) {
                    warningContainer.innerHTML = '';
                    warningContainer.classList.add('hidden');
                }
            }
        }
        
        return { isValid: true };
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
    showEducatorMode(skipHashUpdate) {
        // Hide other sections
        document.getElementById('welcome-section').classList.add('hidden');
        document.getElementById('practice-section').classList.add('hidden');
        
        // Show educator section
        document.getElementById('educator-section').classList.remove('hidden');
        
        // Setup educator modules
        this.setupEducatorModules();
        this.updateBottomNavActive('educator');
        if (!skipHashUpdate) this.replaceHash('educator');
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
                        <li>Providing feedback during the official assessment</li>
                        <li>Rushing through directions</li>
                    </ul>
                </div>
                <button class="close-modal">Close</button>
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
                
                <button class="close-modal">Close</button>
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
                        <li>Note patterns across multiple testing sessions</li>
                        <li>Track progress over time</li>
                        <li>Use error analysis to inform instruction</li>
                        <li>Share findings with intervention teams</li>
                    </ul>
                </div>
                <button class="close-modal">Close</button>
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
    showSettings(skipHashUpdate) {
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
        this.updateBottomNavActive('settings');
        if (!skipHashUpdate) this.replaceHash('settings');
    }

    // Show progress
    showProgress(skipHashUpdate) {
        // Hide other sections
        document.getElementById('welcome-section').classList.add('hidden');
        document.getElementById('practice-section').classList.add('hidden');
        document.getElementById('educator-section').classList.add('hidden');
        document.getElementById('settings-section').classList.add('hidden');
        
        // Show progress section
        document.getElementById('progress-section').classList.remove('hidden');
        
        // Load progress data
        this.loadProgressData();
        this.updateBottomNavActive('progress');
        if (!skipHashUpdate) this.replaceHash('progress');
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
                this.clearAllData();
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
            this.showToast('Data imported successfully!', 'success');
            this.loadSettings();
            this.loadProgressData();
        } catch (error) {
            this.showToast('Error importing data: ' + error.message, 'error');
        }
    }

    clearAllData() {
        this.showConfirmationDialog(
            'Clear All Data',
            'Are you sure you want to clear all data? This will permanently delete all progress, sessions, and settings. This action cannot be undone.',
            () => {
                window.progressTracker.clearAllData();
                this.showToast('All data cleared successfully!', 'success');
                this.loadSettings();
                this.loadProgressData();
            }
        );
    }

    // Progress methods
    async loadProgressData() {
        const analytics = await window.progressTracker.getAnalytics();

        // Overall stats
        document.getElementById('total-sessions').textContent = analytics.totalSessions;
        document.getElementById('total-time').textContent = Math.round(analytics.totalTime / 60000) + ' minutes';
        document.getElementById('average-score').textContent = Math.round(analytics.averageScore);
        document.getElementById('average-accuracy').textContent = Math.round(analytics.averageAccuracy) + '%';

        // Recent sessions
        this.displayRecentSessions(analytics.recentSessions);

        // Grade stats
        this.displayGradeStats(analytics.byGrade);

        // Score trend chart (SVG)
        this.renderScoreTrendChart(analytics.recentSessions);

        // Session history with filters
        this.renderSessionHistory();

        // Setup filter listeners
        const gradeFilter = document.getElementById('history-grade-filter');
        const subtestFilter = document.getElementById('history-subtest-filter');
        if (gradeFilter) gradeFilter.onchange = () => this.renderSessionHistory();
        if (subtestFilter) subtestFilter.onchange = () => this.renderSessionHistory();

        // Print report button
        const printBtn = document.getElementById('print-progress-btn');
        if (printBtn) {
            printBtn.onclick = () => this.printProgressReport(analytics);
        }
    }

    displayRecentSessions(sessions) {
        const container = document.getElementById('session-history-list');
        if (!container) return;
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

    // Toast notification system
    showToast(message, type = 'info', duration = 5000) {
        let toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) {
            toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            document.body.appendChild(toastContainer);
        }
        
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: '✓',
            error: '✗',
            info: 'ℹ',
            warning: '⚠'
        };
        
        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-content">
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" aria-label="Close notification">&times;</button>
        `;
        
        toastContainer.appendChild(toast);
        
        // Close button handler
        toast.querySelector('.toast-close').addEventListener('click', () => {
            toast.remove();
        });
        
        // Auto-remove after duration
        if (duration > 0) {
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.style.animation = 'slideOutRight 0.3s ease-out';
                    setTimeout(() => toast.remove(), 300);
                }
            }, duration);
        }
        
        // Announce to screen readers
        window.accessibilityManager?.announce(message);
        
        return toast;
    }
    
    // Show loading overlay
    showLoading(message = 'Loading...') {
        const overlay = document.createElement('div');
        overlay.id = 'loading-overlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = `
            <div class="loading-message">
                <div class="loading-spinner"></div>
                <h3>${message}</h3>
            </div>
        `;
        document.body.appendChild(overlay);
        return overlay;
    }
    
    // Hide loading overlay
    hideLoading() {
        const overlay = document.getElementById('loading-overlay');
        if (overlay) {
            overlay.remove();
        }
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
                
                <button class="control-btn close-modal">Close</button>
            </div>
        `;
        
        this.showEducatorModal(about);
    }

    // Setup tutorial system
    setupTutorial() {
        const tutorialBtn = document.getElementById('show-tutorial-btn');
        const tutorialOverlay = document.getElementById('tutorial-overlay');
        const tutorialModal = document.querySelector('.tutorial-modal');
        const tutorialContent = document.getElementById('tutorial-content');
        const tutorialPrev = document.getElementById('tutorial-prev');
        const tutorialNext = document.getElementById('tutorial-next');
        const tutorialClose = document.getElementById('tutorial-close');
        const tutorialCloseX = document.getElementById('tutorial-close-x');
        
        if (!tutorialOverlay) return;
        
        const closeTutorial = () => {
            tutorialOverlay.classList.add('hidden');
            tutorialOverlay.setAttribute('aria-hidden', 'true');
            localStorage.setItem('dibels-tutorial-completed', 'true');
            // Restore focus for accessibility
            if (tutorialBtn && tutorialBtn.offsetParent !== null) {
                tutorialBtn.focus();
            } else {
                const firstGrade = document.querySelector('.grade-btn');
                if (firstGrade) firstGrade.focus();
            }
        };
        this.closeTutorial = closeTutorial;
        
        const tutorialSteps = [
            {
                title: 'Welcome!',
                content: '<p>DIBELS Practice Lab is your free tool for building reading fluency. Whether you\'re a teacher, parent, or interventionist — let\'s get you started in under a minute!</p>'
            },
            {
                title: 'Pick a Grade Level',
                content: '<p>Tap a grade button (K through 8) to see which subtests are available. Each grade focuses on age-appropriate literacy skills.</p>'
            },
            {
                title: 'Choose Your Subtest',
                content: '<p>Select from subtests like <strong>Letter Naming</strong>, <strong>Phonemic Segmentation</strong>, <strong>Nonsense Words</strong>, <strong>Word Reading</strong>, <strong>Oral Reading</strong>, or <strong>Maze Comprehension</strong>.</p>'
            },
            {
                title: 'Set Your Options',
                content: '<p>Enable <strong>timed practice</strong> (60 seconds, like official DIBELS timing), show or hide the timer, turn on <strong>audio models</strong> for listening support, or reveal answers for learning mode.</p>'
            },
            {
                title: 'Practice & Score',
                content: '<p>Click items during practice, then enter your scores when done. You\'ll see accuracy, benchmark comparisons, and your progress over time. Keep your streak going!</p>'
            }
        ];
        
        let currentStep = 0;
        
        const showTutorialStep = (step) => {
            if (step < 0 || step >= tutorialSteps.length) return;
            currentStep = step;
            
            const stepData = tutorialSteps[step];
            const dots = tutorialSteps.map((_, i) =>
                `<span style="display:inline-block;width:8px;height:8px;border-radius:50%;margin:0 3px;background:${i === step ? 'var(--primary-color)' : 'var(--border-color)'};transition:background 0.2s;"></span>`
            ).join('');
            tutorialContent.innerHTML = `
                <div class="tutorial-step">
                    <h3>${stepData.title}</h3>
                    ${stepData.content}
                    <div style="text-align:center;margin-top:var(--space-3);" aria-label="Step ${step + 1} of ${tutorialSteps.length}">${dots}</div>
                </div>
            `;
            
            tutorialPrev.style.display = step > 0 ? 'inline-block' : 'none';
            tutorialNext.style.display = step < tutorialSteps.length - 1 ? 'inline-block' : 'none';
            tutorialClose.style.display = step === tutorialSteps.length - 1 ? 'inline-block' : 'none';
        };
        
        if (tutorialBtn) {
            tutorialBtn.addEventListener('click', () => {
                tutorialOverlay.classList.remove('hidden');
                tutorialOverlay.setAttribute('aria-hidden', 'false');
                showTutorialStep(0);
            });
        }
        
        if (tutorialPrev) {
            tutorialPrev.addEventListener('click', () => showTutorialStep(currentStep - 1));
        }
        
        if (tutorialNext) {
            tutorialNext.addEventListener('click', () => showTutorialStep(currentStep + 1));
        }
        
        if (tutorialClose) {
            tutorialClose.addEventListener('click', closeTutorial);
        }
        
        if (tutorialCloseX) {
            tutorialCloseX.addEventListener('click', closeTutorial);
        }
        
        // Close on overlay click (backdrop only)
        tutorialOverlay.addEventListener('click', (e) => {
            if (e.target === tutorialOverlay) {
                closeTutorial();
            }
        });
        if (tutorialModal) {
            tutorialModal.addEventListener('click', (e) => e.stopPropagation());
        }
        
        // Auto-show tutorial on first visit (check URL parameter to skip)
        const urlParams = new URLSearchParams(window.location.search);
        const skipTutorial = urlParams.has('skip-tutorial');
        const tutorialCompleted = localStorage.getItem('dibels-tutorial-completed');
        
        if (!tutorialCompleted && !skipTutorial) {
            // Show tutorial for first-time visitors after a brief delay
            setTimeout(() => {
                tutorialOverlay.classList.remove('hidden');
                tutorialOverlay.setAttribute('aria-hidden', 'false');
                showTutorialStep(0);
            }, 500);
        }
    }


    // Setup keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Don't trigger shortcuts when typing in inputs
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
                if (e.key === '?') {
                    this.showKeyboardHelp();
                }
                return;
            }
            
            // ? key - Show keyboard help
            if (e.key === '?') {
                e.preventDefault();
                this.showKeyboardHelp();
                return;
            }
            
            // Only in practice mode
            if (this.isPracticeActive) {
                // Space - Pause/Resume
                if (e.key === ' ' && !e.target.tagName.match(/INPUT|TEXTAREA|BUTTON/)) {
                    e.preventDefault();
                    this.pausePractice();
                    return;
                }
                
                // R - Reset
                if (e.key === 'r' || e.key === 'R') {
                    e.preventDefault();
                    this.resetPractice();
                    return;
                }
                
                // N - New Set
                if (e.key === 'n' || e.key === 'N') {
                    e.preventDefault();
                    this.newPracticeSet();
                    return;
                }
                
                // M - Back to Menu
                if (e.key === 'm' || e.key === 'M') {
                    e.preventDefault();
                    this.backToMenu();
                    return;
                }
            }
            
            // Esc - Close modals (tutorial first, then educator modals)
            if (e.key === 'Escape') {
                const tutorialOverlayEl = document.getElementById('tutorial-overlay');
                if (tutorialOverlayEl && !tutorialOverlayEl.classList.contains('hidden')) {
                    if (typeof this.closeTutorial === 'function') {
                        this.closeTutorial();
                    } else {
                        tutorialOverlayEl.classList.add('hidden');
                        tutorialOverlayEl.setAttribute('aria-hidden', 'true');
                    }
                    e.preventDefault();
                    return;
                }
                document.querySelectorAll('.educator-modal').forEach((el) => el.remove());
            }
        });
    }

    // Show keyboard shortcuts help — delegates to the dynamic modal in keyboard.js
    showKeyboardHelp() {
        if (window.keyboardNavigation) {
            window.keyboardNavigation.showKeyboardShortcuts();
        }
    }

    // Setup bottom navigation
    setupBottomNavigation() {
        const homeBtn = document.getElementById('bottom-nav-home');
        const educatorBtn = document.getElementById('bottom-nav-educator');
        const progressBtn = document.getElementById('bottom-nav-progress');
        const settingsBtn = document.getElementById('bottom-nav-settings');
        
        if (homeBtn) {
            homeBtn.addEventListener('click', () => {
                this.backToMenu();
                this.updateBottomNavActive('home');
            });
        }
        
        if (educatorBtn) {
            educatorBtn.addEventListener('click', () => {
                this.showEducatorMode();
                this.updateBottomNavActive('educator');
            });
        }
        
        if (progressBtn) {
            progressBtn.addEventListener('click', () => {
                this.showProgress();
                this.updateBottomNavActive('progress');
            });
        }
        
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.showSettings();
                this.updateBottomNavActive('settings');
            });
        }
    }

    // Update bottom nav active state
    updateBottomNavActive(active) {
        document.querySelectorAll('.bottom-nav-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeMap = {
            'home': 'bottom-nav-home',
            'educator': 'bottom-nav-educator',
            'progress': 'bottom-nav-progress',
            'settings': 'bottom-nav-settings'
        };
        
        const activeBtn = document.getElementById(activeMap[active]);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    // Hash-based section routing (#home, #settings, #progress, #educator)
    replaceHash(section) {
        const hash = section === 'home' ? '' : section;
        const url = window.location.pathname + window.location.search + (hash ? '#' + hash : '');
        if (window.location.hash !== (hash ? '#' + hash : '')) {
            window.history.replaceState(undefined, '', url);
        }
    }

    applySectionFromHash() {
        const hash = (window.location.hash || '').replace(/^#/, '') || 'home';
        if (hash === 'settings') {
            this.showSettings(true);
        } else if (hash === 'progress') {
            this.showProgress(true);
        } else if (hash === 'educator') {
            this.showEducatorMode(true);
        } else {
            this.backToMenu(true);
        }
    }

    setupHashRouting() {
        this.applySectionFromHash();
        window.addEventListener('popstate', () => this.applySectionFromHash());
    }

    // Update grade buttons with subtest counts
    updateGradeButtonsWithCounts() {
        document.querySelectorAll('.grade-btn').forEach(btn => {
            const grade = btn.dataset.grade;
            const subtests = DIBELS_CONTENT.gradeSubtests[grade] || [];
            const count = subtests.length;
            
            if (count > 0) {
                const countSpan = document.createElement('span');
                countSpan.className = 'subtest-count';
                countSpan.textContent = `(${count} ${count === 1 ? 'subtest' : 'subtests'})`;
                btn.appendChild(countSpan);
            }
        });
    }

    // Show confirmation dialog
    showConfirmationDialog(title, message, onConfirm) {
        const dialog = document.createElement('div');
        dialog.className = 'confirmation-dialog';
        dialog.innerHTML = `
            <div class="confirmation-content">
                <h3>${title}</h3>
                <p>${message}</p>
                <div class="confirmation-actions">
                    <button class="control-btn" id="confirm-cancel">Cancel</button>
                    <button class="control-btn primary" id="confirm-ok">Confirm</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        const cancelBtn = dialog.querySelector('#confirm-cancel');
        const okBtn = dialog.querySelector('#confirm-ok');
        
        const close = () => {
            dialog.remove();
        };
        
        cancelBtn.addEventListener('click', close);
        okBtn.addEventListener('click', () => {
            close();
            if (onConfirm) onConfirm();
        });
        
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) close();
        });
        
        // Focus on cancel button
        cancelBtn.focus();
    }

    renderScoreTrendChart(sessions) {
        const container = document.getElementById('score-trend-chart');
        if (!container) return;
        if (!sessions || sessions.length < 2) {
            container.innerHTML = '<p>Complete a few sessions to see your score trend.</p>';
            return;
        }

        const data = sessions.slice(0, 10).reverse();
        const width = 500;
        const height = 200;
        const padding = { top: 20, right: 20, bottom: 30, left: 40 };
        const chartW = width - padding.left - padding.right;
        const chartH = height - padding.top - padding.bottom;

        const scores = data.map(s => s.score || 0);
        const maxScore = Math.max(...scores, 1);
        const minScore = Math.min(...scores, 0);
        const range = maxScore - minScore || 1;

        const points = data.map((s, i) => {
            const x = padding.left + (i / (data.length - 1)) * chartW;
            const y = padding.top + chartH - ((scores[i] - minScore) / range) * chartH;
            return { x, y, score: scores[i], date: new Date(s.date).toLocaleDateString() };
        });

        const polyline = points.map(p => `${p.x},${p.y}`).join(' ');
        const dots = points.map(p =>
            `<circle cx="${p.x}" cy="${p.y}" r="4" fill="var(--primary-color)"><title>${p.date}: ${p.score}</title></circle>`
        ).join('');

        container.innerHTML = `
            <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Score trend chart showing last ${data.length} sessions" style="width:100%;max-width:${width}px;">
                <line x1="${padding.left}" y1="${padding.top + chartH}" x2="${padding.left + chartW}" y2="${padding.top + chartH}" stroke="var(--border-color)" stroke-width="1"/>
                <line x1="${padding.left}" y1="${padding.top}" x2="${padding.left}" y2="${padding.top + chartH}" stroke="var(--border-color)" stroke-width="1"/>
                <polyline points="${polyline}" fill="none" stroke="var(--primary-color)" stroke-width="2.5" stroke-linejoin="round"/>
                ${dots}
                <text x="${padding.left - 5}" y="${padding.top + 5}" text-anchor="end" font-size="11" fill="var(--text-tertiary)">${maxScore}</text>
                <text x="${padding.left - 5}" y="${padding.top + chartH + 4}" text-anchor="end" font-size="11" fill="var(--text-tertiary)">${minScore}</text>
                <text x="${padding.left}" y="${padding.top + chartH + 20}" font-size="10" fill="var(--text-tertiary)">${points[0]?.date || ''}</text>
                <text x="${padding.left + chartW}" y="${padding.top + chartH + 20}" text-anchor="end" font-size="10" fill="var(--text-tertiary)">${points[points.length - 1]?.date || ''}</text>
            </svg>
        `;
    }

    async renderSessionHistory() {
        const container = document.getElementById('session-history-list');
        if (!container) return;

        const gradeFilter = document.getElementById('history-grade-filter')?.value || '';
        const subtestFilter = document.getElementById('history-subtest-filter')?.value || '';

        const filters = {};
        if (gradeFilter) filters.grade = gradeFilter;
        if (subtestFilter) filters.subtest = subtestFilter;

        const sessions = await window.progressTracker.getFilteredSessions(filters);
        const trend = window.progressTracker.calculateTrend(sessions);

        if (!sessions.length) {
            container.innerHTML = '<p>No sessions match your filters.</p>';
            return;
        }

        const trendIcon = trend === 'improving' ? '\u2191' : trend === 'declining' ? '\u2193' : '\u2192';
        const trendClass = `session-trend-${trend === 'improving' ? 'up' : trend === 'declining' ? 'down' : 'stable'}`;

        container.innerHTML = `
            <div style="margin-bottom:var(--space-2);font-size:var(--font-size-sm);">
                <span class="${trendClass}"><strong>${trendIcon} Trend: ${trend.charAt(0).toUpperCase() + trend.slice(1)}</strong></span>
                <span style="color:var(--text-tertiary);margin-left:var(--space-2);">${sessions.length} session${sessions.length !== 1 ? 's' : ''}</span>
            </div>
            ${sessions.slice(0, 20).map(s => `
                <div class="session-history-item">
                    <div>
                        <strong>Grade ${s.grade}</strong> - ${s.subtest}
                        <br><span style="color:var(--text-tertiary);font-size:var(--font-size-xs);">${new Date(s.date).toLocaleDateString()}</span>
                    </div>
                    <div style="text-align:right;">
                        <strong>${s.score || 0}</strong>
                        <br><span style="color:var(--text-tertiary);font-size:var(--font-size-xs);">${Math.round(s.accuracy || 0)}%</span>
                    </div>
                </div>
            `).join('')}
        `;
    }

    printProgressReport(analytics) {
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
            this.showToast('Popup blocked. Please allow popups to print reports.', 'warning');
            return;
        }

        const streak = window.progressTracker.getStreakData();
        const dateStr = new Date().toLocaleDateString();

        printWindow.document.write(`
            <!DOCTYPE html>
            <html><head><title>DIBELS Practice Lab - Progress Report</title>
            <style>
                body { font-family: 'Inter', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333; }
                h1 { color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px; }
                h2 { color: #444; margin-top: 24px; }
                .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin: 16px 0; }
                .stat-box { background: #f5f5f5; padding: 12px; border-radius: 8px; }
                .stat-box strong { display: block; font-size: 24px; color: #6366f1; }
                table { width: 100%; border-collapse: collapse; margin: 12px 0; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background: #6366f1; color: white; }
                .footer { margin-top: 40px; font-size: 12px; color: #999; border-top: 1px solid #ddd; padding-top: 10px; }
                @media print { body { padding: 0; } }
            </style></head><body>
            <h1>DIBELS Practice Lab - Progress Report</h1>
            <p>Generated: ${dateStr}${streak.currentStreak > 0 ? ` | Current Streak: ${streak.currentStreak} days` : ''}</p>

            <h2>Summary</h2>
            <div class="stats-grid">
                <div class="stat-box"><strong>${analytics.totalSessions}</strong>Total Sessions</div>
                <div class="stat-box"><strong>${Math.round(analytics.totalTime / 60000)} min</strong>Total Practice Time</div>
                <div class="stat-box"><strong>${Math.round(analytics.averageScore)}</strong>Average Score</div>
                <div class="stat-box"><strong>${Math.round(analytics.averageAccuracy)}%</strong>Average Accuracy</div>
            </div>

            <h2>Grade Performance</h2>
            <table>
                <tr><th>Grade</th><th>Sessions</th><th>Avg Score</th><th>Avg Accuracy</th></tr>
                ${Object.entries(analytics.byGrade || {}).map(([grade, stats]) =>
                    `<tr><td>Grade ${grade}</td><td>${stats.sessions}</td><td>${Math.round(stats.averageScore)}</td><td>${Math.round(stats.averageAccuracy)}%</td></tr>`
                ).join('')}
            </table>

            <h2>Recent Sessions</h2>
            <table>
                <tr><th>Date</th><th>Grade</th><th>Subtest</th><th>Score</th><th>Accuracy</th></tr>
                ${(analytics.recentSessions || []).slice(0, 15).map(s =>
                    `<tr><td>${new Date(s.date).toLocaleDateString()}</td><td>${s.grade}</td><td>${s.subtest}</td><td>${s.score || 0}</td><td>${Math.round(s.accuracy || 0)}%</td></tr>`
                ).join('')}
            </table>

            <div class="footer">DIBELS Practice Lab | Free, open-source early literacy practice | ${dateStr}</div>
            </body></html>
        `);
        printWindow.document.close();
        printWindow.focus();
        printWindow.print();
    }

    updateStreakDisplay() {
        const display = document.getElementById('streak-display');
        if (!display || !window.progressTracker) return;
        const streak = window.progressTracker.getStreakData();
        if (streak.currentStreak > 0) {
            const icon = display.querySelector('.streak-icon');
            const text = display.querySelector('.streak-text');
            if (icon) icon.textContent = '\uD83D\uDD25';
            if (text) text.textContent = `${streak.currentStreak}-day streak${streak.bestStreak > streak.currentStreak ? ` (Best: ${streak.bestStreak})` : ''}`;
            display.classList.remove('hidden');
        } else {
            display.classList.add('hidden');
        }
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
