// Configuración principal de PostCSS para el proyecto Axon.App
// Permite procesar CSS moderno, aplicar utilidades de Tailwind y compatibilidad cross-browser

export default {
  plugins: {
    'postcss-import': {},
    'postcss-nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};

// --- SUGERENCIAS DE MEJORA PROFESIONAL ---
// 1. Añadir otros plugins de PostCSS si se requieren (cssnano para minificación, postcss-nested, etc.).
// 2. Documentar en README la función de cada plugin y el orden recomendado.
// 3. Validar que la versión de cada plugin sea compatible con la de Tailwind y Vite.
// 4. Si se usan variables CSS personalizadas, considerar postcss-custom-properties.
// 5. Revisar periódicamente la configuración para mantenerla alineada con las mejores prácticas de Tailwind y PostCSS.
