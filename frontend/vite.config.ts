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
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/auth': 'http://backend:8000',
      '/email': 'http://backend:8000',
      '/api': 'http://backend:8000'
    }
  }
});