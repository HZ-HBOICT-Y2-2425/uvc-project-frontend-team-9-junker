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
