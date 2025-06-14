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
import logo1 from "./assets/logo1.png";

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false); // Estado para la modal de Privacidad
  const [showTermsModal, setShowTermsModal] = useState(false); // Estado para la modal de Términos
  const [logoError, setLogoError] = useState(false);

  const handleLogoError = () => {
    console.error("Logo failed to load");
    setLogoError(true);
  };

  // Logo SVG como fallback
  const LogoSVG = ({ className }) => (
    <div
      className={`bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 rounded-lg flex items-center justify-center text-white font-bold ${className}`}
    >
      <span className="text-2xl">⚡</span>
    </div>
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
            {/* Logo de Axon.App */}
            <div className="flex items-center">
              {!logoError ? (
                <img
                  src={logo1}
                  alt="Axon.App Logo"
                  className="h-10 w-auto mr-2"
                  onError={handleLogoError}
                  onLoad={() => console.log("Logo loaded successfully")}
                />
              ) : (
                <LogoSVG className="h-10 w-10 mr-2" />
              )}
              <span className="text-2xl font-bold">Axon.App</span>
            </div>
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
          {/* Logo de Axon.App en la sección Hero */}
          <div className="mb-8 animate-fadeInScale">
            {!logoError ? (
              <img
                src={logo1}
                alt="Axon.App Logo"
                className="h-20 md:h-28 w-auto mx-auto"
                onError={handleLogoError}
                onLoad={() => console.log("Hero logo loaded successfully")}
              />
            ) : (
              <LogoSVG className="h-20 md:h-28 w-20 md:w-28 mx-auto" />
            )}
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

      {/* About Us Section - Mission & Vision */}
      <section
        id="about"
        className="py-20 md:py-32 bg-gray-900 bg-opacity-70 backdrop-blur-md relative overflow-hidden"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-60 h-60 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 animate-fadeIn">
              Nuestra Esencia
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Transformamos ideas en soluciones digitales revolucionarias
            </p>
          </div>

          {/* Mission & Vision Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            {/* Mission */}
            <div className="bg-gradient-to-br from-blue-900/50 to-purple-900/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-blue-300">
                  Nuestra Misión
                </h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Democratizar la tecnología de vanguardia, creando soluciones
                digitales accesibles e innovadoras que impulsen el crecimiento
                de nuestros clientes. Nos comprometemos a entregar productos de
                software excepcionales que transformen ideas en realidades
                digitales exitosas.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-purple-900/50 to-pink-900/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-400/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-purple-300">
                  Nuestra Visión
                </h3>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed">
                Ser la empresa líder en desarrollo de software personalizado en
                Latinoamérica, reconocida por nuestra excelencia técnica,
                innovación constante y capacidad de anticipar las necesidades
                del mercado digital del futuro.
              </p>
            </div>
          </div>

          {/* Goals Timeline */}
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30">
            <h3 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Objetivos Estratégicos
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Short Term Goals */}
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">📅</span>
                  </div>
                  <h4 className="text-xl font-bold text-green-300">
                    Corto Plazo (2025-2026)
                  </h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">▶</span>
                    <span className="text-gray-300">
                      Expandir nuestro equipo de desarrollo con 10+
                      especialistas
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">▶</span>
                    <span className="text-gray-300">
                      Implementar metodologías ágiles avanzadas y DevOps
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">▶</span>
                    <span className="text-gray-300">
                      Lanzar 50+ proyectos de alta calidad
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-3 mt-1">▶</span>
                    <span className="text-gray-300">
                      Establecer alianzas estratégicas con partners tecnológicos
                    </span>
                  </li>
                </ul>
              </div>

              {/* Long Term Goals */}
              <div className="space-y-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-xl">🎯</span>
                  </div>
                  <h4 className="text-xl font-bold text-cyan-300">
                    Largo Plazo (2027-2030)
                  </h4>
                </div>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 mt-1">▶</span>
                    <span className="text-gray-300">
                      Convertirnos en referente de innovación en IA y ML
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 mt-1">▶</span>
                    <span className="text-gray-300">
                      Expandir operaciones a 5+ países de Latinoamérica
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 mt-1">▶</span>
                    <span className="text-gray-300">
                      Desarrollar productos SaaS propios de clase mundial
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-400 mr-3 mt-1">▶</span>
                    <span className="text-gray-300">
                      Alcanzar un equipo de 100+ profesionales especializados
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="mt-20">
            <h3 className="text-3xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400">
              Nuestros Valores
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-600/20 hover:border-orange-400/40 transition-all duration-300">
                <div className="text-4xl mb-4">💡</div>
                <h4 className="text-xl font-bold text-orange-300 mb-2">
                  Innovación
                </h4>
                <p className="text-gray-300">
                  Pioneros en adoptar tecnologías emergentes
                </p>
              </div>
              <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-600/20 hover:border-blue-400/40 transition-all duration-300">
                <div className="text-4xl mb-4">🤝</div>
                <h4 className="text-xl font-bold text-blue-300 mb-2">
                  Colaboración
                </h4>
                <p className="text-gray-300">
                  Trabajamos como socios estratégicos
                </p>
              </div>
              <div className="text-center p-6 bg-gray-800/30 rounded-xl border border-gray-600/20 hover:border-green-400/40 transition-all duration-300">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-xl font-bold text-green-300 mb-2">
                  Excelencia
                </h4>
                <p className="text-gray-300">
                  Calidad superior en cada proyecto
                </p>
              </div>
            </div>
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
