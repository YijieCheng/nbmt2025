import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // IMPORTANT: Replace 'REPO_NAME' with your actual GitHub repository name
  // Example: If your repo is at https://github.com/yourname/ningbo-2025, change this to '/ningbo-2025/'
  base: '/REPO_NAME/', 
})