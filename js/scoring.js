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
        const mode = options.mode || this.mode;
        
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
    }

    // Letter Naming Fluency (LNF) scoring
    scoreLNF(data, mode) {
        const { correct = 0, errors = 0, timeInSeconds = 60 } = data;
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
        const { correct = 0, errors = 0, timeInSeconds = 60 } = data;
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
        const { correctLetterSounds = 0, correctWholeWords = 0, errors = 0, timeInSeconds = 60 } = data;
        
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
        const { correct = 0, errors = 0, timeInSeconds = 60 } = data;
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
        const { correct = 0, errors = 0, timeInSeconds = 60 } = data;
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
        const { correct = 0, incorrect = 0, unanswered = 0, timeInSeconds = 180 } = data;
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
        const { correct = 0, errors = 0 } = data;
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
        // Get benchmarks from DIBELS_CONTENT
        if (!window.DIBELS_CONTENT || !window.DIBELS_CONTENT.benchmarks) {
            return null;
        }

        const gradeBenchmarks = window.DIBELS_CONTENT.benchmarks[grade];
        if (!gradeBenchmarks) {
            return null;
        }

        const subtestBenchmarks = gradeBenchmarks[subtest];
        if (!subtestBenchmarks) {
            return null;
        }

        // Determine performance level
        let level = 'Well Below Average';
        let color = 'var(--warning-color)';

        if (score >= subtestBenchmarks.wellAboveAverage) {
            level = 'Well Above Average';
            color = 'var(--success-color)';
        } else if (score >= subtestBenchmarks.aboveAverage) {
            level = 'Above Average';
            color = 'var(--secondary-color)';
        } else if (score >= subtestBenchmarks.average) {
            level = 'Average';
            color = 'var(--info-color)';
        } else if (score >= subtestBenchmarks.belowAverage) {
            level = 'Below Average';
            color = 'var(--accent-color)';
        }

        return {
            level: level,
            color: color,
            benchmarks: subtestBenchmarks,
            note: subtestBenchmarks.note || ''
        };
    }

    // Format score for display
    formatScoreDisplay(scoreData, subtest, grade) {
        const benchmark = this.getBenchmarkComparison(subtest, grade, scoreData.score || scoreData.wcpm || 0);
        
        // Get accuracy level and badge
        const accuracy = parseFloat(scoreData.accuracy) || 0;
        const accuracyInfo = this.getAccuracyLevel(accuracy);
        
        let html = `
            <div class="score-display">
                <div class="score-main">
                    <div class="score-value">
                        ${scoreData.display}
                        <span class="accuracy-badge ${accuracyInfo.level}" role="status" aria-label="Accuracy level: ${accuracyInfo.label}">
                            ${scoreData.accuracy}%
                        </span>
                    </div>
                    ${benchmark ? `
                        <div class="score-level" style="color: ${benchmark.color}">
                            ${benchmark.level}
                        </div>
                    ` : ''}
                    <div class="accuracy-context" role="status">
                        <strong>Accuracy:</strong> ${accuracyInfo.label}
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
                html += `<li><strong>${label}:</strong> ${value}</li>`;
            }
            
            html += `
                    </ul>
                </div>
            `;
        }

        if (benchmark && benchmark.note) {
            html += `
                <div class="score-note">
                    <small>${benchmark.note}</small>
                </div>
            `;
        }

        html += `</div>`;
        
        return html;
    }

    // Format camelCase to readable label
    formatLabel(camelCase) {
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

