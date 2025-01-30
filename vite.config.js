import { sveltekit } from '@sveltejs/kit/vite';
import {svelteTesting} from '@testing-library/svelte/vite'
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit(), svelteTesting()],
  css: {
    postcss: './postcss.config.js',
  },
	test: {
		coverage: {
			provider: 'istanbul' // or 'v8'
		  },
    	globals: true,
		// If you are testing components client-side, you need to setup a DOM environment.
		// If not all your files should have this environment, you can use a
		// `// @vitest-environment jsdom` comment at the top of the test files instead.
		environment: 'jsdom',
    	setupFiles: ['./vitest-setup.js'],
	},
	// Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});