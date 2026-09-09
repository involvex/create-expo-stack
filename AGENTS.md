# AGENTS.md - create-expo-stack

Agent guidelines for working in this monorepo.

## Project Overview

This is a Bun-powered monorepo containing:

- `/cli` - The create-expo-stack CLI tool
- `/www` - Landing page (Astro + React + Tailwind)
- `/docs` - Documentation site (Astro)
- `/packages/rn-new` - RN-new package

## Build Commands

### Root Workspace

```bash
bun run build          # Build all packages via Turbo
bun run format        # Run ESLint + Prettier on all files
bun run build:cli     # Build only CLI
bun run build:www     # Build only landing page
bun run build:docs    # Build only documentation
```

### CLI Package (Primary)

```bash
cd cli
bun run build         # Full build: clean, compile, copy templates, lint
bun run dev           # Build + run CLI in development mode
bun run format        # ESLint + Prettier for CLI
bun run test          # Run all tests (bun test --bail=1 --timeout 160000)
bun run test:watch    # Run tests in watch mode
bun run test:all      # Run all tests with ALL_PACKAGE_MANAGERS=true
bun run test:skip-snapshots  # Skip snapshot tests, include React Navigation
bun run snapshot-update      # Update snapshots
```

### Single Test Execution

```bash
cd cli
bun test --timeout 160000 <path-to-test-file>
# Example: bun test __tests__/cli-integration.test.ts
```

### Landing Page (www)

```bash
cd www
bun run dev           # Start dev server
bun run build         # Production build
bun run format        # Format check
```

### Documentation (docs)

```bash
cd docs
bun run dev           # Start dev server
bun run build         # Production build
```

## Code Style

### Prettier Configuration

- Semi: true
- Single quote: true
- Tab width: 2
- Print width: 120
- Trailing commas: none
- Arrow parens: always

### ESLint

- Parser: @typescript-eslint/parser
- Extends: @typescript-eslint/recommended, prettier, plugin:prettier/recommended
- Disabled rules: no-explicit-any, no-var-requires, ban-ts-comment

### TypeScript

- Strict mode enabled
- Module resolution: bundler
- Use bun-types for type definitions

### Naming Conventions

- Files: kebab-case (e.g., `cli-integration.test.ts`)
- Interfaces/Types: PascalCase (e.g., `ProjectOptions`)
- Functions: camelCase
- Constants: UPPER_SNAKE_CASE for compile-time, camelCase for runtime
- Unused variables: prefix with `_` (e.g., `_unusedParam`)

### EditorConfig

- Charset: utf-8
- Line endings: LF
- Indent: 2 spaces (no tabs except pre-commit hooks)

### Error Handling

- Use try-catch blocks for async operations
- Log errors with meaningful context before re-throwing
- Never expose secrets or keys in error messages

### Imports

- Use absolute imports when possible
- Group imports: external → internal → relative
- Sort imports using @ianvs/prettier-plugin-sort-imports for React code

## Project Structure

```
cli/
├── src/
│   ├── commands/     # CLI command implementations
│   ├── templates/    # EJS templates for scaffolding
│   ├── utilities/   # Helper functions
│   ├── types.ts      # Shared type definitions
│   └── cli.ts        # Entry point
└── __tests__/       # Integration tests

www/
├── src/
│   ├── components/   # React components
│   ├── layouts/      # Astro layouts
│   └── pages/        # Astro pages
└── public/          # Static assets

docs/
├── src/
│   ├── content/      # MDX content
│   └── pages/        # Astro pages
```

## Git Workflow

1. Create feature branch from `main`
2. Make changes and test with `bun run test` in cli/
3. Run formatting: `bun run format` at root
4. Create changeset if changing CLI: `bun run changeset`
5. Open PR against `main`

## Common Issues

- If lint-staged fails with ESM error, run: `bun upgrade && bun i`
- Linking CLI locally: use `npm link` / `yarn link` / `pnpm link --global` (not bun)
- Tests run in non-interactive mode; see `contributing.md` for debugging tips
