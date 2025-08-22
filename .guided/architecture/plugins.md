# Plugins and Extensibility

## Current Plugin Architecture

### Tauri Plugins

- **tauri-plugin-opener**: Handles opening external URLs and files
  - Used for: Opening external links in system browser
  - Configuration: Enabled in Cargo.toml dependencies

## Plugin Points

### Tauri Command Interface

- **Current**: Basic greet command (template)
- **Extensibility**: Add custom Rust commands for native functionality
- **Pattern**: Async commands with JSON serialization

### Frontend Plugin Points

- **React Components**: Modular component architecture
- **Hooks**: Custom React hooks for state and side effects
- **Context Providers**: Shared state management

## Future Extensibility

### Planned Extensions

- **Browser Extension**: Empty package placeholder in `packages/extension/`
- **CLI Tool**: Empty package placeholder in `packages/cli/`

### Potential Plugin Areas

- **Storage Plugins**: Different persistence backends
- **Notification Plugins**: Various notification strategies
- **Blocking Plugins**: Different content blocking mechanisms
- **Timer Plugins**: Various focus timer implementations

## Plugin Development Strategy

### Adding Tauri Commands

1. Define Rust command in `src-tauri/src/lib.rs`
2. Register command in Tauri builder
3. Call from frontend using `invoke()` function

### Adding Frontend Plugins

1. Create React components/hooks
2. Export from appropriate modules
3. Integrate into main App component

### Cross-Package Plugins

- Shared types and interfaces in dedicated packages
- Common utilities and helpers
- Standardized plugin interfaces

## Configuration

### Plugin Configuration

- **Tauri**: Configured in `tauri.conf.json`
- **Frontend**: Environment-based configuration
- **Build-time**: Vite plugin configuration

### Security Considerations

- **CSP**: Currently disabled (null in tauri.conf.json)
- **Plugin Permissions**: Tauri capability system
- **API Surface**: Controlled command exposure
