import React from "react";
import { useRecaptcha } from "../../hooks/useRecaptcha";
import { ReCaptchaComponent } from "../security/ReCaptcha";

// Generar opciones de horario una sola vez (9 AM - 5 PM, intervalos de 30 min)
const generateTimeOptions = () => {
  const options = [];
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}`;
      options.push(time);
    }
  }
  return options;
};

const TIME_OPTIONS = generateTimeOptions();

// Sanitización de entrada para prevenir XSS y SQL injection
const sanitizeInput = (input) => {
  if (typeof input !== "string") return "";

  return input
    .trim()
    .replace(/[<>]/g, "") // Eliminar caracteres HTML básicos
    .replace(/['"]/g, "") // Eliminar comillas para prevenir SQL injection
    .replace(/javascript:/gi, "") // Eliminar posibles scripts
    .replace(/on\w+=/gi, "") // Eliminar event handlers
    .substring(0, 1000); // Limitar longitud
};

// Validar email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar teléfono colombiano
const isValidPhone = (phone) => {
  if (!phone) return true; // Campo opcional
  const phoneRegex = /^(\+57|57)?[\s-]?[3][0-9]{9}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ""));
};

export const ConsultationModal = React.memo(({ isOpen, onClose }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    clientType: "empresa", // empresa o persona-natural
    city: "", // Campo obligatorio
    consultationType: "", // Siempre inicia vacío
    preferredDate: "",
    preferredTime: "",
    timezone: "",
    topics: "",
    questions: "",
    meetingType: "video-call",
  });

  const [errors, setErrors] = React.useState({});
  const [globalError, setGlobalError] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);

  // Hook para manejar reCAPTCHA
  const {
    isRecaptchaVerified,
    recaptchaToken,
    resetRecaptcha,
    executeRecaptcha,
  } = useRecaptcha();

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
  }, [isOpen, onClose]); // Reset form cuando se abre/cierra
  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        consultationType: "", // Siempre inicia vacío para permitir selección manual
      }));
      setSubmitStatus(null);
      setErrors({});
      setGlobalError("");
      resetRecaptcha();
    }
  }, [isOpen, resetRecaptcha]);

  // Early return si no está abierto
  if (!isOpen) return null;
  // Manejar cambios en el formulario con sanitización
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Sanitizar entrada
    const sanitizedValue = sanitizeInput(value);

    setFormData((prev) => ({
      ...prev,
      [name]: sanitizedValue,
    }));

    // Limpiar errores específicos del campo al modificarlo
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Limpiar error global si existe
    if (globalError) {
      setGlobalError("");
    }
  };

  // Validar formulario completo
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Campos obligatorios
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "El email no tiene un formato válido";
      isValid = false;
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ciudad es obligatoria";
      isValid = false;
    }

    if (!formData.consultationType.trim()) {
      newErrors.consultationType = "Debe seleccionar un tipo de consulta";
      isValid = false;
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "La fecha es obligatoria";
      isValid = false;
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = "La hora es obligatoria";
      isValid = false;
    }

    if (!formData.timezone) {
      newErrors.timezone = "La zona horaria es obligatoria";
      isValid = false;
    }

    if (!formData.topics.trim()) {
      newErrors.topics = "Debe describir los temas a tratar";
      isValid = false;
    }

    // Validación de teléfono si se proporciona
    if (formData.phone && !isValidPhone(formData.phone)) {
      newErrors.phone =
        "El formato del teléfono no es válido (ej: +57 300 123 4567)";
      isValid = false;
    }

    // Validación de reCAPTCHA
    if (!isRecaptchaVerified) {
      newErrors.recaptcha = "Debe completar la verificación de reCAPTCHA";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  }; // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar errores previos
    setGlobalError("");

    // Validar formulario
    if (!validateForm()) {
      setGlobalError(
        "Por favor complete todos los campos obligatorios correctamente."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      // Preparar datos sanitizados para el envío
      const SANITIZED_DATA = {
        name: sanitizeInput(formData.name),
        email: sanitizeInput(formData.email),
        phone: sanitizeInput(formData.phone),
        company: sanitizeInput(formData.company),
        clientType: formData.clientType,
        city: sanitizeInput(formData.city),
        consultationType: sanitizeInput(formData.consultationType),
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        timezone: formData.timezone,
        topics: sanitizeInput(formData.topics),
        questions: sanitizeInput(formData.questions),
        meetingType: formData.meetingType,
        recaptchaToken,
        timestamp: new Date().toISOString(),
      }; // Aquí iría la integración con EmailJS
      // Los datos sanitizados están listos para envío: SANITIZED_DATA
      // await emailService.sendConsultationRequest(SANITIZED_DATA);

      // Simular envío (reemplazar con EmailJS en producción)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
      // Error al enviar consulta
      setGlobalError(
        "Ocurrió un error al programar la consulta. Por favor intente nuevamente."
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
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl border border-blue-500/30">
        {/* Header */}
        <div className="sticky top-0 bg-slate-800 border-b border-gray-700 p-4 sm:p-6 flex items-center justify-between">
          <h2
            id="consultation-modal-title"
            className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400"
          >
            Programar Consulta
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-700 rounded-lg"
            aria-label="Cerrar modal"
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
                ¡Consulta Programada!
              </h3>
              <p className="text-gray-300">
                Te enviaremos los detalles de la reunión por email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {" "}
              {/* Información personal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="consultation-name"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Nombre <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="consultation-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    autoComplete="name"
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      errors.name
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="consultation-email"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="consultation-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      errors.email
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="consultation-phone"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Teléfono
                  </label>
                  <input
                    id="consultation-phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    autoComplete="tel"
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      errors.phone
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                    placeholder="+57 300 123 4567"
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="consultation-company"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Empresa
                  </label>
                  <input
                    id="consultation-company"
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    autoComplete="organization"
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                    placeholder="Nombre de tu empresa"
                  />
                </div>
              </div>
              {/* Tipo de cliente */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-blue-300 text-sm font-medium mb-2 block">
                    Tipo de Cliente
                  </label>
                  <select
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                  >
                    <option value="empresa">Empresa</option>
                    <option value="persona-natural">Persona Natural</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="consultation-city"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Ciudad <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="consultation-city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      errors.city
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                    placeholder="Tu ciudad"
                  />
                  {errors.city && (
                    <p className="text-red-400 text-xs mt-1">{errors.city}</p>
                  )}
                </div>
              </div>{" "}
              {/* Tipo de consulta */}
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Tipo de Consulta <span className="text-red-400">*</span>
                </label>
                <select
                  name="consultationType"
                  value={formData.consultationType}
                  onChange={handleInputChange}
                  required
                  className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                    errors.consultationType
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-600 focus:border-blue-500"
                  }`}
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="Consulta General">Consulta General</option>
                  <option value="Revisión de Proyecto">
                    Revisión de Proyecto
                  </option>
                  <option value="Estrategia Tecnológica">
                    Estrategia Tecnológica
                  </option>
                  <option value="Auditoría de Código">
                    Auditoría de Código
                  </option>
                  <option value="Optimización de Performance">
                    Optimización de Performance
                  </option>
                  <option value="Desarrollo Web">Desarrollo Web</option>
                  <option value="Aplicaciones Móviles">
                    Aplicaciones Móviles
                  </option>
                  <option value="Inteligencia Artificial">
                    Inteligencia Artificial
                  </option>
                  <option value="Cloud Computing">Cloud Computing</option>
                </select>
                {errors.consultationType && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.consultationType}
                  </p>
                )}
              </div>
              {/* Modalidad de reunión */}
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Modalidad de Reunión *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <label className="flex items-center p-3 bg-slate-700 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-all">
                    <input
                      type="radio"
                      name="meetingType"
                      value="video-call"
                      checked={formData.meetingType === "video-call"}
                      onChange={handleInputChange}
                      className="mr-3 text-blue-500"
                    />
                    <div>
                      <div className="font-medium text-white">Video Call</div>
                      <div className="text-xs text-gray-400">Zoom/Meet</div>
                    </div>
                  </label>
                  <label className="flex items-center p-3 bg-slate-700 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-all">
                    <input
                      type="radio"
                      name="meetingType"
                      value="phone-call"
                      checked={formData.meetingType === "phone-call"}
                      onChange={handleInputChange}
                      className="mr-3 text-blue-500"
                    />
                    <div>
                      <div className="font-medium text-white">Llamada</div>
                      <div className="text-xs text-gray-400">Teléfono</div>
                    </div>
                  </label>
                  <label className="flex items-center p-3 bg-slate-700 border border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 transition-all">
                    <input
                      type="radio"
                      name="meetingType"
                      value="in-person"
                      checked={formData.meetingType === "in-person"}
                      onChange={handleInputChange}
                      className="mr-3 text-blue-500"
                    />
                    <div>
                      <div className="font-medium text-white">Presencial</div>
                      <div className="text-xs text-gray-400">En oficina</div>
                    </div>
                  </label>
                </div>
              </div>{" "}
              {/* Fecha y hora preferida */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="consultation-date"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Fecha Preferida <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="consultation-date"
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      errors.preferredDate
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                  />
                  {errors.preferredDate && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.preferredDate}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="consultation-time"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Hora Preferida <span className="text-red-400">*</span>
                  </label>
                  <select
                    id="consultation-time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      errors.preferredTime
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                  >
                    <option value="">Selecciona hora</option>
                    {TIME_OPTIONS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                  {errors.preferredTime && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.preferredTime}
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-blue-300 text-sm font-medium mb-2 block">
                    Zona Horaria <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    required
                    className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all ${
                      errors.timezone
                        ? "border-red-500 focus:border-red-500"
                        : "border-gray-600 focus:border-blue-500"
                    }`}
                  >
                    <option value="">Selecciona TZ</option>
                    <option value="America/New_York">EST (UTC-5)</option>
                    <option value="America/Chicago">CST (UTC-6)</option>
                    <option value="America/Denver">MST (UTC-7)</option>
                    <option value="America/Los_Angeles">PST (UTC-8)</option>
                    <option value="America/Mexico_City">México (UTC-6)</option>
                    <option value="America/Bogota">Colombia (UTC-5)</option>
                    <option value="America/Lima">Perú (UTC-5)</option>
                    <option value="America/Santiago">Chile (UTC-3)</option>
                  </select>
                  {errors.timezone && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.timezone}
                    </p>
                  )}
                </div>
              </div>{" "}
              {/* Temas a tratar */}
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Temas a Tratar <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="topics"
                  value={formData.topics}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className={`w-full p-3 bg-slate-700 border rounded-lg focus:ring-2 focus:ring-blue-500/20 text-white transition-all resize-none ${
                    errors.topics
                      ? "border-red-500 focus:border-red-500"
                      : "border-gray-600 focus:border-blue-500"
                  }`}
                  placeholder="Describe los temas principales que te gustaría discutir en la consulta..."
                />
                {errors.topics && (
                  <p className="text-red-400 text-xs mt-1">{errors.topics}</p>
                )}
              </div>
              {/* Preguntas específicas */}
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Preguntas Específicas
                </label>
                <textarea
                  name="questions"
                  value={formData.questions}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all resize-none"
                  placeholder="¿Hay algo específico que te gustaría preguntar? (opcional)"
                />
              </div>
              {/* Google reCAPTCHA */}
              <div className="flex flex-col items-center">
                <ReCaptchaComponent onVerify={executeRecaptcha} />
                {errors.recaptcha && (
                  <p className="text-red-400 text-xs mt-2">
                    {errors.recaptcha}
                  </p>
                )}
              </div>
              {/* Error global */}
              {globalError && (
                <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <svg
                      className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="text-red-400 font-semibold">
                        Error en el formulario
                      </h4>
                      <p className="text-red-300 text-sm mt-1">{globalError}</p>
                    </div>
                  </div>
                </div>
              )}{" "}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <h4 className="text-blue-300 font-semibold mb-2">
                  📅 Información de Consultas
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Duración: 30-60 minutos según el tema</li>
                  <li>• Primera consulta: Gratuita (hasta 30 min)</li>
                  <li>• Horarios: Lunes a Viernes, 9:00 AM - 5:00 PM</li>
                  <li>• Confirmación: Recibirás los detalles en 24 horas</li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-all duration-300 font-semibold border border-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !isRecaptchaVerified}
                  className={`flex-1 px-6 py-3 rounded-lg transition-all duration-300 font-semibold flex items-center justify-center ${
                    isSubmitting || !isRecaptchaVerified
                      ? "bg-gray-600 cursor-not-allowed text-gray-300"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white transform hover:scale-105"
                  }`}
                >
                  {isSubmitting ? (
                    <>
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
                      Programando...
                    </>
                  ) : !isRecaptchaVerified ? (
                    "Complete el reCAPTCHA"
                  ) : (
                    "Programar Consulta"
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

ConsultationModal.displayName = "ConsultationModal";
