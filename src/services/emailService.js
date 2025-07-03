/**
 * emailService.js - Servicio de contacto y formularios Axon.App
 * ============================================================
 * Servicio simplificado para manejar formularios de contacto, cotización y consulta.
 * No depende de servicios externos, simula el envío para demo.
 *
 * @author Axon.app Team
 * @version 2.4.0
 */

// --- Configuración de contacto de la empresa ---
const CONTACT_CONFIG = {
  EMAILS: {
    PRIMARY: 'axonapp.info@gmail.com',
    SECONDARY: 'axonapp@outlook.es',
  },
  COMPANY_NAME: 'Axon.app',
  RESPONSE_TIME: '24 horas',
};

/**
 * @typedef {Object} FormData
 * @property {string} [name] - Nombre del usuario
 * @property {string} [email] - Email del usuario
 * @property {string} [phone] - Teléfono del usuario
 * @property {string} [company] - Empresa del usuario
 * @property {string} [message] - Mensaje del usuario
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Si la validación es exitosa
 * @property {string[]} errors - Lista de errores de validación
 */

/**
 * Valida los datos básicos de un formulario
 * @param {FormData} formData - Datos del formulario
 * @returns {ValidationResult} - { isValid: boolean, errors: Array<string> }
 */
const validateFormData = formData => {
  const errors = [];
  if (!formData.name?.trim()) {
    errors.push('El nombre es requerido');
  }
  if (!formData.email?.trim()) {
    errors.push('El email es requerido');
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('El formato del email no es válido');
  }
  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * @typedef {Object} EmailResult
 * @property {boolean} success - Si el envío fue exitoso
 * @property {boolean} [demo] - Si es modo demo
 * @property {string} [type] - Tipo de formulario
 * @property {Object} [data] - Datos del envío
 * @property {string} [timestamp] - Timestamp del envío
 * @property {string} [message] - Mensaje de resultado
 * @property {string[]} [errors] - Errores de validación
 */

/**
 * Simula el procesamiento de formularios para demo
 * @param {string} type - Tipo: 'contact', 'quote', 'consultation'
 * @param {FormData} formData - Datos del formulario
 * @returns {Promise<EmailResult>} - Resultado simulado del envío
 */
export const sendUnifiedEmail = (type, formData) => {
  // Validar datos básicos
  const validation = validateFormData(formData);
  if (!validation.isValid) {
    return Promise.resolve({ success: false, errors: validation.errors });
  }
  // Simular procesamiento
  return new Promise(resolve => {
    setTimeout(() => {
      const timestamp = new Date().toLocaleString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
      resolve({
        success: true,
        demo: true,
        type,
        data: {
          name: formData.name,
          email: formData.email,
          contactEmail: CONTACT_CONFIG.EMAILS.PRIMARY,
        },
        timestamp,
        message: 'Formulario procesado correctamente. En producción se enviaría por email.',
      });
    }, 1200);
  });
};

/**
 * Envía email de contacto general
 * @param {FormData} formData - Datos del formulario de contacto
 * @returns {Promise<EmailResult>} - Resultado del envío
 */
export const sendContactEmail = formData => {
  return sendUnifiedEmail('contact', formData);
};

/**
 * Envía solicitud de propuesta/cotización
 * @param {FormData} formData - Datos del formulario de propuesta
 * @returns {Promise<EmailResult>} - Resultado del envío
 */
export const sendQuoteRequest = formData => {
  return sendUnifiedEmail('quote', formData);
};

/**
 * Envía solicitud de consulta
 * @param {FormData} formData - Datos del formulario de consulta
 * @returns {Promise<EmailResult>} - Resultado del envío
 */
export const sendConsultationRequest = formData => {
  return sendUnifiedEmail('consultation', formData);
};

/**
 * Envía email de confirmación al cliente (simulado)
 * @param {string} _clientEmail - Email del cliente
 * @param {string} _type - Tipo de confirmación
 * @param {string} _serviceName - Nombre del servicio
 * @returns {EmailResult} - Resultado del envío
 */
export const sendClientConfirmation = (_clientEmail, _type, _serviceName = '') => {
  // Simulación de confirmación
  return {
    success: true,
    demo: true,
    message: 'Confirmación enviada (modo demo)',
  };
};

// --- SUGERENCIAS DE MEJORA PROFESIONAL ---
// 1. Migrar a TypeScript para tipado estricto y validación de datos.
// 2. Validar campos adicionales según el tipo de formulario.
// 3. Añadir tests unitarios para todas las funciones de envío y validación.
// 4. Permitir integración real con servicios de email (SendGrid, SES, etc.).
// 5. Internacionalizar mensajes de error y confirmación.
// 6. Documentar ejemplos de uso en la documentación técnica.
// 7. Mejorar feedback de errores y logs para debugging en producción.
