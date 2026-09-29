import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages under nubila.ar/garden/ uses `/garden/`.
// Cloudflare Pages preview uses `/` (set via deploy:cf).
export default defineConfig(({ command }) => {
  const base =
    process.env.DEPLOY_BASE ||
    (command === 'build' ? '/garden/' : '/')
  return {
    plugins: [react()],
    base,
  }
})
