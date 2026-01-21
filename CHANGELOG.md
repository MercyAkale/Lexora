# Changelog

All notable changes to LEXORA will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## Unreleased

### Added
- Initial test infrastructure (Vitest + React Testing Library)
- Environment configuration system (env.js, .env.example)
- Error boundary and 404 page
- Route-based code splitting with Suspense
- GitHub Actions CI pipeline
- Prettier code formatting
- Production documentation (LICENSE, CONTRIBUTING, CODE_OF_CONDUCT, SECURITY)

### Changed
- Replaced console.log with dev-only logger utility
- Updated HTML title and meta tags for SEO

### Fixed
- Bundle size optimization via lazy loading

## [0.1.0] - 2025-01-20

### Added
- Initial LEXORA MVP release
- Multi-language support (Spanish, French, Italian, German, Arabic)
- Interactive lessons and vocabulary
- Verb conjugation tool
- Grammar checker
- AI tutor (placeholder)
- Dark mode support
- Framer Motion animations
- Zustand state management

---

## Template

For new releases, use this template:

```markdown
## [X.X.X] - YYYY-MM-DD

### Added
- New features

### Changed
- Updated features

### Fixed
- Bug fixes

### Deprecated
- Soon-to-be removed features

### Removed
- Removed features

### Security
- Security patches
```
