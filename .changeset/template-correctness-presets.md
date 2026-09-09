---
'create-expo-stack': patch
'rn-new': patch
---

fix: template correctness pass and wire page presets into navigation

- Fix broken `@roninoss/icons` imports (use the generated `@/components/nativewindui/Icon`) and `ThemeToggle` paths in NativeWindUI layouts
- Add missing `useInitialAndroidBarSync` export (backed by `expo-system-ui`, no new dependency)
- Replace bare `components/*` and relative `../components/*` imports with the `@/` alias; fix `translation/index.ts` bare imports
- Fix Firebase, Vexo, and Supabase env var mismatches/typing; inline the broken vexo `.env` EJS include and stop generating competing `.env` files
- Fix `tsconfig.json` path alias output and default; fix `nativewinui` typos; fix `nwui-cli` invocation (uninterpolated `-d` flag)
- Fix unresolvable `eslint-config-expo` pin (`~11.0.0` never published, use `~55.0.0`) and bogus `react-native-text` named imports (use `react-native` `Text`, drop the dependency)
- Forward `ref` in `HeaderButton` with the correct type; use `SafeAreaView` from `react-native-safe-area-context`; remove dead Unistyles v2 branches; dynamic README structure/links; drop dead Tamagui `.gitignore` block
- Wire Settings/Profile/Login/Signup page presets into navigation: new `app/<preset>.tsx` route files plus `Stack.Screen` entries for expo-router and NativeWindUI, static screens for react-navigation, and `@expo/vector-icons` for navigation-less projects
