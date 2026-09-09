---
'create-expo-stack': minor
'rn-new': minor
---

Add Sentry error tracking, Vitest testing scaffold, and GitHub Actions CI/CD workflow.

### New Features

- `--sentry` flag: Adds `@sentry/react-native` SDK with pre-configured `utils/sentry.ts` initialization and `EXPO_PUBLIC_SENTRY_DSN` env variable
- `--testing` flag: Adds Vitest testing setup with `vitest.config.ts`, test examples, and test scripts in package.json
- CI/CD: Generates a GitHub Actions workflow (`ci.yml`) with lint, typecheck, test, Android, and iOS jobs

### Template Updates

- Added Sentry DSN key to all existing `.env.ejs` templates (vexo-analytics, posthog, supabase, firebase)
- Added Sentry import to all App.tsx and _layout.tsx entry points
- Added testing dev dependencies to all package.json.ejs templates
