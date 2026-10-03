import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  base: '/app/',

  build: {
    outDir: '../backend/public/app',
    emptyOutDir: true
  },

  server: {
    host: '0.0.0.0',
    port: 3000,

    proxy: {
      '/auth': 'http://localhost:8000',
      '/email': 'http://localhost:8000'
    }
  }
});