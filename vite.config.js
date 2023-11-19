import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/static': {
        target: 'https://aesthetic-crisp-160450.netlify.app',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],
})
