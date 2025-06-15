import emailjs from "@emailjs/browser";

// Configuración de EmailJS - Servicios reales configurados
const EMAILJS_CONFIG = {
  // Clave pública de EmailJS
  PUBLIC_KEY: "LzQtejP5Ii_qUvS7j",

  // Servicios configurados (basados en las imágenes proporcionadas)
  SERVICES: {
    GMAIL: {
      SERVICE_ID: "service_0v5oqvm", // Gmail service conectado a axonapp.info@gmail.com
      NAME: "Gmail",
      EMAIL: "axonapp.info@gmail.com",
    },
    OUTLOOK: {
      SERVICE_ID: "service_ec5ggdj", // Outlook service conectado a axonapp@outlook.es
      NAME: "Axon.app",
      EMAIL: "axonapp@outlook.es",
    },
  },

  // Templates configurados (solo los 2 que tienes)
  TEMPLATES: {
    CONSULTATION: "template_consultation",
    QUOTE: "template_quote",
    // Usar template_consultation para contacto general también
    CONTACT: "template_consultation",
  },
};

// Inicializar EmailJS con la clave pública real
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

/**
 * Envía email a múltiples destinatarios (Gmail y Outlook)
 * @param {string} templateId - ID del template
 * @param {Object} templateParams - Parámetros del template
 * @returns {Promise<Object>} - Resultado del envío
 */
const sendToMultipleServices = async (templateId, templateParams) => {
  try {
    const promises = [];
    const timeout = 10000; // 10 segundos timeout

    // Configurar parámetros para Gmail
    const gmailParams = {
      ...templateParams,
      to_email: "axonapp.info@gmail.com",
      from_service: EMAILJS_CONFIG.SERVICES.GMAIL.NAME,
      from_email: EMAILJS_CONFIG.SERVICES.GMAIL.EMAIL,
    };

    // Configurar parámetros para Outlook
    const outlookParams = {
      ...templateParams,
      to_email: "axonapp@outlook.es",
      from_service: EMAILJS_CONFIG.SERVICES.OUTLOOK.NAME,
      from_email: EMAILJS_CONFIG.SERVICES.OUTLOOK.EMAIL,
    };

    // Función para crear promesa con timeout
    const createEmailPromise = (serviceId, params, serviceName) => {
      return Promise.race([
        emailjs.send(serviceId, templateId, params, EMAILJS_CONFIG.PUBLIC_KEY),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Timeout')), timeout)
        )
      ])
      .then((result) => ({
        service: serviceName,
        success: true,
        result,
      }))
      .catch((error) => ({
        service: serviceName,
        success: false,
        error: error.message || 'Error de conexión',
      }));
    };

    // Enviar a Gmail con timeout
    promises.push(
      createEmailPromise(
        EMAILJS_CONFIG.SERVICES.GMAIL.SERVICE_ID,
        gmailParams,
        "Gmail"
      )
    );

    // Enviar a Outlook con timeout
    promises.push(
      createEmailPromise(
        EMAILJS_CONFIG.SERVICES.OUTLOOK.SERVICE_ID,
        outlookParams,
        "Outlook"
      )
    );    // Esperar todas las promesas
    const results = await Promise.allSettled(promises);
    const allResults = results.map(result => 
      result.status === 'fulfilled' ? result.value : {
        success: false,
        error: result.reason?.message || 'Error desconocido'
      }
    );
    
    const successfulSends = allResults.filter((r) => r.success);

    return {
      success: successfulSends.length > 0,
      results: allResults,
      successCount: successfulSends.length,
      totalAttempts: allResults.length,
      primarySuccess: successfulSends.length >= 1,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Error al enviar a múltiples servicios",
      results: [],
    };
  }
};

/**
 * Valida los datos básicos de un formulario
 * @param {Object} formData - Datos del formulario
 * @returns {Object} - Resultado de la validación
 */
const validateFormData = (formData) => {
  const errors = [];

  if (!formData.name?.trim()) {
    errors.push("El nombre es requerido");
  }

  if (!formData.email?.trim()) {
    errors.push("El email es requerido");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push("El formato del email no es válido");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

/**
 * Función UNIFICADA para enviar cualquier tipo de email
 * @param {string} type - Tipo: 'contact', 'quote', 'consultation'
 * @param {Object} formData - Datos del formulario
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendUnifiedEmail = async (type, formData) => {
  try {
    // Validar datos básicos
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    // Seleccionar template según el tipo
    let templateId;
    let templateParams;

    switch (type) {
      case "quote":
        templateId = EMAILJS_CONFIG.TEMPLATES.QUOTE;
        templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || "No proporcionado",
          company: formData.company || "No especificada",
          city: formData.city || "No especificada",
          client_type: formData.clientType || "No especificado",
          project_type: formData.projectType || "Propuesta General",
          project_description:
            formData.description ||
            formData.projectDescription ||
            formData.message ||
            "Sin descripción",
          requirements:
            formData.additionalRequirements ||
            formData.requirements ||
            "Ninguno específico",
          reply_to: formData.email,
          timestamp: new Date().toLocaleString("es-ES"),
        };
        break;

      case "consultation":
        templateId = EMAILJS_CONFIG.TEMPLATES.CONSULTATION;
        templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || "No proporcionado",
          company: formData.company || "No especificada",
          city: formData.city || "No especificada",
          client_type: formData.clientType || "No especificado",
          consultation_type: formData.consultationType || "Consulta General",
          preferred_date: formData.preferredDate || "Flexible",
          preferred_time: formData.preferredTime || "Cualquier horario",
          timezone: formData.timezone || "No especificado",
          topics: formData.topics || formData.message || "Temas generales",
          questions: formData.questions || "Ninguna pregunta específica",
          meeting_type: formData.meetingType || "video-call",
          reply_to: formData.email,
          timestamp: new Date().toLocaleString("es-ES"),
        };
        break;

      case "contact":
      default:
        // Para contacto general, usar template de consultation
        templateId = EMAILJS_CONFIG.TEMPLATES.CONSULTATION;
        templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || "No proporcionado",
          company: formData.company || "No especificada",
          city: "No especificada",
          client_type: "Contacto General",
          consultation_type: "Consulta General - Contacto",
          preferred_date: "Flexible",
          preferred_time: "Cualquier horario",
          timezone: "No especificado",
          topics: formData.message || "Mensaje de contacto general",
          questions: formData.message || "Sin preguntas específicas",
          meeting_type: "A definir",
          reply_to: formData.email,
          timestamp: new Date().toLocaleString("es-ES"),
        };
        break;
    }

    // Enviar a múltiples servicios
    const result = await sendToMultipleServices(templateId, templateParams);

    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message || "Error al enviar email",
    };
  }
};

/**
 * Función para enviar email de contacto general
 * @param {Object} formData - Datos del formulario de contacto
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendContactEmail = async (formData) => {
  return await sendUnifiedEmail("contact", formData);
};

/**
 * Función para enviar solicitud de propuesta
 * @param {Object} formData - Datos del formulario de propuesta
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendQuoteRequest = async (formData) => {
  return await sendUnifiedEmail("quote", formData);
};

/**
 * Función para enviar solicitud de consulta
 * @param {Object} formData - Datos del formulario de consulta
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendConsultationRequest = async (formData) => {
  return await sendUnifiedEmail("consultation", formData);
};

/**
 * Función alternativa usando fetch para casos donde EmailJS no esté disponible
 * @param {string} type - Tipo de email
 * @param {Object} data - Datos del formulario
 * @param {string} serviceName - Nombre del servicio
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendEmailFallback = async (type, data, serviceName = "") => {
  try {
    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "axonapp.info@gmail.com",
        type,
        service: serviceName,
        data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error("Error en el envío");
    }
  } catch (error) {
    return {
      success: false,
      error: error.message || "Error en fallback email",
    };
  }
};

/**
 * Configuración para desarrollo/testing (simulación)
 * @param {string} type - Tipo de email
 * @param {Object} data - Datos del formulario
 * @param {string} serviceName - Nombre del servicio
 * @returns {Promise<Object>} - Resultado simulado
 */
export const sendEmailDemo = async (type, data, _serviceName = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const timestamp = new Date().toLocaleString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      resolve({
        success: true,
        demo: true,
        confirmationSent: true,
        timestamp,
      });
    }, 1000);
  });
};

/**
 * Función para enviar email de confirmación al cliente
 * @param {string} _clientEmail - Email del cliente * @param {string} _type - Tipo de confirmación
 * @param {string} _serviceName - Nombre del servicio
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendClientConfirmation = async (
  _clientEmail,
  _type,
  _serviceName = ""
) => {
  // En producción, aquí se enviaría el email real
  // Por ahora simulamos el envío exitoso
  return { success: true, demo: true };
};
