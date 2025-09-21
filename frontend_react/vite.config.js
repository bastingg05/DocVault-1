import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [],
      output: {
        manualChunks: undefined
      }
    },
    target: 'esnext',
    minify: 'esbuild'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'axios']
  }
})
