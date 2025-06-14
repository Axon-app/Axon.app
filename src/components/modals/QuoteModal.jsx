import React from "react";

export const QuoteRequestModal = React.memo(({ isOpen, onClose, service }) => {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: service?.title || "",
    budget: "",
    timeline: "",
    description: "",
    additionalRequirements: "",
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
        projectType: service?.title || "",
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
      !formData.description.trim()
    ) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);

    try {
      // Aquí iría la lógica para enviar la cotización via EmailJS
      console.log("Enviando cotización:", formData);

      // Simular envío
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus("success");
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error enviando cotización:", error);
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
          </h2>{" "}
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
                ¡Cotización Enviada con Éxito!
              </h3>
              <p className="text-gray-300 mb-3">
                Hemos recibido tu solicitud de cotización. Nuestro equipo la
                revisará y te contactará dentro de{" "}
                <strong>24 horas hábiles</strong> con una propuesta detallada.
              </p>
              <p className="text-sm text-gray-400">
                Revisa tu email (incluyendo spam) para la confirmación.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Información personal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {" "}
                <div>
                  <label
                    htmlFor="quote-name"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Nombre *
                  </label>
                  <input
                    id="quote-name"
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
                    htmlFor="quote-email"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Email *
                  </label>
                  <input
                    id="quote-email"
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
              </div>{" "}
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
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div>
                  <label
                    htmlFor="quote-company"
                    className="text-blue-300 text-sm font-medium mb-2 block"
                  >
                    Empresa
                  </label>
                  <input
                    id="quote-company"
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
              {/* Detalles del proyecto */}
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Tipo de Proyecto *
                </label>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="Desarrollo Web Personalizado">
                    Desarrollo Web Personalizado
                  </option>
                  <option value="Aplicaciones Web Progresivas">
                    Aplicaciones Web Progresivas
                  </option>
                  <option value="Consultoría Tecnológica">
                    Consultoría Tecnológica
                  </option>
                  <option value="Optimización de Rendimiento">
                    Optimización de Rendimiento
                  </option>
                  <option value="Mantenimiento y Soporte">
                    Mantenimiento y Soporte
                  </option>
                </select>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-blue-300 text-sm font-medium mb-2 block">
                    Presupuesto Estimado
                  </label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                  >
                    <option value="">Selecciona un rango</option>
                    <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                    <option value="$25,000+">$25,000+</option>
                    <option value="Por definir">Por definir</option>
                  </select>
                </div>
                <div>
                  <label className="text-blue-300 text-sm font-medium mb-2 block">
                    Timeline Deseado
                  </label>
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all"
                  >
                    <option value="">Selecciona un plazo</option>
                    <option value="Urgente (1-2 semanas)">
                      Urgente (1-2 semanas)
                    </option>
                    <option value="Rápido (1 mes)">Rápido (1 mes)</option>
                    <option value="Normal (2-3 meses)">
                      Normal (2-3 meses)
                    </option>
                    <option value="Flexible (3+ meses)">
                      Flexible (3+ meses)
                    </option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-blue-300 text-sm font-medium mb-2 block">
                  Descripción del Proyecto *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="4"
                  className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all resize-none"
                  placeholder="Describe detalladamente tu proyecto, objetivos y requisitos específicos..."
                />
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
                  className="w-full p-3 bg-slate-700 border border-gray-600 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 text-white transition-all resize-none"
                  placeholder="Integraciones específicas, funcionalidades especiales, restricciones técnicas, etc."
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
                  💡 Información sobre Cotizaciones
                </h4>
                <ul className="text-sm text-gray-300 space-y-1">
                  <li>• Cotización gratuita y sin compromiso</li>
                  <li>• Respuesta dentro de 24 horas hábiles</li>
                  <li>• Propuesta detallada con cronograma</li>
                  <li>• Consulta inicial incluida en la cotización</li>
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
                      Enviando...
                    </>
                  ) : (
                    "Enviar Cotización"
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
