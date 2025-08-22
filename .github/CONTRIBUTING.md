# Contributing to OSR.Foco

## Getting Started

### Prerequisites

- **Node.js**: >=20.x (LTS recommended)
- **pnpm**: >=9.x (package manager)
- **Rust**: Stable toolchain
- **Tauri**: >=2.x

### Development Setup

```bash
# Clone the repository
git clone <repository-url>
cd osr.foco

# Install dependencies
pnpm bootstrap

# Start development server
pnpm dev

# Open the app (in separate terminal)
pnpm open
```

## Project Structure

```
osr.foco/
├── packages/
│   ├── desktop/           # Main Tauri + React application
│   ├── extension/         # Future browser extension (empty)
│   └── cli/              # Future CLI tool (empty)
├── .guided/              # Project documentation
└── .github/              # GitHub workflows and templates
```

## Development Workflow

### Branch Naming

- `feat/feature-name` - New features
- `fix/issue-description` - Bug fixes
- `docs/documentation-update` - Documentation changes
- `refactor/component-name` - Code refactoring
- `test/test-description` - Testing additions

### Commit Standards

We use **Conventional Commits** format. Use the provided commitizen tool:

```bash
# Interactive commit with proper formatting
pnpm commit
```

**Commit Types:**

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

**Examples:**

```
feat: add task creation functionality
fix: resolve memory leak in session timer
docs: update setup instructions in README
```

## Code Style

### TypeScript Standards

- **Strict Mode**: Always enabled - no exceptions
- **Explicit Typing**: All functions, props, and state must be typed
- **No `any` Type**: Use `unknown` or proper union types instead
- **Return Types**: Explicitly specify function return types

```typescript
// ✅ Good
interface TaskProps {
  task: Task;
  onComplete: (id: string) => void;
}

const TaskComponent: React.FC<TaskProps> = ({ task, onComplete }) => {
  return <div>{task.title}</div>;
};

// ❌ Bad
const TaskComponent = ({ task, onComplete }: any) => {
  return <div>{task.title}</div>;
};
```

### React Standards

- **Functional Components Only**: No class components
- **Hooks Pattern**: Use React hooks for state and lifecycle
- **Props Interfaces**: Every component needs explicit props typing
- **Performance**: Use React.memo, useMemo, useCallback when appropriate

### File Organization

- **Naming**: Use kebab-case for files (`task-manager.tsx`)
- **Components**: PascalCase (`TaskManager`)
- **Variables**: camelCase (`currentTask`)
- **Types**: PascalCase (`TaskInterface`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_SESSIONS`)

### Import Organization

```typescript
// 1. React imports
import React, { useState, useEffect } from 'react';

// 2. Third-party libraries
import { invoke } from '@tauri-apps/api/core';

// 3. Internal components
import { TaskList } from './task-list';

// 4. Types and interfaces
import type { Task, Session } from '../entities/types';

// 5. Relative imports
import './component.css';
```

## Quality Gates

### Pre-commit Requirements

All code must pass these checks before committing:

```bash
# Lint check
pnpm lint

# Format check
pnpm format

# Type checking
npx tsc --noEmit
```

**Automated via Husky**: These checks run automatically on `git commit`.

### Pre-merge Requirements

- [ ] All builds pass (`pnpm build`)
- [ ] Code review approval
- [ ] No TypeScript errors
- [ ] ESLint validation passes
- [ ] Prettier formatting applied
- [ ] Related documentation updated

## Testing (Future)

⚠️ **Current Status**: Testing infrastructure not yet implemented.

**Planned Testing Strategy:**

- **Unit Tests**: Jest + React Testing Library
- **Integration Tests**: Tauri command testing
- **E2E Tests**: Full workflow testing

**When implemented:**

```bash
# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

## Security Guidelines

### Input Validation

- Validate all user inputs before processing
- Sanitize data before storing or displaying
- Use TypeScript types to enforce data contracts

### Tauri Security

- Validate all data crossing frontend-backend boundary
- Don't expose sensitive information in error messages
- Use Tauri's permission model for API access

⚠️ **Known Issue**: CSP currently disabled - needs to be enabled for production.

## Documentation

### Code Documentation

- Use JSDoc for public functions and complex logic
- Comment business logic and non-obvious code
- Keep comments up-to-date with code changes

### Project Documentation

All project documentation lives in `.guided/` folder:

- **Architecture**: Technical design and decisions
- **Assessment**: Project health and improvement plans
- **Testing**: Strategy and procedures
- **Operations**: Troubleshooting and maintenance

**Update Documentation When:**

- Adding new features or components
- Changing architecture or design patterns
- Modifying build or deployment processes
- Resolving significant issues

## Building and Deployment

### Development Build

```bash
# Build frontend only
cd packages/desktop && pnpm build

# Build complete application
pnpm build
```

### Release Process

```bash
# Create release with changelog
pnpm release
```

**Release follows:**

- Semantic versioning (SemVer)
- Automated changelog generation
- Git tags for versions

## Getting Help

### Resources

- **Project Documentation**: `.guided/` folder
- **API Documentation**: Coming soon
- **Troubleshooting**: `.guided/operation/troubleshooting.md`

### Common Issues

See `.guided/operation/troubleshooting.md` for solutions to:

- Build failures
- Development environment setup
- Tauri-specific issues
- Cross-platform compatibility

### Reporting Issues

When reporting bugs:

1. Check existing issues first
2. Include steps to reproduce
3. Provide system information (OS, Node.js version, etc.)
4. Include relevant error messages and logs

## Code Review Guidelines

### For Authors

- Keep changes focused and small
- Write descriptive commit messages
- Update documentation with changes
- Test changes locally before pushing

### For Reviewers

- Check code follows style guidelines
- Verify TypeScript types are appropriate
- Ensure security best practices
- Validate documentation updates
- Test functionality when possible

## Architecture Decisions

For significant architectural changes:

1. Document the decision in `.guided/architecture/`
2. Discuss with maintainers before implementation
3. Consider impact on future extensions (CLI, browser extension)
4. Update related documentation

## Performance Considerations

- **Frontend**: Monitor bundle size, optimize React rendering
- **Backend**: Leverage Rust for performance-critical operations
- **IPC**: Minimize data transfer between frontend/backend
- **Memory**: Efficient state management and cleanup

---

**Thank you for contributing to OSR.Foco!** 🚀

For questions or clarifications, please open an issue or reach out to the maintainers.
