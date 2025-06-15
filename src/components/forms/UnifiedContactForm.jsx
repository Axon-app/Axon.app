import React, { useCallback, useState } from "react";
import { useRecaptcha } from "../../hooks/useRecaptcha";
import { sendUnifiedEmail } from "../../services/emailService";
import { ReCaptchaComponent } from "../security/ReCaptcha";

// Utilidad para crear modales
const createModal = (content, className = "") => {
  const modal = document.createElement("div");
  modal.className = `fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm ${className}`;
  modal.innerHTML = content;
  document.body.appendChild(modal);

  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");

  const focusableElements = modal.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusableElements.length > 0) {
    focusableElements[0].focus();
  }

  setTimeout(() => {
    if (document.body.contains(modal)) {
      modal.remove();
    }
  }, 10000);

  return modal;
};

// Modal de éxito mejorado
const getSuccessModalContent = (type) => {
  const titles = {
    contact: "¡Mensaje Enviado Exitosamente!",
    quote: "¡Solicitud de Propuesta Recibida!",
    consultation: "¡Consulta Programada Correctamente!",
  };

  const messages = {
    contact:
      "Hemos recibido tu mensaje exitosamente. Nuestro equipo lo revisará y te contactaremos dentro de las próximas 24 horas.",
    quote:
      "Hemos recibido tu solicitud de propuesta. Nuestro equipo analizará los detalles de tu proyecto y te enviaremos una estimación detallada dentro de las próximas 24 horas.",
    consultation:
      "Hemos recibido tu solicitud de consulta. Te contactaremos para confirmar la fecha, hora y modalidad de la reunión dentro de las próximas 24 horas.",
  };

  const nextSteps = {
    contact: [
      "📧 Recibirás una confirmación por email",
      "👥 Un especialista revisará tu consulta",
      "📞 Te contactaremos en máximo 24 horas",
      "💬 Responderemos todas tus preguntas",
    ],
    quote: [
      "📧 Recibirás una confirmación por email",
      "📊 Analizaremos los requerimientos de tu proyecto",
      "💰 Prepararemos una propuesta detallada",
      "📋 Te enviaremos la propuesta en 24-48 horas",
    ],
    consultation: [
      "📧 Recibirás una confirmación por email",
      "📅 Coordinaremos fecha y hora contigo",
      "🎯 Prepararemos la agenda de la consulta",
      "💼 Te enviaremos el enlace de la reunión",
    ],
  };

  return `
    <div class="bg-gradient-to-br from-green-900 to-emerald-900 rounded-2xl p-6 sm:p-8 max-w-lg w-full border border-green-500/30 shadow-2xl animate-fade-in">
      <div class="text-center mb-6">
        <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
          <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-bold text-white mb-3">${titles[type]}</h3>
        <p class="text-green-100 leading-relaxed">${messages[type]}</p>
      </div>

      <div class="bg-green-800/30 rounded-xl p-4 mb-6 border border-green-500/20">
        <h4 class="text-green-300 font-semibold mb-3 flex items-center">
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
          Próximos pasos:
        </h4>
        <ul class="space-y-2">
          ${nextSteps[type]
            .map(
              (step) => `
            <li class="flex items-start space-x-2 text-green-100 text-sm">
              <span class="block w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></span>
              <span>${step}</span>
            </li>
          `
            )
            .join("")}
        </ul>
      </div>

      <div class="bg-green-500/10 rounded-lg p-3 mb-6 border border-green-500/20">
        <div class="flex items-center text-sm text-green-200">
          <svg class="w-4 h-4 mr-2 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span>Revisa tu bandeja de entrada (incluyendo spam) para la confirmación</span>
        </div>
      </div>

      <button 
        onclick="this.closest('[role=dialog]').remove()" 
        class="w-full py-3 px-6 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
      >
        Entendido
      </button>
    </div>
  `;
};

// Modal de error
const getErrorModalContent = (error) => `
  <div class="bg-gradient-to-br from-red-900 to-red-800 rounded-2xl p-6 sm:p-8 max-w-md w-full border border-red-500/30 shadow-2xl">
    <div class="text-center">
      <div class="w-12 h-12 sm:w-16 sm:h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      <h3 class="text-xl sm:text-2xl font-bold text-white mb-3">Error en el Envío</h3>
      <p class="text-red-200 mb-4 text-sm sm:text-base">
        ${error}
      </p>
      <p class="text-red-300 text-xs sm:text-sm mb-6">
        Por favor, verifica los datos e intenta nuevamente.
      </p>
      <button onclick="this.parentElement.parentElement.parentElement.remove()" 
              class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 sm:py-3 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-red-400"
              aria-label="Cerrar modal de error">
        Entendido
      </button>
    </div>
  </div>
`;

// Tipos de proyecto para propuestas comerciales
const PROJECT_TYPES = [
  "Desarrollo Web",
  "Aplicación Móvil",
  "E-commerce",
  "Sistema de Gestión",
  "Consultoría Técnica",
  "Mantenimiento Web",
  "Otro",
];

// Tipos de cliente
const CLIENT_TYPES = [
  "Empresa",
  "Emprendedor",
  "Freelancer",
  "Organización sin fines de lucro",
  "Gobierno",
  "Estudiante",
  "Otro",
];

export const UnifiedContactForm = React.memo(
  ({
    mode = "contact", // 'contact', 'quote', 'consultation'
    onClose = null,
    className = "",
  }) => {
    const [formData, setFormData] = useState({
      // Campos básicos (para todos los tipos)
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",

      // Campos específicos para propuesta comercial
      city: "",
      clientType: "",
      projectType: "",
      projectDescription: "",
      additionalRequirements: "",

      // Campos específicos para consulta
      consultationType: "",
      preferredDate: "",
      preferredTime: "",
      topics: "",
      meetingType: "video-call",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    // Hook de reCAPTCHA v2
    const {
      recaptchaToken,
      isRecaptchaVerified,
      recaptchaError,
      handleRecaptchaVerify,
      handleRecaptchaError,
      handleRecaptchaExpired,
      resetRecaptcha,
    } = useRecaptcha();

    // Definir campos obligatorios por modo
    const getRequiredFields = useCallback(() => {
      const baseFields = [
        { key: "name", label: "Nombre completo" },
        { key: "email", label: "Correo electrónico" },
      ];

      switch (mode) {
        case "contact":
          return [...baseFields, { key: "message", label: "Mensaje" }];
        case "quote":
          return [
            ...baseFields,
            { key: "projectType", label: "Tipo de proyecto" },
            { key: "projectDescription", label: "Descripción del proyecto" },
          ];
        case "consultation":
          return [
            ...baseFields,
            { key: "consultationType", label: "Tipo de consulta" },
            { key: "topics", label: "Temas a tratar" },
          ];
        default:
          return baseFields;
      }
    }, [mode]);

    // Verificar campos completados
    const getCompletedFields = useCallback(() => {
      const requiredFields = getRequiredFields();
      return requiredFields.filter((field) => {
        const value = formData[field.key];
        return value && value.toString().trim() !== "";
      });
    }, [formData, getRequiredFields]);

    // Verificar campos pendientes
    const getPendingFields = useCallback(() => {
      const requiredFields = getRequiredFields();
      return requiredFields.filter((field) => {
        const value = formData[field.key];
        return !value || value.toString().trim() === "";
      });
    }, [formData, getRequiredFields]);

    // Verificar si el formulario está completo
    const isFormComplete = useCallback(() => {
      return getPendingFields().length === 0;
    }, [getPendingFields]);

    // Validación básica
    const validateForm = useCallback(() => {
      const newErrors = {};

      if (!formData.name.trim()) {
        newErrors.name = "El nombre es requerido";
      }

      if (!formData.email.trim()) {
        newErrors.email = "El email es requerido";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "El email no es válido";
      }

      if (mode === "contact" && !formData.message.trim()) {
        newErrors.message = "El mensaje es requerido";
      }

      if (mode === "quote") {
        if (!formData.projectType) {
          newErrors.projectType = "El tipo de proyecto es requerido";
        }
        if (!formData.projectDescription.trim()) {
          newErrors.projectDescription =
            "La descripción del proyecto es requerida";
        }
      }

      if (mode === "consultation") {
        if (!formData.consultationType) {
          newErrors.consultationType = "El tipo de consulta es requerido";
        }
        if (!formData.topics.trim()) {
          newErrors.topics = "Los temas a tratar son requeridos";
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    }, [formData, mode]);

    // Manejar cambios en el formulario
    const handleChange = useCallback(
      (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));

        // Limpiar error del campo cuando el usuario empiece a escribir
        if (errors[name]) {
          setErrors((prev) => ({
            ...prev,
            [name]: "",
          }));
        }
      },
      [errors]
    );

    // Enviar formulario
    const handleSubmit = async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        return;
      }
      setIsSubmitting(true);

      try {
        // Verificar que reCAPTCHA esté completado (v2)
        if (!isRecaptchaVerified || !recaptchaToken) {
          createModal(
            getErrorModalContent(
              "Por favor, completa la verificación de reCAPTCHA antes de enviar."
            )
          );
          setIsSubmitting(false);
          return;
        }

        // Agregar token de reCAPTCHA a los datos del formulario
        const formDataWithRecaptcha = {
          ...formData,
          recaptchaToken,
        };

        const result = await sendUnifiedEmail(mode, formDataWithRecaptcha);

        if (result.success) {
          createModal(getSuccessModalContent(mode));

          // Resetear formulario y reCAPTCHA
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            message: "",
            city: "",
            clientType: "",
            projectType: "",
            projectDescription: "",
            additionalRequirements: "",
            consultationType: "",
            preferredDate: "",
            preferredTime: "",
            topics: "",
            meetingType: "video-call",
          });

          resetRecaptcha();

          // Cerrar modal si existe
          if (onClose) {
            setTimeout(() => onClose(), 1500);
          }
        } else {
          const errorMessage = result.error || "Ocurrió un error inesperado";
          createModal(getErrorModalContent(errorMessage));
          resetRecaptcha();
        }
      } catch {
        createModal(
          getErrorModalContent(
            "Error de conexión. Por favor, intenta nuevamente."
          )
        );
        resetRecaptcha();
      } finally {
        setIsSubmitting(false);
      }
    };
    // Renderizar campo con diseño profesional mejorado
    const renderField = (
      name,
      label,
      type = "text",
      required = false,
      options = null,
      icon = null
    ) => (
      <div className="group mb-6">
        <label
          htmlFor={name}
          className="flex items-center text-sm font-semibold text-gray-200 mb-3"
        >
          {icon && <span className="mr-2 text-blue-400">{icon}</span>}
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>

        <div className="relative">
          {type === "textarea" ? (
            <textarea
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              rows="5"
              className={`w-full px-4 py-4 bg-gray-800/70 backdrop-blur-sm border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 resize-none shadow-lg ${
                errors[name]
                  ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-400 bg-red-900/10"
                  : "border-gray-600/50 focus:ring-blue-500/50 focus:border-blue-400 hover:border-gray-500/70 group-hover:shadow-blue-500/10"
              }`}
              placeholder={`Describe ${label.toLowerCase()} en detalle...`}
            />
          ) : type === "select" ? (
            <select
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={`w-full px-4 py-4 bg-gray-800/70 backdrop-blur-sm border-2 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 shadow-lg cursor-pointer ${
                errors[name]
                  ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-400 bg-red-900/10"
                  : "border-gray-600/50 focus:ring-blue-500/50 focus:border-blue-400 hover:border-gray-500/70 group-hover:shadow-blue-500/10"
              }`}
              style={{ appearance: "none" }}
            >
              <option value="" className="bg-gray-800 text-gray-400">
                Selecciona {label.toLowerCase()}
              </option>
              {options?.map((option) => (
                <option
                  key={option}
                  value={option}
                  className="bg-gray-800 text-white py-2"
                >
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              id={name}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className={`w-full px-4 py-4 bg-gray-800/70 backdrop-blur-sm border-2 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300 shadow-lg ${
                errors[name]
                  ? "border-red-500/50 focus:ring-red-500/50 focus:border-red-400 bg-red-900/10"
                  : "border-gray-600/50 focus:ring-blue-500/50 focus:border-blue-400 hover:border-gray-500/70 group-hover:shadow-blue-500/10"
              }`}
              placeholder={`Ingresa tu ${label.toLowerCase()}`}
            />
          )}

          {/* Icono de select dropdown */}
          {type === "select" && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          )}

          {/* Indicador de campo válido */}
          {formData[name] && !errors[name] && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
              <svg
                className="w-5 h-5 text-green-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </div>
          )}
        </div>

        {errors[name] && (
          <div className="mt-2 flex items-center text-red-400">
            <svg
              className="w-4 h-4 mr-2 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm font-medium">{errors[name]}</p>
          </div>
        )}
      </div>
    ); // Títulos según el modo
    const titles = {
      contact: "Formulario de información y contacto",
      quote: "Detalles del Proyecto",
      consultation: "Agenda tu Consulta",
    };
    return (
      <div className={`relative ${className}`}>
        {/* Header del formulario con gradiente profesional */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                {mode === "contact" && (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                )}
                {mode === "quote" && (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                )}
                {mode === "consultation" && (
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V4m6 3V4m-6 0h6m6 0v13a2 2 0 01-2 2H6a2 2 0 01-2-2V7h16z"
                    ></path>
                  </svg>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {titles[mode]}
                </h2>{" "}
                <p className="text-gray-400 text-sm">
                  {mode === "contact" &&
                    "Completa el formulario y te responderemos pronto"}
                  {mode === "quote" &&
                    "Proporciona detalles de tu proyecto para una propuesta personalizada"}
                  {mode === "consultation" &&
                    "Programa una consulta gratuita con nuestros expertos"}
                </p>
              </div>
            </div>

            {/* Badge de modo */}
            <div className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full border border-blue-500/30">
              <span className="text-blue-400 text-xs font-semibold uppercase tracking-wider">
                {mode === "contact" && "Contacto"}
                {mode === "quote" && "Propuesta"}
                {mode === "consultation" && "Consulta"}
              </span>
            </div>
          </div>{" "}
          {/* Barra de progreso visual */}
          <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Componente de Verificación Dinámica */}
        <div className="mb-8 p-6 bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-2xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-white">
                Estado del Formulario
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  isFormComplete()
                    ? "bg-green-500 animate-pulse"
                    : "bg-orange-500"
                }`}
              ></div>
              <span
                className={`text-sm font-medium ${
                  isFormComplete() ? "text-green-400" : "text-orange-400"
                }`}
              >
                {isFormComplete() ? "Listo para enviar" : "Campos pendientes"}
              </span>
            </div>
          </div>

          {/* Progreso visual */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-400">Progreso</span>
              <span className="text-sm font-medium text-blue-400">
                {getCompletedFields().length} / {getRequiredFields().length}
              </span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${
                    (getCompletedFields().length / getRequiredFields().length) *
                    100
                  }%`,
                }}
              ></div>
            </div>
          </div>

          {/* Lista de campos pendientes */}
          {getPendingFields().length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-orange-400 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                  ></path>
                </svg>
                Campos obligatorios pendientes:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {getPendingFields().map((field) => (
                  <div
                    key={field.key}
                    className="flex items-center space-x-2 p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg"
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-sm text-orange-300">
                      {field.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mensaje de éxito cuando está completo */}
          {isFormComplete() && (
            <div className="flex items-center space-x-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-green-400">
                  ¡Formulario completado!
                </p>
                <p className="text-xs text-green-300">
                  Todos los campos obligatorios han sido llenados correctamente.
                </p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sección de información personal */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 shadow-xl">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
              Información Personal
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField(
                "name",
                "Nombre completo",
                "text",
                true,
                null,
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
              )}
              {renderField(
                "email",
                "Email",
                "email",
                true,
                null,
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {renderField(
                "phone",
                "Teléfono",
                "tel",
                false,
                null,
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
              )}
              {renderField(
                "company",
                "Empresa/Organización",
                "text",
                false,
                null,
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  ></path>
                </svg>
              )}
            </div>
          </div>
          {/* Campos específicos según el modo */}
          {mode === "contact" && (
            <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 shadow-xl">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                Tu Mensaje
              </h3>
              {renderField(
                "message",
                "Mensaje",
                "textarea",
                true,
                null,
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  ></path>
                </svg>
              )}
            </div>
          )}
          {mode === "quote" && (
            <div className="space-y-6">
              {/* Información del proyecto */}
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                  Detalles del Proyecto
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderField(
                    "city",
                    "Ciudad",
                    "text",
                    false,
                    null,
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  )}
                  {renderField(
                    "clientType",
                    "Tipo de cliente",
                    "select",
                    false,
                    CLIENT_TYPES,
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      ></path>
                    </svg>
                  )}
                </div>

                {renderField(
                  "projectType",
                  "Tipo de proyecto",
                  "select",
                  true,
                  PROJECT_TYPES,
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    ></path>
                  </svg>
                )}

                {renderField(
                  "projectDescription",
                  "Descripción del proyecto",
                  "textarea",
                  true,
                  null,
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                )}

                {renderField(
                  "additionalRequirements",
                  "Requisitos adicionales",
                  "textarea",
                  false,
                  null,
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                    ></path>
                  </svg>
                )}
              </div>
            </div>
          )}
          {mode === "consultation" && (
            <div className="space-y-6">
              {/* Información de la consulta */}
              <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 shadow-xl">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0V4m6 3V4m-6 0h6m6 0v13a2 2 0 01-2 2H6a2 2 0 01-2-2V7h16z"
                    ></path>
                  </svg>
                  Detalles de la Consulta
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderField("city", "Ciudad", "text", false, null)}
                  {renderField(
                    "clientType",
                    "Tipo de cliente",
                    "select",
                    false,
                    CLIENT_TYPES
                  )}
                </div>

                {renderField(
                  "consultationType",
                  "Tipo de consulta",
                  "select",
                  true,
                  [
                    "Consulta General",
                    "Consulta Técnica",
                    "Estrategia Digital",
                    "Revisión de Proyecto",
                    "Asesoría de Desarrollo",
                    "Otro",
                  ]
                )}

                {renderField("topics", "Temas a tratar", "textarea", true)}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderField("preferredDate", "Fecha preferida", "date")}
                  {renderField("preferredTime", "Hora preferida", "time")}
                </div>

                {/* Tipo de reunión con diseño mejorado */}
                <div className="group mb-6">
                  <label className="flex items-center text-sm font-semibold text-gray-200 mb-3">
                    <svg
                      className="w-4 h-4 mr-2 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      ></path>
                    </svg>
                    Tipo de reunión
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        value: "video-call",
                        label: "Videollamada",
                        icon: "🎥",
                      },
                      {
                        value: "phone-call",
                        label: "Llamada telefónica",
                        icon: "📞",
                      },
                      { value: "in-person", label: "Presencial", icon: "🤝" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="relative flex items-center cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="meetingType"
                          value={option.value}
                          checked={formData.meetingType === option.value}
                          onChange={handleChange}
                          className="sr-only"
                        />
                        <div
                          className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                            formData.meetingType === option.value
                              ? "border-blue-500 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                              : "border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50"
                          }`}
                        >
                          <div className="flex items-center justify-center flex-col space-y-2">
                            <span className="text-2xl">{option.icon}</span>
                            <span
                              className={`text-sm font-medium ${
                                formData.meetingType === option.value
                                  ? "text-blue-400"
                                  : "text-gray-300"
                              }`}
                            >
                              {option.label}
                            </span>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}{" "}
          {/* Componente reCAPTCHA v3 */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m5.5-2A8.5 8.5 0 1119 12a8.5 8.5 0 01-8.5-8.5z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  Verificación de Seguridad
                </h3>
              </div>

              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isRecaptchaVerified ? "bg-green-500" : "bg-gray-500"
                  }`}
                ></div>
                <span
                  className={`text-sm font-medium ${
                    isRecaptchaVerified ? "text-green-400" : "text-gray-400"
                  }`}
                >
                  {isRecaptchaVerified ? "Verificado" : "Pendiente"}
                </span>
              </div>
            </div>{" "}
            <ReCaptchaComponent
              onVerify={handleRecaptchaVerify}
              onError={handleRecaptchaError}
              onExpired={handleRecaptchaExpired}
              className="mb-4"
            />
            {recaptchaError && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <svg
                    className="w-4 h-4 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                    ></path>
                  </svg>
                  <span className="text-sm text-red-300">{recaptchaError}</span>
                </div>
              </div>
            )}
          </div>
          {/* Botón de envío mejorado con estado dinámico */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/30 shadow-xl">
            {/* Indicador de estado antes del botón */}
            {!isFormComplete() && (
              <div className="mb-4 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-orange-300">
                    Completa los campos obligatorios para continuar
                  </span>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || !isFormComplete()}
              className={`w-full relative overflow-hidden group py-4 px-8 rounded-2xl font-bold text-white transition-all duration-500 transform ${
                isSubmitting
                  ? "bg-gray-600 cursor-not-allowed scale-95"
                  : !isFormComplete()
                  ? "bg-gray-700 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 hover:from-blue-700 hover:via-purple-700 hover:to-blue-900 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25"
              }`}
            >
              {/* Efecto de brillo animado solo cuando está habilitado */}
              {!isSubmitting && isFormComplete() && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              )}

              <div className="relative flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    <span>Enviando...</span>
                  </>
                ) : !isFormComplete() ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-3 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                      ></path>
                    </svg>
                    <span>Completar campos obligatorios</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-3 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      ></path>
                    </svg>
                    <span>
                      {mode === "contact" && "Enviar Mensaje"}
                      {mode === "quote" && "Solicitar Propuesta"}
                      {mode === "consultation" && "Programar Consulta"}
                    </span>
                  </>
                )}
              </div>
            </button>

            {/* Información adicional */}
            <div className="mt-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
              <div className="flex items-center text-sm text-gray-300">
                <svg
                  className="w-4 h-4 mr-2 text-green-400 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>
                  Respuesta garantizada en 24 horas • Consulta inicial gratuita
                  • Datos 100% seguros
                </span>
              </div>
            </div>

            {/* Botón de cerrar si es modal */}
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-full mt-4 py-3 px-4 text-gray-400 hover:text-white transition-colors rounded-xl border border-gray-600 hover:border-gray-500 hover:bg-gray-800/50"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }
);

UnifiedContactForm.displayName = "UnifiedContactForm";
