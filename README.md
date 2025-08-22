# OSR.Foco

## Overview

Foco is a cross-platform productivity app designed to help users stay focused and accomplish their daily goals. It combines a minimalist Pomodoro-style timer with structured daily objectives and distraction blocking.

The mission of Foco is to provide discipline without friction: a lightweight, transparent, and effective tool to structure daily work, reinforce habits, and minimize digital distractions.

## Core Features

`▤` **Task Management** - Create, organize, and track your daily tasks

`⏱` **Focus Sessions** - Pomodoro-style work sessions with timing

`☂` **Distraction Blocking** - Block websites and apps during focus time

## Architecture

```
packages/
├── desktop/     # Main Tauri + React application
│   ├── src/     # React frontend (TypeScript)
│   └── src-tauri/ # Rust backend
├── extension/   # Future browser extension (placeholder)
└── cli/         # Future CLI tool (placeholder)
```

**Technology Stack:**

- **Frontend**: React 19.1.0 + TypeScript 5.8.3 + Vite 7.0.4
- **Backend**: Rust + Tauri 2.x framework
- **Package Manager**: pnpm workspaces
- **Quality Tools**: ESLint 9.0.0, Prettier, Husky

## Quick Start

### Prerequisites

- **Node.js** >=20 (LTS recommended)
- **pnpm** >=9
- **Rust** toolchain (stable)
- **Tauri** >=2

### Installation

```bash
# Clone repository
git clone <repository-url>
cd osr.foco

# Install all dependencies
pnpm bootstrap

# Start development server
pnpm dev

# Open desktop app (separate terminal)
pnpm open
```

## Development Commands

```bash
# Development
pnpm dev              # Start dev server (http://localhost:1420)
pnpm open             # Launch desktop app in dev mode
pnpm build            # Build production app

# Code Quality
pnpm lint             # Run ESLint
pnpm lint:fix         # Fix ESLint issues
pnpm format           # Format with Prettier

# Release
pnpm commit           # Interactive conventional commit
pnpm release          # Create release with changelog
```

## Project Features

### `☑` Implemented

- Modern monorepo structure with pnpm workspaces
- Tauri + React + TypeScript foundation
- Comprehensive tooling (ESLint, Prettier, Husky)
- Conventional commits with automated changelog
- Cross-platform desktop targeting

### `☐` In Development

- Core task management functionality
- Focus session timer implementation
- Website blocking capabilities
- User interface and experience

### `☐` Planned

- Browser extension companion
- Command-line interface tool

## Code Standards

This project maintains high code quality standards:

- **TypeScript Strict Mode**: Explicit typing required
- **Functional React**: No class components
- **Performance First**: Optimized for desktop usage
- **Security Focused**: Input validation and secure practices
- **Well Documented**: Comprehensive documentation in `.guided/`

## Documentation

Comprehensive project documentation available in `.guided/`:

- **Architecture**: Technical design and stack details
- **Assessment**: Project health and improvement roadmap
- **Testing**: Strategy and quality assurance approach
- **Operations**: Troubleshooting and maintenance guides

## Contributing

We welcome contributions! Please see:

- **Contributing Guide**: `.github/CONTRIBUTING.md`
- **Code Standards**: Documented in `.guided/architecture/guardrails.md`
- **Development Setup**: `.guided/base/setup.instructions.md`

### Quick Contributing Steps

1. Fork the repository
2. Create feature branch (`feat/new-feature`)
3. Follow code standards and commit conventions
4. Submit pull request with clear description

## Requirements & Compatibility

- **Node.js**: >=20.x (LTS)
- **pnpm**: >=9.x
- **Rust**: Stable toolchain
- **Platforms**: Windows, macOS, Linux

## License

[License information to be added]

## Links

- **Documentation**: `.guided/` folder
- **Issues**: [GitHub Issues]
- **Discussions**: [GitHub Discussions]

---

_Built with 💚 for your brain_
