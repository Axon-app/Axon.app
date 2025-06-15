import React from "react";

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

export const ConsultationModal = React.memo(({ isOpen, onClose, service }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    consultationType: service?.title || "",
    preferredDate: "",
    preferredTime: "",
    timezone: "",
    topics: "",
    questions: "",
    meetingType: "video-call",
  });

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);

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
        consultationType: service?.title || "",
      }));
      setSubmitStatus(null);
    }
  }, [isOpen, service]);

  // Early return si no está abierto
  if (!isOpen) return null;

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación adicional
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.topics.trim()
    ) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    try {
      // Aquí iría la lógica para programar la consulta via EmailJS

      // Simular envío
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch {
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
                    Nombre *
                  </label>
                  <input
                    id="consultation-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    autoComplete="name"
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                    placeholder="Tu nombre completo"
                  />
                </div>
                <div>
                  <label
                    htmlFor="consultation-email"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Email *
                  </label>{" "}
                  <input
                    id="consultation-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    autoComplete="email"
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                    placeholder="tu@email.com"
                  />
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
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>{" "}
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
              {/* Tipo de consulta */}
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Tipo de Consulta *
                </label>
                <select
                  name="consultationType"
                  value={formData.consultationType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
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
                </select>
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
                    Fecha Preferida *
                  </label>
                  <input
                    id="consultation-date"
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                  />
                </div>
                <div>
                  <label
                    htmlFor="consultation-time"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Hora Preferida *
                  </label>
                  <select
                    id="consultation-time"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                  >
                    {" "}
                    <option value="">Selecciona hora</option>
                    {TIME_OPTIONS.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-blue-300 text-sm font-medium mb-2 block">
                    Zona Horaria *
                  </label>
                  <select
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
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
                </div>
              </div>
              {/* Temas a tratar */}
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Temas a Tratar *
                </label>
                <textarea
                  name="topics"
                  value={formData.topics}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all resize-none"
                  placeholder="Describe los temas principales que te gustaría discutir en la consulta..."
                />
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
              </div>{" "}
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
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-600 disabled:to-gray-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 disabled:transform-none font-semibold flex items-center justify-center"
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
