import React from "react";

// Generar opciones de horario (9 AM - 5 PM, intervalos de 30 min)
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

export const FixedConsultationModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    clientType: "empresa",
    city: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    timezone: "",
    topics: "",
    questions: "",
    meetingType: "video-call",
  });

  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState(null);

  // Reset form cuando se abre/cierra
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        clientType: "empresa",
        city: "",
        consultationType: "",
        preferredDate: "",
        preferredTime: "",
        timezone: "",
        topics: "",
        questions: "",
        meetingType: "video-call",
      });
      setSubmitStatus(null);
      setErrors({});
    }
  }, [isOpen]);

  // Early return si no está abierto
  if (!isOpen) return null;

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar errores específicos del campo al modificarlo
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  // Validar formulario completo y obtener campos faltantes
  const validateForm = () => {
    const newErrors = {};

    // Campos obligatorios
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio";
    }

    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    }

    if (!formData.city.trim()) {
      newErrors.city = "La ciudad es obligatoria";
    }

    if (!formData.consultationType.trim()) {
      newErrors.consultationType = "Debe seleccionar un tipo de consulta";
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "La fecha es obligatoria";
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = "La hora es obligatoria";
    }

    if (!formData.topics.trim()) {
      newErrors.topics = "Los temas a tratar son obligatorios";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  // Función para obtener campos faltantes de forma clara
  const getMissingFields = () => {
    const missingFields = [];

    if (!formData.name.trim()) missingFields.push("Nombre");
    if (!formData.email.trim()) missingFields.push("Email");
    if (!formData.city.trim()) missingFields.push("Ciudad");
    if (!formData.consultationType.trim())
      missingFields.push("Tipo de Consulta");
    if (!formData.preferredDate) missingFields.push("Fecha Preferida");
    if (!formData.preferredTime) missingFields.push("Hora Preferida");
    if (!formData.topics.trim()) missingFields.push("Temas a Tratar");

    return missingFields;
  };
  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Importar el servicio de email
      const { sendConsultationRequest } = await import(
        "../../services/emailService"
      );

      // Preparar los datos para el envío
      const emailData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || "No proporcionado",
        company: formData.company || "No especificada",
        clientType: formData.clientType,
        city: formData.city,
        consultationType: formData.consultationType,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        timezone: formData.timezone || "No especificado",
        topics: formData.topics,
        questions: formData.questions || "Ninguna pregunta específica",
        meetingType: formData.meetingType,
        timestamp: new Date().toISOString(),
      };

      // Enviar el email
      const result = await sendConsultationRequest(emailData);

      if (result.success) {
        setSubmitStatus("success");
        setTimeout(() => {
          onClose();
          setFormData({
            name: "",
            email: "",
            phone: "",
            company: "",
            clientType: "empresa",
            city: "",
            consultationType: "",
            preferredDate: "",
            preferredTime: "",
            timezone: "",
            topics: "",
            questions: "",
            meetingType: "video-call",
          });
          setErrors({});
          setSubmitStatus(null);
        }, 2000);
      } else {
        throw new Error(result.error || "Error al programar la consulta");
      }
    } catch (error) {
      setSubmitStatus("error");
      // Mostrar error específico si existe
      if (error.message) {
        setErrors({ submit: error.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consultation-modal-title"
    >
      <div
        className="bg-slate-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-blue-500/30 relative"
        onClick={(e) => e.stopPropagation()}
      >
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
            aria-label="Cerrar programación de consulta"
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
                Hemos recibido tu solicitud. Te enviaremos la confirmación y
                detalles de la reunión por email.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Información personal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-blue-300 text-sm font-medium mb-2 block">
                    Nombre <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="Tu nombre completo"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="text-blue-300 text-sm font-medium mb-2 block">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-blue-300 text-sm font-medium mb-2 block">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    placeholder="+57 300 123 4567"
                  />
                </div>

                <div>
                  <label className="text-blue-300 text-sm font-medium mb-2 block">
                    Tipo de Cliente
                  </label>
                  <select
                    name="clientType"
                    value={formData.clientType}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="empresa">Empresa</option>
                    <option value="persona-natural">Persona Natural</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Ciudad <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Bogotá, Medellín, Cali..."
                />
                {errors.city && (
                  <p className="text-red-400 text-xs mt-1">{errors.city}</p>
                )}
              </div>

              {/* Tipo de consulta */}
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Tipo de Consulta <span className="text-red-400">*</span>
                </label>
                <select
                  name="consultationType"
                  value={formData.consultationType}
                  onChange={handleInputChange}
                  className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="">Selecciona un tipo de consulta</option>
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
                      <div className="text-xs text-gray-400">Oficina</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Fecha y hora */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-blue-300 text-sm font-medium mb-2 block">
                    Fecha Preferida <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  />
                  {errors.preferredDate && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                <div>
                  <label className="text-blue-300 text-sm font-medium mb-2 block">
                    Hora Preferida <span className="text-red-400">*</span>
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="">Selecciona hora preferida</option>
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
              </div>

              {/* Temas a tratar */}
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Temas a Tratar <span className="text-red-400">*</span>
                </label>
                <textarea
                  name="topics"
                  value={formData.topics}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  placeholder="Describe los temas que quieres abordar en la consulta..."
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
                  rows="2"
                  className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                  placeholder="¿Tienes alguna pregunta específica que quieras resolver?"
                />
              </div>

              {/* Información de campos faltantes */}
              {getMissingFields().length > 0 && (
                <div className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <svg
                      className="w-5 h-5 text-amber-400 mr-3 flex-shrink-0 mt-0.5"
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
                      <h4 className="text-amber-300 font-medium text-sm mb-2">
                        📋 Campos Obligatorios Pendientes (
                        {getMissingFields().length})
                      </h4>
                      <p className="text-amber-200 text-sm mb-3">
                        Por favor completa los siguientes campos para poder
                        programar tu consulta:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {getMissingFields().map((field, index) => (
                          <div
                            key={field}
                            className="flex items-center text-amber-100 text-xs"
                          >
                            <span className="w-4 h-4 bg-amber-500 text-amber-900 rounded-full flex items-center justify-center text-xs font-bold mr-2">
                              {index + 1}
                            </span>
                            <span className="font-medium">{field}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-3 text-amber-200 text-xs">
                        💡 <strong>Consejo:</strong> Los campos marcados con{" "}
                        <span className="text-red-400">*</span> son obligatorios
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirmación cuando el formulario está completo */}
              {getMissingFields().length === 0 && (
                <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 mt-6">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-400 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div>
                      <h4 className="text-green-300 font-medium text-sm">
                        ✅ Formulario Completo
                      </h4>
                      <p className="text-green-200 text-sm">
                        Todos los campos obligatorios están completos. ¡Puedes
                        enviar tu solicitud!
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-semibold transition-all ${
                    isSubmitting
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:from-blue-700 hover:to-cyan-700 transform hover:scale-[1.02]"
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
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Programando...
                    </span>
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
};
