import { useCallback, useState } from 'react';

/**
 * useEmailSelector - Hook personalizado para manejar la selección de cliente de correo
 * Permite abrir/cerrar un selector de correo y extraer datos de un mailto URL.
 *
 * @returns {Object} Estado y funciones para el selector de correo:
 *   - isEmailSelectorOpen: boolean (si el selector está abierto)
 *   - emailData: objeto con {to, subject, body} o null
 *   - openEmailSelector: función para abrir el selector con datos
 *   - closeEmailSelector: función para cerrar el selector
 *   - openEmailSelectorFromMailto: función para abrir desde un mailto URL
 */
export const useEmailSelector = () => {
  const [isEmailSelectorOpen, setIsEmailSelectorOpen] = useState(false);
  const [emailData, setEmailData] = useState(null);

  /**
   * Abre el selector de correo con los datos proporcionados
   * @param {Object} data - {to, subject, body}
   */
  const openEmailSelector = useCallback(data => {
    setEmailData(data);
    setIsEmailSelectorOpen(true);
  }, []);

  /**
   * Cierra el selector de correo y limpia los datos
   */
  const closeEmailSelector = useCallback(() => {
    setIsEmailSelectorOpen(false);
    setEmailData(null);
  }, []);

  /**
   * Extrae datos de un mailto URL y abre el selector
   * Si el formato es inválido, redirige al mailto estándar
   * @param {string} mailtoUrl - URL mailto completa
   */
  const openEmailSelectorFromMailto = useCallback(
    mailtoUrl => {
      try {
        // Extraer componentes del mailto URL
        const url = new URL(mailtoUrl);
        const to = url.pathname;
        const params = new URLSearchParams(url.search);
        const emailData = {
          to,
          subject: params.get('subject') || '',
          body: params.get('body') || '',
        };
        openEmailSelector(emailData);
      } catch {
        // Fallback seguro: abrir enlace mailto directamente
        window.location.href = mailtoUrl;
      }
    },
    [openEmailSelector]
  );

  return {
    isEmailSelectorOpen,
    emailData,
    openEmailSelector,
    closeEmailSelector,
    openEmailSelectorFromMailto,
  };
};

// --- SUGERENCIAS DE MEJORA PROFESIONAL ---
// 1. Añadir PropTypes o migrar a TypeScript para tipado estricto del hook y los datos.
// 2. Permitir validación avanzada de los datos de email (regex, campos obligatorios).
// 3. Añadir tests unitarios para cada función del hook.
// 4. Permitir personalización de campos soportados (cc, bcc, etc.).
// 5. Documentar ejemplos de uso en la documentación técnica o Storybook.
// 6. Mejorar la gestión de errores y feedback al usuario si el mailto es inválido.
