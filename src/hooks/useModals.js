/**
 * useModals.js - Hook personalizado para gestión centralizada de modales
 * ================================================================
 * Centraliza la lógica de estado para los modales de formularios de la app.
 *
 * Beneficios:
 * - Centralización y reutilización de lógica
 * - Estado consistente y fácil mantenimiento
 * - Facilita el debugging y la escalabilidad
 *
 * Modales gestionados:
 * - Modal de contacto general
 * - Modal de solicitud de cotización
 * - Modal de solicitud de consulta
 *
 * @returns {Object} Estados y funciones para controlar los modales:
 *   - contactModalOpen, quoteModalOpen, consultationModalOpen (booleans)
 *   - openContactModal, openQuoteModal, openConsultationModal (funciones)
 *   - closeContactModal, closeQuoteModal, closeConsultationModal (funciones)
 *   - closeAllModals (función para cerrar todos)
 *
 * @author Axon.app Team
 * @version 2.4.0
 */

import { useState } from 'react';

/**
 * Hook para manejar los modales de formularios
 *
 * @returns {Object} Estados y funciones para controlar modales
 */
export const useModals = () => {
  // --- Estados de los modales ---
  const [contactModalOpen, setContactModalOpen] = useState(false); // Modal de contacto
  const [quoteModalOpen, setQuoteModalOpen] = useState(false); // Modal de cotización
  const [consultationModalOpen, setConsultationModalOpen] = useState(false); // Modal de consulta

  // --- Retorno: estados y funciones de control ---
  return {
    // Estados actuales de los modales
    contactModalOpen,
    quoteModalOpen,
    consultationModalOpen,
    // Funciones para abrir modales
    openContactModal: () => setContactModalOpen(true),
    openQuoteModal: () => setQuoteModalOpen(true),
    openConsultationModal: () => setConsultationModalOpen(true),
    // Funciones para cerrar modales individuales
    closeContactModal: () => setContactModalOpen(false),
    closeQuoteModal: () => setQuoteModalOpen(false),
    closeConsultationModal: () => setConsultationModalOpen(false),
    // Función para cerrar todos los modales (útil en navegación o reset)
    closeAllModals: () => {
      setContactModalOpen(false);
      setQuoteModalOpen(false);
      setConsultationModalOpen(false);
    },
  };
};

// --- SUGERENCIAS DE MEJORA PROFESIONAL ---
// 1. Añadir PropTypes o migrar a TypeScript para tipado estricto del hook.
// 2. Permitir gestión dinámica de modales (array/mapa de modales).
// 3. Añadir tests unitarios para cada función de control.
// 4. Permitir cierre de modales por teclado (Escape) o click en backdrop desde el hook.
// 5. Documentar ejemplos de uso en la documentación técnica o Storybook.
// 6. Mejorar la gestión de focus y accesibilidad al abrir/cerrar modales.
