/**
 * HOOK PERSONALIZADO PARA GESTIÓN DE MODALES
 * ==========================================
 *
 * Este hook centraliza la lógica de estado para todos los modales
 * de formularios de la aplicación (contacto, cotización, consulta).
 *
 * Beneficios:
 * - Centralización de la lógica de modales
 * - Reutilización en múltiples componentes
 * - Estado consistente entre modales
 * - Fácil mantenimiento y debugging
 *
 * Modales gestionados:
 * - Modal de contacto general
 * - Modal de solicitud de cotización
 * - Modal de solicitud de consulta
 *
 * @returns {Object} Objeto con estados y funciones de control
 *
 * @author Axon.app Team
 * @version 2.4.0
 */

import { useState } from "react";

/**
 * Hook para manejar los modales de formularios
 *
 * @returns {Object} Estados y funciones para controlar modales
 * @returns {boolean} contactModalOpen - Estado del modal de contacto
 * @returns {boolean} quoteModalOpen - Estado del modal de cotización
 * @returns {boolean} consultationModalOpen - Estado del modal de consulta
 * @returns {Function} openContactModal - Abre el modal de contacto
 * @returns {Function} openQuoteModal - Abre el modal de cotización
 * @returns {Function} openConsultationModal - Abre el modal de consulta
 * @returns {Function} closeContactModal - Cierra el modal de contacto
 * @returns {Function} closeQuoteModal - Cierra el modal de cotización
 * @returns {Function} closeConsultationModal - Cierra el modal de consulta
 * @returns {Function} closeAllModals - Cierra todos los modales
 */
export const useModals = () => {
  // ===================================================================
  // ESTADOS DE LOS MODALES
  // ===================================================================

  const [contactModalOpen, setContactModalOpen] = useState(false);           // Modal de contacto
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);               // Modal de cotización
  const [consultationModalOpen, setConsultationModalOpen] = useState(false); // Modal de consulta

  // ===================================================================
  // OBJETO DE RETORNO CON ESTADOS Y FUNCIONES
  // ===================================================================

  return {
    // --- Estados actuales de los modales ---
    contactModalOpen,
    quoteModalOpen,
    consultationModalOpen,

    // --- Funciones para abrir modales ---
    openContactModal: () => setContactModalOpen(true),
    openQuoteModal: () => setQuoteModalOpen(true),
    openConsultationModal: () => setConsultationModalOpen(true),

    // --- Funciones para cerrar modales individuales ---
    closeContactModal: () => setContactModalOpen(false),
    closeQuoteModal: () => setQuoteModalOpen(false),
    closeConsultationModal: () => setConsultationModalOpen(false),

    // --- Función para cerrar todos los modales ---
    // Útil en casos de navegación o reset general
    closeAllModals: () => {
      setContactModalOpen(false);
      setQuoteModalOpen(false);
      setConsultationModalOpen(false);
    },
  };
};
