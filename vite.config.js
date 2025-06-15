import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === "production" ? "/Axon.app/" : "/",
  server: {
    open: true,
    port: 5173,
  },
  build: {
    outDir: "dist",
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: false, // Mantener console.log para debugging en producción temporalmente
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom"],
  },
}));
