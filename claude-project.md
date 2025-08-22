# Claude Project Context

## Project Identity

**OSR.Foco** is a desktop focus/productivity application that helps users manage tasks, track focus sessions (pomodoro-style), and block distracting websites. Built with modern web technologies running in a native desktop container.

## What Makes This Project Unique

### Architecture

- **Hybrid Architecture**: React frontend + Rust backend via Tauri framework
- **Monorepo Structure**: pnpm workspaces with future extension/CLI packages
- **Cross-Platform Desktop**: Single codebase targeting Windows, macOS, Linux
- **IPC Communication**: Frontend-backend communication via Tauri's invoke system

### Technical Characteristics

- **Type-First Development**: Strict TypeScript with explicit typing everywhere
- **Quality-Focused**: ESLint + Prettier + Husky pre-commit hooks
- **Modern React**: Latest React 19.1.0 with functional components only
- **Performance-Oriented**: Native desktop performance via Tauri

### Domain Focus

This is a **productivity/focus application** with these core concepts:

- **Tasks**: User's todo items with status tracking
- **Focus Sessions**: Timed work sessions (pomodoro technique)
- **Distraction Blocking**: Website/app blocking during focus time
- **Configuration**: User preferences and app settings

## Code Style Guidelines

### TypeScript Philosophy

- **Strict typing**: Every function, prop, and state must be explicitly typed
- **No any**: Use `unknown` or proper union types instead
- **Interface-driven**: Define clear contracts via TypeScript interfaces
- **Explicit returns**: Function return types should always be specified

### React Patterns

- **Functional components**: No class components allowed
- **Hooks-based**: Use React hooks for state and lifecycle management
- **Performance-aware**: Leverage React.memo, useMemo, useCallback appropriately
- **Props interfaces**: Every component has explicitly typed props interface

### File Organization

```
packages/desktop/src/
├── entities/types.ts    # Core domain interfaces
├── components/          # Reusable UI components
├── pages/              # Main application screens
├── hooks/              # Custom React hooks
└── utils/              # Helper functions
```

### Naming Conventions

- **Files**: kebab-case (`task-manager.tsx`)
- **Components**: PascalCase (`TaskManager`)
- **Variables/functions**: camelCase (`getCurrentTask`)
- **Types/interfaces**: PascalCase (`TaskInterface`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_FOCUS_DURATION`)

## Development Context

### Build System

- **Frontend**: Vite for fast development and optimized builds
- **Backend**: Cargo for Rust compilation
- **Package Management**: pnpm with workspace support
- **Development Server**: http://localhost:1420

### Quality Assurance

- **Linting**: ESLint 9.0.0 with TypeScript support
- **Formatting**: Prettier for consistent code style
- **Git Hooks**: Husky + lint-staged for quality gates
- **Commit Style**: Conventional Commits format required

### Testing Strategy

⚠️ **Current Gap**: No testing infrastructure implemented yet

- **Planned**: Jest + React Testing Library for frontend
- **Planned**: Rust native testing for backend
- **Priority**: Setting up testing is a current development need

## Key Technical Decisions

### Security Posture

⚠️ **Known Issue**: CSP currently disabled in Tauri config (security risk)

- All IPC communication should validate inputs
- User data must be sanitized before processing
- Error messages should not expose sensitive information

### Performance Considerations

- **Bundle Size**: Monitor and optimize frontend bundle
- **IPC Overhead**: Minimize data transfer between frontend/backend
- **Memory Usage**: Efficient state management in React
- **Native Integration**: Leverage Rust for performance-critical operations

### Future Extensibility

- **Browser Extension**: Planned companion extension package
- **CLI Tool**: Planned command-line interface package
- **Plugin System**: Tauri command architecture supports extensibility

## Documentation Standards

### Code Documentation

- Document complex business logic with inline comments
- Use JSDoc for public functions and components
- Maintain API documentation for all Tauri commands
- Update architectural docs when making significant changes

### Project Documentation

- **`.guided/` folder**: Contains comprehensive project documentation
- **Architecture docs**: System design and technical decisions
- **Assessment docs**: Project health and improvement plans
- **Operations docs**: Troubleshooting and maintenance guides

## Common Patterns to Suggest

### Tauri Command Pattern

```typescript
// Frontend: Type-safe command invocation
const result = await invoke<ReturnType>('command_name', {
  param: value
});

// Backend: Validated command handler
#[tauri::command]
async fn command_name(param: String) -> Result<ReturnType, String> {
    // Validate input
    // Process request
    // Return typed result
}
```

### React Component Pattern

```typescript
interface ComponentProps {
  data: DomainEntity;
  onAction: (id: string) => void;
}

export const Component: React.FC<ComponentProps> = ({ data, onAction }) => {
  const [state, setState] = useState<StateType>(initialState);

  // Component logic

  return (
    <div className="component-wrapper">
      {/* JSX with proper event handling */}
    </div>
  );
};
```

### Error Handling Pattern

```typescript
try {
  const result = await invoke('risky_operation', { data });
  // Handle success
} catch (error) {
  console.error('Operation failed:', error);
  // User-friendly error handling
  // Don't expose technical details to users
}
```

## Project Health Context

- **Strengths**: Modern stack, good tooling, clear architecture
- **Risks**: No testing, disabled security features, complex build system
- **Priorities**: Implement testing, enable security features, cross-platform validation
- **Maturity**: Early development phase, foundation established

When providing suggestions, consider the productivity domain, desktop-first experience, and the need for both performance and developer experience.
