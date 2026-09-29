import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Production preview sits beside the CRA site at https://nubila.ar/garden/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/garden/' : '/',
}))
