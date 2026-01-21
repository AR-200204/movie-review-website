import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ar-200204.github.io',
  base: '/movie-review-website',
  output: 'static',
  build: {
    assets: 'assets'
  }
});
