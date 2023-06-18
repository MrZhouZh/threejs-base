import { defineConfig } from "vite";
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [viteCompression()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          threejs: ['three']
        }
      }
    }
  },
})
