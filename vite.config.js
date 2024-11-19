import { sveltekit } from '@sveltejs/kit/vite';

export default {
  plugins: [sveltekit()],
  css: {
    postcss: './postcss.config.js',
  },
};
