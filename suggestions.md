# Create Expo Stack - Suggestions

This document serves as a structured way for the community to contribute ideas for improving the create-expo-stack CLI tool. We value your feedback and suggestions for making Expo development even better!

## How to Use This Document

If you have suggestions for improving create-expo-stack, please follow the format below to submit your ideas. This helps us organize and prioritize community feedback effectively.

## Contribution Guidelines

Before submitting a suggestion:

1. **Search existing suggestions** - Check if your idea has already been proposed
2. **Be specific** - Provide clear descriptions and use cases
3. **Consider impact** - Think about how your suggestion would benefit the community
4. **Follow the template** - Use the provided format for consistency

## Categories for Suggestions

### 🚀 New Features

Suggestions for entirely new capabilities or functionalities

### 🛠️ Improvements

Enhancements to existing features or workflows

### 🐛 Bug Reports

Issues or unexpected behaviors encountered while using the CLI

### 📚 Documentation

Improvements to guides, examples, or help text

### 🔧 Configuration Options

New CLI flags, configuration settings, or customization options

### 🎨 Templates & Scaffolding

New project templates, file structures, or code generation

## Suggestion Template

Please use this template when submitting new suggestions:

```markdown
## [Category] - [Brief Title]

**Description:**
[Clear explanation of what you're suggesting]

**Use Case:**
[Describe when and why this would be useful]

**Benefits:**

- [Benefit 1]
- [Benefit 2]
- [Additional benefits]

**Current Workaround (if any):**
[How users currently handle this need]

**Example Implementation (optional):**
[Code examples, CLI command examples, or mockups if applicable]

**Related Issues/PRs (optional):**
[#issue-number or #pull-request-number]
```

## Examples

### Example 1 - New Feature

## 🚀 New Feature - Dark Mode Support for CLI Interface

**Description:**
Add dark theme support to the CLI interface with colored output and better terminal integration.

**Use Case:**
Developers using dark-themed terminals would benefit from better visual integration and reduced eye strain during long setup sessions.

**Benefits:**

- Improved developer experience for dark theme users
- Better accessibility and visual comfort
- More professional CLI appearance

**Current Workaround:**
Users manually change terminal themes or deal with poor contrast in dark terminals.

### Example 2 - Configuration Option

## 🔧 Configuration Option - Custom Template Directory

**Description:**
Allow users to specify a custom directory containing their own EJS templates for project generation.

**Use Case:**
Teams and organizations want to enforce company-specific project structures and conventions across all new Expo projects.

**Benefits:**

- Enterprise adoption and standardization
- Reduced setup time for teams with specific requirements
- Flexibility for different organizational needs

**Example Implementation:**

```bash
npx rn-new@latest my-app --custom-templates ./company-templates
```

### Example 3 - Improvement

## 🛠️ Improvement - Better Error Messages for Network Issues

**Description:**
Improve error messages when network connectivity issues prevent package installation or template fetching.

**Use Case:**
Users with unstable internet connections or corporate firewalls need clearer guidance on resolving connectivity problems.

**Benefits:**

- Reduced user frustration
- Faster problem resolution
- Better onboarding experience for new developers

## Submitting Your Suggestions

To add a new suggestion:

1. Fork this repository
2. Create a new branch for your suggestion
3. Add your suggestion to this file using the template above
4. Submit a pull request with a clear description

## Review Process

- Suggestions are reviewed regularly by the maintainers
- Community feedback and upvotes help prioritize implementation
- Popular suggestions may be implemented in future releases
- Contributors are credited for accepted suggestions

## Questions?

If you have questions about using create-expo-stack or want to discuss your suggestion, please:

- Open an issue in the repository
- Join our Discord community: https://expostack.dev/discord
- Tweet us: [@dannyhw](https://twitter.com/danstepanov)

Thank you for helping make create-expo-stack better! 🙏
