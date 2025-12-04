// DIBELS Scoring Engine - Comprehensive scoring system
class ScoringEngine {
    constructor() {
        this.mode = 'detailed'; // 'detailed' or 'simplified'
    }

    // Set scoring mode
    setMode(mode) {
        this.mode = mode;
    }

    // Main scoring method - routes to subtest-specific scoring
    calculateScore(subtest, data, options = {}) {
        // Validate inputs
        if (!subtest || typeof subtest !== 'string') {
            console.error('Invalid subtest provided to calculateScore');
            return this.scoreGeneric(data || {}, options.mode || this.mode);
        }
        
        if (!data || typeof data !== 'object') {
            console.warn('Invalid or missing data provided to calculateScore, using defaults');
            data = {};
        }
        
        const mode = options.mode || this.mode;
        
        try {
            switch (subtest) {
                case 'LNF':
                    return this.scoreLNF(data, mode);
                case 'PSF':
                    return this.scorePSF(data, mode);
                case 'NWF':
                    return this.scoreNWF(data, mode);
                case 'WRF':
                    return this.scoreWRF(data, mode);
                case 'ORF':
                    return this.scoreORF(data, mode);
                case 'Maze':
                    return this.scoreMaze(data, mode);
                default:
                    return this.scoreGeneric(data, mode);
            }
        } catch (error) {
            console.error(`Error calculating score for ${subtest}:`, error);
            return this.scoreGeneric(data, mode);
        }
    }

    // Letter Naming Fluency (LNF) scoring
    scoreLNF(data, mode) {
        // Validate and sanitize inputs
        const correct = Math.max(0, Math.floor(parseFloat(data?.correct) || 0));
        const errors = Math.max(0, Math.floor(parseFloat(data?.errors) || 0));
        const timeInSeconds = Math.max(0, parseFloat(data?.timeInSeconds) || 60);
        
        const total = correct + errors;
        const accuracy = this.calculateAccuracy(correct, total, 'LNF');
        
        // LNF score is correct letters per minute
        const score = correct;
        const rate = timeInSeconds > 0 ? (correct / timeInSeconds) * 60 : 0;

        if (mode === 'simplified') {
            return {
                score: score,
                accuracy: Math.round(accuracy),
                display: `${score} letters correct`
            };
        }

        return {
            score: score,
            errors: errors,
            total: total,
            accuracy: accuracy.toFixed(1),
            rate: Math.round(rate),
            timeInSeconds: timeInSeconds,
            display: `${score} letters correct in ${timeInSeconds} seconds`,
            detailed: {
                lettersPerMinute: Math.round(rate),
                accuracyPercent: accuracy.toFixed(1),
                totalAttempts: total
            }
        };
    }

    // Phonemic Segmentation Fluency (PSF) scoring
    scorePSF(data, mode) {
        // Validate and sanitize inputs
        const correct = Math.max(0, Math.floor(parseFloat(data?.correct) || 0));
        const errors = Math.max(0, Math.floor(parseFloat(data?.errors) || 0));
        const timeInSeconds = Math.max(0, parseFloat(data?.timeInSeconds) || 60);
        
        const total = correct + errors;
        const accuracy = this.calculateAccuracy(correct, total, 'PSF');
        
        // PSF score is correct phonemes per minute
        const score = correct;
        const rate = timeInSeconds > 0 ? (correct / timeInSeconds) * 60 : 0;

        if (mode === 'simplified') {
            return {
                score: score,
                accuracy: Math.round(accuracy),
                display: `${score} phonemes correct`
            };
        }

        return {
            score: score,
            errors: errors,
            total: total,
            accuracy: accuracy.toFixed(1),
            rate: Math.round(rate),
            timeInSeconds: timeInSeconds,
            display: `${score} phonemes correct in ${timeInSeconds} seconds`,
            detailed: {
                phonemesPerMinute: Math.round(rate),
                accuracyPercent: accuracy.toFixed(1),
                totalAttempts: total
            }
        };
    }

    // Nonsense Word Fluency (NWF) scoring
    scoreNWF(data, mode) {
        // Validate and sanitize inputs
        const correctLetterSounds = Math.max(0, Math.floor(parseFloat(data?.correctLetterSounds) || 0));
        const correctWholeWords = Math.max(0, Math.floor(parseFloat(data?.correctWholeWords) || 0));
        const errors = Math.max(0, Math.floor(parseFloat(data?.errors) || 0));
        const timeInSeconds = Math.max(0, parseFloat(data?.timeInSeconds) || 60);
        
        // NWF has two scores: CLS (Correct Letter Sounds) and WRC (Whole Words Read Correctly)
        const cls = correctLetterSounds;
        const wrc = correctWholeWords;
        const total = cls + errors;
        const accuracy = this.calculateAccuracy(cls, total, 'NWF');
        
        const clsRate = timeInSeconds > 0 ? (cls / timeInSeconds) * 60 : 0;
        const wrcRate = timeInSeconds > 0 ? (wrc / timeInSeconds) * 60 : 0;

        if (mode === 'simplified') {
            return {
                score: cls,
                wholeWords: wrc,
                accuracy: Math.round(accuracy),
                display: `${cls} sounds, ${wrc} whole words`
            };
        }

        return {
            cls: cls,
            wrc: wrc,
            errors: errors,
            total: total,
            accuracy: accuracy.toFixed(1),
            timeInSeconds: timeInSeconds,
            display: `CLS: ${cls}, WRC: ${wrc} in ${timeInSeconds} seconds`,
            detailed: {
                clsPerMinute: Math.round(clsRate),
                wrcPerMinute: Math.round(wrcRate),
                accuracyPercent: accuracy.toFixed(1),
                totalAttempts: total
            }
        };
    }

    // Word Reading Fluency (WRF) scoring
    scoreWRF(data, mode) {
        // Validate and sanitize inputs
        const correct = Math.max(0, Math.floor(parseFloat(data?.correct) || 0));
        const errors = Math.max(0, Math.floor(parseFloat(data?.errors) || 0));
        const timeInSeconds = Math.max(0, parseFloat(data?.timeInSeconds) || 60);
        
        const total = correct + errors;
        const accuracy = this.calculateAccuracy(correct, total, 'WRF');
        
        // WRF score is correct words per minute
        const score = correct;
        const rate = timeInSeconds > 0 ? (correct / timeInSeconds) * 60 : 0;

        if (mode === 'simplified') {
            return {
                score: score,
                accuracy: Math.round(accuracy),
                display: `${score} words correct`
            };
        }

        return {
            score: score,
            errors: errors,
            total: total,
            accuracy: accuracy.toFixed(1),
            rate: Math.round(rate),
            timeInSeconds: timeInSeconds,
            display: `${score} words correct in ${timeInSeconds} seconds`,
            detailed: {
                wordsPerMinute: Math.round(rate),
                accuracyPercent: accuracy.toFixed(1),
                totalAttempts: total
            }
        };
    }

    // Oral Reading Fluency (ORF) scoring
    scoreORF(data, mode) {
        // Validate and sanitize inputs
        const correct = Math.max(0, Math.floor(parseFloat(data?.correct) || 0));
        const errors = Math.max(0, Math.floor(parseFloat(data?.errors) || 0));
        const timeInSeconds = Math.max(0, parseFloat(data?.timeInSeconds) || 60);
        
        const total = correct + errors;
        const accuracy = this.calculateAccuracy(correct, total, 'ORF');
        
        // ORF uses Words Correct Per Minute (WCPM)
        const wcpm = timeInSeconds > 0 ? Math.round((correct / timeInSeconds) * 60) : 0;
        
        // Also calculate Words Per Minute (WPM) including errors
        const wpm = timeInSeconds > 0 ? Math.round((total / timeInSeconds) * 60) : 0;

        if (mode === 'simplified') {
            return {
                score: wcpm,
                accuracy: Math.round(accuracy),
                display: `${wcpm} WCPM`
            };
        }

        return {
            wcpm: wcpm,
            wpm: wpm,
            correct: correct,
            errors: errors,
            total: total,
            accuracy: accuracy.toFixed(1),
            timeInSeconds: timeInSeconds,
            display: `${wcpm} WCPM (${correct} correct, ${errors} errors)`,
            detailed: {
                wordsCorrectPerMinute: wcpm,
                wordsPerMinute: wpm,
                accuracyPercent: accuracy.toFixed(1),
                totalWordsRead: total,
                correctWords: correct,
                errorWords: errors
            }
        };
    }

    // Maze Comprehension scoring
    scoreMaze(data, mode) {
        // Validate and sanitize inputs
        const correct = Math.max(0, Math.floor(parseFloat(data?.correct) || 0));
        const incorrect = Math.max(0, Math.floor(parseFloat(data?.incorrect) || 0));
        const unanswered = Math.max(0, Math.floor(parseFloat(data?.unanswered) || 0));
        const timeInSeconds = Math.max(0, parseFloat(data?.timeInSeconds) || 180);
        
        const total = correct + incorrect + unanswered;
        const attempted = correct + incorrect;
        const accuracy = this.calculateAccuracy(correct, attempted, 'Maze');
        
        // Maze score is number of correct selections
        const score = correct;
        const rate = timeInSeconds > 0 ? (correct / timeInSeconds) * 60 : 0;

        if (mode === 'simplified') {
            return {
                score: score,
                accuracy: Math.round(accuracy),
                display: `${score} of ${total} correct`
            };
        }

        return {
            score: score,
            correct: correct,
            incorrect: incorrect,
            unanswered: unanswered,
            total: total,
            attempted: attempted,
            accuracy: accuracy.toFixed(1),
            timeInSeconds: timeInSeconds,
            display: `${score} correct out of ${total} (${incorrect} incorrect, ${unanswered} unanswered)`,
            detailed: {
                correctSelectionsPerMinute: Math.round(rate),
                accuracyPercent: accuracy.toFixed(1),
                completionRate: total > 0 ? ((attempted / total) * 100).toFixed(1) : 0,
                totalItems: total,
                correctItems: correct,
                incorrectItems: incorrect,
                unansweredItems: unanswered
            }
        };
    }

    // Generic scoring (fallback)
    scoreGeneric(data, mode) {
        // Validate and sanitize inputs
        const correct = Math.max(0, Math.floor(parseFloat(data?.correct) || 0));
        const errors = Math.max(0, Math.floor(parseFloat(data?.errors) || 0));
        
        const total = correct + errors;
        const accuracy = this.calculateAccuracy(correct, total, 'Generic');
        const score = correct - errors;

        if (mode === 'simplified') {
            return {
                score: Math.max(0, score),
                accuracy: Math.round(accuracy),
                display: `Score: ${Math.max(0, score)}`
            };
        }

        return {
            score: Math.max(0, score),
            correct: correct,
            errors: errors,
            total: total,
            accuracy: accuracy.toFixed(1),
            display: `${correct} correct, ${errors} errors (Score: ${Math.max(0, score)})`,
            detailed: {
                correctResponses: correct,
                errorResponses: errors,
                accuracyPercent: accuracy.toFixed(1),
                totalAttempts: total
            }
        };
    }

    // Get benchmark comparison
    getBenchmarkComparison(subtest, grade, score) {
        // Validate inputs
        if (!subtest || typeof subtest !== 'string') {
            return null;
        }
        
        if (!grade || typeof grade !== 'string') {
            return null;
        }
        
        // Ensure score is a number
        const numericScore = typeof score === 'number' ? score : parseFloat(score);
        if (isNaN(numericScore) || numericScore < 0) {
            return null;
        }
        
        // Get benchmarks from DIBELS_CONTENT
        if (!window.DIBELS_CONTENT || !window.DIBELS_CONTENT.benchmarks) {
            return null;
        }

        const gradeBenchmarks = window.DIBELS_CONTENT.benchmarks[grade];
        if (!gradeBenchmarks || typeof gradeBenchmarks !== 'object') {
            return null;
        }

        const subtestBenchmarks = gradeBenchmarks[subtest];
        if (!subtestBenchmarks || typeof subtestBenchmarks !== 'object') {
            return null;
        }

        // Validate benchmark values exist and are numbers
        const wellAbove = typeof subtestBenchmarks.wellAboveAverage === 'number' ? subtestBenchmarks.wellAboveAverage : Infinity;
        const above = typeof subtestBenchmarks.aboveAverage === 'number' ? subtestBenchmarks.aboveAverage : Infinity;
        const average = typeof subtestBenchmarks.average === 'number' ? subtestBenchmarks.average : Infinity;
        const below = typeof subtestBenchmarks.belowAverage === 'number' ? subtestBenchmarks.belowAverage : 0;

        // Determine performance level
        let level = 'Well Below Average';
        let color = 'var(--warning-color)';

        if (numericScore >= wellAbove) {
            level = 'Well Above Average';
            color = 'var(--success-color)';
        } else if (numericScore >= above) {
            level = 'Above Average';
            color = 'var(--secondary-color)';
        } else if (numericScore >= average) {
            level = 'Average';
            color = 'var(--info-color)';
        } else if (numericScore >= below) {
            level = 'Below Average';
            color = 'var(--accent-color)';
        }

        return {
            level: level,
            color: color,
            benchmarks: subtestBenchmarks,
            note: (subtestBenchmarks.note && typeof subtestBenchmarks.note === 'string') ? subtestBenchmarks.note : ''
        };
    }

    // Format score for display
    formatScoreDisplay(scoreData, subtest, grade) {
        // Validate input
        if (!scoreData || typeof scoreData !== 'object') {
            console.error('Invalid scoreData provided to formatScoreDisplay', { scoreData, subtest, grade });
            return '<div class="error-message"><h3>Scoring Error</h3><p>Unable to display score results. Please try calculating the score again.</p></div>';
        }

        const benchmark = this.getBenchmarkComparison(subtest, grade, scoreData.score || scoreData.wcpm || 0);
        
        // Get accuracy level and badge
        const accuracy = parseFloat(scoreData.accuracy) || 0;
        const accuracyInfo = this.getAccuracyLevel(accuracy);
        
        // Safely format display text - handle undefined, null, or object values
        const displayText = this.formatValueForDisplay(scoreData.display, 'Score information not available');
        const accuracyText = this.formatValueForDisplay(scoreData.accuracy, '0');
        
        let html = `
            <div class="score-display">
                <div class="score-main">
                    <div class="score-value">
                        ${this.escapeHtml(displayText)}
                        <span class="accuracy-badge ${accuracyInfo.level}" role="status" aria-label="Accuracy level: ${accuracyInfo.label}">
                            ${this.escapeHtml(accuracyText)}%
                        </span>
                    </div>
                    ${benchmark ? `
                        <div class="score-level" style="color: ${benchmark.color}">
                            ${this.escapeHtml(benchmark.level)}
                        </div>
                    ` : ''}
                    <div class="accuracy-context" role="status">
                        <strong>Accuracy:</strong> ${this.escapeHtml(accuracyInfo.label)}
                    </div>
                </div>
        `;

        if (this.mode === 'detailed' && scoreData.detailed) {
            html += `
                <div class="score-details">
                    <h4>Detailed Results</h4>
                    <ul>
            `;
            
            for (const [key, value] of Object.entries(scoreData.detailed)) {
                const label = this.formatLabel(key);
                const formattedValue = this.formatValueForDisplay(value, 'N/A');
                html += `<li><strong>${this.escapeHtml(label)}:</strong> ${this.escapeHtml(formattedValue)}</li>`;
            }
            
            html += `
                    </ul>
                </div>
            `;
        }

        if (benchmark && benchmark.note) {
            html += `
                <div class="score-note">
                    <small>${this.escapeHtml(benchmark.note)}</small>
                </div>
            `;
        }

        html += `</div>`;
        
        return html;
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
            // For other objects, try JSON.stringify (with max depth)
            try {
                return JSON.stringify(value, null, 0).substring(0, 100);
            } catch (e) {
                return fallback;
            }
        }
        
        // Convert to string for primitive values
        return String(value);
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        if (typeof text !== 'string') {
            text = String(text);
        }
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Format camelCase to readable label
    formatLabel(camelCase) {
        if (!camelCase || typeof camelCase !== 'string') {
            return 'Unknown';
        }
        
        return camelCase
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }

    // Enhanced accuracy calculation with validation
    calculateAccuracy(correct, total, subtest = '') {
        if (total === 0) return 0;
        
        // Validate inputs
        if (correct < 0 || total < 0) {
            console.warn(`[${subtest}] Negative values in accuracy calculation`);
            return 0;
        }
        
        if (correct > total) {
            console.warn(`[${subtest}] Correct responses (${correct}) exceed total responses (${total})`);
            return 100; // Cap at 100%
        }
        
        const accuracy = (correct / total) * 100;
        
        // Round to 1 decimal place for consistency
        return Math.round(accuracy * 10) / 10;
    }

    // Get accuracy badge level
    getAccuracyLevel(accuracy) {
        if (accuracy >= 95) {
            return { level: 'excellent', label: 'Excellent accuracy' };
        } else if (accuracy >= 85) {
            return { level: 'good', label: 'Good accuracy' };
        } else if (accuracy >= 75) {
            return { level: 'fair', label: 'Fair accuracy - review errors' };
        } else {
            return { level: 'low', label: 'Low accuracy - needs improvement' };
        }
    }
}

// Create global scoring engine instance
window.scoringEngine = new ScoringEngine();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ScoringEngine;
}

