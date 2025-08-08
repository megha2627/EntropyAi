import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // 👈 this allows external devices (like ngrok) to access
    port: 5173, // optional: explicitly mention if you want fixed port
  },
  build:{
    outDir:'dist',
  }
})
