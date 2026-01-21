import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 使用相对路径 './' 作为基础路径
  // 这样无论部署在根域名还是子目录（如 GitHub Pages）下，资源都能正确加载
  base: './', 
})