# Project Structure

## Overview

OSR.Foco is a monorepo containing a desktop focus/productivity application built with Tauri + React. The project uses pnpm workspaces for package management and includes placeholders for future CLI and browser extension packages.

## Folder Structure

```
osr.foco/
├── packages/
│   ├── desktop/           # Main Tauri + React application
│   │   ├── src/          # React frontend source
│   │   ├── src-tauri/    # Rust backend source
│   │   ├── public/       # Static assets
│   │   └── dist/         # Built frontend (generated)
│   ├── extension/        # Future browser extension (empty)
│   └── cli/             # Future CLI tool (empty)
├── .guided/             # Documentation and project metadata
├── node_modules/        # Dependencies
├── package.json         # Root workspace configuration
├── pnpm-workspace.yaml  # pnpm workspace configuration
└── README.md           # Project documentation
```

## Module Organization

### Desktop Package (`packages/desktop/`)

- **Frontend**: React + TypeScript + Vite
- **Backend**: Rust + Tauri framework
- **UI**: CSS with basic styling
- **Entities**: Core TypeScript interfaces for data models

### Root Level

- **Workspace Management**: pnpm workspaces configuration
- **Tooling**: ESLint, Prettier, Husky, Commitizen
- **Release**: Conventional changelog and release-it

## Workspace Configuration

- **Package Manager**: pnpm with workspace support
- **Monorepo Structure**: Three packages (desktop active, extension/cli placeholder)
- **Build System**: Each package has independent build configuration
- **Shared Tooling**: Linting, formatting, and commit standards at root level
