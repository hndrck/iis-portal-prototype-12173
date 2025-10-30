import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';

  return {
    // GitHub Pages deployment configuration
    // Use root path for custom domain, subdirectory for github.io domain
    base: isProduction ? '/' : '/',
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      // Only use componentTagger in development
      !isProduction && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      // Ensure proper output for GitHub Pages
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
  };
});
