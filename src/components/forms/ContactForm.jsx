import React, { useCallback, useState } from "react";

// Utilidad para crear modales de forma más eficiente
const createModal = (content, className = "") => {
  const modal = document.createElement("div");
  modal.className = `fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm ${className}`;
  modal.innerHTML = content;
  document.body.appendChild(modal);

  // Mejorar accesibilidad
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");

  // Focus trap básico
  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }

  // Auto-cleanup en caso de memory leak
  setTimeout(() => {
    if (document.body.contains(modal)) {
      modal.remove();
    }
  }, 10000); // 10 segundos máximo

  return modal;
};

// Contenido del modal de éxito
const getSuccessModalContent = () => `
  <div class="bg-gradient-to-br from-green-900 to-emerald-900 rounded-2xl p-6 sm:p-8 max-w-md w-full border border-green-500/30 shadow-2xl">
    <div class="text-center">
      <div class="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h3 class="text-xl sm:text-2xl font-bold text-white mb-3">¡Mensaje Enviado!</h3>
      <p class="text-green-200 mb-4 text-sm sm:text-base">
        Hemos recibido tu mensaje exitosamente. Te contactaremos dentro de las próximas 24 horas.
      </p>
      <p class="text-green-300 text-xs sm:text-sm mb-6">
        ✅ Email enviado a nuestro equipo<br>
        ✅ Confirmación enviada a tu correo<br>
        📧 Respuesta garantizada en 24h
      </p>
      <button onclick="this.parentElement.parentElement.parentElement.remove()" 
              class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-400"
              aria-label="Cerrar modal de confirmación">
        Aceptar
      </button>
    </div>
  </div>
`;

// Contenido del modal de error
const getErrorModalContent = () => `
  <div class="bg-gradient-to-br from-red-900 to-rose-900 rounded-2xl p-6 sm:p-8 max-w-md w-full border border-red-500/30 shadow-2xl">
    <div class="text-center">
      <div class="w-12 h-12 sm:w-16 sm:h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      <h3 class="text-xl sm:text-2xl font-bold text-white mb-3">Error al Enviar</h3>
      <p class="text-red-200 mb-4 text-sm sm:text-base">
        Hubo un problema al enviar tu mensaje. Por favor, inténtalo nuevamente o contáctanos directamente.
      </p>
      <p class="text-red-300 text-xs sm:text-sm mb-6">
        📧 Email directo: <a href="mailto:axonapp.info@gmail.com" class="underline hover:text-red-200">axonapp.info@gmail.com</a>
      </p>
      <button onclick="this.parentElement.parentElement.parentElement.remove()" 
              class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Cerrar modal de error">
        Cerrar
      </button>
    </div>
  </div>
`;

// Componente de formulario de contacto optimizado
export const ContactForm = React.memo(() => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  // Validación de formulario optimizada con useCallback
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "El email no es válido";
    }

    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      // Limpiar error del campo cuando el usuario empieza a escribir
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Importación dinámica del servicio de email
      const { sendEmailDemo } = await import("../../services/emailService");

      const result = await sendEmailDemo("contact", formData);

      if (result.success) {
        setFormData({ name: "", email: "", message: "" });
        setErrors({}); // Crear modal personalizado de confirmación usando función optimizada
        const confirmationModal = createModal(getSuccessModalContent());

        // Auto-cerrar modal después de 5 segundos
        setTimeout(() => {
          if (document.body.contains(confirmationModal)) {
            confirmationModal.remove();
          }
        }, 5000);
      } else {
        throw new Error(result.error || "Error desconocido");
      }
    } catch (error) {
      console.error("Error:", error);

      // Modal de error usando función optimizada
      createModal(getErrorModalContent());
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-xl"
      noValidate
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Campo Nombre */}
        <div className="md:col-span-1">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Nombre *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-slate-700/50 text-white rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.name
                ? "border-2 border-red-500 focus:ring-red-500"
                : "border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            }`}
            placeholder="Tu nombre completo"
            disabled={isSubmitting}
            autoComplete="name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        {/* Campo Email */}
        <div className="md:col-span-1">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 bg-slate-700/50 text-white rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 ${
              errors.email
                ? "border-2 border-red-500 focus:ring-red-500"
                : "border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            }`}
            placeholder="tu@email.com"
            disabled={isSubmitting}
            autoComplete="email"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        {/* Campo Mensaje */}
        <div className="md:col-span-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Mensaje *
          </label>{" "}
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            onInput={(e) => {
              // Auto-resize textarea
              e.target.style.height = "auto";
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            className={`w-full px-4 py-3 bg-slate-700/50 text-white rounded-lg focus:outline-none focus:ring-2 transition-all duration-300 resize-vertical ${
              errors.message
                ? "border-2 border-red-500 focus:ring-red-500"
                : "border border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            }`}
            placeholder="Cuéntanos sobre tu proyecto..."
            disabled={isSubmitting}
          ></textarea>
          {errors.message && (
            <p className="mt-1 text-sm text-red-400" role="alert">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      {/* Botón de envío */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full mt-6 sm:mt-8 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold text-base sm:text-lg transition-all duration-300 transform ${
          isSubmitting
            ? "opacity-50 cursor-not-allowed"
            : "hover:from-blue-700 hover:to-cyan-700 hover:scale-[1.02] active:scale-[0.98]"
        } shadow-lg`}
        aria-label={isSubmitting ? "Enviando mensaje..." : "Enviar mensaje"}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Enviando...
          </span>
        ) : (
          "Enviar Mensaje"
        )}
      </button>

      {/* Información de contacto directo */}
      <div className="mt-4 text-center text-xs sm:text-sm text-gray-400">
        También puedes contactarnos directamente en:{" "}
        <a
          href="mailto:axonapp.info@gmail.com"
          className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline"
        >
          axonapp.info@gmail.com
        </a>
      </div>
    </form>
  );
});

ContactForm.displayName = "ContactForm";
