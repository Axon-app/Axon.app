// --- Botón flotante para acceso rápido al blog ---
// Componente profesional y accesible para mostrar un botón fijo que abre la sección de blog.
// Props:
//   - onClick: función a ejecutar al hacer click (requerido)
//   - isVisible: boolean (si el botón debe mostrarse, por defecto true)
//
// Accesibilidad:
//   - Usa aria-label y title descriptivos.
//   - El botón es navegable por teclado.
//
// Buenas prácticas:
//   - Early return para eficiencia.
//   - Efectos visuales y tooltip informativo.
//   - Indicador de novedad animado.
export const FloatingBlogButton = ({ onClick, isVisible = true }) => {
  // Si no debe mostrarse, no renderiza nada
  if (!isVisible) return null;

  return (
    <button
      onClick={onClick}
      className="fixed right-4 sm:right-8 p-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg z-40 group"
      style={{ top: 'calc(50% + 2.5rem)' }}
      aria-label="Ver blog"
      title="Explorar nuestro blog"
    >
      <div className="flex items-center justify-center">
        <svg
          className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
      </div>
      {/* Tooltip informativo accesible */}
      <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="bg-gray-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg border border-gray-700">
          📖 Blog & Insights
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-l-4 border-l-gray-900 border-y-4 border-y-transparent"></div>
        </div>
      </div>
      {/* Indicador de novedad animado (puede hacerse opcional por prop) */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
    </button>
  );
};

// --- SUGERENCIAS DE MEJORA PROFESIONAL ---
// 1. Añadir PropTypes o migrar a TypeScript para tipado estricto.
// 2. Permitir personalización de icono, tooltip, estilos y posición mediante props.
// 3. Añadir tests unitarios para la lógica de visibilidad y renderizado.
// 4. Internacionalizar textos y atributos accesibles si el proyecto es multilenguaje.
// 5. Permitir mostrar/ocultar el indicador de novedad por prop.
// 6. Documentar el componente en Storybook o similar para facilitar su uso y pruebas.
