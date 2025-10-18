# DIBELS Practice Lab

📚 **Unlimited, open-access practice and training for fluency-based early literacy**

DIBELS Practice Lab is a free, open-source web application designed to help educators, interventionists, and families practice DIBELS 8 subtests with students in grades K-8.

## Features

### 🧠 Skill-Based Practice by Grade and Subtest
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

### ⏱️ Timer & Scoring Mode
- Built-in 60-second timer
- Option to hide/show timer
- Live word counter / error tracker
- Optional self-scoring mode for manual score entry

### 🎧 Read-Aloud + Audio Modeling
- Audio models of fluent readers for ORF and WRF
- Tap-to-hear phoneme segmentation models
- Error analysis: examples of common student errors per subtest

### 📋 Printable & On-Screen Practice Sheets
- Generate or randomize printable student-facing prompts
- Printable PDF or in-browser version of:
  - Letter lists
  - Word lists
  - Decodable nonwords
  - Oral reading passages
  - Maze cloze activities

### 📚 Educator Mode
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
git clone https://github.com/yourusername/dibels-practice-lab.git
cd dibels-practice-lab
```

2. Open `index.html` in your web browser or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

3. Navigate to `http://localhost:8000` in your browser

### GitHub Pages Deployment

1. Fork this repository
2. Go to Settings > Pages
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"
6. Your site will be available at `https://yourusername.github.io/dibels-practice-lab`

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
5. Use the scoring feature to track progress

### For Interventionists
1. Use the educator mode for training
2. Practice scoring with sample responses
3. Learn about common error patterns
4. Generate printable materials for sessions

## Accessibility Features

- **Keyboard Navigation**: Full keyboard support for all features
- **Screen Reader Support**: ARIA labels and live regions
- **High Contrast Mode**: Toggle for better visibility
- **Font Size Controls**: Adjustable text size
- **Skip Links**: Quick navigation to main content
- **Reduced Motion**: Respects user preferences

## Content Sources

This application uses:
- Public DIBELS 8 test structure and approximate formats
- Generated randomized practice content using open phoneme, grapheme, and vocabulary datasets
- Practice content structured to reflect real DIBELS patterns

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

- DIBELS 8th Edition for assessment framework
- Open educational resources community
- Contributors and testers

## Support

For questions, issues, or feature requests, please:
1. Check the [Issues](https://github.com/yourusername/dibels-practice-lab/issues) page
2. Create a new issue if needed
3. Join our community discussions

## Roadmap

### Future Features
- Progress tracking (with optional anonymous local storage)
- Error pattern analytics (manual input for review)
- Custom practice list generator (teacher-facing)
- Video library for training new educators
- Volunteer "scorer" simulator for ed-prep programs
- Spanish language support
- Additional assessment tools

---

**DIBELS Practice Lab** - Making early literacy assessment accessible to all educators and families.
