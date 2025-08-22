# Technical Guardrails

## Code Quality

### TypeScript Standards

- **Strict Mode**: Enabled in tsconfig.json
- **Type Safety**: All interfaces must be properly typed
- **No Any**: Avoid `any` type usage
- **Explicit Returns**: Function return types should be explicit

### Code Style

- **ESLint Configuration**: v9.0.0 with TypeScript support
- **Prettier**: Consistent formatting across all files
- **Import Organization**: Consistent import ordering
- **Naming Conventions**: camelCase for variables, PascalCase for types

### React Standards

- **Functional Components**: Prefer function components over class components
- **Hooks Usage**: Follow React hooks rules and patterns
- **Component Structure**: Single responsibility principle
- **Props Typing**: All props must be explicitly typed

## Security

### Tauri Security

- **CSP Policy**: Currently disabled (⚠️ **RISK**: Should be enabled for production)
- **Command Validation**: All Tauri commands should validate inputs
- **Permission Model**: Use Tauri's capability system for API access
- **IPC Security**: Validate all data crossing the frontend-backend boundary

### Data Handling

- **Input Validation**: Sanitize all user inputs
- **Output Encoding**: Properly encode data for display
- **Error Handling**: Don't expose sensitive information in errors
- **State Management**: Secure state handling between frontend/backend

## Performance

### Frontend Performance

- **Bundle Size**: Monitor build output size
- **React Performance**: Use React.memo and useMemo appropriately
- **Lazy Loading**: Implement code splitting for large components
- **Asset Optimization**: Optimize images and static assets

### Backend Performance

- **Async Operations**: Use async/await for I/O operations
- **Memory Management**: Proper memory handling in Rust
- **IPC Optimization**: Minimize data transferred via IPC
- **Native APIs**: Use native APIs efficiently

## Operational

### Build System

- **Deterministic Builds**: Ensure reproducible builds
- **Dependency Pinning**: Lock dependency versions
- **Build Validation**: Automated build testing
- **Cross-Platform**: Test builds on all target platforms

### Development Workflow

- **Commit Standards**: Use Conventional Commits format
- **Branch Protection**: Require PR reviews for main branch
- **Pre-commit Hooks**: Automated linting and formatting
- **CI/CD**: Automated testing and building

### Documentation

- **Code Documentation**: Document complex logic and APIs
- **API Documentation**: Document all Tauri commands
- **Architecture Documentation**: Keep architecture docs updated
- **Change Documentation**: Update docs with significant changes

## Quality Gates

### Pre-commit

- **Linting**: ESLint must pass
- **Formatting**: Prettier formatting enforced
- **Type Checking**: TypeScript compilation must succeed
- **Basic Tests**: Unit tests must pass (when implemented)

### Pre-merge

- **Code Review**: At least one reviewer approval
- **Build Success**: All builds must complete successfully
- **Integration Tests**: All integration tests must pass
- **Documentation**: Related documentation must be updated

### Pre-release

- **Full Test Suite**: All tests must pass
- **Cross-Platform**: Builds successful on all platforms
- **Performance**: Performance benchmarks within acceptable range
- **Security**: Security review completed

## Violation Handling

### Automated Enforcement

- **Husky**: Git hooks prevent commits that violate standards
- **lint-staged**: Runs quality checks on staged files
- **CI Pipeline**: Blocks merges that fail quality checks
- **Type Checking**: TypeScript errors prevent builds

### Manual Review

- **Code Review**: Human review for logic and architecture
- **Security Review**: Manual security assessment for sensitive changes
- **Performance Review**: Manual performance evaluation for critical paths
- **Documentation Review**: Ensure documentation accuracy and completeness

## Exceptions

### When to Bypass

- **Emergency Fixes**: Critical production issues
- **External Dependencies**: Third-party code compatibility
- **Legacy Code**: Gradual migration of existing code
- **Prototypes**: Experimental or proof-of-concept code

### Exception Process

1. **Document**: Clearly document the reason for exception
2. **Approve**: Get appropriate approval for bypassing guardrails
3. **Track**: Create issues to address exceptions later
4. **Review**: Regular review of outstanding exceptions
