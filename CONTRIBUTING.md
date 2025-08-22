# Contributing to OSR.Foco

Thank you for your interest in contributing to OSR.Foco! We welcome contributions from the community and are pleased to have you join us.

## 🚀 Quick Start

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/osr.foco.git
   cd osr.foco
   ```
3. **Install dependencies**:
   ```bash
   pnpm bootstrap
   ```
4. **Create a feature branch**:
   ```bash
   git checkout -b feat/your-feature-name
   ```

## 📋 Development Workflow

### Prerequisites

- **Node.js** >=20 (LTS recommended)
- **pnpm** >=9
- **Rust** toolchain (stable)
- **Tauri** >=2

### Development Commands

```bash
# Start development server
pnpm dev

# Run linting
pnpm lint
pnpm lint:fix

# Format code
pnpm format

# Type checking
pnpm type-check

# Run tests
pnpm test

# Build production
pnpm build
```

## 🎯 Code Standards

This project maintains high quality standards. Please ensure your contributions follow these guidelines:

### TypeScript Standards

- **Strict mode required** - All code must pass TypeScript strict checks
- **Explicit typing** - No `any` types, prefer `unknown` if needed
- **Interface definitions** - All props and function returns must be explicitly typed
- **Consistent naming** - camelCase for variables, PascalCase for types/interfaces

### React Standards

- **Functional components only** - No class components
- **Hooks best practices** - Follow React hooks rules and patterns
- **Performance optimization** - Use React.memo and useMemo appropriately
- **Single responsibility** - Components should have a clear, single purpose

### Code Organization

- **File naming** - Use kebab-case for file names (e.g., `user-profile.tsx`)
- **Import order**:
  1. React imports
  2. Third-party libraries
  3. Internal components
  4. Types and interfaces
  5. Relative imports

### Forbidden Practices

- ❌ Never use `any` type
- ❌ No class components
- ❌ No inline styles (use CSS classes)
- ❌ No hardcoded strings (use constants)
- ❌ No console.log in production code
- ❌ No direct DOM manipulation

## 📝 Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/) for clear and consistent commit messages.

### Commit Types

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

### Examples

```bash
feat: add task deletion functionality
fix: resolve timer display bug on mobile
docs: update installation instructions
chore: update dependencies
```

### Using Commitizen

For interactive commit creation:

```bash
pnpm commit
```

## 🔧 Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Ensure all checks pass**:
   - Linting (`pnpm lint`)
   - Type checking (`pnpm type-check`)
   - Tests (`pnpm test`)
   - Formatting (`pnpm format:check`)
4. **Update CHANGELOG.md** under `[Unreleased]` section
5. **Create descriptive PR title** following conventional commit format
6. **Fill out PR template** with clear description

### PR Review Criteria

- ✅ Code follows project standards
- ✅ All tests pass
- ✅ Documentation is updated
- ✅ No breaking changes (unless discussed)
- ✅ Performance considerations addressed

## 🐛 Reporting Issues

When reporting issues, please include:

- **Clear description** of the problem
- **Steps to reproduce** the issue
- **Expected vs actual behavior**
- **Environment details** (OS, Node version, etc.)
- **Screenshots** if applicable

Use our issue templates for:

- 🐛 **Bug Reports**
- 💡 **Feature Requests**
- 📚 **Documentation Improvements**

## 🏗️ Project Architecture

OSR.Foco is built as a monorepo with:

```
packages/
├── desktop/     # Main Tauri + React application
├── extension/   # Future browser extension (placeholder)
└── cli/         # Future CLI tool (placeholder)
```

**Technology Stack:**

- **Frontend**: React 19.1.0 + TypeScript 5.8.3 + Vite 7.0.4
- **Backend**: Rust + Tauri 2.x
- **Package Manager**: pnpm workspaces

For detailed architecture information, see `.guided/architecture/`

## 🧪 Testing Strategy

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Manual Testing**: Cross-platform validation

## 📚 Documentation

- **Code Documentation**: Use JSDoc for functions and complex logic
- **README Updates**: Keep installation and usage docs current
- **Architecture Docs**: Located in `.guided/` directory
- **API Documentation**: Document all public interfaces

## 🤝 Community Guidelines

- **Be respectful** and inclusive
- **Help others** learn and grow
- **Share knowledge** and best practices
- **Collaborate** openly and transparently

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **GitHub Discussions**: For questions and community interaction
- **Documentation**: Check `.guided/` for comprehensive guides

## 🙏 Recognition

Contributors are recognized in:

- GitHub contributors list
- CHANGELOG.md acknowledgments
- README.md contributors section (coming soon)

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to OSR.Foco! 🎯✨
