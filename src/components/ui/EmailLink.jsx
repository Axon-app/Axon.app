import { useEmailSelector } from '../../hooks/useEmailSelector';
import { EmailClientSelector } from './EmailClientSelector';

/**
 * Componente de enlace de correo que abre un selector de cliente de correo.
 * Permite al usuario elegir cómo enviar el email (Gmail, Outlook, mailto).
 * Props:
 *   - to: destinatario
 *   - subject: asunto
 *   - body: cuerpo
 *   - children: contenido del enlace (texto o JSX)
 *   - className: clases CSS adicionales
 *   - mailtoUrl: URL mailto completa (opcional, alternativa a to/subject/body)
 *   - ...props: otros props para el botón
 */
export const EmailLink = ({
  to,
  subject = '',
  body = '',
  children,
  className = '',
  mailtoUrl,
  ...props
}) => {
  // Hook personalizado para gestionar el estado del selector de email
  const {
    isEmailSelectorOpen,
    emailData,
    openEmailSelector,
    closeEmailSelector,
    openEmailSelectorFromMailto,
  } = useEmailSelector();

  // Maneja el click en el enlace para abrir el selector
  const handleClick = e => {
    e.preventDefault();
    if (mailtoUrl) {
      openEmailSelectorFromMailto(mailtoUrl);
    } else {
      openEmailSelector({ to, subject, body });
    }
  };

  return (
    <>
      {/* Botón que simula un enlace y abre el selector de cliente de correo */}
      <button
        onClick={handleClick}
        className={`${className} inline-flex items-center transition-colors`}
        type="button"
        {...props}
      >
        {children}
      </button>
      {/* Renderiza el selector de cliente de correo si está abierto */}
      {isEmailSelectorOpen && emailData && (
        <EmailClientSelector
          emailData={emailData}
          isOpen={isEmailSelectorOpen}
          onClose={closeEmailSelector}
        />
      )}
    </>
  );
};

// --- SUGERENCIAS DE MEJORA ---
// 1. Añadir prop-types o TypeScript para tipado estricto.
// 2. Permitir personalización de estilos y comportamiento por props si se requiere reutilización avanzada.
// 3. Añadir tests unitarios para la lógica de apertura y renderizado del selector.
// 4. Considerar internacionalización para textos y atributos accesibles si el proyecto es multilenguaje.
// 5. Permitir abrir el selector con teclado (accesibilidad).
