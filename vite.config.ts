import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import commonjs from "@rollup/plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), commonjs()],
  build: {
    outDir: "front-tools",
    rollupOptions: {
      input: {
        script: 'src/assets/script.tsx',
        loadScript: 'src/assets/loadScript.js',
        index: "index.html"
      },
      output: {
        assetFileNames: (assetInfo) => {
          let extType = assetInfo.name.split('.')[1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'img';
          }
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name].js',
      }
    }
  }
})
