import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  site: 'https://mike-at-redspace.github.io',
  base: '/me',
  integrations: [
    react(),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@/components': path.resolve(__dirname, './src/components'),
        '@/hooks': path.resolve(__dirname, './src/hooks'),
        '@/context': path.resolve(__dirname, './src/context'),
        '@/tokens': path.resolve(__dirname, './src/tokens'),
        '@/utils': path.resolve(__dirname, './src/utils'),
        '@/data': path.resolve(__dirname, './src/data'),
        '@/styles': path.resolve(__dirname, './src/styles'),
        '@/layouts': path.resolve(__dirname, './src/layouts'),
        '@/assets': path.resolve(__dirname, './src/assets'),
        '@/': path.resolve(__dirname, './src'),
      },
    },
  },
});

