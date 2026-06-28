import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Sets '@' as a shortcut for the 'src' directory
      "@": path.resolve(__dirname, "./src"),
      // Sets '@assets' as a direct shortcut for your assets folder
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://51.20.118.240:5000",
        changeOrigin: true,
      },
      watch: {
        usePolling: true,
      },
    },
  },
});
