# Contributing to DIBELS Practice Lab

Thank you for your interest in contributing to DIBELS Practice Lab! This project is open source and we welcome contributions from the community.

## How to Contribute

### Reporting Issues

If you find a bug or have a feature request, please:

1. Check if the issue already exists in the [Issues](https://github.com/yourusername/dibels-practice-lab/issues) page
2. Create a new issue with:
   - Clear description of the problem or feature request
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Browser and device information

### Contributing Code

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**:
   - Follow the existing code style
   - Add comments for complex logic
   - Test your changes thoroughly
4. **Commit your changes**:
   ```bash
   git commit -m "Add: brief description of changes"
   ```
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request**

## Development Guidelines

### Code Style

- Use consistent indentation (2 spaces)
- Use meaningful variable and function names
- Add comments for complex logic
- Follow the existing HTML/CSS/JavaScript structure

### File Structure

```
dibels-practice-lab/
├── index.html              # Main HTML file
├── styles.css              # Main stylesheet
├── data/
│   └── content.js          # Content data and generators
├── js/
│   ├── app.js              # Main application logic
│   ├── timer.js            # Timer functionality
│   ├── subtests.js         # Subtest implementations
│   ├── audio.js            # Audio features
│   ├── print.js            # Print functionality
│   └── accessibility.js    # Accessibility features
├── README.md
├── LICENSE
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages deployment
```

### Testing

Before submitting a pull request, please:

1. Test all functionality in multiple browsers
2. Test on mobile devices
3. Test accessibility features
4. Verify print functionality works
5. Check that all subtests work correctly

### Content Guidelines

When adding new content:

- Ensure content is appropriate for the target grade level
- Use proper phoneme representations for PSF content
- Follow DIBELS 8 guidelines for content structure
- Maintain consistency with existing content format

## Areas for Contribution

### High Priority
- Additional grade-appropriate content
- More accessibility features
- Mobile optimization improvements
- Performance optimizations

### Medium Priority
- Additional language support
- More educator training materials
- Enhanced scoring features
- Progress tracking

### Low Priority
- Additional themes
- More audio options
- Advanced analytics
- Integration features

## Getting Help

If you need help or have questions:

1. Check the [Issues](https://github.com/yourusername/dibels-practice-lab/issues) page
2. Create a new issue with the "question" label
3. Join our community discussions

## Code of Conduct

Please be respectful and constructive in all interactions. We aim to create a welcoming environment for all contributors.

## License

By contributing to this project, you agree that your contributions will be licensed under the MIT License.

## Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to DIBELS Practice Lab!
