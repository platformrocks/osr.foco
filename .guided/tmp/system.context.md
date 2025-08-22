# System Context

## Developer Environment

### Operating System

- **OS**: Windows
- **Shell**: PowerShell (pwsh.exe)

### Development Tools

- **Node.js**: v20.19.4 (detected from terminal context)
- **Package Manager**: pnpm (monorepo workspace configured)
- **Rust**: Required for Tauri development
- **Git**: Version control system in use

### Terminal Environment

- **Default Shell**: pwsh.exe (PowerShell)
- **Working Directory**: C:\Users\guilh\workspace\osr.foco

### IDE/Editor

- **Primary**: VS Code (inferred from environment)

### Build System

- **Frontend**: Vite + TypeScript
- **Backend**: Tauri (Rust)
- **Workspace**: pnpm workspaces

## Command Execution Context

When executing commands in this environment:

- Use PowerShell syntax
- Commands should be run from workspace root: `C:\Users\guilh\workspace\osr.foco`
- Package management via pnpm
- Tauri commands via pnpm scripts

## Environment Variables

- Standard Node.js/pnpm environment
- Tauri development environment configured
- Rust toolchain available

## Local Development Setup

- Monorepo structure with pnpm workspaces
- Development server on http://localhost:1420
- Hot reload enabled for development
