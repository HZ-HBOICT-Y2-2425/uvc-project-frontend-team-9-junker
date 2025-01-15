import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"], // Specify files to lint
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "no-unused-vars": "error", // Catch unused variables
      "no-undef": "error", // Disallow the use of undefined variables
      "prefer-const": "error", // Enforce using `const` when variables are not reassigned
      "no-duplicate-imports": "error", // Avoid multiple imports of the same module
      "eqeqeq": ["error", "always"], // Enforce strict equality checks
      "curly": "error", // Require consistent use of curly braces
    },
  },
  pluginJs.configs.recommended, // Recommended rules for JavaScript
  ...tseslint.configs.recommended, // Recommended rules for TypeScript
  {
    ignores: [
      "src/tests/**",       // Ignore all files in the tests directory
      ".svelte-kit/**",     // Ignore generated SvelteKit files
    ],
  },
];