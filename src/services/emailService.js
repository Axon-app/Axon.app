import emailjs from "@emailjs/browser";

// Configuración de EmailJS
const EMAIL_SERVICE_ID = "service_axon_app";
const EMAIL_TEMPLATE_CONTACT = "template_contact";
const EMAIL_TEMPLATE_QUOTE = "template_quote";
const EMAIL_TEMPLATE_CONSULTATION = "template_consultation";
const EMAIL_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

// Inicializar EmailJS
emailjs.init(EMAIL_PUBLIC_KEY);

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

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_CONTACT,
      templateParams
    );

    return { success: true, response };
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

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_QUOTE,
      templateParams
    );

    return { success: true, response };
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

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_CONSULTATION,
      templateParams
    );

    return { success: true, response };
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
 * @param {string} _clientEmail - Email del cliente
 * @param {string} _type - Tipo de confirmación
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
