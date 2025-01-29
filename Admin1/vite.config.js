import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-toastify/dist/ReactToastify.css'],
      external: ['react-router-dom'],
    },
  },
  server: {
    proxy: {
       '/api': {
         target: 'http://localhost:3001',
         changeOrigin: true,
         secure: false,
       }
     }
   }
})
