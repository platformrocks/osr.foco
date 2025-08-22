# Technology Stack

## Languages

### Frontend

- **TypeScript**: Primary language for React components and business logic
- **CSS**: Styling (basic CSS, no framework detected)
- **HTML**: Template structure via React JSX

### Backend

- **Rust**: Tauri backend implementation
- **JSON**: Configuration and data serialization

## Frameworks

### Frontend Framework

- **React**: v19.1.0 (latest)
- **Vite**: v7.0.4 (build tool and dev server)

### Desktop Framework

- **Tauri**: v2.x (cross-platform desktop app framework)
- **Tauri Plugins**: opener plugin for external links

### Development Tools

- **ESLint**: v9.0.0 with TypeScript support
- **Prettier**: Code formatting
- **TypeScript**: v5.8.3 for type checking

## Runtime Environment

### Development

- **Node.js**: v20.19.4 (LTS)
- **pnpm**: Workspace-aware package manager
- **Vite Dev Server**: http://localhost:1420

### Production

- **Tauri Bundle**: Native executable for target OS
- **Embedded Webview**: React app runs in native webview
- **Rust Runtime**: Compiled native backend

## Infrastructure

### Build System

- **pnpm Workspaces**: Monorepo management
- **Vite**: Frontend bundling and optimization
- **Cargo**: Rust package management and compilation
- **Tauri CLI**: Application bundling and development

### Development Infrastructure

- **Git**: Version control
- **Husky**: Git hooks for quality gates
- **lint-staged**: Pre-commit code quality checks
- **Commitizen**: Conventional commit formatting

### Release Infrastructure

- **release-it**: Automated release management
- **Conventional Changelog**: Automated changelog generation

## Dependencies

### Frontend Dependencies

- **React**: Core UI library
- **React DOM**: DOM rendering
- **@tauri-apps/api**: Tauri frontend integration
- **@tauri-apps/plugin-opener**: External link handling

### Backend Dependencies

- **tauri**: Core framework
- **tauri-plugin-opener**: Plugin for opening external URLs
- **serde**: Rust serialization framework
- **serde_json**: JSON handling in Rust

### Development Dependencies

- **Extensive tooling**: ESLint, Prettier, TypeScript, Vite plugins
- **Release tooling**: Commitizen, release-it, conventional changelog
