import { defineConfig } from 'eslint/config';

// @ts-expect-error - eslint-config-expo/flat has no types

import expoConfig from 'eslint-config-expo/flat';

export default defineConfig([
    ...expoConfig,

    {
        ignores: [
            "**/node_modules/**",
            "**/.expo/**",
            "**/dist/**",
            "**/build/**",
            "**/coverage/**",

            // IMPORTANT
            "**/playwright-report/**",
            "**/test-results/**",

            // Native folders
            "**/android/**",
            "**/ios/**",

            // Generated files
            "**/*.min.js",
        ],
    },

    {
        files: ["**/*.{js,jsx,ts,tsx}"],

        rules: {
            "react-hooks/exhaustive-deps": "warn",
            "@typescript-eslint/no-unused-vars": "warn",
        },
    },
]);