import { defineConfig } from 'vitest/config';

// Vite Plugins
import { sveltekit } from '@sveltejs/kit/vite';

// PostCSS Plugins
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig({
	plugins: [sveltekit()],
	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer()]
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
