import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'assets',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'terser',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        uiux: resolve(__dirname, 'service-uiux.html'),
        seo: resolve(__dirname, 'service-seo.html'),
        graphic: resolve(__dirname, 'service-graphic.html'),
        motion: resolve(__dirname, 'service-motion.html'),
        programming: resolve(__dirname, 'service-programming.html'),
        content: resolve(__dirname, 'service-content.html'),
        mediabuyer: resolve(__dirname, 'service-mediabuyer.html'),
        socialmedia: resolve(__dirname, 'service-socialmedia.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true
  }
});
