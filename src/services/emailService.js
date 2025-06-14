import emailjs from "@emailjs/browser";

// Configuración de EmailJS
const EMAIL_SERVICE_ID = "service_axon_app"; // Deberás crear este servicio en EmailJS
const EMAIL_TEMPLATE_CONTACT = "template_contact"; // Template para formulario de contacto
const EMAIL_TEMPLATE_QUOTE = "template_quote"; // Template para cotizaciones
const EMAIL_TEMPLATE_CONSULTATION = "template_consultation"; // Template para consultas
const EMAIL_PUBLIC_KEY = "YOUR_PUBLIC_KEY"; // Tu clave pública de EmailJS

// Inicializar EmailJS
emailjs.init(EMAIL_PUBLIC_KEY);

// Función para enviar email de contacto general
export const sendContactEmail = async (formData) => {
  try {
    const templateParams = {
      to_email: "axonapp.info@gmail.com",
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
      reply_to: formData.email,
      subject: "Nuevo mensaje de contacto desde Axon.App",
    };

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_CONTACT,
      templateParams
    );

    console.log("Email de contacto enviado exitosamente:", response);
    return { success: true, response };
  } catch (error) {
    console.error("Error enviando email de contacto:", error);
    return { success: false, error };
  }
};

// Función para enviar solicitud de cotización
export const sendQuoteRequestEmail = async (formData, serviceName) => {
  try {
    const templateParams = {
      to_email: "axonapp.info@gmail.com",
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || "No especificada",
      phone: formData.phone || "No proporcionado",
      service_name: serviceName,
      project_description: formData.projectDescription,
      budget: formData.budget || "No especificado",
      timeline: formData.timeline || "Flexible",
      requirements: formData.requirements || "Ninguno específico",
      reply_to: formData.email,
      subject: `Nueva Solicitud de Cotización - ${serviceName}`,
    };

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_QUOTE,
      templateParams
    );

    console.log("Solicitud de cotización enviada exitosamente:", response);
    return { success: true, response };
  } catch (error) {
    console.error("Error enviando solicitud de cotización:", error);
    return { success: false, error };
  }
};

// Función para enviar solicitud de consulta
export const sendConsultationRequestEmail = async (formData, serviceName) => {
  try {
    const templateParams = {
      to_email: "axonapp.info@gmail.com",
      from_name: formData.name,
      from_email: formData.email,
      company: formData.company || "No especificada",
      phone: formData.phone || "No proporcionado",
      service_name: serviceName,
      preferred_date: formData.preferredDate || "Flexible",
      preferred_time: formData.preferredTime || "Cualquier horario",
      consultation_type: formData.consultationType || "Consulta general",
      topics: formData.topics || "Temas generales",
      experience: formData.experience || "No especificado",
      reply_to: formData.email,
      subject: `Nueva Solicitud de Consulta - ${serviceName}`,
    };

    const response = await emailjs.send(
      EMAIL_SERVICE_ID,
      EMAIL_TEMPLATE_CONSULTATION,
      templateParams
    );

    console.log("Solicitud de consulta enviada exitosamente:", response);
    return { success: true, response };
  } catch (error) {
    console.error("Error enviando solicitud de consulta:", error);
    return { success: false, error };
  }
};

// Función alternativa usando fetch (para casos donde EmailJS no esté disponible)
export const sendEmailFallback = async (type, data, serviceName = "") => {
  try {
    // Esta sería una implementación alternativa usando un servicio como Formspree
    const response = await fetch("https://formspree.io/f/YOUR_FORM_ID", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "axonapp.info@gmail.com",
        type: type,
        service: serviceName,
        data: data,
        timestamp: new Date().toISOString(),
      }),
    });

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error("Error en el envío");
    }
  } catch (error) {
    console.error("Error en fallback email:", error);
    return { success: false, error };
  }
};

// Configuración para desarrollo/testing (simulación)
export const sendEmailDemo = async (type, data, serviceName = "") => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`📧 [DEMO] Email ${type} enviado a axonapp.info@gmail.com:`, {
        service: serviceName,
        data: data,
        timestamp: new Date().toLocaleString(),
      });
      resolve({ success: true, demo: true });
    }, 1000);
  });
};
