# HelpHub Webapp

HelpHub Webapp is an Expo Router and React Native Web project for a responsive counseling marketplace experience. The current codebase is primarily a front-end prototype focused on a marketing-style homepage, account entry screens, and a consultant appointment selection flow.

## What Is Implemented

- Responsive homepage built from reusable section components
- Desktop and mobile navigation with account dropdowns and multi-column category menus
- Hero slider with autoplay, swipe gestures, and mobile-specific slide assets
- Reusable consultant carousels for featured, top rated, new, and online consultants
- Login and sign-up screens with password visibility toggles
- Appointment selection screen with package selection, calendar UI, and time-slot picker
- NativeWind/Tailwind styling across Expo, React Native, and web targets
- Local mock content for menu taxonomy, consultant names, specialties, and pricing

## Current Product Shape

This repository currently behaves like a polished UI prototype rather than a full production app.

- Consultant cards are generated from local mock data inside the UI layer
- Search, messages, help CTA, blog links, and most footer links are placeholders today
- Authentication forms do not submit to a backend yet
- Appointment booking stops at the selection UI and does not complete checkout or confirmation
- Several routes referenced by links, such as `/about` or `/privacy`, are not implemented in `app/`

## Tech Stack

- Expo 54
- React 19
- React Native 0.81
- Expo Router 6
- React Native Web
- NativeWind 4 with Tailwind CSS 3
- TypeScript in strict mode
- Expo ESLint flat config

## Routes

Defined routes in `app/`:

- `/` via `app/(tabs)/index.tsx`
- `/login` via `app/login.tsx`
- `/signup` via `app/signup.tsx`
- `/appointment` via `app/appointment.tsx`

Routing notes:

- The root layout uses `expo-router` with a hidden `Stack`
- The `(tabs)` group exists only as a hidden wrapper and does not expose a visible tab bar
- `ProfileCard` navigates to `/appointment` and passes consultant name, title, and price as route params

## Homepage Composition

The homepage in `app/(tabs)/index.tsx` is assembled from these sections:

1. `Navbar`
2. `Slider`
3. Intro copy block
4. `PopulerCategories`
5. `Featured` for Featured Consultants
6. `Featured` for Top Rated Consultants
7. `HowItWorks`
8. `Featured` for New Consultants
9. `Featured` for Online Consultants
10. `Advantages`
11. `Download`
12. `Details`
13. `Companies`
14. `Numbers`
15. `Blog`
16. `Footer`

## Key Components

### Navigation

`components/Navbar.tsx`

- Desktop search bar and account dropdown
- Desktop mega menu powered by `data/megaMenuData.ts`
- Mobile slide-down navigation with expandable category groups
- Web-only document overflow locking while the mobile menu is open

### Slider

`components/Slider.tsx`

- Uses `Animated` plus `PanResponder`
- Autoplays every 4.5 seconds
- Switches between desktop and mobile image sets depending on measured width
- Supports indicator-dot navigation and swipe gestures

### Consultant Cards And Carousels

`components/Featured.tsx`
`components/ui/ProfileCard.tsx`

- Horizontal consultant rails with drag support on smaller layouts
- Mock consultant identities generated from local name arrays and random seeds
- Optional badges for new consultants and online availability
- CTA buttons route users to the appointment screen

### Informational Sections

- `components/PopulerCategories.tsx`: popular service categories
- `components/HowItWorks.tsx`: 4-step onboarding explanation
- `components/Advantages.tsx`: value proposition cards
- `components/Download.tsx`: app promotion banner
- `components/Details.tsx`: long-form marketplace description
- `components/Companies.tsx`: B2B/company support section
- `components/Numbers.tsx`: impact metrics
- `components/blog.tsx`: blog teaser grid
- `components/Footer.tsx`: footer navigation, social links, store badges, and emergency disclaimer

## Local Data Sources

### `data/megaMenuData.ts`

Defines the navbar category taxonomy for:

- For Myself
- Moms and Kids
- Work Related Issues
- Group Therapies

### `data/names.ts`

Provides mock consultant names used by profile cards.

### In-Component Mock Data

Several components still embed display data directly in the component file, including:

- consultant specialties and titles in `components/ui/ProfileCard.tsx`
- blog entries in `components/blog.tsx`
- appointment calendar and timeslots in `app/appointment.tsx`

## Styling Approach

- NativeWind is wired through Babel and Metro
- Tailwind utility classes are used directly in React Native components via `className`
- Global Tailwind layers are loaded from `global.css`
- The project uses responsive utility classes heavily to adapt layouts between mobile and web

Relevant config files:

- `babel.config.js`
- `metro.config.js`
- `tailwind.config.js`
- `global.css`

## Project Structure

```text
app/                 Expo Router screens and layouts
components/          Page sections and reusable UI
components/ui/       Smaller reusable building blocks
assets/              Local image assets for cards, slider, app promo, and blog
constants/           Shared theme file
data/                Mock menu and consultant seed data
scripts/             Utility script from the Expo starter
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- Expo-compatible environment for web, iOS simulator, Android emulator, or Expo Go

### Install

```bash
npm install
```

### Run

```bash
npm run start
```

You can also use the convenience scripts:

```bash
npm run web
npm run ios
npm run android
npm run lint
```

## Development Notes

- The codebase uses the `@/*` TypeScript path alias
- The status bar is set to dark in `app/_layout.tsx`
- `react-native-reanimated` is imported at the root layout level
- `constants/theme.ts` still contains starter theme helpers and is not central to the current UI
- `scripts/reset-project.js` is leftover Expo starter tooling and is not part of the product itself

## Known Gaps And Risks

- `app.json` still references default Expo image paths under `./assets/images/...`, but that directory is not present in this repository
- Many `Link` targets currently point to routes that do not exist yet
- Some copy still references another product name, such as `Advicemy` inside `components/Download.tsx`
- Consultant data is randomized at render time, which is helpful for mockups but not stable enough for production listings
- There are a few placeholder `console.log` calls in the navbar interaction code
- There is no API layer, persistence layer, or test suite yet

## Recommended Next Steps

1. Replace mock consultant and appointment data with a typed API-backed data model
2. Implement missing linked pages or remove placeholder navigation targets
3. Fix Expo asset metadata in `app.json`
4. Align all product naming and copy to `HelpHub`
5. Add form handling, validation, and backend integration for auth and booking flows
6. Add automated tests for routing, interaction states, and responsive behavior

## Scripts

From `package.json`:

- `npm run start`: start Expo
- `npm run web`: start Expo for web
- `npm run ios`: start Expo for iOS
- `npm run android`: start Expo for Android
- `npm run lint`: run Expo lint
- `npm run reset-project`: run the original Expo reset helper

## Summary

This project already has a strong responsive front-end foundation for an online counseling marketplace. The next phase is mostly product hardening: real routes, real data, real form flows, and cleanup of starter leftovers.
