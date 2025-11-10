// DIBELS Practice Lab - Progress Tracking System
class ProgressTracker {
    constructor() {
        this.storageKey = 'dibels-practice-progress';
        this.sessionsKey = 'dibels-practice-sessions';
        this.settingsKey = 'dibels-user-settings';
        this.init();
    }

    init() {
        this.loadSettings();
        this.setupIndexedDB();
        this.setupAutoSave();
    }
    
    setupAutoSave() {
        // Auto-save on page unload
        window.addEventListener('beforeunload', (e) => {
            const settings = this.getSettings();
            if (settings.autoSave !== false) {
                // Save any pending data
                this.saveProgress(this.getProgress());
            }
        });
        
        // Periodic auto-save every 30 seconds
        setInterval(() => {
            const settings = this.getSettings();
            if (settings.autoSave !== false) {
                this.saveProgress(this.getProgress());
            }
        }, 30000);
    }

    setupIndexedDB() {
        // Check if IndexedDB is available
        if (!('indexedDB' in window)) {
            console.warn('IndexedDB not available, using localStorage fallback');
            this.db = null;
            return;
        }
        
        const request = indexedDB.open('DIBELSPracticeDB', 1);
        
        request.onerror = (event) => {
            console.error('IndexedDB failed to open:', event.target.error);
            this.db = null;
            // Fallback to localStorage
            console.log('Using localStorage fallback');
        };
        
        request.onsuccess = () => {
            this.db = request.result;
            console.log('IndexedDB opened successfully');
            
            // Handle database errors during operation
            this.db.onerror = (event) => {
                console.error('IndexedDB error:', event.target.error);
            };
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            
            try {
                // Create practice sessions store
                if (!db.objectStoreNames.contains('practiceSessions')) {
                    const sessionStore = db.createObjectStore('practiceSessions', { keyPath: 'id', autoIncrement: true });
                    sessionStore.createIndex('date', 'date', { unique: false });
                    sessionStore.createIndex('grade', 'grade', { unique: false });
                    sessionStore.createIndex('subtest', 'subtest', { unique: false });
                }
                
                // Create progress data store
                if (!db.objectStoreNames.contains('progressData')) {
                    const progressStore = db.createObjectStore('progressData', { keyPath: 'id' });
                    progressStore.createIndex('type', 'type', { unique: false });
                }
            } catch (error) {
                console.error('Error creating IndexedDB stores:', error);
                this.db = null;
            }
        };
        
        request.onblocked = () => {
            console.warn('IndexedDB open request blocked');
            alert('Please close other tabs with this application to enable full functionality.');
        };
    }

    // Session Management
    startSession(grade, subtest, options = {}) {
        const session = {
            id: Date.now(),
            date: new Date().toISOString(),
            grade: grade,
            subtest: subtest,
            options: options,
            startTime: Date.now(),
            endTime: null,
            duration: 0,
            responses: [],
            score: null,
            accuracy: null,
            status: 'active'
        };

        this.saveSession(session);
        return session;
    }

    endSession(sessionId, responses, score, accuracy) {
        const session = this.getSession(sessionId);
        if (session) {
            session.endTime = Date.now();
            session.duration = session.endTime - session.startTime;
            session.responses = responses;
            session.score = score;
            session.accuracy = accuracy;
            session.status = 'completed';
            
            this.saveSession(session);
            this.updateProgress(session);
        }
    }

    saveSession(session) {
        if (this.db) {
            try {
                const transaction = this.db.transaction(['practiceSessions'], 'readwrite');
                const store = transaction.objectStore('practiceSessions');
                const request = store.put(session);
                
                request.onerror = () => {
                    console.error('Error saving session to IndexedDB, falling back to localStorage');
                    this.saveSessionToLocalStorage(session);
                };
            } catch (error) {
                console.error('Error accessing IndexedDB:', error);
                this.saveSessionToLocalStorage(session);
            }
        } else {
            this.saveSessionToLocalStorage(session);
        }
    }
    
    saveSessionToLocalStorage(session) {
        try {
            const stored = localStorage.getItem(this.sessionsKey);
            let sessions = stored ? JSON.parse(stored) : [];
            
            const existingIndex = sessions.findIndex(s => s.id === session.id);
            if (existingIndex >= 0) {
                sessions[existingIndex] = session;
            } else {
                sessions.push(session);
            }
            
            localStorage.setItem(this.sessionsKey, JSON.stringify(sessions));
        } catch (error) {
            console.error('Error saving session to localStorage:', error);
            if (error.name === 'QuotaExceededError') {
                alert('Storage quota exceeded. Some data may not be saved.');
            }
        }
    }

    getSession(sessionId) {
        if (this.db) {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['practiceSessions'], 'readonly');
                const store = transaction.objectStore('practiceSessions');
                const request = store.get(sessionId);
                
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => reject(request.error);
            });
        } else {
            const sessions = this.getSessions();
            return sessions.find(s => s.id === sessionId);
        }
    }

    getSessions(limit = 50) {
        // Always return a Promise for consistent async handling
        if (this.db) {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['practiceSessions'], 'readonly');
                const store = transaction.objectStore('practiceSessions');
                const index = store.index('date');
                const request = index.openCursor(null, 'prev');
                const sessions = [];
                let count = 0;

                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor && count < limit) {
                        sessions.push(cursor.value);
                        count++;
                        cursor.continue();
                    } else {
                        resolve(sessions);
                    }
                };
                request.onerror = () => reject(request.error);
            });
        } else {
            // Wrap localStorage in Promise for consistency
            return new Promise((resolve) => {
                const stored = localStorage.getItem(this.sessionsKey);
                const sessions = stored ? JSON.parse(stored).slice(0, limit) : [];
                resolve(sessions);
            });
        }
    }

    // Progress Tracking
    async updateProgress(session) {
        const progress = this.getProgress();
        
        // Update overall stats
        progress.totalSessions = (progress.totalSessions || 0) + 1;
        progress.totalTime = (progress.totalTime || 0) + session.duration;
        progress.lastPractice = session.date;

        // Update grade-specific stats
        if (!progress.byGrade) progress.byGrade = {};
        if (!progress.byGrade[session.grade]) {
            progress.byGrade[session.grade] = {
                sessions: 0,
                totalTime: 0,
                averageScore: 0,
                averageAccuracy: 0,
                lastPractice: null
            };
        }

        const gradeStats = progress.byGrade[session.grade];
        gradeStats.sessions += 1;
        gradeStats.totalTime += session.duration;
        gradeStats.lastPractice = session.date;

        // Update subtest-specific stats
        if (!progress.bySubtest) progress.bySubtest = {};
        if (!progress.bySubtest[session.subtest]) {
            progress.bySubtest[session.subtest] = {
                sessions: 0,
                totalTime: 0,
                averageScore: 0,
                averageAccuracy: 0,
                lastPractice: null
            };
        }

        const subtestStats = progress.bySubtest[session.subtest];
        subtestStats.sessions += 1;
        subtestStats.totalTime += session.duration;
        subtestStats.lastPractice = session.date;

        // Calculate averages
        await this.calculateAverages(progress);

        this.saveProgress(progress);
    }

    async calculateAverages(progress) {
        // Calculate grade averages
        for (const grade of Object.keys(progress.byGrade)) {
            const gradeStats = progress.byGrade[grade];
            const gradeSessions = await this.getSessionsByGrade(grade);
            if (gradeSessions.length > 0) {
                const totalScore = gradeSessions.reduce((sum, s) => sum + (s.score || 0), 0);
                const totalAccuracy = gradeSessions.reduce((sum, s) => sum + (s.accuracy || 0), 0);
                gradeStats.averageScore = totalScore / gradeSessions.length;
                gradeStats.averageAccuracy = totalAccuracy / gradeSessions.length;
            }
        }

        // Calculate subtest averages
        for (const subtest of Object.keys(progress.bySubtest)) {
            const subtestStats = progress.bySubtest[subtest];
            const subtestSessions = await this.getSessionsBySubtest(subtest);
            if (subtestSessions.length > 0) {
                const totalScore = subtestSessions.reduce((sum, s) => sum + (s.score || 0), 0);
                const totalAccuracy = subtestSessions.reduce((sum, s) => sum + (s.accuracy || 0), 0);
                subtestStats.averageScore = totalScore / subtestSessions.length;
                subtestStats.averageAccuracy = totalAccuracy / subtestSessions.length;
            }
        }
    }

    async getSessionsByGrade(grade) {
        const sessions = await this.getSessions();
        return sessions.filter(s => s.grade === grade && s.status === 'completed');
    }

    async getSessionsBySubtest(subtest) {
        const sessions = await this.getSessions();
        return sessions.filter(s => s.subtest === subtest && s.status === 'completed');
    }

    getProgress() {
        const stored = localStorage.getItem(this.storageKey);
        return stored ? JSON.parse(stored) : {};
    }

    saveProgress(progress) {
        localStorage.setItem(this.storageKey, JSON.stringify(progress));
    }

    // Settings Management
    loadSettings() {
        const stored = localStorage.getItem(this.settingsKey);
        const settings = stored ? JSON.parse(stored) : {};
        
        // Apply font size
        if (settings.fontSize) {
            document.documentElement.style.setProperty('--font-size-base', settings.fontSize);
        }
        
        // Apply high contrast
        if (settings.highContrast) {
            document.body.classList.add('high-contrast');
        }
        
        // Apply theme
        if (settings.theme) {
            document.documentElement.setAttribute('data-theme', settings.theme);
        }
    }

    saveSettings(settings) {
        const currentSettings = this.getSettings();
        const updatedSettings = { ...currentSettings, ...settings };
        localStorage.setItem(this.settingsKey, JSON.stringify(updatedSettings));
    }

    getSettings() {
        const stored = localStorage.getItem(this.settingsKey);
        return stored ? JSON.parse(stored) : {};
    }

    // Analytics and Reports
    async getAnalytics(timeframe = 'all') {
        const sessions = await this.getSessions();
        const now = new Date();
        let filteredSessions = sessions;

        if (timeframe !== 'all') {
            const days = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 365;
            const cutoff = new Date(now.getTime() - (days * 24 * 60 * 60 * 1000));
            filteredSessions = sessions.filter(s => new Date(s.date) >= cutoff);
        }

        return {
            totalSessions: filteredSessions.length,
            totalTime: filteredSessions.reduce((sum, s) => sum + s.duration, 0),
            averageSessionTime: filteredSessions.length > 0 ? 
                filteredSessions.reduce((sum, s) => sum + s.duration, 0) / filteredSessions.length : 0,
            averageScore: filteredSessions.length > 0 ?
                filteredSessions.reduce((sum, s) => sum + (s.score || 0), 0) / filteredSessions.length : 0,
            averageAccuracy: filteredSessions.length > 0 ?
                filteredSessions.reduce((sum, s) => sum + (s.accuracy || 0), 0) / filteredSessions.length : 0,
            byGrade: this.getGradeAnalytics(filteredSessions),
            bySubtest: this.getSubtestAnalytics(filteredSessions),
            recentSessions: filteredSessions.slice(0, 10)
        };
    }

    getGradeAnalytics(sessions) {
        const gradeStats = {};
        sessions.forEach(session => {
            if (!gradeStats[session.grade]) {
                gradeStats[session.grade] = {
                    sessions: 0,
                    totalTime: 0,
                    averageScore: 0,
                    averageAccuracy: 0
                };
            }
            gradeStats[session.grade].sessions += 1;
            gradeStats[session.grade].totalTime += session.duration;
        });

        Object.keys(gradeStats).forEach(grade => {
            const gradeSessions = sessions.filter(s => s.grade === grade);
            if (gradeSessions.length > 0) {
                gradeStats[grade].averageScore = gradeSessions.reduce((sum, s) => sum + (s.score || 0), 0) / gradeSessions.length;
                gradeStats[grade].averageAccuracy = gradeSessions.reduce((sum, s) => sum + (s.accuracy || 0), 0) / gradeSessions.length;
            }
        });

        return gradeStats;
    }

    getSubtestAnalytics(sessions) {
        const subtestStats = {};
        sessions.forEach(session => {
            if (!subtestStats[session.subtest]) {
                subtestStats[session.subtest] = {
                    sessions: 0,
                    totalTime: 0,
                    averageScore: 0,
                    averageAccuracy: 0
                };
            }
            subtestStats[session.subtest].sessions += 1;
            subtestStats[session.subtest].totalTime += session.duration;
        });

        Object.keys(subtestStats).forEach(subtest => {
            const subtestSessions = sessions.filter(s => s.subtest === subtest);
            if (subtestSessions.length > 0) {
                subtestStats[subtest].averageScore = subtestSessions.reduce((sum, s) => sum + (s.score || 0), 0) / subtestSessions.length;
                subtestStats[subtest].averageAccuracy = subtestSessions.reduce((sum, s) => sum + (s.accuracy || 0), 0) / subtestSessions.length;
            }
        });

        return subtestStats;
    }

    // Data Export/Import
    exportData() {
        const data = {
            sessions: this.getSessions(),
            progress: this.getProgress(),
            settings: this.getSettings(),
            exportDate: new Date().toISOString(),
            version: '1.0.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dibels-practice-data-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    importData(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    
                    if (data.sessions) {
                        localStorage.setItem(this.sessionsKey, JSON.stringify(data.sessions));
                    }
                    if (data.progress) {
                        localStorage.setItem(this.storageKey, JSON.stringify(data.progress));
                    }
                    if (data.settings) {
                        localStorage.setItem(this.settingsKey, JSON.stringify(data.settings));
                        this.loadSettings();
                    }
                    
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            };
            reader.onerror = () => reject(reader.error);
            reader.readAsText(file);
        });
    }

    // Data Cleanup
    clearAllData() {
        localStorage.removeItem(this.storageKey);
        localStorage.removeItem(this.sessionsKey);
        localStorage.removeItem(this.settingsKey);
        
        if (this.db) {
            const transaction = this.db.transaction(['practiceSessions', 'progressData'], 'readwrite');
            transaction.objectStore('practiceSessions').clear();
            transaction.objectStore('progressData').clear();
        }
    }

    async clearOldSessions(daysToKeep = 90) {
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - daysToKeep);
        
        const sessions = await this.getSessions();
        const filteredSessions = sessions.filter(s => new Date(s.date) >= cutoff);
        
        localStorage.setItem(this.sessionsKey, JSON.stringify(filteredSessions));
        
        if (this.db) {
            return new Promise((resolve, reject) => {
                const transaction = this.db.transaction(['practiceSessions'], 'readwrite');
                const store = transaction.objectStore('practiceSessions');
                const index = store.index('date');
                const request = index.openCursor();
                
                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        if (new Date(cursor.value.date) < cutoff) {
                            cursor.delete();
                        }
                        cursor.continue();
                    } else {
                        resolve();
                    }
                };
                request.onerror = () => reject(request.error);
            });
        }
    }
}

// Initialize progress tracker when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.progressTracker = new ProgressTracker();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProgressTracker;
}
