import React from 'react';

// --- Componente del Logo de Axon ---
// Muestra el logo y nombre de la marca con estilos modernos.
export const AxonLogo = React.memo(() => {
  return (
    <div className="flex items-center">
      <img
        src="/logo1.png"
        alt="Axon.App Logo"
        className="h-8 w-auto mr-2"
        loading="eager"
        width="32"
        height="32"
      />
      <span className="text-2xl font-orbitron font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        Axon
      </span>
      <span className="text-lg font-rajdhani font-semibold text-white/80">.app</span>
    </div>
  );
});

AxonLogo.displayName = 'AxonLogo';

// --- Componente de animación de fondo ---
// Renderiza círculos animados para efectos visuales decorativos.
export const AnimatedBackground = React.memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: '0.5s' }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
    </div>
  );
});

AnimatedBackground.displayName = 'AnimatedBackground';

// --- Componente de botón scroll to top ---
// Muestra un botón flotante para volver al inicio de la página.
// Props:
//   - isVisible: boolean (si el botón debe mostrarse)
//   - onClick: función a ejecutar al hacer click
export const ScrollToTopButton = React.memo(({ isVisible, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-4 right-4 sm:bottom-8 sm:right-8 p-3 bg-blue-600 text-white rounded-full transition-all duration-300 hover:bg-blue-700 transform hover:scale-110 shadow-lg z-50 ${
        isVisible
          ? 'opacity-100 pointer-events-auto translate-y-0'
          : 'opacity-0 pointer-events-none translate-y-2'
      }`}
      aria-label="Volver arriba"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        ></path>
      </svg>
    </button>
  );
});

ScrollToTopButton.displayName = 'ScrollToTopButton';

// --- SUGERENCIAS DE MEJORA ---
// 1. Añadir prop-types o TypeScript para tipado estricto.
// 2. Permitir personalización de estilos y tamaños por props si se requiere reutilización avanzada.
// 3. Añadir tests unitarios para la lógica de visibilidad y renderizado del botón scroll.
// 4. Considerar internacionalización para el aria-label si el proyecto es multilenguaje.
