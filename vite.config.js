import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/static': {
        target: 'http://localhost:5555',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
