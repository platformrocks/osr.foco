# # FOCO Desktop

A Tauri-based desktop application for focus and productivity management built with React and Chakra UI.

## Features

- **Clean Interface**: Modern UI built with Chakra UI
- **Dark/Light Mode**: System-aware color mode switching
- **Daily Objectives**: Track up to 3 daily objectives
- **Focus Timer**: Start focus sessions (UI ready, logic to be implemented)
- **Brainrot Blocker**: Toggle to block distracting websites (UI ready, logic to be implemented)

## Technology Stack

- **Frontend**: React 19 + TypeScript
- **UI Library**: Chakra UI v3
- **Routing**: React Router (HashRouter for Tauri compatibility)
- **Icons**: React Icons (Material Design)
- **Desktop Framework**: Tauri v2
- **Build Tool**: Vite

## Development

### Prerequisites

- Node.js 20+
- pnpm 9+
- Rust (for Tauri builds)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Run Tauri development app
pnpm tauri dev
```

## Architecture

### Layout Structure

- **Sidebar**: Navigation icons (Mission, Log) + theme toggle
- **TopBar**: Logo, mission input, window controls (draggable)
- **Main Content**: Routed pages (Home, Log)
- **Footer**: Block Brainrot toggle

### Styling Notes

- **No Tailwind**: This project uses Chakra UI exclusively
- **WebkitAppRegion**: TopBar is draggable, buttons are non-draggable
- **Color Scheme**: System-aware with custom brand colors
- **Responsive**: Designed for desktop window sizes

### Key Components

- `Layout.tsx`: Main layout wrapper
- `Sidebar.tsx`: Left navigation sidebar
- `TopBar.tsx`: Application header with drag region
- `FooterBar.tsx`: Footer with brainrot blocker toggle
- `Home.tsx`: Main page with daily objectives

### State Management

Currently using local React state. Future versions may include:

- Context API for global state
- Integration with Tauri's state management
- Persistence layer for objectives and settings

## Next Steps

1. Implement actual timer functionality
2. Add Tauri window controls (minimize/close)
3. Implement website blocking logic
4. Add data persistence
5. Create Log page functionality
6. Add notification systemp (Scaffold)

Tauri + React + Vite scaffold created with `pnpm create tauri-app`.
No business logic yet.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)
