# helphub-web

A React Native (Expo) application built with TypeScript, NativeWind, React Navigation, Zustand, and Axios.

## Tech Stack

- **React Native (Expo)** – Cross-platform mobile & web framework
- **TypeScript** – Static typing
- **NativeWind** – Tailwind CSS styling for React Native
- **React Navigation** – Screen navigation
- **Zustand** – Lightweight global state management
- **Axios** – HTTP client with interceptors

## Project Structure

```
├── App.tsx                   # App entry point
├── global.css                # NativeWind / Tailwind CSS imports
├── tailwind.config.js        # Tailwind configuration
├── metro.config.js           # Metro bundler with NativeWind support
├── babel.config.js           # Babel configuration
├── src/
│   ├── api/
│   │   └── client.ts         # Axios instance with interceptors
│   ├── navigation/
│   │   └── index.tsx         # React Navigation stack setup
│   ├── screens/
│   │   ├── HomeScreen.tsx    # Home screen
│   │   └── ProfileScreen.tsx # Profile screen
│   └── store/
│       └── useAppStore.ts    # Zustand global store
```

## Getting Started

```bash
npm install
npm run start     # Expo DevTools
npm run web       # Run in browser
npm run android   # Run on Android
npm run ios       # Run on iOS (macOS only)
```