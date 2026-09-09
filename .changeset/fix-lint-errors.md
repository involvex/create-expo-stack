---
'create-expo-stack': patch
'rn-new': patch
---

fix: resolve all ESLint errors to unblock CI builds. Replaced `require()` calls with ESM imports, removed unused variables, replaced explicit `any` with proper types, and addressed `@ts-ignore`/`no-useless-assignment` lint violations.
