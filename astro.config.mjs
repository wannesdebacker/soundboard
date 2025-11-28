import { defineConfig } from 'astro/config';

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: 'https://wannesdebacker.github.io',
  base: '/soundboard',
  output: 'static',
  integrations: [solidJs()],
});