/**
 * CONFIGURACIÓN DE VITE PARA AXON.APP
 * ====================================
 *
 * Este archivo contiene toda la configuración de Vite para el proyecto Axon.app.
 * Incluye optimizaciones para producción, configuración del servidor de desarrollo,
 * y configuraciones específicas para el build.
 *
 * Características principales:
 * - Configuración optimizada para React
 * - Build con minificación y separación de chunks
 * - Servidor de desarrollo con hot reload
 * - Configuración de alias para imports
 * - Optimizaciones específicas para producción
 *
 * @author Axon.app Team
 * @version 2.4.0
 */

import react from "@vitejs/plugin-react";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";

// Obtener el equivalente a __dirname en ESM (necesario para módulos ES6)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * CONFIGURACIÓN PRINCIPAL DE VITE
 * ===============================
 *
 * Esta función define la configuración completa de Vite
 * con diferentes opciones según el modo (development/production)
 */
export default defineConfig(({ mode }) => ({
  // === PLUGINS ===
  plugins: [
    react(), // Plugin oficial de React para Vite (JSX, Fast Refresh, etc.)
  ],

  // === CONFIGURACIÓN BASE ===
  // Ruta base para el deploy en GitHub Pages o raíz local
  base: mode === "production" ? "/Axon.app/" : "/",

  // === CONFIGURACIÓN DEL SERVIDOR DE DESARROLLO ===
  server: {
    open: true,                    // Abrir automáticamente el navegador
    port: 3000,                    // Puerto del servidor de desarrollo
    host: true,                    // Permitir acceso desde la red local
    strictPort: false,             // Usar puerto alternativo si está ocupado
    hmr: {
      overlay: true,               // Mostrar errores en overlay del navegador
    },
    watch: {
      usePolling: true,            // Usar polling para detectar cambios (útil en Windows/WSL)
      interval: 1000,              // Intervalo de polling en ms
    },
  },

  // === CONFIGURACIÓN DEL BUILD DE PRODUCCIÓN ===
  build: {
    outDir: "dist",                // Directorio de salida
    minify: "terser",              // Minificador a usar
    sourcemap: mode !== "production", // Solo generar sourcemaps en desarrollo

    // Configuración del minificador Terser
    terserOptions: {
      compress: {
        drop_console: mode === "production",    // Eliminar console.log en producción
        drop_debugger: mode === "production"    // Eliminar debugger en producción
      }
    },

    // Configuración avanzada de Rollup (bundler interno de Vite)
    rollupOptions: {
      output: {
        // === SEPARACIÓN MANUAL DE CHUNKS ===
        // Optimiza la carga separando librerías grandes en chunks independientes
        manualChunks: (id) => {
          // Separar React y ReactDOM en un chunk vendor
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'react-vendor';
          }
          // Separar fuentes en un chunk independiente
          if (id.includes('@fontsource')) {
            return 'fonts';
          }
        },
        // Nombres personalizados para assets y chunks
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            return 'assets/img/[name]-[hash][extname]';
          }
          if (/woff|woff2|ttf|otf/i.test(extType)) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js'
      }
    },
    // Límites y warnings
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    target: "esnext",
    modulePreload: true,
  },

  // Optimizaciones generales para dependencias
  optimizeDeps: {
    include: ["react", "react-dom"],
    exclude: []
  },

  // Alias para importaciones limpias y mantenibles
  resolve: {
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: '@components', replacement: resolve(__dirname, 'src/components') },
      { find: '@assets', replacement: resolve(__dirname, 'src/assets') }
    ]
  },
}));

/**
 * --- SUGERENCIAS DE MEJORA PROFESIONAL ---
 * 1. Añadir plugin de análisis de bundle (ej: vite-plugin-visualizer) para builds grandes.
 * 2. Documentar en README la estructura de alias y convenciones de imports.
 * 3. Revisar y actualizar el scope de optimizeDeps según crezcan las dependencias.
 * 4. Si se usan variables de entorno, documentar y validar con dotenv.
 * 5. Añadir soporte para PWA con vite-plugin-pwa si se requiere.
 * 6. Revisar periódicamente la configuración de Rollup para nuevas features.
 * 7. Si se usan assets dinámicos, considerar safelist en Tailwind y configuración de assets en Vite.
 * 8. Validar que los paths de salida no sobrescriban archivos críticos.
 * 9. Añadir tests de integración para el build si el proyecto escala.
 * 10. Mantener la configuración alineada con la versión de Vite y plugins instalados.
 */
