// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],

  // The sponsors page now lives on the home page
  redirects: {
    '/sponsor': '/#sponsors',
    // Past programmes moved to their edition page
    '/programme/2025': '/previous-editions/2025',
    '/programme/2024': '/previous-editions/2024',
    '/programme/2023': '/previous-editions/2023',
    '/programme/2022': '/previous-editions/2022',
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
