/**
 * main.jsx - Punto de entrada principal de la aplicación Axon.App
 * ==============================================================
 * Renderiza el componente App principal en el DOM usando React 18+.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

/**
 * Renderizado principal de la aplicación
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// --- SUGERENCIAS DE MEJORA PROFESIONAL ---
// 1. Añadir soporte para ErrorBoundary global en el árbol de componentes.
// 2. Implementar lazy loading y Suspense para rutas o módulos pesados.
// 3. Añadir soporte para internacionalización (i18n) desde el entrypoint.
// 4. Añadir tests de integración para el punto de entrada.
// 5. Documentar el flujo de arranque en la documentación técnica.
// 6. Permitir inicialización de servicios globales (analytics, monitoring, etc.).
