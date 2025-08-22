# Architecture Context

## System Boundaries

### Core Application

- **Frontend**: React-based UI running in Tauri webview
- **Backend**: Rust application providing native OS integration
- **Communication**: Tauri's IPC bridge between frontend and backend

### External Dependencies

- **Operating System**: Native desktop environment (Windows, macOS, Linux)
- **Node.js**: Build-time dependency for frontend development
- **Rust Toolchain**: Required for Tauri backend compilation

## Bounded Contexts

### Focus Management Domain

- **Entities**: Tasks, Sessions, Configuration
- **Responsibilities**: Task tracking, pomodoro timers, session management

### Distraction Blocking Domain

- **Entities**: BlockList
- **Responsibilities**: Website/application blocking, content filtering

### User Interface Domain

- **Entities**: Theme preferences, UI state
- **Responsibilities**: Visual presentation, user interactions

## Data Flow

### Frontend to Backend

```
React Components → Tauri IPC → Rust Commands → Native OS APIs
```

### State Management

- **Frontend**: React state (useState, potential future state management)
- **Backend**: Rust data structures and persistence
- **Communication**: Async command/response pattern via Tauri

## Integration Points

### Tauri Framework

- **IPC Communication**: Commands and events between frontend/backend
- **Native APIs**: File system, notifications, system tray
- **Security**: CSP disabled (configured in tauri.conf.json)

### Build System Integration

- **Development**: Vite dev server + Tauri dev mode
- **Production**: Vite build → Tauri bundle
- **Hot Reload**: Frontend changes trigger automatic reload

### Package Management

- **pnpm Workspaces**: Manages dependencies across packages
- **Scripts**: Unified commands at root level for development tasks
