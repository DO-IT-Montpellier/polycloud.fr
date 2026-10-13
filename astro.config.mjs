// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// Served by GitHub Pages at https://do-it-montpellier.github.io/polycloud.fr/
const base = '/polycloud.fr';

// https://astro.build/config
export default defineConfig({
  site: 'https://do-it-montpellier.github.io',
  base,

  integrations: [react()],

  // Destinations are not prefixed with `base` automatically
  redirects: {
    // The sponsors page now lives on the home page
    '/sponsor': `${base}/#sponsors`,
    // Past programmes moved to their edition page
    '/programme/2025': `${base}/previous-editions/2025`,
    '/programme/2024': `${base}/previous-editions/2024`,
    '/programme/2023': `${base}/previous-editions/2023`,
    '/programme/2022': `${base}/previous-editions/2022`,
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
