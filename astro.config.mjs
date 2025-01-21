// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import react from '@astrojs/react';

import node from '@astrojs/node';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false
  }), react(), vue({
    appEntrypoint: '/src/app'
  })],

  output: 'static',

  adapter: node({
    mode: 'standalone'
  }),

  vite: {
    resolve: {
      alias: {
        '@': '/src'
      }
    }
  }
});