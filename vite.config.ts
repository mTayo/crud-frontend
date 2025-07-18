import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'url';

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = path.dirname(__filename);
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),         // optional alias
      components: path.resolve(__dirname, './src/components'),
      pages: path.resolve(__dirname, './src/pages'),
      Layout: path.resolve(__dirname, './src/Layout'),
      appconfig: path.resolve(__dirname, './src/appconfig'),
      helpers: path.resolve(__dirname, './src/helpers'),
      utils: path.resolve(__dirname, './src/utils'),
      services: path.resolve(__dirname, './src/services'),
      
    },
  },
})
