import React, { useState } from "react";

// Componente del Logo de Axon
export const AxonLogo = () => {
  return (
    <div className="flex items-center">
      <span className="text-2xl font-orbitron font-bold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        Axon
      </span>
      <span className="text-lg font-rajdhani font-semibold text-white/80">
        .app
      </span>
    </div>
  );
};

// Componente de animación de fondo
export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
      <div
        className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "0.5s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
    </div>
  );
};

// Componente de tarjeta de servicio
export const ServiceCard = ({ icon, title, description, onOpenModal, id }) => {
  return (
    <div className="bg-slate-800/60 backdrop-blur-sm rounded-xl p-6 flex flex-col items-center text-center transform transition-all duration-300 hover:shadow-blue-500/30 hover:-translate-y-2 shadow-xl border border-blue-500/30 group">
      <div className="w-20 h-20 mb-6 text-blue-400 flex items-center justify-center text-4xl transition-transform duration-300 group-hover:scale-110">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-4 text-blue-300">{title}</h3>
      <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
        {description}
      </p>
      {onOpenModal && (
        <button
          onClick={() => onOpenModal(id)}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 text-lg font-semibold shadow-lg"
        >
          Más Información
        </button>
      )}
    </div>
  );
};

// Componente de tarjeta de testimonio
export const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-xl p-8 transform transition-all duration-300 hover:shadow-cyan-500/30 hover:-translate-y-2 shadow-xl border border-cyan-500/30">
      <div className="flex items-center mb-6">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full mr-5 border-2 border-cyan-400 shadow-lg"
        />
        <div>
          <h4 className="text-xl font-semibold text-cyan-400">
            {testimonial.name}
          </h4>
          <p className="text-gray-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
      <p className="text-gray-300 italic text-lg mb-6 leading-relaxed">
        "{testimonial.review}"
      </p>
      <div className="flex items-center text-yellow-400 text-2xl">
        {"★".repeat(testimonial.rating)}
        {"☆".repeat(5 - testimonial.rating)}
      </div>
    </div>
  );
};

// Componente de tecnología simplificado para carrusel
export const TechItem = ({ tech }) => {
  return (
    <div className="flex-shrink-0 bg-gray-800/50 hover:bg-gray-700/70 rounded-xl p-4 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 hover:scale-105 mx-3">
      <div className="flex flex-col items-center text-center space-y-2">
        {/* Icono */}
        <div className="text-3xl">{tech.icon}</div>

        {/* Nombre */}
        <h3 className="text-sm font-medium text-white">{tech.name}</h3>
      </div>
    </div>
  );
};

// Componente de carrusel circular para tecnologías
export const TechCarousel = ({ technologies }) => {
  return (
    <div className="relative overflow-hidden">
      {/* Gradientes laterales para efecto de fade */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>

      {/* Carrusel infinito */}
      <div className="flex animate-scroll">
        {/* Primera instancia de las tecnologías */}
        {technologies.map((tech) => (
          <TechItem key={`first-${tech.name}`} tech={tech} />
        ))}

        {/* Segunda instancia para efecto infinito */}
        {technologies.map((tech) => (
          <TechItem key={`second-${tech.name}`} tech={tech} />
        ))}
      </div>
    </div>
  );
};

// Componente de formulario de contacto
export const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica de envío del formulario
    alert("Mensaje enviado! (Esto es una demostración)");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 shadow-xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-300 mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            required
            className="w-full bg-slate-700/50 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            className="w-full bg-slate-700/50 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="block text-gray-300 mb-2" htmlFor="message">
          Mensaje
        </label>
        <textarea
          id="message"
          rows="4"
          required
          className="w-full bg-slate-700/50 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        ></textarea>
      </div>
      <button
        type="submit"
        className="mt-6 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
      >
        Enviar Mensaje
      </button>
    </form>
  );
};

// Componente de botón scroll to top
export const ScrollToTopButton = ({ isVisible, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 right-8 p-3 bg-blue-600 text-white rounded-full transition-all duration-300 hover:bg-blue-700 transform hover:scale-110 shadow-lg z-50 ${
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        ></path>
      </svg>
    </button>
  );
};

// Modal mejorado para Política de Privacidad
export const EnhancedPrivacyModal = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isOpen && !isClosing
          ? "bg-black/80 backdrop-blur-md opacity-100"
          : "bg-black/0 backdrop-blur-none opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-blue-500/30 transition-all duration-300 ease-out transform ${
          isOpen && !isClosing
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-8 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con gradiente */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-cyan-600 p-6 border-b border-blue-500/30">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center">
              <svg
                className="w-8 h-8 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                ></path>
              </svg>
              Política de Privacidad
            </h2>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90 transform"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido con scroll personalizado */}
        <div className="overflow-y-auto p-8 text-gray-300 max-h-[calc(90vh-120px)] custom-scrollbar">
          <div className="prose prose-invert max-w-none">
            {/* Introducción */}
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-4 rounded-r-lg mb-8">
              <p className="text-blue-200 font-medium">
                <strong>Fecha de vigencia:</strong>{" "}
                {new Date().toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="text-gray-300 mt-2">
                En Axon.App, valoramos su privacidad y nos comprometemos a
                proteger su información personal. Esta política describe cómo
                recopilamos, usamos y protegemos su información.
              </p>
            </div>

            {/* Tabla de contenido */}
            <div className="bg-gray-800/50 rounded-xl p-6 mb-8 border border-gray-700">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  ></path>
                </svg>
                Tabla de Contenido
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <li>
                  <a
                    href="#info-recopilada"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    • Información Recopilada
                  </a>
                </li>
                <li>
                  <a
                    href="#uso-informacion"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    • Uso de Información
                  </a>
                </li>
                <li>
                  <a
                    href="#compartir-datos"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    • Compartir Datos
                  </a>
                </li>
                <li>
                  <a
                    href="#seguridad"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    • Seguridad
                  </a>
                </li>
                <li>
                  <a
                    href="#derechos"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    • Sus Derechos
                  </a>
                </li>
                <li>
                  <a
                    href="#cookies"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    • Cookies
                  </a>
                </li>
                <li>
                  <a
                    href="#menores"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    • Menores de Edad
                  </a>
                </li>
                <li>
                  <a
                    href="#cambios"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    • Cambios
                  </a>
                </li>
              </ul>
            </div>

            {/* Secciones expandidas */}
            <section id="info-recopilada" className="mb-8">
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                  1
                </span>
                Información que Recopilamos
              </h3>

              <div className="grid gap-6">
                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">
                    📝 Información Proporcionada Directamente
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Nombre completo y datos de contacto</li>
                    <li>Dirección de correo electrónico</li>
                    <li>Número de teléfono</li>
                    <li>Información de la empresa</li>
                    <li>Consultas y mensajes enviados</li>
                  </ul>
                </div>

                <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                  <h4 className="text-lg font-semibold text-blue-300 mb-3">
                    🤖 Información Recopilada Automáticamente
                  </h4>
                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>Dirección IP y ubicación geográfica</li>
                    <li>Tipo de dispositivo y navegador</li>
                    <li>Páginas visitadas y tiempo de navegación</li>
                    <li>Fuente de referencia</li>
                    <li>Datos de rendimiento del sitio</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="uso-informacion" className="mb-8">
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                  2
                </span>
                Uso de su Información
              </h3>
              <div className="bg-gradient-to-r from-blue-900/20 to-cyan-900/20 rounded-lg p-6 border border-blue-500/30">
                <p className="mb-4">
                  Utilizamos su información para los siguientes propósitos
                  legítimos:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-semibold text-blue-300 mb-2">
                      🎯 Servicios Principales
                    </h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                      <li>Proveer nuestros servicios</li>
                      <li>Procesar consultas</li>
                      <li>Soporte técnico</li>
                      <li>Facturación y pagos</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-semibold text-blue-300 mb-2">
                      📈 Mejoras y Marketing
                    </h5>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                      <li>Mejorar nuestros servicios</li>
                      <li>Análisis de uso</li>
                      <li>Marketing personalizado</li>
                      <li>Comunicaciones importantes</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Nuevas secciones */}
            <section id="cookies" className="mb-8">
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                  6
                </span>
                Política de Cookies
              </h3>
              <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-6">
                <p className="text-amber-200 mb-4">
                  🍪 Utilizamos cookies para mejorar su experiencia:
                </p>
                <div className="grid gap-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-400 text-xl">✓</span>
                    <div>
                      <strong className="text-green-300">
                        Cookies Esenciales:
                      </strong>
                      <span className="text-gray-300">
                        {" "}
                        Necesarias para el funcionamiento del sitio
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-blue-400 text-xl">⚙️</span>
                    <div>
                      <strong className="text-blue-300">
                        Cookies Funcionales:
                      </strong>
                      <span className="text-gray-300">
                        {" "}
                        Recordar preferencias y configuraciones
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-purple-400 text-xl">📊</span>
                    <div>
                      <strong className="text-purple-300">
                        Cookies Analíticas:
                      </strong>
                      <span className="text-gray-300">
                        {" "}
                        Entender cómo usa nuestro sitio
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section id="menores" className="mb-8">
              <h3 className="text-2xl font-semibold text-cyan-400 mb-4 flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                  7
                </span>
                Protección de Menores
              </h3>
              <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-6">
                <p className="text-red-200">
                  🔒{" "}
                  <strong>
                    Nuestros servicios no están dirigidos a menores de 18 años.
                  </strong>{" "}
                  No recopilamos intencionalmente información personal de
                  menores. Si tiene conocimiento de que un menor nos ha
                  proporcionado información personal, contáctenos
                  inmediatamente.
                </p>
              </div>
            </section>

            {/* Footer de contacto */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 mt-8">
              <h4 className="text-xl font-semibold text-cyan-400 mb-4">
                📞 ¿Preguntas sobre su Privacidad?
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-300 mb-2">
                    Contáctenos por cualquier duda:
                  </p>
                  <p className="text-blue-400">📧 privacidad@axon.app</p>
                  <p className="text-blue-400">📱 +57 (300) 123-4567</p>
                </div>
                <div>
                  <p className="text-gray-300 mb-2">
                    Oficial de Protección de Datos:
                  </p>
                  <p className="text-blue-400">📧 dpo@axon.app</p>
                  <p className="text-gray-400">
                    Tiempo de respuesta: 72 horas máximo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer del modal */}
        <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-4 flex justify-between items-center">
          <p className="text-sm text-gray-400">
            Última actualización: {new Date().toLocaleDateString("es-ES")}
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
            >
              📄 Imprimir
            </button>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
            >
              Entendido ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal mejorado para Términos y Condiciones
export const EnhancedTermsModal = ({ isOpen, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  if (!isOpen && !isClosing) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-300 ease-out ${
        isOpen && !isClosing
          ? "bg-black/80 backdrop-blur-md opacity-100"
          : "bg-black/0 backdrop-blur-none opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-green-500/30 transition-all duration-300 ease-out transform ${
          isOpen && !isClosing
            ? "scale-100 translate-y-0 opacity-100"
            : "scale-95 translate-y-8 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header con gradiente */}
        <div className="sticky top-0 bg-gradient-to-r from-green-600 to-teal-600 p-6 border-b border-green-500/30">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center">
              <svg
                className="w-8 h-8 mr-3"
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
              Términos y Condiciones
            </h2>
            <button
              onClick={handleClose}
              className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200 hover:rotate-90 transform"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido con scroll personalizado */}
        <div className="overflow-y-auto p-8 text-gray-300 max-h-[calc(90vh-120px)] custom-scrollbar">
          <div className="prose prose-invert max-w-none">
            {/* Aviso importante */}
            <div className="bg-green-500/10 border-l-4 border-green-500 p-4 rounded-r-lg mb-8">
              <p className="text-green-200 font-medium">
                <strong>⚖️ Términos Legales Vinculantes</strong>
              </p>
              <p className="text-gray-300 mt-2">
                Al utilizar nuestros servicios, usted acepta estos términos en
                su totalidad. Por favor, léalos cuidadosamente.
              </p>
            </div>

            {/* Nuevas secciones expandidas */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                  1
                </span>
                Definiciones
              </h3>
              <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
                <div className="grid gap-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-green-400 font-bold">
                      "Servicios":
                    </span>
                    <span className="text-gray-300">
                      Todos los productos y servicios ofrecidos por Axon.App
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-400 font-bold">"Usuario":</span>
                    <span className="text-gray-300">
                      Cualquier persona que acceda o utilice nuestros servicios
                    </span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-green-400 font-bold">
                      "Contenido":
                    </span>
                    <span className="text-gray-300">
                      Toda información, datos, textos, software, música, sonido,
                      fotografías, gráficos, videos, mensajes u otros materiales
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                  8
                </span>
                Niveles de Servicio (SLA)
              </h3>
              <div className="grid gap-4">
                <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-300 mb-2">
                    🚀 Servicio Premium
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                    <li>Disponibilidad: 99.9% uptime garantizado</li>
                    <li>Soporte: 24/7 con respuesta en menos de 1 hora</li>
                    <li>
                      Mantenimiento: Ventanas programadas con 48h de aviso
                    </li>
                  </ul>
                </div>
                <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-purple-300 mb-2">
                    ⭐ Servicio Estándar
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                    <li>Disponibilidad: 99.5% uptime garantizado</li>
                    <li>Soporte: Horario comercial con respuesta en 4 horas</li>
                    <li>
                      Mantenimiento: Ventanas programadas con 24h de aviso
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-2xl font-semibold text-green-400 mb-4 flex items-center">
                <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
                  9
                </span>
                Resolución de Disputas
              </h3>
              <div className="bg-amber-900/20 border border-amber-500/30 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-amber-300 mb-3">
                  🤝 Proceso de Resolución
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                      1
                    </span>
                    <div>
                      <strong className="text-amber-300">
                        Negociación Directa:
                      </strong>
                      <p className="text-gray-300 text-sm">
                        Contacto directo con nuestro equipo de soporte
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                      2
                    </span>
                    <div>
                      <strong className="text-amber-300">Mediación:</strong>
                      <p className="text-gray-300 text-sm">
                        Mediador neutral certificado
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="bg-amber-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                      3
                    </span>
                    <div>
                      <strong className="text-amber-300">Arbitraje:</strong>
                      <p className="text-gray-300 text-sm">
                        Arbitraje vinculante bajo las leyes de Colombia
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Footer legal */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600 mt-8">
              <h4 className="text-xl font-semibold text-green-400 mb-4">
                ⚖️ Información Legal
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-300 mb-2">Jurisdicción:</p>
                  <p className="text-green-400">🏛️ República de Colombia</p>
                  <p className="text-green-400">📍 Bogotá D.C.</p>
                </div>
                <div>
                  <p className="text-gray-300 mb-2">Registro Mercantil:</p>
                  <p className="text-green-400">
                    🏢 Cámara de Comercio de Bogotá
                  </p>
                  <p className="text-gray-400">NIT: 900.XXX.XXX-X</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer del modal */}
        <div className="sticky bottom-0 bg-gray-800 border-t border-gray-700 p-4 flex justify-between items-center">
          <p className="text-sm text-gray-400">
            Versión 2.1 - {new Date().toLocaleDateString("es-ES")}
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                const content = document.querySelector(".prose").innerHTML;
                const printWindow = window.open("", "_blank");
                printWindow.document.write(`
                  <html>
                    <head><title>Términos y Condiciones - Axon.App</title></head>
                    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                      <h1>Términos y Condiciones - Axon.App</h1>
                      ${content}
                    </body>
                  </html>
                `);
                printWindow.document.close();
                printWindow.print();
              }}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors text-sm"
            >
              📄 Imprimir
            </button>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
            >
              Acepto ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
