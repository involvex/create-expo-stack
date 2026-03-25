# GEMINI.md - create-expo-stack

## Project Overview

`create-expo-stack` is an interactive CLI tool designed to initialize highly configurable, typesafe Expo applications. It allows users to choose from various navigation patterns (Expo Router, React Navigation), styling libraries (NativeWind, Unistyles, StyleSheet), authentication providers (Supabase, Firebase), and other utilities.

The project is structured as a monorepo using **Turbo** and **Bun**.

### Main Workspaces

- `cli`: The core CLI application.
- `packages/rn-new`: A shorthand wrapper for `create-expo-stack` (enables `npx rn-new`).
- `www`: The landing page (expostack.dev) built with Astro.
- `docs`: Documentation site built with Astro.

### Core Tech Stack

- **Runtime/Package Manager**: Bun
- **CLI Framework**: Gluegun
- **Interactive Prompts**: @clack/prompts
- **Templating**: EJS
- **Monorepo**: Turbo
- **Web/Docs**: Astro, Tailwind CSS

---

## Building and Running

### Prerequisites

- [Bun](https://bun.sh/) installed.
- Node.js (Latest LTS recommended).

### Initial Setup

```bash
bun install
```

### CLI Development

- **Build**: `cd cli && bun run build`
- **Run in dev mode**: `cd cli && bun run dev`
- **Test**: `cd cli && bun run test`
- **Linking for local use**:

  ```bash
  cd cli
  bun run build
  npm link # Use npm/yarn/pnpm for linking as Bun's link doesn't expose binaries globally yet
  ```

### Web & Docs Development

- **Landing Page**: `cd www && bun start`
- **Documentation**: `cd docs && bun start`

---

## Architecture & Conventions

### CLI Structure (`cli/src`)

- `commands/`: Contains the main `create-expo-stack` command logic.
- `templates/`: EJS templates used to scaffold the project.
  - `base/`: Files included in every project.
  - `packages/`: Files for optional features (e.g., supabase, nativewind).
- `utilities/`: Helper functions for file generation, package management, etc.
  - `configureProjectFiles.ts`: Logic to determine which files to include.
  - `generateProjectFiles.ts`: Logic to process EJS templates.
- `cli.ts`: Application entry point.

### Development Workflow

- **Linting & Formatting**: Handled via ESLint and Prettier. Run `bun run format` from the root.
- **Versioning**: Uses **Changesets**. Run `bun run changeset` to document changes for releases.
- **Testing**: CLI integration tests are located in `cli/__tests__`. They use snapshots to verify generated project structures.
- **Git Hooks**: Husky and lint-staged are used to ensure code quality before commits.

### Contribution Guidelines

- Always add a **changeset** for any change that affects the CLI behavior or fixes a bug.
- Ensure tests pass before submitting a PR (`bun test` in the `cli` directory).
- Do not modify existing templates in a way that breaks other configurations. Templates are designed to be composable.
