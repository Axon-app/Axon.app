/**
 * Configuración principal de Tailwind CSS para Axon.App
 * - Define el scope de archivos a analizar para purgado de CSS
 * - Extiende el tema con fuentes, animaciones y keyframes personalizados
 * - Permite una personalización visual avanzada y coherente con la marca
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  // Archivos a escanear para generar las clases CSS necesarias
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      // Fuentes personalizadas para branding
      fontFamily: {
        orbitron: ['Orbitron', 'monospace'],
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      // Keyframes personalizados para animaciones avanzadas
      keyframes: {
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1) rotate(0deg)',
          },
          '33%': {
            transform: 'translate(50px, -70px) scale(1.2) rotate(30deg)',
          },
          '66%': {
            transform: 'translate(-40px, 40px) scale(0.8) rotate(-20deg)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1) rotate(0deg)',
          },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeInScale: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        bounceIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)',
          },
          '70%': {
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
      // Animaciones personalizadas usando los keyframes definidos
      animation: {
        blob: 'blob 10s infinite ease-in-out',
        'blob-delay-2000': 'blob 10s infinite ease-in-out 2s',
        'blob-delay-4000': 'blob 10s infinite ease-in-out 4s',
        fadeInUp: 'fadeInUp 0.6s ease-out',
        fadeIn: 'fadeIn 0.6s ease-out',
        fadeInScale: 'fadeInScale 0.6s ease-out',
        bounceIn: 'bounceIn 0.6s ease-out',
      },
      // Delays personalizadas para animaciones
      animationDelay: {
        200: '200ms',
        400: '400ms',
      },
    },
  },
  // Plugins adicionales de Tailwind (vacío por ahora, se pueden agregar según necesidades)
  plugins: [],
};

// --- SUGERENCIAS DE MEJORA PROFESIONAL ---
// 1. Añadir plugins oficiales de Tailwind (forms, typography, aspect-ratio) si se requieren.
// 2. Documentar en README las animaciones y utilidades personalizadas disponibles.
// 3. Revisar y optimizar el scope de content para evitar CSS innecesario.
// 4. Si se usan colores personalizados, definirlos en theme.extend.colors.
// 5. Mantener la configuración alineada con la versión de Tailwind instalada.
// 6. Añadir variantes responsivas o de estado si se requieren para animaciones.
// 7. Validar que las fuentes personalizadas estén correctamente cargadas en el HTML.
// 8. Si se usan utilidades avanzadas, considerar el uso de safelist para clases generadas dinámicamente.
// 9. Revisar periódicamente la documentación oficial de Tailwind para nuevas features.
// 10. Si se requiere dark mode, habilitarlo explícitamente en la configuración.
