import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    minify: true,
    sourcemap: true
  },
  ssr: {
    noExternal: ['react-helmet-async']
  }
});