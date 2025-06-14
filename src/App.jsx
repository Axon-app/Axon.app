import React, { useState } from "react";
import {
  AxonLogo,
  AnimatedBackground,
  ServiceCard,
  TestimonialCard,
  TechCarousel,
  ContactForm,
  ScrollToTopButton,
  EnhancedPrivacyModal,
  EnhancedTermsModal,
} from "./components/UIComponents";
import { technologies } from "./data/content";

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false); // Estado para la modal de Privacidad
  const [showTermsModal, setShowTermsModal] = useState(false); // Estado para la modal de Términos

  // Logo de Axon.App como un SVG en línea para escalabilidad y personalización
  const AxonAppLogoSVG = (
    // Ajustado el viewBox de 200 a 250 para dar más espacio horizontal al texto
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 250 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="45"
        fontFamily="Inter, sans-serif"
        fontSize="48"
        fontWeight="bold"
        fill="url(#gradient)"
        letterSpacing="2"
      >
        Axon.App
      </text>
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00C9FF" />
          <stop offset="100%" stopColor="#92FE9D" />
        </linearGradient>
      </defs>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-gray-900 bg-opacity-80 backdrop-blur-lg shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a
            href="#hero"
            className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400"
          >
            {/* Ajustado el ancho del div para el logo en la navbar */}
            <div className="w-40 h-12 md:w-48 md:h-14">{AxonAppLogoSVG}</div>
          </a>
          <div className="hidden md:flex space-x-8">
            <NavLink href="#hero">Inicio</NavLink>
            <NavLink href="#about">Nosotros</NavLink>
            <NavLink href="#services">Servicios</NavLink>
            <NavLink href="#technologies">Tecnologías</NavLink>
            <NavLink href="#contact">Contacto</NavLink>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-blue-400 focus:outline-none"
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {showMenu && (
          <div className="md:hidden bg-gray-800 bg-opacity-90 py-4">
            <NavLink href="#hero" mobile onClick={() => setShowMenu(false)}>
              Inicio
            </NavLink>
            <NavLink href="#about" mobile onClick={() => setShowMenu(false)}>
              Nosotros
            </NavLink>
            <NavLink href="#services" mobile onClick={() => setShowMenu(false)}>
              Servicios
            </NavLink>
            <NavLink
              href="#technologies"
              mobile
              onClick={() => setShowMenu(false)}
            >
              Tecnologías
            </NavLink>
            <NavLink href="#contact" mobile onClick={() => setShowMenu(false)}>
              Contacto
            </NavLink>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative flex items-center justify-center min-h-screen text-center p-8 overflow-hidden pt-20 md:pt-0"
      >
        <div className="absolute inset-0 z-0 opacity-10">
          {/* Fondo de partículas o formas futuristas con movimiento dinámico */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-500 rounded-full mix-blend-screen animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-green-500 rounded-full mix-blend-screen animate-blob"></div>
        </div>
        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          {/* Ajustado el ancho del div para el logo en la sección Hero */}
          <div className="w-72 h-28 md:w-96 md:h-36 mb-8 animate-fadeInScale">
            {AxonAppLogoSVG}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight animate-fadeInUp text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
            Desarrollamos el Futuro.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-10 animate-fadeInUp delay-200">
            Soluciones de software y aplicaciones que transforman ideas en
            realidad.
          </p>
          <a
            href="#services"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 animate-bounceIn delay-400"
          >
            Explorar Servicios
          </a>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="py-20 md:py-32 bg-gray-900 bg-opacity-70 backdrop-blur-md"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-orange-400 animate-fadeIn title-hover-effect">
            Nuestra Visión
          </h2>
          <div className="max-w-3xl mx-auto text-lg md:text-xl leading-relaxed text-gray-300 text-center animate-fadeIn delay-200">
            <p className="mb-6">
              En Axon.App, somos pioneros en la creación de experiencias
              digitales de vanguardia. Fusionamos la innovación con la
              funcionalidad, diseñando soluciones de software y aplicaciones
              móviles que no solo cumplen con las expectativas, sino que las
              superan.
            </p>
            <p className="mb-6">
              Nuestro equipo de expertos está dedicado a transformar tus ideas
              más ambiciosas en productos tecnológicos robustos, escalables y
              visualmente impactantes. Creemos en el poder de la tecnología para
              redefinir el futuro.
            </p>
            <p>
              Desde startups hasta empresas consolidadas, somos tu socio
              estratégico para navegar el panorama digital en constante
              evolución.
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 md:py-32 bg-gray-800 bg-opacity-70 backdrop-blur-md"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400 animate-fadeIn title-hover-effect">
            Lo Que Hacemos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <ServiceCard
              icon="💻"
              title="Desarrollo Web"
              description="Creamos sitios web y aplicaciones web a medida, responsivas y de alto rendimiento, optimizadas para la experiencia de usuario."
            />
            <ServiceCard
              icon="📱"
              title="Desarrollo de Apps Móviles"
              description="Diseñamos y construimos aplicaciones móviles intuitivas para iOS y Android que cautivan a tus usuarios y amplían tu alcance."
            />
            <ServiceCard
              icon="🎨"
              title="Diseño UI/UX"
              description="Transformamos conceptos en interfaces atractivas y experiencias de usuario fluidas que generan interacción y satisfacción."
            />
            <ServiceCard
              icon="☁️"
              title="Soluciones Cloud"
              description="Implementamos infraestructuras escalables y seguras en la nube, optimizando tus operaciones y reduciendo costos."
            />
            <ServiceCard
              icon="🧠"
              title="Inteligencia Artificial"
              description="Integramos soluciones de IA y Machine Learning para automatizar procesos, analizar datos y tomar decisiones inteligentes."
            />
            <ServiceCard
              icon="🔒"
              title="Ciberseguridad"
              description="Protegemos tus activos digitales con las últimas estrategias y tecnologías de ciberseguridad, garantizando la integridad de tus datos."
            />
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section
        id="technologies"
        className="py-20 md:py-32 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden"
      >
        {/* Efectos de fondo */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header simplificado */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 animate-fadeIn">
              Tecnologías
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto animate-fadeIn delay-200 leading-relaxed">
              Dominamos las herramientas más{" "}
              <span className="text-cyan-400 font-semibold">avanzadas</span> del
              ecosistema tecnológico
            </p>
          </div>

          {/* Carrusel de tecnologías */}
          <div className="animate-fadeIn delay-400">
            <TechCarousel technologies={technologies} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 md:py-32 bg-gray-900 bg-opacity-70 backdrop-blur-md"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-400 animate-fadeIn title-hover-effect">
            Contáctanos
          </h2>
          <div className="max-w-2xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="text-gray-300 space-y-6 text-center md:text-left">
              <p className="text-xl">
                ¿Listo para impulsar tu proyecto al futuro?
              </p>
              <p>Estamos aquí para ayudarte a hacer realidad tus ideas.</p>
              <p className="flex items-center justify-center md:justify-start">
                <svg
                  className="w-6 h-6 mr-3 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                info@axon.App.com
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <svg
                  className="w-6 h-6 mr-3 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                +1 (555) 123-4567
              </p>
              <p className="flex items-center justify-center md:justify-start">
                <svg
                  className="w-6 h-6 mr-3 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                Bogotá, Colombia
              </p>
            </div>
            <div className="bg-gray-800 p-8 rounded-lg shadow-xl border border-gray-700">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-300 text-sm font-bold mb-2"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu Nombre"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-300 text-sm font-bold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-300 text-sm font-bold mb-2"
                  >
                    Mensaje
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    className="shadow appearance-none border border-gray-700 rounded w-full py-2 px-3 bg-gray-700 text-white leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu mensaje..."
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 py-10 text-gray-400 text-center text-sm">
        <div className="container mx-auto px-4">
          <p>
            &copy; {new Date().getFullYear()} Axon.App. Todos los derechos
            reservados.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            {/* Cambiados los href para abrir las modales */}
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="hover:text-blue-400 transition duration-200 cursor-pointer"
            >
              Privacidad
            </button>
            <button
              onClick={() => setShowTermsModal(true)}
              className="hover:text-blue-400 transition duration-200 cursor-pointer"
            >
              Términos
            </button>
            <a href="#" className="hover:text-blue-400 transition duration-200">
              Mapa del sitio
            </a>
          </div>
          {/* Social Media Icons */}
          <div className="flex justify-center space-x-6 mt-6 text-3xl">
            {/* Facebook */}
            <a
              href="https://facebook.com/axon.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition duration-200 transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            {/* Twitter */}
            <a
              href="https://twitter.com/axon.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition duration-200 transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/company/axon.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition duration-200 transform hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* Modals mejorados de Privacidad y Términos */}
      <EnhancedPrivacyModal
        isOpen={showPrivacyModal}
        onClose={() => setShowPrivacyModal(false)}
      />
      <EnhancedTermsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
      />
    </div>
  );
};

// Componente para enlaces de navegación
const NavLink = ({ href, children, mobile, onClick }) => {
  const baseClasses =
    "block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 transition duration-200";
  const desktopClasses =
    "relative text-lg text-gray-300 hover:text-white transition duration-200 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-blue-400 after:transition-all after:duration-300 hover:after:w-full";
  return (
    <a
      href={href}
      onClick={onClick}
      className={mobile ? baseClasses : desktopClasses}
    >
      {children}
    </a>
  );
};

export default App;
