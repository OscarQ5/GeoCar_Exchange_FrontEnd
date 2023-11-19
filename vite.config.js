import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/static': {
        target: 'https://geocar-exchange-backend.onrender.com',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
