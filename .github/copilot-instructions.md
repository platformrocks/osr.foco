# GitHub Copilot Instructions

## Project Overview

OSR.Foco is a desktop focus/productivity application built with Tauri + React in a pnpm monorepo structure. The project emphasizes type safety, code quality, and follows strict development standards.

## Project Structure

```
osr.foco/
├── packages/
│   ├── desktop/           # Main Tauri + React application
│   │   ├── src/          # React frontend (TypeScript + JSX)
│   │   ├── src-tauri/    # Rust backend
│   │   └── public/       # Static assets
│   ├── extension/        # Future browser extension (empty)
│   └── cli/             # Future CLI tool (empty)
├── .guided/             # Project documentation
└── package.json         # Root workspace config
```

## Technology Stack

- **Frontend**: React 19.1.0, TypeScript 5.8.3, Vite 7.0.4
- **Backend**: Rust + Tauri v2.x
- **Package Manager**: pnpm workspaces
- **Build Tool**: Vite (frontend), Cargo (backend)
- **Tooling**: ESLint 9.0.0, Prettier, Husky, Commitizen

## Code Standards

### TypeScript Requirements

- Use **strict mode** (enabled in tsconfig.json)
- All interfaces and function returns must be **explicitly typed**
- **Never use `any` type** - prefer `unknown` if needed
- Use camelCase for variables, PascalCase for types/interfaces
- Prefer explicit function return types

### React Standards

- Use **functional components only** (no class components)
- Follow React hooks rules and patterns
- Implement single responsibility principle for components
- All props must be explicitly typed with interfaces
- Use React.memo and useMemo for performance optimization

### File Organization

- Place TypeScript interfaces in `src/entities/types.ts`
- React components in `src/` with `.tsx` extension
- Use kebab-case for file names (e.g., `user-profile.tsx`)
- Keep related files grouped by feature/domain

### Import Standards

- Use consistent import ordering:
  1. React imports
  2. Third-party libraries
  3. Internal components
  4. Types and interfaces
  5. Relative imports

## Tauri Integration

### Frontend-Backend Communication

- Use `invoke()` from `@tauri-apps/api/core` for backend calls
- All Tauri commands must validate inputs and handle errors
- Prefer async/await pattern for IPC operations
- Minimize data transferred via IPC for performance

### Security Requirements

- Validate all data crossing frontend-backend boundary
- Use Tauri's capability system for API permissions
- Follow secure coding practices for user input handling

## Forbidden Practices

- ❌ Never use `any` type in TypeScript
- ❌ No class components in React
- ❌ No inline styles (use CSS classes)
- ❌ No hardcoded strings (use constants)
- ❌ No console.log in production code (use proper logging)
- ❌ No direct DOM manipulation (use React patterns)
- ❌ No disabled ESLint rules without justification

## Development Workflow

- Use **Conventional Commits** format (`feat:`, `fix:`, `docs:`, etc.)
- Run `pnpm lint` before committing
- Use `pnpm format` for code formatting
- Test all changes in development mode with `pnpm dev`

## Core Entities

Focus on these domain entities when suggesting code:

- **Task**: `{ id, title, status, date, createdAt }`
- **Session**: `{ id, taskId?, type, startedAt, endedAt }`
- **BlockList**: `{ id, site, updatedAt }`
- **Configuration**: `{ theme, brainrot, notifications, updatedAt }`

## Preferred Patterns

### Error Handling

```typescript
// Preferred: Explicit error handling
try {
  const result = await invoke('command_name', { data });
  return result;
} catch (error) {
  console.error('Command failed:', error);
  throw new Error('User-friendly message');
}
```

### Component Structure

```typescript
// Preferred: Functional component with explicit typing
interface Props {
  title: string;
  onAction: () => void;
}

export const ComponentName: React.FC<Props> = ({ title, onAction }) => {
  return <div>{title}</div>;
};
```

### State Management

```typescript
// Preferred: Explicit state typing
const [tasks, setTasks] = useState<Task[]>([]);
const [loading, setLoading] = useState<boolean>(false);
```

## Quality Gates

All suggestions must pass:

- TypeScript compilation without errors
- ESLint validation
- Prettier formatting
- Follow project conventions outlined above

## Context for Suggestions

When providing code suggestions, consider:

- This is a desktop productivity/focus app
- Users will manage tasks, sessions, and blocking distractions
- Cross-platform compatibility (Windows, macOS, Linux)
- Performance optimization for desktop usage
- Accessibility and user experience standards
