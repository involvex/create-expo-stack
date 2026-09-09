# create-expo-stack Feature Suggestions

This document analyzes the `create-expo-stack` codebase and proposes new features,
improvements, and fixes organized by category.

---

## Project Overview

`create-expo-stack` is a Bun-powered monorepo (Turbo + Gluegun CLI + EJS templates + Astro web/docs)
that scaffolds configurable, typesafe Expo applications. Users choose from:

- **Navigation**: Expo Router, React Navigation (stack, tabs, drawer+tabs)
- **Styling**: Nativewind, NativewindUI, Unistyles, StyleSheet
- **Authentication**: Supabase, Firebase
- **State Management**: Zustand
- **Internationalization**: i18next
- **Analytics**: Vexo Analytics
- **Build**: EAS support

### Key Files

| File                                                       | Purpose                                                                     |
| ---------------------------------------------------------- | --------------------------------------------------------------------------- |
| `cli/src/types.ts`                                         | Type definitions for packages, flags, results                               |
| `cli/src/constants.ts`                                     | Default options, UI component lists, page presets                           |
| `cli/src/commands/create-expo-stack.ts`                    | Main command: input validation, CLI dispatch, template generation           |
| `cli/src/utilities/runCLI.ts`                              | Interactive prompt flow                                                     |
| `cli/src/utilities/configureProjectFiles.ts`               | Determines which template files to include based on selections              |
| `cli/src/utilities/generateProjectFiles.ts`                | EJS rendering + path remapping (e.g., `packages/supabase/` → root)          |
| `cli/src/utilities/printOutput.ts`                         | Installs deps, runs EAS configure, formats, git init, prints next steps     |
| `cli/src/utilities/generateNWUI.ts`                        | Runs `nwui-cli@latest add free` post-generation for NativewindUI components |
| `cli/src/templates/`                                       | EJS templates: `base/` (always included) + `packages/` (conditional)        |
| `cli/src/templates/packages/expo-router/app/+html.tsx.ejs` | **ORPHANED** — exists but never referenced in configureProjectFiles         |

---

## Current Template Offerings

```
templates/
├── base/              # Always-included files (tsconfig, App.tsx, package.json, etc.)
│   └── components/
│       ├── Button.tsx.ejs
│       ├── BackButton.tsx.ejs
│       ├── TabBarIcon.tsx.ejs
│       ├── HeaderButton.tsx.ejs
│       ├── Container.tsx.ejs
│       ├── EditScreenInfo.tsx.ejs
│       └── ScreenContent.tsx.ejs
├── packages/
│   ├── expo-router/   # Stack, tabs, drawer navigation layouts
│   ├── react-navigation/  # Navigation components + screens
│   ├── nativewind/    # Styled components, tailwind config, global.css
│   ├── nativewindui/  # Full NativewindUI component library + theme
│   ├── unistyles/     # Breakpoints, theme, components
│   ├── supabase/      # supabase.ts client, .env
│   ├── firebase/      # firebase.ts init, metro config, .env
│   ├── zustand/       # Store template
│   ├── vexo-analytics/  # .env with analytics key
│   ├── i18next/       # i18n init, language detector, translations
│   └── presets/       # Settings, Profile, Login, Signup page components
```

---

## Priority 1: New Package Integrations

### 1.1 Add Clerk Authentication Provider

Clerk is a popular authentication platform with excellent Expo support.

**Implementation:**

- Add `'clerk'` to `availablePackages` in `types.ts`
- Add `AuthenticationSelect` union: `'supabase' | 'firebase' | 'clerk' | undefined`
- Add `'clerk'` to `authenticationOptions` in `runCLI.ts`
- Create `cli/src/templates/packages/clerk/utils/clerk.ts.ejs` — `ClerkProvider` wrapper
- Add Clerk dependencies to `package.json.ejs`: `@clerk/clerk-expo`
- Add `.env` template for `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`
- Create auth flow components (SignIn, SignUp, SignOut buttons)
- Update `printOutput.ts` with Clerk setup instructions (point to Clerk dashboard)

**Files to create/modify:**

- `cli/src/types.ts` — add clerk to types
- `cli/src/utilities/runCLI.ts` — add to auth options
- `cli/src/templates/base/package.json.ejs` — add clerk deps
- `cli/src/templates/packages/clerk/` — new template directory
- `cli/src/utilities/printOutput.ts` — add Clerk instructions
- `cli/src/utilities/configureProjectFiles.ts` — wire up file inclusion

### 1.2 Add PostHog Analytics

PostHog is the leading open-source analytics platform with strong Expo SDK support.

**Implementation:**

- Add `'posthog'` to `availablePackages`
- Add `Analytics` union update: `'vexo-analytics' | 'posthog' | undefined`
- Add PostHog to `runCLI.ts` analytics selection
- Create `cli/src/templates/packages/posthog/utils/posthog.ts.ejs`
- Add `@posthog/react-native` dependency to `package.json.ejs`
- Add `.env` for `EXPO_PUBLIC_POSTHOG_API_KEY`
- Update `printOutput.ts` with PostHog setup steps

### 1.3 Add Sentry Error Tracking

Sentry is the industry standard for error monitoring and performance tracing.

**Implementation:**

- Add `'sentry'` to `availablePackages`
- Add an `'error-tracking'` type to `AvailablePackages`
- Create `cli/src/templates/packages/sentry/utils/sentry.ts.ejs`
- Add `@sentry/react-native` dependency
- Add Sentry configuration in `package.json.ejs` (build scripts, source maps)
- Create a `.gitignore` entry for `sentry.properties`
- Add `sentry.properties` template (for auth token)

### 1.4 Add Jotai State Management

Jotai is a minimal, flexible atomic state management library gaining popularity over Zustand.

**Implementation:**

- Add `'jotai'` to `availablePackages`
- Add `StateManagementSelect` union: `'zustand' | 'jotai' | undefined`
- Add Jotai option to `runCLI.ts` state management selection
- Create `cli/src/templates/packages/jotai/store/atoms.ts.ejs`
- Add `jotai` dependency to `package.json.ejs`

### 1.5 Add react-hook-form + Zod Validation

Form handling and schema validation are essential for most real apps.

**Implementation:**

- Add `'react-hook-form'` to `availablePackages` as type `'utilities'`
- Create template with a form example component
- Add `react-hook-form`, `zod`, `@hookform/resolvers` dependencies
- Create a combined form + validation template that adapts to the auth provider

---

## Priority 2: Missing Project Infrastructure

### 2.1 Add Testing Framework Scaffolding

The generated projects currently have **no testing infrastructure**. This is a significant gap.

**Implementation:**

- Add a `--testing` flag and template option
- Choose Vitest as the test runner (fast, Bun-compatible, works well in RN)
- Create:
  - `cli/src/templates/packages/testing/vitest.config.ts.ejs`
  - `cli/src/templates/packages/testing/__tests__/App.test.tsx.ejs`
  - Update `package.json.ejs` to add `vitest`, `@testing-library/react-native`, `@testing-library/jest-native`, `jest-expo` (for React Native mocking)
- Add `--test` script to generated `package.json.ejs`
- Update `configureProjectFiles.ts` to conditionally include testing templates

### 2.2 Add CI/CD GitHub Actions Workflow

Users should get a starter GitHub Actions workflow out of the box.

**Implementation:**

- Create `cli/src/templates/packages/github-actions/ci.yml.ejs`
- Use `eas build` action for Android/iOS builds
- Add a basic test job (runs `bun test` or `npm test`)
- Add a typecheck/lint job
- Create `.github/workflows/ci.yml` via templates
- Update `package.json.ejs` with a `test:ci` script

### 2.3 Add Husky + lint-staged + Commitizen

Standard dev tooling for commit hygiene and pre-commit hooks.

**Implementation:**

- Create templates for:
  - `.husky/pre-commit` — runs lint-staged
  - `.commitlintrc.json` — commitlint config
  - `commitizen.config.js` — cz config
- Add dependencies: `husky`, `lint-staged`, `commitizen`, `@commitlint/cli`, `@commitlint/config-conventional`
- Update `package.json.ejs` with `commit` and `cz` scripts
- Create a `setup-dev.sh` helper or add to post-install script

---

## Priority 3: Code Quality & Maintenance Fixes

### 3.1 Fix Dead Code: `bottom-sheet` and `selectable-text` Components

**Problem:** In `cli/src/constants.ts`, the `SelectedComponents` type and `nativewindUIOptions` array define these components:

```ts
export const nativewindUIOptions: SelectedComponents[] = [
  'action-sheet',
  'activity-indicator',
  'activity-view',
  'avatar',
  'button',
  'date-picker',
  'picker',
  'progress-indicator',
  'ratings-indicator',
  'slider',
  'text',
  'toggle' // <-- no 'bottom-sheet', no 'selectable-text'
];
```

But the NatchewindUI tab/drawer layout templates reference `'bottom-sheet'` and `'selectable-text'`:

```ts
// In nativewindui/tabs/app/_layout.tsx.ejs and tabs/app/(tabs)/index.tsx.ejs
<% if (props.stylingPackage?.options.selectedComponents.includes('bottom-sheet') { ... } %>
// In index.tsx.ejs: function SelectableTextExample() { ... }
```

Since `'bottom-sheet'` and `'selectable-text'` are **not** in the `nativewindUIOptions` array, users can never select them, and the EJS `includes()` check will always return `false`. This is dead code. Either:

- **Option A (recommended):** Remove the dead code from templates.
- **Option B:** Add `bottom-sheet` and `selectable-text` to the available components list and wire up the actual component templates.

**Files to fix:**

- `cli/src/templates/packages/nativewindui/tabs/app/_layout.tsx.ejs`
- `cli/src/templates/packages/nativewindui/tabs/app/(tabs)/index.tsx.ejs`
- `cli/src/templates/packages/nativewindui/drawer/app/_layout.tsx.ejs`
- `cli/src/templates/packages/nativewindui/drawer/app/(drawer)/index.tsx.ejs`

### 3.2 Fix Deprecated `substr()` Usage

**Problem:** `cli/src/templates/packages/nativewindui/theme/with-opacity.ts.ejs` uses the deprecated `String.prototype.substr()` method on lines 35-37. This method is deprecated and may be removed in future JS engines.

**Fix:** Replace `.substr(start, length)` with `.substring(start, start + length)` or `.slice(start, start + length)`.

**File to fix:** `cli/src/templates/packages/nativewindui/theme/with-opacity.ts.ejs`

### 3.3 `+html.tsx.ejs` Not Included for NativewindUI Projects

**Problem:** The `expo-router/app/+html.tsx.ejs` template is referenced in `configureProjectFiles.ts` line 265 for non-NativewindUI Expo Router projects, but is NOT included in the NativewindUI file list. Since NativewindUI uses its own layout structure, this is likely intentional, but the file should be explicitly excluded in the NativewindUI branch for clarity, or a NativewindUI-compatible version should be added.

### 3.4 Update Help Docs to Show All Flag Aliases

**Problem:** The `showHelp.ts` help text only documents shorthand flags (`--exporouter`, `--reactnavigation`) but doesn't mention the full hyphenated aliases (`--expo-router`, `--react-navigation`) even though both forms are supported in `create-expo-stack.ts`. Additionally, `--nativewindui` is not listed in the Styling Package Options section.

**Fix:** Add the hyphenated aliases to the navigation section and `--nativewindui` to the styling section in `showHelp.ts`.

**File to fix:** `cli/src/utilities/showHelp.ts`

### 3.5 Update Outdated Website Roadmap

**Problem:** The `www/src/components/landing/roadmap.tsx` component shows a roadmap for v2.10–v2.14, but the actual package version is v2.21.3. The roadmap is stale.

**Fix:** Update the roadmap component to reflect current and planned features aligned with the v2.21+ release.

**File to fix:** `www/src/components/landing/roadmap.tsx`

---

## Priority 4: Developer Experience Improvements

### 4.1 Add Tailwind CSS IntelliSense Template Support

When using Nativewind or Unistyles with Tailwind, developers benefit from IDE autocomplete. Add a `.vscode/settings.json` template that includes `tailwindCSS.includeLanguages` for `*.tsx` files.

**Implementation:**

- Create `cli/src/templates/base/.vscode/settings.json.ejs`
- Only include when nativewind/unistyles is selected
- Add `vscode` key in `package.json.ejs` devDependencies (optional extension recommendation)

### 4.2 Add Bundle Analysis Support

Add an `--analyze` flag that generates a bundle analysis report after build.

**Implementation:**

- Create `cli/src/templates/packages/bundle-analysis/metro.config.js` (extends the user's metro config with `expo/metro-config` analyzer plugin)
- Add `react-native-bundle-optimization` or `expo-webpack-bundle-analyzer` dependency
- Add `analyze` script to `package.json.ejs`

### 4.3 Add Environment Variable Schema Validation

Use `zod-env` or a simple env validation template to ensure required env vars are present at runtime.

**Implementation:**

- Create `cli/src/templates/base/env.ts.ejs`
- Use `zod` via `zod-env` or manual validation
- Validate env variables based on selected packages (e.g., Supabase URL/key when Supabase is selected)

### 4.4 Improve Import Alias Customization

Currently, `importAlias` is a boolean. Allow users to specify a **custom alias** string.

**Implementation:**

- Change `importAlias` flag handling in `runCLI.ts` and `create-expo-stack.ts`
- Update `tsconfig.json.ejs` to use the custom alias
- Update `babel.config.js.ejs` accordingly

---

## Priority 5: Additional Styling & Component Enhancements

### 5.1 Add NativeBase / Paper UI Library Integration

Add support for NativeBase or React Native Paper as alternative component libraries.

**Implementation for NativeBase:**

- Add `'nativebase'` to `availableStylingPackages`
- Create `cli/src/templates/packages/nativebase/` components
- Add `native-base` dependency
- Update NativewindUI component selection to include NativeBase components

### 5.2 Add `expo-router/html` Template for SEO

When using Expo Router, add a customizable `app/+html.tsx` template that includes proper meta tags and SEO.

**Implementation:**

- Fix the orphaned `+html.tsx.ejs` and wire it into `configureProjectFiles.ts`
- Add `@react-navigation/web` or `expo-router/html` integration
- Allow customizing the HTML template via `--html-template` flag

### 5.3 Add React Navigation `useLinkBuilder` Deep Link Helpers

Scaffold deep link configuration for React Navigation and Expo Router.

**Implementation:**

- Create `cli/src/templates/packages/deeplinks/linking.ts.ejs`
- Add linking config to App.tsx templates
- Document deep link setup in generated README

---

## Priority 6: Additional Authentication Providers

### 6.1 Add Appwrite Authentication

Appwrite is an open-source backend-as-a-service alternative to Supabase/Firebase.

**Implementation:**

- Add `'appwrite'` to `AuthenticationSelect`
- Create `cli/src/templates/packages/appwrite/utils/appwrite.ts.ejs`
- Add `appwrite` dependency
- Add `.env` template for `EXPO_PUBLIC_APPWRITE_ENDPOINT`, `PROJECT_ID`
- Update `printOutput.ts` with Appwrite setup instructions

### 6.2 Add Auth0 Authentication

Auth0 is another popular enterprise auth provider.

**Implementation:**

- Add `'auth0'` to `AuthenticationSelect`
- Create `cli/src/templates/packages/auth0/utils/auth0.ts.ejs`
- Add `auth0` or `@auth0/auth0-react-native` dependency
- Add `.env` template for domain and client ID
- Wire up Auth0Provider in app entry

### 6.3 Add Magic Link / Passwordless Email Auth Template

For apps that want passwordless authentication without a full backend.

**Implementation:**

- Add `'magic-link'` as a lightweight auth option
- Create a simple email magic link flow using `expo-mail-composer` + a placeholder backend hook
- This is useful as a minimal auth scaffold for rapid prototyping

---

## Priority 7: Additional Analytics & Monitoring Options

### 7.1 Add Amplitude Analytics

A popular product analytics platform.

**Implementation:**

- Add `'amplitude'` to `Analytics` type
- Create `cli/src/templates/packages/analytics-amplitude/utils/amplitude.ts.ejs`
- Add `@amplitude/analytics-react-native` dependency

### 7.2 Add Mixpanel Analytics

Another established product analytics platform.

**Implementation:**

- Add `'mixpanel'` to `Analytics` type
- Create template with `react-native-mixpanel` or `mixpanel-react-native` integration

### 7.3 Add Segment (now Twilio Segment)

A customer data platform that routes events to multiple destinations.

**Implementation:**

- Add `'segment'` to `Analytics` type
- Create `cli/src/templates/packages/segment/utils/segment.ts.ejs`
- Add `@segment/analytics-react-native` dependency

### 7.4 Add LogRocket Session Replay

Session replay and performance monitoring.

**Implementation:**

- Add `'logrocket'` to a new `'monitoring'` type
- Create `cli/src/templates/packages/logrocket/utils/logrocket.ts.ejs`
- Add `logrocket` dependency

---

## Priority 8: Configuration & CLI Enhancements

### 8.1 Support Multiple Saved Configurations via Flag

Currently, saved configs are loaded interactively. Add a `--config <name>` flag to select a saved config non-interactively.

**Implementation:**

- Add `config?: string` to `CliFlags`
- In `create-expo-stack.ts`, check for `--config` flag and load the named config
- Skip the interactive "use saved config?" prompt if `--config` is specified

### 8.2 Allow Custom Template Repository

Allow users to specify a custom template repository URL so enterprise users can use private templates.

**Implementation:**

- Add `--template-repo <url>` flag
- Fetch templates from the specified repo instead of bundled templates
- Default to the bundled repo

### 8.3 Add `--no-prettier` Flag

Some users prefer to skip the post-generation formatting step.

**Implementation:**

- Add `skipFormat: boolean` to `CliFlags`
- In `printOutput.ts`, skip the prettier/eslint formatting step when set

### 8.4 Add `--no-git-init` (alias for `--noGit`)

While `--noGit` exists, adding `--no-git-init` as an alias improves discoverability.

**Implementation:**

- Add `gitInit` boolean to flags (defaulting true, inverted)
- Add `--no-git-init` flag parsing

### 8.5 Add `--no-prebuild` Flag for EAS Mode

When EAS is enabled, the CLI runs `expo prebuild --clean` automatically. Allow skipping this.

**Implementation:**

- Add `prebuild: boolean` to `CliFlags`
- In `printOutput.ts` / `runEasConfigure.ts`, conditionally skip the prebuild step

---

## Priority 9: Testing & Snapshot Coverage

### 9.1 Expand Test Coverage

Currently, the test file (`cli/__tests__/cli-integration.test.ts`) only tests package managers (`bun`), and the React Navigation combinations are commented out.

**Implementation:**

- Re-enable React Navigation tests by setting `INCLUDE_REACT_NAVIGATION_TESTS=1`
- Add tests for new providers (Clerk, PostHog, Sentry, Jotai, Appwrite, Auth0)
- Add tests for `--testing` flag
- Add tests for `--config` flag

### 9.2 Add Unit Tests for `configureProjectFiles.ts`

The `configureProjectFiles` function has complex branching logic. Add unit tests.

**Implementation:**

- Create `cli/__tests__/configureProjectFiles.test.ts`
- Test all combinations: styling × navigation × auth × analytics × state-mgmt × i18n
- Test edge cases: no styling, no navigation, etc.

### 9.3 Add Unit Tests for `generateProjectFiles.ts`

Test the path remapping logic for all package combinations.

**Implementation:**

- Create `cli/__tests__/generateProjectFiles.test.ts`

---

## Priority 10: Documentation Improvements

### 10.1 Add Documentation Pages for New Providers

For each new provider added, create corresponding docs:

- `docs/src/content/docs/en/usage/clerk.md`
- `docs/src/content/docs/en/usage/posthog.md`
- `docs/src/content/docs/en/usage/sentry.md`
- `docs/src/content/docs/en/usage/jotai.md`
- `docs/src/content/docs/en/usage/testing.md`
- `docs/src/content/docs/en/usage/ci-cd.md`

### 10.2 Add a "Full Config Reference" Page

Document every flag, type, and template option in one comprehensive page.

### 10.3 Update README with New Features

The CLI `README.md` should be kept in sync with available flags and packages.

---

## Implementation Complexity Matrix

| Feature                      | Complexity | Effort | Files to Create | Files to Modify |
| ---------------------------- | ---------- | ------ | --------------- | --------------- |
| Fix `substr()`               | Low        | 1      | 0               | 1               |
| Fix help docs                | Low        | 1      | 0               | 1               |
| Fix dead code (bottom-sheet) | Low        | 2      | 0               | 4               |
| Fix orphaned +html.tsx       | Low        | 1      | 0               | 2               |
| Add PostHog Analytics        | Low        | 2      | 3               | 2               |
| Add Sentry Error Tracking    | Medium     | 3      | 3               | 3               |
| Add Jotai State Mgmt         | Low        | 2      | 2               | 2               |
| Add Clerk Auth               | Medium     | 4      | 5               | 3               |
| Add Testing Scaffold         | Medium     | 4      | 4               | 2               |
| Add GitHub Actions CI        | Medium     | 3      | 2               | 2               |
| Add Husky + lint-staged      | Medium     | 3      | 4               | 2               |
| Add Appwrite Auth            | Medium     | 4      | 5               | 3               |
| Add Auth0 Auth               | Medium     | 4      | 5               | 3               |
| Add Tailwind IntelliSense    | Low        | 2      | 1               | 2               |
| Add Bundle Analysis          | Low        | 2      | 2               | 2               |
| Add `--config` flag          | Low        | 2      | 0               | 2               |
| Add `--no-prettier` flag     | Low        | 1      | 0               | 2               |
| Add Segment Analytics        | Medium     | 3      | 2               | 2               |
| Add Amplitude Analytics      | Low        | 2      | 2               | 1               |
| Add React Hook Form + Zod    | Medium     | 3      | 3               | 2               |
| Add NativeBase/Paper         | Medium     | 4      | 5               | 3               |
| Expand test coverage         | Medium     | 3      | 3               | 1               |
| Add unit tests for config    | Medium     | 2      | 1               | 0               |
| Update website roadmap       | Low        | 1      | 0               | 1               |

---

## Recommended Starting Order

1. **Fix `substr()` deprecation** — trivial, 1 file
2. **Fix dead code (`bottom-sheet`/`selectable-text`)** — remove unreachable code from 4 templates
3. **Fix orphaned `+html.tsx.ejs`** — either wire in or remove
4. **Fix help documentation** — update `--drawer` → `--drawer+tabs`
5. **Add PostHog Analytics** — popular open-source analytics, relatively simple integration
6. **Add Jotai state management** — minimal complexity, growing community
7. **Add Sentry error tracking** — high-value for production apps
8. **Add testing scaffold** — fills a major gap in generated projects
9. **Add Clerk authentication** — increasingly popular auth provider
10. **Add GitHub Actions CI** — essential for production readiness
11. **Update website roadmap** — keep docs in sync with reality

---

## Summary of Gaps

| Category             | Current                  | Missing (suggested)                         |
| -------------------- | ------------------------ | ------------------------------------------- |
| **Auth**             | Supabase, Firebase       | Clerk, Auth0, Appwrite, Amplify, Magic Link |
| **State Management** | Zustand                  | Jotai, Valtio, Redux Toolkit, Recoil        |
| **Analytics**        | Vexo                     | PostHog, Amplitude, Mixpanel, Segment       |
| **Error Tracking**   | None                     | Sentry, Bugsnag, LogRocket                  |
| **Forms**            | None                     | react-hook-form + Zod                       |
| **Testing**          | None                     | Vitest + Testing Library                    |
| **CI/CD**            | None                     | GitHub Actions workflows                    |
| **Dev Tools**        | None                     | Husky, lint-staged, Commitizen              |
| **UI Libraries**     | NativeWind/UI, Unistyles | NativeBase, Paper                           |
| **Mobile Features**  | Basic                    | Deep links, push notifications              |
