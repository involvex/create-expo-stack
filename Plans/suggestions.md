# Suggestions: create-expo-stack Enhancement Ideas

## Overview

This document provides a comprehensive analysis of the create-expo-stack codebase and actionable suggestions for new features, improvements, and gap-filling additions. The codebase is a well-structured monorepo with a template composition system that makes adding new options straightforward.

---

## 1. Currently Available Features

### Navigation (2 options)

- **Expo Router** - File-based routing with stack, tabs, and drawer + tabs layouts
- **React Navigation v7** - Configuration-based navigation with stack, tabs, and drawer + tabs layouts
- **None** - No navigation (blank app)

### Styling (4 options)

- **NativeWind** - Tailwind CSS for React Native
- **Unistyles** - StyleSheet superset with theming and breakpoints
- **StyleSheet** - React Native default styling
- **NativeWindUI** - Opinionated component library (bundles NativeWind + Expo Router + icon mapping)

### Authentication (2 options)

- **Supabase** - Open-source Firebase alternative
- **Firebase** - Google's backend platform

### State Management (1 option)

- **Zustand** - Lightweight state management

### Internationalization (1 option)

- **i18next** - Popular i18n library

### Analytics (1 option)

- **Vexo Analytics** - Analytics SDK

### Additional Features

- EAS build configuration (`--eas`)
- GitHub publishing (`--publish`)
- Ignite integration (`--ignite`)
- Saved configurations (load/save)
- TypeScript import aliases (`@/*`)
- Multi-package manager support (npm, yarn, pnpm, bun)

---

## 2. Major Gaps and Missing Features

### 2.1 Authentication - Missing Providers

**Current:** Supabase, Firebase

**Missing high-demand auth providers:**

| Provider                | Type        | Notes                                                                     |
| ----------------------- | ----------- | ------------------------------------------------------------------------- |
| **Clerk**               | Paid/OSS    | Very popular for Expo/Supabase apps; full-featured auth + user management |
| **Auth0**               | Paid/OSS    | Enterprise-grade auth service                                             |
| **Appwrite**            | Open-source | Full backend platform with auth                                           |
| **AWS Amplify**         | Paid/OSS    | Full-stack suite with auth                                                |
| **Permit.io**           | Paid        | Authorization framework                                                   |
| **Stitch** (deprecated) | N/A         | -                                                                         |
| **Convex**              | Paid/OSS    | Backend platform with auth                                                |

**Implementation plan for Clerk:**

1. Add `clerk` to `types.ts` `availablePackages` array
2. Add `AuthenticationSelect` type includes `'clerk'`
3. Add `clerk` package directory under `cli/src/templates/packages/clerk/`
4. Create template files: `utils/clerk.ts.ejs` (Clerk client provider setup), `.env.ejs` (with `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`)
5. Add `clerk` dependency in `package.json.ejs` template (e.g., `@clerk/clerk-expo`)
6. Add `clerk` to `configureProjectFiles.ts` to include clerk template files
7. Add `clerk` to `generateProjectFiles.ts` to strip the `packages/clerk/` prefix
8. Add Clerk to interactive prompts in `runCLI.ts` `authenticationOptions`
9. Add Clerk option to command-line handling in `create-expo-stack.ts`
10. Add Clerk to `clearNavigationPackages.ts` / `clearStylingPackages.ts` if needed for compat
11. Create `.env` template with Clerk publishable key
12. Add Clerk provider integration to navigation template layouts (wrap RootLayout/App with ClerkProvider)
13. Add Supabase-like output guidance in `printOutput.ts`
14. Add Clerk to docs (`docs/src/content/docs/en/usage/clerk.md`)
15. Add Clerk stack badge to landing page (`www/src/components/landing/stack/clerk.astro`)
16. Add test combination in `cli-integration.test.ts`
17. Add changeset

### 2.2 State Management - Missing Options

**Current:** Zustand

**Missing popular state management libraries:**

| Library           | Category         | Notes                                                    |
| ----------------- | ---------------- | -------------------------------------------------------- |
| **Jotai**         | State management | Atom-based, minimal, popular in Expo community           |
| **Valtio**        | State management | Proxy-based, simpler API than Redux                      |
| **Redux Toolkit** | State management | Industry standard (currently commented out in runCLI.ts) |
| **MobX**          | State management | Reactive state management (currently commented out)      |
| **Recoil**        | State management | Facebook's library (currently commented out)             |

**Implementation plan for Jotai:**

1. Add `jotai` to `availablePackages` in `types.ts`
2. Add `StateManagementSelect` type includes `'jotai'`
3. Create `cli/src/templates/packages/jotai/store/store.ts.ejs` with Jotai atom example
4. Add `jotai` dependency in `package.json.ejs`
5. Add Jotai handling in `configureProjectFiles.ts` and `generateProjectFiles.ts`
6. Add Jotai to interactive prompts in `runCLI.ts`
7. Add Jotai command-line option in `create-expo-stack.ts`
8. Add Jotai to docs and landing page
9. Add changeset

### 2.3 Analytics - Missing Options

**Current:** Vexo Analytics

**Missing popular analytics:**

| Library                 | Type        | Notes                                                                            |
| ----------------------- | ----------- | -------------------------------------------------------------------------------- |
| **PostHog**             | Open-source | Self-hostable or cloud analytics; very popular in OSS community                  |
| **Amplitude**           | Paid        | Product analytics platform                                                       |
| **Mixpanel**            | Paid        | Product analytics                                                                |
| **Segment**             | Paid/OSS    | Customer data platform (now Twilio Segment)                                      |
| **Plausible Analytics** | OSS         | Privacy-focused web analytics (works for web)                                    |
| **Sentry**              | Paid/OSS    | Error tracking + performance monitoring (could be its own category or analytics) |

**Implementation plan for PostHog:**

1. Add `posthog` to `availablePackages` in `types.ts`
2. Add new type `AnalyticsSelect = 'vexo-analytics' | 'posthog'`
3. Add `Analytics` type to include `posthog`
4. Create `cli/src/templates/packages/posthog/utils/posthog.ts.ejs` with PostHog client
5. Create `.env.ejs` with `EXPO_PUBLIC_POSTHOG_API_KEY` and `EXPO_PUBLIC_POSTHOG_API_HOST`
6. Add `posthog` and `@posthog/react-native` dependencies in `package.json.ejs`
7. Add PostHog initialization in `App.tsx.ejs` and expo-router layouts
8. Update `configureProjectFiles.ts` and `generateProjectFiles.ts`
9. Update `runCLI.ts` prompts and `create-expo-stack.ts` CLI flags
10. Add PostHog steps in `printOutput.ts`
11. Add changeset

### 2.4 UI Component Libraries - Missing Options

**Current:** NativeWindUI (which provides components)

**Missing component libraries that work alongside styling:**

| Library                | Styling Compatibility | Notes                                          |
| ---------------------- | --------------------- | ---------------------------------------------- |
| **react-native-paper** | StyleSheet/NativeWind | Material Design components                     |
| **Gluestack UI**       | NativeWind            | Accessible, themeable components               |
| **RNUILib** (Shopify)  | StyleSheet            | Rich component library                         |
| **UI Kitten**          | NativeWind            | Customizable components with Eva Design System |
| **NativeBase**         | CSS-in-JS             | Themeable component library (Note: deprecated) |
| **Shoutem UI**         | -                     | Extension-based UI toolkit                     |

### 2.5 Testing Framework - Missing

**Current:** No testing setup at all

**Critical missing feature:** The CLI does not scaffold any testing infrastructure for generated projects.

**Missing test-related templates:**

- **Vitest** - Fast TypeScript test runner (works well with Bun and Expo)
- **Jest** - Traditional test runner (still widely used in React Native)
- **React Native Testing Library** - Component testing utilities
- **@testing-library/jest-native** - Custom matchers for RNTL

**Implementation plan for testing:**

1. Add `--test` flag (or `testing` package type) to CLI options
2. Create `cli/src/templates/packages/testing/` directory
3. Create `vitest.config.ts.ejs` (or `jest.config.js.ejs`)
4. Create a sample test file template (e.g., `tests/example.test.tsx.ejs`)
5. Add testing dependencies (`vitest`, `@testing-library/react-native`, etc.)
6. Add a `test` script to the generated `package.json.ejs`
7. Add testing prompt in `runCLI.ts`
8. Add changeset

### 2.6 Form Handling - Missing

**No form handling or validation libraries are scaffolded.**

| Library             | Purpose                                   |
| ------------------- | ----------------------------------------- |
| **Zod**             | Schema validation (often used with forms) |
| **react-hook-form** | Popular form library                      |
| **Formik**          | Alternative form library                  |
| **Valibot**         | Lightweight schema validation             |

### 2.7 Error Tracking - Missing

**No crash/error reporting setup.**

| Library     | Type           | Notes                                     |
| ----------- | -------------- | ----------------------------------------- |
| **Sentry**  | Error tracking | Industry standard for RN error monitoring |
| **Bugsnag** | Error tracking | Alternative to Sentry                     |

### 2.8 Missing Development Tooling

| Feature                                    | Details                                    |
| ------------------------------------------ | ------------------------------------------ |
| **GitHub Actions CI/CD**                   | No workflow template for build/test/deploy |
| **Husky + lint-staged**                    | No pre-commit hooks scaffolding            |
| **Commitizen + cz-conventional-changelog** | No conventional commit tooling             |
| **Renovate/Bun update bot**                | No dependency update config                |

### 2.9 Dead Code / Incomplete Features

Several issues that need cleanup:

1. **`bottom-sheet` and `selectable-text` components**: These are referenced in `nativewindui` templates (`tabs/app/_layout.tsx.ejs`, `tabs/app/(tabs)/index.tsx.ejs`, `drawer/app/_layout.tsx.ejs`, `drawer/app/(drawer)/index.tsx.ejs`) and in the www demo (`setStyles.js`) but are NOT included in:
   - The `SelectedComponents` type in `cli/src/types.ts`
   - The `nativewindUIOptions` array in `cli/src/constants.ts`
   - The multiselect options in `runCLI.ts`

   These are dead code references that will never trigger because the user can never select these options.

2. **`with-opacity.ts.ejs`**: Uses deprecated `substr()` method (should use `substring()` or `slice()`).

3. **`--drawer` flag**: Documented in `docs/src/content/docs/en/installation.md` (line 68) as `--drawer`, but the code only supports `--drawer+tabs` as a single flag.

4. **`expo-router/app/+html.tsx.ejs`**: This file exists at `cli/src/templates/packages/expo-router/app/+html.tsx.ejs` but there is NO reference to it in `configureProjectFiles.ts`. This appears to be a dead/orphaned template.

5. **README version mismatch**: The README at root says "v10.5" for Firebase and mentions React Native v0.81, but the `CHANGELOG.md` likely shows different versions. The two READMEs (root and `/cli/README.md`) have different versions listed for several libraries.

6. **Roadmap outdated**: The www landing page roadmap (`roadmap.tsx`) shows v2.10.x - v2.14.x as the current/future versions, but the package is at v2.21.x. The roadmap needs updating.

7. **`react-navigation/screens/home.tsx.ejs`**: This file exists in the templates directory but is never referenced in `configureProjectFiles.ts`. It may be orphaned or used as a future feature.

### 2.10 Missing Navigation Types

| Missing Type              | Description                                                              |
| ------------------------- | ------------------------------------------------------------------------ |
| Material Top Tabs         | React Native's material top tab navigator                                |
| Bottom Tab Navigator only | Expo Router tab variant that uses bottom tabs without the drawer wrapper |
| Custom tab bar            | Ability to provide a custom tab bar component                            |

### 2.11 Dark Mode

The roadmap on the website mentions "Dark Mode Support" as a planned feature (v2.14.x), but:

- NativeWindUI already has dark mode support built in
- NativeWind styling has basic dark mode via Tailwind classes
- Unistyles has theme support
- StyleSheet has no built-in dark mode

This could be implemented as a template option that adds a theme toggle for non-NativeWindUI styling options.

---

## 3. Detailed Implementation Plans

### Plan A: Add Clerk Authentication

**Files to modify:**

- `cli/src/types.ts` - Add `clerk` to `availablePackages`, `AuthenticationSelect`, `Analytics`
- `cli/src/constants.ts` - No changes needed (Clerk doesn't need special options)
- `cli/src/commands/create-expo-stack.ts` - Add `--clerk` flag handling
- `cli/src/utilities/runCLI.ts` - Add Clerk to auth prompt options
- `cli/src/utilities/configureProjectFiles.ts` - Add Clerk template files
- `cli/src/utilities/generateProjectFiles.ts` - Strip `clerk/` prefix
- `cli/src/utilities/printOutput.ts` - Add Clerk guidance output
- `cli/src/templates/base/package.json.ejs` - Add `@clerk/clerk-expo` dependency
- `cli/src/templates/base/App.tsx.ejs` - Add ClerkProvider wrapper
- `cli/src/templates/packages/expo-router/*/app/_layout.tsx.ejs` - Add ClerkProvider
- `cli/src/templates/packages/react-navigation/App.tsx.ejs` - Add ClerkProvider
- `cli/src/templates/packages/clerk/.env.ejs` - Create with `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `cli/src/templates/packages/clerk/utils/clerk.ts.ejs` - Create Clerk client setup
- `cli/__tests__/cli-integration.test.ts` - Add test combinations
- `docs/src/content/docs/en/usage/clerk.md` - Create documentation
- `www/src/components/landing/stack/clerk.astro` - Create landing page badge
- `www/src/components/landing/stack/stackSection.astro` - Add Clerk component
- `.changeset/` - Add new changeset

### Plan B: Add Jotai State Management

**Files to modify:**

- `cli/src/types.ts` - Add `jotai` to `availablePackages` and `StateManagementSelect`
- `cli/src/commands/create-expo-stack.ts` - Add `--jotai` flag handling
- `cli/src/utilities/runCLI.ts` - Add Jotai to state management prompt
- `cli/src/utilities/configureProjectFiles.ts` - Add Jotai template files
- `cli/src/utilities/generateProjectFiles.ts` - Strip `jotai/` prefix
- `cli/src/templates/base/package.json.ejs` - Add `jotai` dependency
- `cli/src/templates/packages/jotai/store/store.ts.ejs` - Create atom example
- `cli/__tests__/cli-integration.test.ts` - Add test combinations
- `.changeset/` - Add changeset

### Plan C: Add PostHog Analytics

**Files to modify:**

- `cli/src/types.ts` - Add `posthog` to `availablePackages`, `Analytics`, `AvailablePackages` type
- `cli/src/commands/create-expo-stack.ts` - Add `--posthog` flag handling
- `cli/src/utilities/runCLI.ts` - Add PostHog to analytics (new prompt)
- `cli/src/utilities/configureProjectFiles.ts` - Add PostHog template files
- `cli/src/utilities/generateProjectFiles.ts` - Strip `posthog/` prefix
- `cli/src/utilities/printOutput.ts` - Add PostHog guidance
- `cli/src/templates/base/package.json.ejs` - Add `@posthog/react-native` dependency
- `cli/src/templates/base/App.tsx.ejs` - Add PostHog initialization
- `cli/src/templates/packages/expo-router/*/app/_layout.tsx.ejs` - Add PostHog init
- `cli/src/templates/packages/posthog/.env.ejs` - Create with API key
- `cli/src/templates/packages/posthog/utils/posthog.ts.ejs` - Create PostHog client
- `cli/__tests__/cli-integration.test.ts` - Add test combinations
- `docs/src/content/docs/en/usage/posthog.md` - Create documentation
- `.changeset/` - Add changeset

### Plan D: Add Testing Framework (Vitest + React Native Testing Library)

**Files to modify:**

- `cli/src/types.ts` - Add `testing` to `availablePackages`, add `TestingSelect` type
- `cli/src/commands/create-expo-stack.ts` - Add `--testing` flag
- `cli/src/utilities/runCLI.ts` - Add testing prompt
- `cli/src/utilities/configureProjectFiles.ts` - Add testing template files
- `cli/src/utilities/generateProjectFiles.ts` - Strip `testing/` prefix
- `cli/src/templates/base/package.json.ejs` - Add test dependencies and script
- `cli/src/templates/packages/testing/vitest.config.ts.ejs` - Create config
- `cli/src/templates/packages/testing/tests/example.test.tsx.ejs` - Create sample test
- `cli/__tests__/cli-integration.test.ts` - Add test combinations
- `.changeset/` - Add changeset

### Plan E: Fix Dead Code Issues

1. **Remove `bottom-sheet` and `selectable-text` references** from:
   - `cli/src/templates/packages/nativewindui/tabs/app/_layout.tsx.ejs` (lines 7, 8, 13, 39, 67)
   - `cli/src/templates/packages/nativewindui/tabs/app/(tabs)/index.tsx.ejs` (lines 10, 16, 51, 99, 491, 510-512)
   - `cli/src/templates/packages/nativewindui/drawer/app/_layout.tsx.ejs` (lines 7, 8, 12, 37, 65)
   - `cli/src/templates/packages/nativewindui/drawer/app/(drawer)/index.tsx.ejs` (lines 10, 16, 51, 99, 490, 510-512)
   - `www/demo/steps/setStyles.js` (remove selectable-text references)

   OR implement these components properly by adding them to the `SelectedComponents` type, `nativewindUIOptions`, the multiselect prompts, and adding the actual component template files.

2. **Fix deprecated `substr()`** in `cli/src/templates/packages/nativewindui/theme/with-opacity.ts.ejs` (line 27: `hexCode.substr(0, 2)` -> `hexCode.substring(0, 2)`)

3. **Fix `--drawer` documentation** in `docs/src/content/docs/en/installation.md` or add `--drawer` flag support

4. **Remove orphaned `+html.tsx.ejs`** template if not needed, or add it to `configureProjectFiles.ts`

### Plan F: Update Website Roadmap

Update `www/src/components/landing/roadmap/roadmap.tsx` to reflect current v2.21.x and planned features.

---

## 4. Lower-Priority / Nice-to-Have Additions

### 4.1 Additional Styling Libraries

- **Tamagui** - Styled component library with theming
- **Dripsy** - Responsive design system
- **Stitches** - CSS-in-JS for RN

### 4.2 Additional UI Component Libraries

- **react-native-paper** (Material Design)
- **Gluestack UI** (accessible components)
- **Shopify RNUILib**

### 4.3 Additional Utilities

- **Image caching** - `expo-image` or `react-native-fast-image`
- **Push notifications** - `expo-notifications` setup template
- **Deep linking** - `linking.ts` configuration
- **Navigation containers** - Pre-configured navigation themes

### 4.4 Additional Auth Providers

- **Convex** - Backend platform with auth
- **Amplify** - AWS full-stack
- **Appwrite** - Self-hosted backend

### 4.5 Form/Validation Libraries

- **react-hook-form** + **Zod**
- **Formik** + **Yup**
- **Valibot**

### 4.6 Error Tracking

- **Sentry**
- **Bugsnag**

### 4.7 CI/CD

- **GitHub Actions** workflow template for build/test/deploy
- **Expo Application Services (EAS)** build profiles template
- **CodeCov** integration

### 4.8 Development Tooling

- **Husky** + **lint-staged** (pre-commit hooks)
- **Commitizen** (conventional commits)
- **Renovate** config
- **ESLint strict mode** toggle

### 4.9 Dark Mode Template

Add a theme toggle for non-NativeWindUI styling options (NativeWind, Unistyles, StyleSheet) as mentioned in the roadmap.

---

## 5. Priority Recommendations

### High Priority (Most impactful, relatively easy):

1. Fix dead code (bottom-sheet/selectable-text) - either implement or remove
2. Fix deprecated `substr()` usage
3. Add **Clerk** auth provider
4. Add **PostHog** analytics
5. Add **testing framework** scaffolding (Vitest + RNTL)
6. Add **Jotai** state management
7. Update website roadmap

### Medium Priority:

1. Add **Sentry** crash reporting
2. Add **GitHub Actions** CI/CD template
3. Add **react-hook-form** + **Zod** for forms
4. Add **react-native-paper** UI library
5. Fix `--drawer` flag documentation/implementation
6. Add dark mode toggle for non-NativeWindUI options
7. Add Husky + lint-staged scaffolding

### Lower Priority:

1. Add **Tamagui** styling option
2. Add **Auth0** / **Appwrite** / **Amplify** auth
3. Add **Amplitude** / **Mixpanel** analytics
4. Add **Valtio** / **Redux Toolkit** state management
5. Add **Gluestack UI** / **RNUILib** component libraries

---

## 6. Template Composition System Notes

The existing template system makes adding new options straightforward. Each new package follows this pattern:

1. Add the package name to `availablePackages` in `types.ts`
2. Add a type union (e.g., `AuthenticationSelect`, `StylingSelect`)
3. Add handling in `create-expo-stack.ts` (CLI flags) and `runCLI.ts` (interactive prompts)
4. Create template files under `cli/src/templates/packages/<name>/`
5. Add file inclusion logic in `configureProjectFiles.ts`
6. Add file path mapping in `generateProjectFiles.ts`
7. Add dependencies to `package.json.ejs`
8. Add provider wrapping in layout files (if applicable)
9. Add guidance output in `printOutput.ts`
10. Add tests in `cli-integration.test.ts`
11. Add documentation in `docs/src/content/docs/en/usage/`
12. Add landing page badge in `www/src/components/landing/stack/`
13. Add changeset
