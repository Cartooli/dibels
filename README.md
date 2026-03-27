# DIBELS Practice Lab

**DIBELS practice. No sign-up. No paywall. K-8.**

DIBELS Practice Lab is a free, open-source web application designed to help educators, interventionists, and families practice DIBELS 8 subtests with students in grades K-8.

Use this when you want unlimited DIBELS-style practice with no account, optional offline use, and a built-in timer.

## Features

### Skill-Based Practice by Grade and Subtest
- **Grade filters**: K-8
- **Subtests**:
  - Letter Naming Fluency (LNF)
  - Phonemic Segmentation Fluency (PSF)
  - Nonsense Word Fluency (NWF)
  - Word Reading Fluency (WRF)
  - Oral Reading Fluency (ORF)
  - Maze Comprehension
- Toggle between timed and untimed practice
- Option to reveal answers and explanations

### Timer & Scoring Mode
- Built-in 60-second timer
- Option to hide/show timer
- Live word counter / error tracker
- **Scoring is manual:** you enter scores; the app provides the timer and optional score entry.

### Read-Aloud + Audio Modeling
- Audio models of fluent readers for ORF and WRF
- Tap-to-hear phoneme segmentation models
- Error analysis: examples of common student errors per subtest

### Printable & On-Screen Practice Sheets
- Generate or randomize printable student-facing prompts
- Printable PDF or in-browser version of:
  - Letter lists
  - Word lists
  - Decodable nonwords
  - Oral reading passages
  - Maze cloze activities

### Educator Mode
- Brief training videos on how to administer and score each subtest
- Simulated student responses (for practice scoring)
- Miscue analysis and scoring practice module (with answer keys)

## Technology Stack

- **Frontend**: HTML/CSS/JavaScript (Vanilla JS)
- **Backend**: None required (static hosting)
- **Deployment**: GitHub Pages
- **License**: MIT

## Getting Started

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/Cartooli/dibels.git
cd dibels
```

2. Run a local server (recommended; some features may not work when opening `index.html` directly):
```bash
# Using Node.js
npx serve .

# Using Python
python -m http.server 8000

# Using PHP
php -S localhost:8000
```

3. Open `http://localhost:8000` in your browser.

### GitHub Pages Deployment

1. Fork this repository
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"
6. Your site will be available at `https://Cartooli.github.io/dibels`

If your school or network blocks this site, you can self-host: fork the repo, enable GitHub Pages on your fork (Settings → Pages → main branch, root folder), or deploy the repo to any static host.

## Usage

### For Educators
1. Select the appropriate grade level (K-8)
2. Choose the subtest you want to practice
3. Configure practice options (timed/untimed, audio modeling, etc.)
4. Start practice session
5. Use the scoring panel to track student performance
6. Print practice sheets for offline use

### For Families
1. Select your child's grade level
2. Choose a subtest to practice
3. Enable audio modeling for better learning
4. Practice together with your child
5. Use the timer and scoring panel to record scores.

### For Interventionists
1. Use the educator mode for training
2. Practice scoring with sample responses
3. Learn about common error patterns
4. Generate printable materials for sessions

## Accessibility

We aim for WCAG 2.1 AA where applicable. Features include:
- **Keyboard**: Full keyboard support for all features
- **Screen readers**: ARIA labels and live regions
- **High contrast**: Toggle for better visibility
- **Font size**: Adjustable text size
- **Skip links**: Quick navigation to main content
- **Reduced motion**: Respects `prefers-reduced-motion`
If you run into an accessibility barrier, please open an issue.

## Content Sources

This application uses:
- Public DIBELS 8 test structure and approximate formats
- Randomized practice content generated from built-in word lists and phonics patterns (see `data/content.js`). Content is structured to reflect DIBELS-style tasks and is not from official DIBELS materials.

## Privacy & Data

This app does not require an account. No personal data is sent to any server. Optional data (e.g. progress, settings) is stored only in your browser (localStorage). We do not collect or store PII.

## Disclaimer

This is a practice tool only. It is not the official DIBELS assessment and is not affiliated with or endorsed by the rightsholders of DIBELS. Use official DIBELS materials for formal assessment.

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- DIBELS 8th Edition for the assessment framework (this app is practice only, not official DIBELS).
- Open educational resources community
- Contributors and testers

## Support

For questions, issues, or feature requests, please check the [Issues](https://github.com/Cartooli/dibels/issues) page and open a new issue if needed. You can also star the repo to show support.

## Roadmap

### Next
- Progress tracking (with optional anonymous local storage)
- Spanish language support

### Later
- Error pattern analytics (manual input for review)
- Custom practice list generator (teacher-facing)
- Video library for training new educators
- Volunteer "scorer" simulator for ed-prep programs
- Additional practice tools

---

**DIBELS Practice Lab** — Free practice for early literacy. No account required; works offline; keyboard and screen reader friendly.
