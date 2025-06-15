import emailjs from "@emailjs/browser";

// Configuración de EmailJS - Servicios reales configurados
const EMAILJS_CONFIG = {
  // Clave pública de EmailJS
  PUBLIC_KEY: "LzQtejP5Ii_qUvS7j",

  // Servicios configurados
  SERVICES: {
    GMAIL: {
      SERVICE_ID: "service_0v5oqvm", // Gmail service
      NAME: "Gmail",
      EMAIL: "axonapp.info@gmail.com",
    },
    OUTLOOK: {
      SERVICE_ID: "service_ec5ggdj", // Outlook service
      NAME: "Axon.app",
      EMAIL: "axonapp@outlook.es",
    },
  },

  // Templates configurados
  TEMPLATES: {
    CONTACT: "template_contact",
    QUOTE: "template_quote",
    CONSULTATION: "template_consultation",
  },
};

// Inicializar EmailJS con la clave pública real
emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);

/**
 * Detecta el tipo de email y selecciona el servicio apropiado
 * @param {string} email - Email del destinatario
 * @returns {Object} - Configuración del servicio
 */
const selectEmailService = (email) => {
  if (!email) {
    // Por defecto usar Gmail
    return EMAILJS_CONFIG.SERVICES.GMAIL;
  }

  const domain = email.toLowerCase().split("@")[1];

  // Detectar dominio y seleccionar servicio
  const outlookDomains = [
    "outlook.com",
    "outlook.es",
    "hotmail.com",
    "hotmail.es",
    "live.com",
  ];
  const gmailDomains = ["gmail.com", "googlemail.com"];

  if (outlookDomains.includes(domain)) {
    return EMAILJS_CONFIG.SERVICES.OUTLOOK;
  } else if (gmailDomains.includes(domain)) {
    return EMAILJS_CONFIG.SERVICES.GMAIL;
  } else {
    // Por defecto usar Gmail para otros dominios
    return EMAILJS_CONFIG.SERVICES.GMAIL;
  }
};

/**
 * Envía un email usando el servicio apropiado
 * @param {string} templateId - ID del template
 * @param {Object} templateParams - Parámetros del template
 * @param {string} recipientEmail - Email del destinatario
 * @returns {Promise<Object>} - Resultado del envío
 */
const sendEmailWithService = async (
  templateId,
  templateParams,
  recipientEmail
) => {
  try {
    const service = selectEmailService(recipientEmail);

    const result = await emailjs.send(
      service.SERVICE_ID,
      templateId,
      {
        ...templateParams,
        from_service: service.NAME,
        from_email: service.EMAIL,
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    return {
      success: true,
      result,
      service: service.NAME,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Error al enviar email",
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
 * Procesa los datos del formulario limpiando y normalizando valores
 * @param {Object} rawData - Datos en bruto
 * @returns {Object} - Datos procesados
 */
const processFormData = (rawData) => ({
  name: rawData.name?.trim() || "",
  email: rawData.email?.trim().toLowerCase() || "",
  company: rawData.company?.trim() || "",
  phone: rawData.phone?.trim() || "",
  message: rawData.message?.trim() || "",
  projectDescription: rawData.projectDescription?.trim() || "",
  budget: rawData.budget?.trim() || "",
  timeline: rawData.timeline?.trim() || "",
  requirements: rawData.requirements?.trim() || "",
  preferredDate: rawData.preferredDate?.trim() || "",
  preferredTime: rawData.preferredTime?.trim() || "",
  consultationType: rawData.consultationType?.trim() || "",
  topics: rawData.topics?.trim() || "",
  experience: rawData.experience?.trim() || "",
});

/**
 * Función para enviar email de contacto general
 * @param {Object} formData - Datos del formulario de contacto
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendContactEmail = async (formData) => {
  try {
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }
    const processedData = processFormData(formData);
    const templateParams = {
      to_email: "axonapp.info@gmail.com",
      from_name: processedData.name,
      from_email: processedData.email,
      message: processedData.message,
      reply_to: processedData.email,
      subject: "Nuevo mensaje de contacto desde Axon.App",
    };

    const result = await sendEmailWithService(
      EMAILJS_CONFIG.TEMPLATES.CONTACT,
      templateParams,
      processedData.email
    );

    return result;
  } catch (error) {
    return { success: false, error: error.message || "Error al enviar email" };
  }
};

/**
 * Función para enviar solicitud de cotización
 * @param {Object} formData - Datos del formulario
 * @param {string} serviceName - Nombre del servicio
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendQuoteRequestEmail = async (formData, serviceName) => {
  try {
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const processedData = processFormData(formData);
    const templateParams = {
      to_email: "axonapp.info@gmail.com",
      from_name: processedData.name,
      from_email: processedData.email,
      company: processedData.company || "No especificada",
      phone: processedData.phone || "No proporcionado",
      service_name: serviceName,
      project_description: processedData.projectDescription,
      budget: processedData.budget || "No especificado",
      timeline: processedData.timeline || "Flexible",
      requirements: processedData.requirements || "Ninguno específico",
      reply_to: processedData.email,
      subject: `Nueva Solicitud de Cotización - ${serviceName}`,
    };

    const result = await sendEmailWithService(
      EMAILJS_CONFIG.TEMPLATES.QUOTE,
      templateParams,
      processedData.email
    );

    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message || "Error al enviar cotización",
    };
  }
};

/**
 * Función para enviar solicitud de consulta
 * @param {Object} formData - Datos del formulario
 * @param {string} serviceName - Nombre del servicio
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendConsultationRequestEmail = async (formData, serviceName) => {
  try {
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    const processedData = processFormData(formData);
    const templateParams = {
      to_email: "axonapp.info@gmail.com",
      from_name: processedData.name,
      from_email: processedData.email,
      company: processedData.company || "No especificada",
      phone: processedData.phone || "No proporcionado",
      service_name: serviceName,
      preferred_date: processedData.preferredDate || "Flexible",
      preferred_time: processedData.preferredTime || "Cualquier horario",
      consultation_type: processedData.consultationType || "Consulta general",
      topics: processedData.topics || "Temas generales",
      experience: processedData.experience || "No especificado",
      reply_to: processedData.email,
      subject: `Nueva Solicitud de Consulta - ${serviceName}`,
    };

    const result = await sendEmailWithService(
      EMAILJS_CONFIG.TEMPLATES.CONSULTATION,
      templateParams,
      processedData.email
    );

    return result;
  } catch (error) {
    return {
      success: false,
      error: error.message || "Error al enviar consulta",
    };
  }
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

/**
 * Envía una solicitud de cotización por email
 * @param {Object} quoteData - Datos de la cotización
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendQuoteRequest = async (quoteData) => {
  try {
    // Validar datos básicos
    const validation = validateFormData(quoteData);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors.join(", "),
      };
    } // Procesar datos
    const processedData = processFormData(quoteData);

    // Seleccionar servicio basado en el email de destino (Axon.App)
    const service = selectEmailService("axonapp.info@gmail.com");

    // Enviar email real con EmailJS
    const result = await emailjs.send(
      service.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.QUOTE,
      {
        ...processedData,
        to_email: service.EMAIL,
        from_name: processedData.name,
        from_email: processedData.email,
        reply_to: processedData.email,
        service_name: service.NAME,
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    if (result.status === 200) {
      return {
        success: true,
        data: processedData,
        service: service.NAME,
      };
    } else {
      throw new Error("Error en el envío");
    }
  } catch {
    return {
      success: false,
      error: "Error al enviar la cotización. Por favor, intenta nuevamente.",
    };
  }
};

/**
 * Envía una solicitud de consulta por email
 * @param {Object} consultationData - Datos de la consulta
 * @returns {Promise<Object>} - Resultado del envío
 */
export const sendConsultationRequest = async (consultationData) => {
  try {
    // Validar datos básicos
    const validation = validateFormData(consultationData);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors.join(", "),
      };
    } // Procesar datos
    const processedData = processFormData(consultationData);

    // Seleccionar servicio basado en el email de destino (Axon.App)
    const service = selectEmailService("axonapp.info@gmail.com");

    // Enviar email real con EmailJS
    const result = await emailjs.send(
      service.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATES.CONSULTATION,
      {
        ...processedData,
        to_email: service.EMAIL,
        from_name: processedData.name,
        from_email: processedData.email,
        reply_to: processedData.email,
        service_name: service.NAME,
      },
      EMAILJS_CONFIG.PUBLIC_KEY
    );

    if (result.status === 200) {
      return {
        success: true,
        data: processedData,
        service: service.NAME,
      };
    } else {
      throw new Error("Error en el envío");
    }
  } catch {
    return {
      success: false,
      error: "Error al programar la consulta. Por favor, intenta nuevamente.",
    };
  }
};
