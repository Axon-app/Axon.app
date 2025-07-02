import React from 'react';

/**
 * BaseModal Component
 * ===================
 * Proporciona la estructura y funcionalidad base para todos los modales de la aplicación.
 *
 * @param {boolean} isOpen - Controla si el modal está visible.
 * @param {function} onClose - Función que se llama para cerrar el modal.
 * @param {React.ReactNode} children - El contenido que se renderizará dentro del modal.
 * @param {string} [panelClassName] - Clases de Tailwind CSS opcionales para personalizar el panel del modal (ej. 'max-w-4xl').
 */
const BaseModal = ({ isOpen, onClose, children, panelClassName = 'max-w-2xl' }) => {
  // --- EFECTOS SECUNDARIOS ---

  // Efecto para manejar el cierre con la tecla 'Escape' y bloquear el scroll del body.
  React.useEffect(() => {
    const handleEscape = event => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // Añadir listener y bloquear scroll
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    // Función de limpieza del efecto
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // --- MANEJADORES DE EVENTOS ---

  // Cierra el modal si se hace clic en el fondo (backdrop), pero no en el contenido.
  const handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // --- RENDERIZADO ---

  // No renderizar nada si el modal no está abierto.
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-700/50 relative ${panelClassName}`}
      >
        {children}
      </div>
    </div>
  );
};

export default React.memo(BaseModal);
