import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Cloudflare Pages preview uses root base.
export default defineConfig({
  plugins: [react()],
  base: process.env.DEPLOY_BASE || '/',
})
