/**
 * main.jsx - Punto de entrada principal de la aplicación Axon.App
 * ==============================================================
 * Renderiza el componente App principal en el DOM usando React 18+.
 *
 * Características:
 * - Utiliza createRoot (Concurrent Features)
 * - StrictMode activado para desarrollo seguro
 * - Importación de estilos globales
 * - Renderizado en el elemento #root del HTML
 *
 * @author Axon.app Team
 * @version 2.4.0
 */

import { StrictMode } from 'react'; // Modo estricto de React para detectar problemas
import { createRoot } from 'react-dom/client'; // API moderna de React 18 para renderizado
import App from './App.jsx'; // Componente principal de la aplicación
import './index.css'; // Estilos globales de la aplicación

/**
 * Renderizado principal de la aplicación
 * Crea la raíz de React y renderiza la aplicación completa
 * con StrictMode activado para mejor desarrollo y debugging
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// --- SUGERENCIAS DE MEJORA PROFESIONAL ---
// 1. Añadir soporte para ErrorBoundary global en el árbol de componentes.
// 2. Implementar lazy loading y Suspense para rutas o módulos pesados.
// 3. Añadir soporte para internacionalización (i18n) desde el entrypoint.
// 4. Añadir tests de integración para el punto de entrada.
// 5. Documentar el flujo de arranque en la documentación técnica.
// 6. Permitir inicialización de servicios globales (analytics, monitoring, etc.).
