import React from "react";
import { useRecaptcha } from "../../hooks/useRecaptcha";
import { verifyRecaptchaToken } from "../../services/recaptchaService";
import { ReCaptchaComponent } from "../security/ReCaptcha";

// Funciones de validación y seguridad
const SecurityValidators = {
  // Sanitizar entrada para prevenir XSS
  sanitizeInput: (input) => {
    if (typeof input !== "string") return "";
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<[^>]*>/g, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "");
    // Removido .trim() para permitir espacios normales
  },

  // Validar email con regex seguro
  validateEmail: (email) => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  // Validar teléfono
  validatePhone: (phone) => {
    if (!phone) return true; // Campo opcional
    const phoneRegex = /^[+]?[0-9\s()-]{7,20}$/;
    return phoneRegex.test(phone);
  },

  // Validar nombre (solo letras, espacios, acentos)
  validateName: (name) => {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    return nameRegex.test(name);
  },

  // Validar ciudad
  validateCity: (city) => {
    const cityRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,.-]{2,100}$/;
    return cityRegex.test(city);
  },

  // Detectar patrones de inyección SQL básicos
  detectSQLInjection: (input) => {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
      /((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))/gi,
      /(((%3D)|(=))[^\n]*((%27)|(')|((%3B)|(;))))/gi,
      /((%27)|('))((%4F)|o|(%6F))((%52)|r|(%72))/gi,
    ];
    return sqlPatterns.some((pattern) => pattern.test(input));
  },

  // Validar longitud de campos
  validateLength: (value, min = 0, max = 1000) => {
    return value.length >= min && value.length <= max;
  },
};

export const QuoteRequestModal = React.memo(({ isOpen, onClose, service }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    clientType: "",
    company: "",
    city: "",
    projectType: service?.title || "",
    description: "",
    additionalRequirements: "",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);
  const [validationErrors, setValidationErrors] = React.useState({});
  const [securityError, setSecurityError] = React.useState("");

  // Estado de reCAPTCHA
  const { isRecaptchaVerified, resetRecaptcha } = useRecaptcha();

  // Calcular si el formulario está completo
  const isFormComplete = React.useMemo(() => {
    const requiredFields = [
      "name",
      "email",
      "clientType",
      "city",
      "projectType",
      "description",
    ];
    const hasRequiredFields = requiredFields.every((field) =>
      formData[field].trim()
    );
    const hasNoErrors =
      Object.keys(validationErrors).length === 0 && !securityError;
    return hasRequiredFields && hasNoErrors && isRecaptchaVerified;
  }, [formData, validationErrors, securityError, isRecaptchaVerified]);

  // Función para obtener campos faltantes y errores
  const getMissingFields = React.useMemo(() => {
    const missing = [];
    const errors = [];

    // Verificar campos requeridos
    if (!formData.name.trim()) missing.push("Nombre");
    if (!formData.email.trim()) missing.push("Email");
    if (!formData.clientType.trim()) missing.push("Tipo de Cliente");
    if (!formData.city.trim()) missing.push("Ciudad");
    if (!formData.projectType.trim()) missing.push("Tipo de Proyecto");
    if (!formData.description.trim()) missing.push("Descripción del Proyecto");

    // Verificar errores de validación
    Object.entries(validationErrors).forEach(([_field, error]) => {
      if (error) errors.push(error);
    });

    return {
      missing,
      errors,
      needsRecaptcha: !isRecaptchaVerified,
      hasIssues:
        missing.length > 0 || errors.length > 0 || !isRecaptchaVerified,
    };
  }, [formData, validationErrors, isRecaptchaVerified]);

  // Manejar escape key
  React.useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset form cuando se abre/cierra
  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        projectType: service?.title || "",
      }));
      setSubmitStatus(null);
      setValidationErrors({});
      setSecurityError("");
      resetRecaptcha(); // Reset reCAPTCHA al abrir el modal
    }
  }, [isOpen, service, resetRecaptcha]);

  // Early return si no está abierto
  if (!isOpen) return null;

  // Manejar cambios en el formulario con validación y sanitización
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Sanitizar entrada
    const sanitizedValue = SecurityValidators.sanitizeInput(value);

    // Detectar intentos de inyección
    if (SecurityValidators.detectSQLInjection(sanitizedValue)) {
      setSecurityError(
        "Entrada no válida detectada. Por favor, use solo caracteres alfanuméricos."
      );
      return;
    }

    // Limpiar errores de seguridad si la entrada es válida
    setSecurityError("");

    // Validar según el campo
    const errors = { ...validationErrors };

    switch (name) {
      case "name":
        if (
          sanitizedValue &&
          !SecurityValidators.validateName(sanitizedValue)
        ) {
          errors.name =
            "El nombre solo debe contener letras y espacios (2-50 caracteres)";
        } else {
          delete errors.name;
        }
        break;

      case "email":
        if (
          sanitizedValue &&
          !SecurityValidators.validateEmail(sanitizedValue)
        ) {
          errors.email = "Por favor ingresa un email válido";
        } else {
          delete errors.email;
        }
        break;

      case "phone":
        if (
          sanitizedValue &&
          !SecurityValidators.validatePhone(sanitizedValue)
        ) {
          errors.phone = "Formato de teléfono inválido (ej: +57 300 123 4567)";
        } else {
          delete errors.phone;
        }
        break;

      case "city":
        if (
          sanitizedValue &&
          !SecurityValidators.validateCity(sanitizedValue)
        ) {
          errors.city = "La ciudad solo debe contener letras y espacios";
        } else {
          delete errors.city;
        }
        break;

      case "description":
      case "additionalRequirements":
        if (
          sanitizedValue &&
          !SecurityValidators.validateLength(sanitizedValue, 0, 2000)
        ) {
          errors[name] = "El texto es demasiado largo (máximo 2000 caracteres)";
        } else {
          delete errors[name];
        }
        break;

      default:
        break;
    }

    setValidationErrors(errors);
    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));
  };

  // Función para manejar reCAPTCHA
  const handleRecaptchaVerify = async (token) => {
    try {
      // En producción, verificar el token en el backend
      const isValid = await verifyRecaptchaToken(token);
      if (!isValid) {
        setSecurityError("Verificación reCAPTCHA fallida. Intenta nuevamente.");
      }
    } catch {
      setSecurityError("Error en verificación reCAPTCHA. Intenta nuevamente.");
    }
  };

  const handleRecaptchaExpire = () => {
    setSecurityError(
      "La verificación reCAPTCHA ha expirado. Por favor, verifica nuevamente."
    );
  };

  const handleRecaptchaError = () => {
    setSecurityError(
      "Error en reCAPTCHA. Por favor, recarga la página e intenta nuevamente."
    );
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 0. Verificar si el formulario está completo antes de continuar
    if (!isFormComplete) {
      const missing = getMissingFields;
      let errorMessage = "⚠️ Por favor completa la información faltante:\n\n";

      if (missing.missing.length > 0) {
        errorMessage += `📝 Campos requeridos:\n• ${missing.missing.join(
          "\n• "
        )}\n\n`;
      }

      if (missing.errors.length > 0) {
        errorMessage += `❌ Errores a corregir:\n• ${missing.errors.join(
          "\n• "
        )}\n\n`;
      }

      if (missing.needsRecaptcha) {
        errorMessage += "🔒 Completa la verificación de seguridad reCAPTCHA";
      }

      setSecurityError(errorMessage);
      return;
    }

    if (!isRecaptchaVerified) {
      setSecurityError(
        "Por favor, completa la verificación reCAPTCHA antes de continuar."
      );
      return;
    }

    // Verificar token reCAPTCHA
    if (!isRecaptchaVerified) {
      setSecurityError(
        "La verificación reCAPTCHA falló. Por favor, intenta nuevamente."
      );
      return;
    }

    // Validación adicional de longitud para prevenir ataques
    if (
      !SecurityValidators.validateLength(formData.name, 2, 50) ||
      !SecurityValidators.validateLength(formData.email, 5, 254) ||
      !SecurityValidators.validateLength(formData.description, 10, 2000)
    ) {
      setSecurityError(
        "Algunos campos tienen una longitud inválida. Por favor, revisa la información."
      );
      return;
    }

    setIsSubmitting(true);
    setSecurityError("");

    try {
      // Preparar datos para envío con sanitización final
      const sanitizedData = {
        name: SecurityValidators.sanitizeInput(formData.name.trim()),
        email: SecurityValidators.sanitizeInput(formData.email.trim()),
        phone: SecurityValidators.sanitizeInput(formData.phone.trim()),
        clientType: SecurityValidators.sanitizeInput(
          formData.clientType.trim()
        ),
        company: SecurityValidators.sanitizeInput(formData.company.trim()),
        city: SecurityValidators.sanitizeInput(formData.city.trim()),
        projectType: SecurityValidators.sanitizeInput(
          formData.projectType.trim()
        ),
        description: SecurityValidators.sanitizeInput(
          formData.description.trim()
        ),
        additionalRequirements: SecurityValidators.sanitizeInput(
          formData.additionalRequirements.trim()
        ),
        timestamp: new Date().toISOString(),
        formType: "quote-request",
      };

      // Validación final antes del envío
      for (const [key, value] of Object.entries(sanitizedData)) {
        if (
          typeof value === "string" &&
          SecurityValidators.detectSQLInjection(value)
        ) {
          throw new Error(`Entrada inválida detectada en campo ${key}`);
        }
      }

      // Aquí iría la integración con EmailJS
      // console.log("Datos de cotización:", sanitizedData);

      // Simular envío
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setTimeout(() => {
        onClose();
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          clientType: "",
          company: "",
          city: "",
          projectType: service?.title || "",
          description: "",
          additionalRequirements: "",
        });
        setValidationErrors({});
        resetRecaptcha();
      }, 2000);
    } catch {
      // Error al enviar cotización
      setSecurityError(
        "Error al enviar la cotización. Por favor, intenta nuevamente o contáctanos directamente."
      );
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Manejar click en backdrop
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-blue-500/30">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-gray-700 p-4 sm:p-6 flex items-center justify-between">
          <h2
            id="quote-modal-title"
            className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
          >
            Solicitar Cotización
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Cerrar solicitud de cotización"
            type="button"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Mensajes de Error de Seguridad */}
        {securityError && (
          <div className="mx-4 sm:mx-6 mb-4 p-4 bg-red-900/50 border border-red-500/50 rounded-lg">
            <div className="flex items-start">
              <svg
                className="w-5 h-5 text-red-400 mr-2 flex-shrink-0 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <div className="text-red-300 text-sm font-medium whitespace-pre-line">
                {securityError}
              </div>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="p-4 sm:p-6">
          {submitStatus === "success" ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-400 mb-2">
                ¡Cotización Enviada!
              </h3>
              <p className="text-gray-300">
                Te contactaremos dentro de 24 horas con una propuesta detallada.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información personal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="quote-name"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Nombre <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quote-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    autoComplete="name"
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      validationErrors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                    placeholder="Tu nombre completo"
                  />
                  {validationErrors.name && (
                    <p className="text-red-400 text-xs mt-1">
                      {validationErrors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="quote-email"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quote-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      validationErrors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                    placeholder="tu@email.com"
                  />
                  {validationErrors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {validationErrors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="quote-phone"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Teléfono
                  </label>
                  <input
                    id="quote-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    autoComplete="tel"
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      validationErrors.phone
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                    placeholder="+57 300 123 4567"
                  />
                  {validationErrors.phone && (
                    <p className="text-red-400 text-xs mt-1">
                      {validationErrors.phone}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="quote-clientType"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Tipo de Cliente <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="quote-clientType"
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      validationErrors.clientType
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                  >
                    <option value="">Selecciona tipo</option>
                    <option value="empresa">Empresa</option>
                    <option value="persona-natural">Persona Natural</option>
                  </select>
                  {validationErrors.clientType && (
                    <p className="text-red-400 text-xs mt-1">
                      {validationErrors.clientType}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="quote-company"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    {formData.clientType === "empresa"
                      ? "Nombre de la Empresa"
                      : "Nombre/Razón Social"}
                  </label>
                  <input
                    id="quote-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    autoComplete="organization"
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                    placeholder={
                      formData.clientType === "empresa"
                        ? "Nombre de tu empresa"
                        : "Tu nombre o razón social"
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="quote-city"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Ciudad <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quote-city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      validationErrors.city
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                    placeholder="Bogotá, Medellín, Cali..."
                  />
                  {validationErrors.city && (
                    <p className="text-red-400 text-xs mt-1">
                      {validationErrors.city}
                    </p>
                  )}
                </div>
              </div>

              {/* Detalles del proyecto */}
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Tipo de Proyecto <span className="text-red-500">*</span>
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="Desarrollo Web Full-Stack">
                    Desarrollo Web Full-Stack
                  </option>
                  <option value="Aplicaciones Móviles">
                    Aplicaciones Móviles
                  </option>
                  <option value="Sistemas de Gestión">
                    Sistemas de Gestión
                  </option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="APIs y Microservicios">
                    APIs y Microservicios
                  </option>
                  <option value="Consultoría Técnica">
                    Consultoría Técnica
                  </option>
                  <option value="Migración de Sistemas">
                    Migración de Sistemas
                  </option>
                  <option value="Integración de Sistemas">
                    Integración de Sistemas
                  </option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Descripción del Proyecto{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all resize-none ${
                    validationErrors.description
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-600 focus:border-blue-500"
                  }`}
                  placeholder="Describe detalladamente tu proyecto, objetivos y requisitos específicos..."
                />
                {validationErrors.description && (
                  <p className="text-red-400 text-xs mt-1">
                    {validationErrors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Requerimientos Adicionales
                </label>
                <textarea
                  name="additionalRequirements"
                  value={formData.additionalRequirements}
                  onChange={handleInputChange}
                  rows="3"
                  className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all resize-none ${
                    validationErrors.additionalRequirements
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-600 focus:border-blue-500"
                  }`}
                  placeholder="Integraciones específicas, funcionalidades especiales, restricciones técnicas, etc."
                />
                {validationErrors.additionalRequirements && (
                  <p className="text-red-400 text-xs mt-1">
                    {validationErrors.additionalRequirements}
                  </p>
                )}
              </div>

              {submitStatus === "error" && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <p className="text-red-400 text-sm">
                    <strong>Error:</strong> Por favor verifica que todos los
                    campos requeridos estén completos y sean válidos. Si el
                    problema persiste, contáctanos directamente.
                  </p>
                </div>
              )}

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-300 font-semibold mb-2">
                  💡 Información sobre Cotizaciones
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Cotización gratuita y sin compromiso</li>
                  <li>• Respuesta dentro de 24 horas hábiles</li>
                  <li>• Propuesta detallada con cronograma</li>
                  <li>• Consulta inicial incluida en la cotización</li>
                </ul>
              </div>

              {/* Estado del formulario con validación paso a paso */}
              {isFormComplete ? (
                <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center mb-2">
                    <svg
                      className="w-5 h-5 text-green-400 mr-2 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-green-300 text-sm font-medium">
                      ✅ Formulario completo y listo para enviar
                    </span>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                  <div className="flex items-start mb-2">
                    <svg
                      className="w-5 h-5 text-orange-400 mr-2 flex-shrink-0 mt-0.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="flex-1">
                      <span className="text-orange-300 text-sm font-medium block mb-2">
                        📝 Información pendiente para completar el formulario
                      </span>

                      {/* Campos faltantes */}
                      {getMissingFields.missing.length > 0 && (
                        <div className="mb-3">
                          <p className="text-orange-200 text-xs font-medium mb-1">
                            Campos requeridos faltantes:
                          </p>
                          <ul className="text-orange-100 text-xs space-y-1">
                            {getMissingFields.missing.map((field, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-1 h-1 bg-orange-400 rounded-full mr-2"></span>
                                {field}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Errores de validación */}
                      {getMissingFields.errors.length > 0 && (
                        <div className="mb-3">
                          <p className="text-red-200 text-xs font-medium mb-1">
                            Errores a corregir:
                          </p>
                          <ul className="text-red-100 text-xs space-y-1">
                            {getMissingFields.errors.map((error, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-1 h-1 bg-red-400 rounded-full mr-2"></span>
                                {error}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* reCAPTCHA */}
                      {getMissingFields.needsRecaptcha && (
                        <div className="mb-2">
                          <p className="text-blue-200 text-xs font-medium mb-1">
                            Verificación de seguridad:
                          </p>
                          <p className="text-blue-100 text-xs flex items-center">
                            <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                            Completar verificación reCAPTCHA
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* reCAPTCHA */}
              <div className="border-t border-gray-700 pt-4">
                <ReCaptchaComponent
                  onVerify={handleRecaptchaVerify}
                  onExpire={handleRecaptchaExpire}
                  onError={handleRecaptchaError}
                />
              </div>

              {/* Botón de envío */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isFormComplete}
                  className={`flex-1 px-6 py-3 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isSubmitting || !isFormComplete
                      ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg hover:shadow-xl"
                  }`}
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
                    "Solicitar Cotización"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
});

QuoteRequestModal.displayName = "QuoteRequestModal";
