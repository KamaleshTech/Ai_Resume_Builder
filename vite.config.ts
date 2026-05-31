import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Ai_Resume_Builder/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
