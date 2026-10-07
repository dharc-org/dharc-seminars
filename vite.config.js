import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' is non-negotiable. It makes Vite emit RELATIVE asset paths so the
// same build works whether it is served from the domain root or from inside
// /archive/<edition-slug>/. Never change this to '/'.
export default defineConfig({
  plugins: [react()],
  base: './',
})
