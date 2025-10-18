// Print functionality for DIBELS Practice Lab
class PrintManager {
    constructor() {
        this.printStyles = `
            @media print {
                body {
                    font-family: Arial, sans-serif;
                    font-size: 12pt;
                    line-height: 1.4;
                    color: black;
                    background: white;
                }
                
                .no-print {
                    display: none !important;
                }
                
                .print-header {
                    text-align: center;
                    margin-bottom: 2rem;
                    border-bottom: 2px solid black;
                    padding-bottom: 1rem;
                }
                
                .print-title {
                    font-size: 18pt;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }
                
                .print-subtitle {
                    font-size: 14pt;
                    color: #666;
                }
                
                .print-instructions {
                    margin: 1rem 0;
                    padding: 1rem;
                    background: #f5f5f5;
                    border: 1px solid #ccc;
                }
                
                .print-content {
                    margin: 1rem 0;
                }
                
                .letter-grid-print {
                    display: grid;
                    grid-template-columns: repeat(10, 1fr);
                    gap: 0.5rem;
                    margin: 1rem 0;
                }
                
                .letter-item-print {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border: 1px solid black;
                    font-size: 16pt;
                    font-weight: bold;
                }
                
                .word-grid-print {
                    display: grid;
                    grid-template-columns: repeat(8, 1fr);
                    gap: 0.5rem;
                    margin: 1rem 0;
                }
                
                .word-item-print {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.5rem;
                    border: 1px solid black;
                    font-size: 14pt;
                    text-align: center;
                    min-height: 40px;
                }
                
                .passage-print {
                    font-size: 14pt;
                    line-height: 1.6;
                    margin: 1rem 0;
                    padding: 1rem;
                    border: 1px solid black;
                }
                
                .maze-passage-print {
                    font-size: 14pt;
                    line-height: 1.6;
                    margin: 1rem 0;
                    padding: 1rem;
                    border: 1px solid black;
                }
                
                .maze-blank-print {
                    border-bottom: 2px solid black;
                    min-width: 100px;
                    display: inline-block;
                    margin: 0 0.25rem;
                }
                
                .scoring-section {
                    margin-top: 2rem;
                    border-top: 2px solid black;
                    padding-top: 1rem;
                }
                
                .scoring-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 1rem;
                    margin: 1rem 0;
                }
                
                .scoring-item {
                    display: flex;
                    justify-content: space-between;
                    padding: 0.5rem;
                    border: 1px solid black;
                }
                
                .page-break {
                    page-break-before: always;
                }
            }
        `;
        
        this.addPrintStyles();
    }

    // Add print styles to the document
    addPrintStyles() {
        const style = document.createElement('style');
        style.textContent = this.printStyles;
        document.head.appendChild(style);
    }

    // Generate printable content for a subtest
    generatePrintableContent(subtest, grade, content, options = {}) {
        const timestamp = new Date().toLocaleString();
        const studentName = options.studentName || 'Student Name';
        const examinerName = options.examinerName || 'Examiner Name';
        
        let printContent = `
            <div class="print-header">
                <div class="print-title">DIBELS Practice Lab</div>
                <div class="print-subtitle">${DIBELS_CONTENT.subtestDescriptions[subtest].name} - Grade ${grade}</div>
                <div class="print-subtitle">Student: ${studentName} | Examiner: ${examinerName} | Date: ${timestamp}</div>
            </div>
        `;

        switch (subtest) {
            case 'LNF':
                printContent += this.generateLNFPrint(content);
                break;
            case 'PSF':
                printContent += this.generatePSFPrint(content);
                break;
            case 'NWF':
                printContent += this.generateNWFPrint(content);
                break;
            case 'WRF':
                printContent += this.generateWRFPrint(content);
                break;
            case 'ORF':
                printContent += this.generateORFPrint(content);
                break;
            case 'Maze':
                printContent += this.generateMazePrint(content);
                break;
        }

        printContent += this.generateScoringSection(subtest);

        return printContent;
    }

    // Generate LNF printable content
    generateLNFPrint(content) {
        return `
            <div class="print-instructions">
                <strong>Instructions:</strong> ${DIBELS_CONTENT.subtestDescriptions.LNF.instructions}
            </div>
            <div class="print-content">
                <div class="letter-grid-print">
                    ${content.map(letter => `<div class="letter-item-print">${letter}</div>`).join('')}
                </div>
            </div>
        `;
    }

    // Generate PSF printable content
    generatePSFPrint(content) {
        return `
            <div class="print-instructions">
                <strong>Instructions:</strong> ${DIBELS_CONTENT.subtestDescriptions.PSF.instructions}
            </div>
            <div class="print-content">
                <div class="word-list-print">
                    ${content.map((word, index) => 
                        `<div class="word-item-print">${index + 1}. ${word}</div>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    // Generate NWF printable content
    generateNWFPrint(content) {
        return `
            <div class="print-instructions">
                <strong>Instructions:</strong> ${DIBELS_CONTENT.subtestDescriptions.NWF.instructions}
            </div>
            <div class="print-content">
                <div class="word-grid-print">
                    ${content.map(word => `<div class="word-item-print">${word}</div>`).join('')}
                </div>
            </div>
        `;
    }

    // Generate WRF printable content
    generateWRFPrint(content) {
        return `
            <div class="print-instructions">
                <strong>Instructions:</strong> ${DIBELS_CONTENT.subtestDescriptions.WRF.instructions}
            </div>
            <div class="print-content">
                <div class="word-grid-print">
                    ${content.map(word => `<div class="word-item-print">${word}</div>`).join('')}
                </div>
            </div>
        `;
    }

    // Generate ORF printable content
    generateORFPrint(content) {
        return `
            <div class="print-instructions">
                <strong>Instructions:</strong> ${DIBELS_CONTENT.subtestDescriptions.ORF.instructions}
            </div>
            <div class="print-content">
                <div class="passage-print">
                    <h4>${content.title}</h4>
                    <p>${content.text}</p>
                </div>
            </div>
        `;
    }

    // Generate Maze printable content
    generateMazePrint(content) {
        const words = content.text.split(' ');
        let passageHTML = '';
        
        for (let i = 0; i < words.length; i++) {
            const question = content.questions.find(q => q.position === i);
            if (question) {
                passageHTML += `<span class="maze-blank-print">_______</span> `;
            } else {
                passageHTML += words[i] + ' ';
            }
        }

        return `
            <div class="print-instructions">
                <strong>Instructions:</strong> ${DIBELS_CONTENT.subtestDescriptions.Maze.instructions}
            </div>
            <div class="print-content">
                <div class="maze-passage-print">
                    <h4>${content.title}</h4>
                    <p>${passageHTML}</p>
                </div>
                <div class="maze-choices">
                    ${content.questions.map((q, index) => 
                        `<div><strong>${index + 1}.</strong> ${q.options.join(' / ')}</div>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    // Generate scoring section
    generateScoringSection(subtest) {
        return `
            <div class="scoring-section">
                <h3>Scoring</h3>
                <div class="scoring-grid">
                    <div class="scoring-item">
                        <span>Correct Responses:</span>
                        <span>_____</span>
                    </div>
                    <div class="scoring-item">
                        <span>Errors:</span>
                        <span>_____</span>
                    </div>
                    <div class="scoring-item">
                        <span>Total Time:</span>
                        <span>_____ seconds</span>
                    </div>
                    <div class="scoring-item">
                        <span>Score:</span>
                        <span>_____</span>
                    </div>
                </div>
                <div class="notes-section">
                    <h4>Notes:</h4>
                    <div style="border: 1px solid black; min-height: 100px; padding: 0.5rem;">
                        <br><br><br><br>
                    </div>
                </div>
            </div>
        `;
    }

    // Print the current practice content
    printCurrentContent() {
        const subtestManager = window.subtestManager;
        if (!subtestManager.currentSubtest) {
            alert('No practice session active');
            return;
        }

        const printContent = this.generatePrintableContent(
            subtestManager.currentSubtest,
            subtestManager.currentGrade,
            subtestManager.currentContent.content,
            {
                studentName: prompt('Enter student name (optional):') || 'Student Name',
                examinerName: prompt('Enter examiner name (optional):') || 'Examiner Name'
            }
        );

        this.printContent(printContent);
    }

    // Print specific content
    printContent(content) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>DIBELS Practice Sheet</title>
                <style>${this.printStyles}</style>
            </head>
            <body>
                ${content}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }

    // Generate PDF content (for future implementation)
    generatePDFContent(subtest, grade, content, options = {}) {
        // This would integrate with a PDF generation library like jsPDF
        // For now, we'll return the HTML content that can be converted to PDF
        return this.generatePrintableContent(subtest, grade, content, options);
    }

    // Export practice results
    exportResults(results) {
        const data = {
            timestamp: new Date().toISOString(),
            subtest: results.subtest,
            grade: results.grade,
            duration: results.duration,
            correctResponses: results.correctResponses,
            totalResponses: results.totalResponses,
            accuracy: results.accuracy,
            responses: results.responses
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dibels-results-${results.subtest}-${results.grade}-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // Print practice sheet for specific subtest
    printPracticeSheet(subtest, grade, options = {}) {
        const content = ContentGenerator.generateContent(subtest, grade, options);
        if (!content) {
            alert('Failed to generate content for printing');
            return;
        }

        const printContent = this.generatePrintableContent(subtest, grade, content.content, options);
        this.printContent(printContent);
    }
}

// Create global print manager instance
window.printManager = new PrintManager();

// Add print button to practice interface
function addPrintButton() {
    const practiceControls = document.querySelector('.practice-controls');
    if (practiceControls && !document.getElementById('print-btn')) {
        const printBtn = document.createElement('button');
        printBtn.id = 'print-btn';
        printBtn.className = 'control-btn';
        printBtn.textContent = 'Print Sheet';
        printBtn.addEventListener('click', () => window.printManager.printCurrentContent());
        practiceControls.appendChild(printBtn);
    }
}

// Add print button when practice starts
document.addEventListener('DOMContentLoaded', () => {
    // Add print button to practice controls
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                const practiceControls = document.querySelector('.practice-controls');
                if (practiceControls && !document.getElementById('print-btn')) {
                    addPrintButton();
                }
            }
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
});
