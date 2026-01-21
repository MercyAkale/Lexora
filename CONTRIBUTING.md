# Contributing to LEXORA

Thank you for your interest in contributing to LEXORA! We welcome developers, designers, translators, and language enthusiasts to help make language learning accessible and engaging.

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Git

### Setup Local Environment

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Lexora.git
   cd Lexora
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file using `.env.example`:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

   App will be available at `http://localhost:5173`

## Development Workflow

### Branch Naming

Use descriptive branch names following this pattern:

- Feature: `feature/add-spanish-lessons`
- Bug: `fix/dark-mode-toggle-issue`
- Docs: `docs/update-readme`
- Chore: `chore/upgrade-dependencies`

### Running Tests

```bash
# Run tests once
npm run test

# Watch mode (re-run on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Linting & Formatting

```bash
# Lint code
npm run lint

# Check formatting
npm run format:check

# Auto-format code
npm run format
```

### Build

```bash
npm run build
```

Outputs to `dist/` for deployment.

## Making a Pull Request

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make your changes** and commit with clear messages:
   ```bash
   git commit -m "Add Spanish verb conjugation drills"
   ```

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature
   ```

4. **Open a Pull Request** with:
   - Clear title describing the change
   - Description of what and why
   - Reference any related issues (#123)
   - Screenshots (for UI changes)

5. **Pass CI checks**: All lint, test, and build steps must pass.

## Coding Standards

### JavaScript/React

- Use **ES6+ syntax** (arrow functions, destructuring, const/let)
- Prefer **functional components** with hooks
- Keep components **focused and reusable**
- Add **prop validation** (TypeScript comment types or JSDoc)
- Use **semantic HTML** and ARIA attributes

### Styling

- Use **Tailwind CSS** for styling
- Support **dark mode** via `dark:` prefix
- Keep responsive design in mind (mobile-first)
- Test in light and dark modes

### File Structure

```
src/
├── components/        # Reusable UI components
├── pages/            # Page-level components
├── contexts/         # React Context providers
├── stores/           # Zustand state management
├── utils/            # Helper functions
├── config/           # Configuration files
├── data/             # Static data
└── test/             # Test files
```

### Naming Conventions

- **Components**: PascalCase (e.g., `VerbConjugation.jsx`)
- **Utilities**: camelCase (e.g., `devLog.js`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)
- **Files**: Match export name

### Testing

- Write tests for **utilities** and **non-trivial logic**
- Use **React Testing Library** for component tests
- Test **user interactions**, not implementation details
- Aim for **60%+ coverage** on new code

Example:
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import MyComponent from '../MyComponent';

describe('MyComponent', () => {
  it('renders a button that toggles state', () => {
    render(<MyComponent />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.getByText(/toggled/i)).toBeInTheDocument();
  });
});
```

## Documentation

- Update **README** if adding major features
- Add **JSDoc comments** for public functions
- Include **examples** for complex utilities
- Keep **CHANGELOG.md** current

## Questions?

- Open an **issue** for bugs or feature requests
- Use **discussions** for questions
- See **CODE_OF_CONDUCT.md** for community guidelines

---

**Thank you for contributing to LEXORA! 🌍📚**
