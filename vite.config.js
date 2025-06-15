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
  },
}));
