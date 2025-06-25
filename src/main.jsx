/**
 * PUNTO DE ENTRADA PRINCIPAL DE LA APLICACIÓN AXON.APP
 * ====================================================
 *
 * Este archivo es el punto de entrada de la aplicación React.
 * Se encarga de renderizar el componente App principal en el DOM.
 *
 * Características:
 * - Utiliza React 18+ con createRoot (Concurrent Features)
 * - StrictMode activado para desarrollo más seguro
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
 * RENDERIZADO PRINCIPAL DE LA APLICACIÓN
 * ======================================
 *
 * Crea la raíz de React y renderiza la aplicación completa
 * con StrictMode activado para mejor desarrollo y debugging
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
