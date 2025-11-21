<!-- .github/copilot-instructions.md - Guidance for AI coding agents working on this repo -->

# Copilot instructions — manaKeep

This file describes the minimal, actionable knowledge an AI coding agent needs to be productive in this repo.

## Big picture

- Platform: Expo (React Native) app using the newer file-based `expo-router` layout under the `app/` directory.
- Entry: `package.json` main is `expo-router/entry` and the app's routes/layouts live in `app/` (see `app/_layout.tsx`, `app/(tabs)/_layout.tsx`).
- Styling: Uses NativeWind (Tailwind for RN) + `tailwind.config.js` + `nativewind` Babel preset in `babel.config.js`.

## Key files & directories (examples)

- Routes & layout: `app/_layout.tsx`, `app/(tabs)/index.tsx`, `app/(tabs)/collection.tsx` — use file-based routing patterns.
- Reusable UI: `components/ui/` (e.g., `Card.tsx`, `collapsible.tsx`) and `components/` for other small components like `themed-text.tsx` and `themed-view.tsx`.
- Assets: `assets/images/` for static images and splash icons.
- Config: `babel.config.js`, `tailwind.config.js`, `metro.config.js`, `app.json` and `tsconfig.json`.
- Scripts: `scripts/reset-project.js` (invoked by `npm run reset-project`).

## Developer workflows (concrete commands)

- Install: `npm install` (project uses npm).
- Start dev server: `npm start` -> runs `expo start`. For platform-specific quick runs use `npm run android`, `npm run ios`, `npm run web` which call `expo start --android|--ios|--web`.
- Lint: `npm run lint` -> calls `expo lint`.
- Reset starter content: `npm run reset-project` -> runs `node ./scripts/reset-project.js`.

Notes for agents: prefer editing files under `app/` for routing logic and `components/` for UI. When proposing new routes, follow existing file naming and folder structure (e.g., group related tabs under `app/(tabs)/`).

## Conventions & patterns specific to this repo

- Routing: File-based routes; top-level `app/_layout.tsx` composes navigation and shared wrappers. Follow existing layout patterns when adding global wrappers (status bar, splash, safe-area).
- Themed components: Components named `themed-*` provide consistent color tokens. Use `use-theme-color.ts` and `constants/theme.ts` for colors.
- NativeWind: `babel.config.js` already includes `nativewind/babel` and `jsxImportSource: "nativewind"`. Tailwind `content` currently references `./App.tsx` and `./components/**/*` — note that the app uses `app/` (Expo Router). When scanning for classnames, prefer `app/**/*.{ts,tsx}` and `components/**/*.{ts,tsx}`.
- Component location: put shared primitives in `components/ui/` and smaller app-specific components directly in `components/`.

## Integrations & cross-component notes

- React Navigation pieces are used via `expo-router` — navigation is primarily file-based; avoid mixing heavy imperative route setup unless necessary.
- Reanimated & worklets: repo includes `react-native-reanimated` and `react-native-worklets` — keep Babel/plugin expectations in mind and avoid inline non-worklet code in animation files.
- Native modules: typical Expo-managed modules are present (`expo-image`, `expo-linear-gradient`, `expo-haptics`, etc.). When adding native or custom native modules, prefer EAS/development-build workflows (not documented here).

## What to do when changing config or adding new packages

- If adding libraries that use Babel plugins or require native setup (e.g., Reanimated), update `babel.config.js` and verify Metro config if necessary.
- When adding Tailwind/NativeWind classes in `app/` pages, update `tailwind.config.js` `content` array to include `./app/**/*.{ts,tsx}` so classes are picked up for builds.

## Quick examples an agent may produce

- Add a new tab: create `app/(tabs)/settings.tsx` exporting a React component; export default React component and use route-group naming consistent with `index.tsx`.
- Add a small UI primitive: add `components/ui/Badge.tsx` and export it from that folder; prefer existing styling helpers (themed-text/view).

## Files worth reviewing first

- `app/_layout.tsx` — global layout and router entry patterns.
- `app/(tabs)/_layout.tsx` — how tab layout is composed.
- `components/ui/Card.tsx` and `components/themed-*` — small component idioms and theming.
- `babel.config.js`, `tailwind.config.js` — how transforms and class extraction are configured.

---

If anything above is unclear or you'd like me to expand examples (e.g., a sample `settings.tsx` route or a `Badge` component), tell me which part to expand and I will add it.
