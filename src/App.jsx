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
  ServiceDetailModal,
  QuoteRequestModal,
  ConsultationModal,
  AnimatedCounter,
  TestimonialsBanner,
} from "./components/UIComponents";
import { technologies, testimonials } from "./data/content";
import { servicesData } from "./data/servicesData";
import logo1 from "./assets/logo1.png";

const App = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false); // Estado para la modal de Privacidad
  const [showTermsModal, setShowTermsModal] = useState(false); // Estado para la modal de Términos
  const [logoError, setLogoError] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showConsultationModal, setShowConsultationModal] = useState(false);

  const handleLogoError = () => {
    console.error("Logo failed to load");
    setLogoError(true);
  };

  const handleOpenServiceModal = (serviceId) => {
    setSelectedService(servicesData[serviceId]);
    setShowServiceModal(true);
  };

  const handleCloseServiceModal = () => {
    setShowServiceModal(false);
    setSelectedService(null);
  };

  const handleOpenQuoteModal = () => {
    setShowQuoteModal(true);
  };

  const handleCloseQuoteModal = () => {
    setShowQuoteModal(false);
  };

  const handleOpenConsultationModal = () => {
    setShowConsultationModal(true);
  };

  const handleCloseConsultationModal = () => {
    setShowConsultationModal(false);
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

      {/* Services Section - Professional Design */}
      <section
        id="services"
        className="py-20 md:py-32 bg-gradient-to-br from-gray-800 via-gray-900 to-slate-900 relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-cyan-500 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-blue-400 animate-fadeIn">
              Nuestros Servicios
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8">
              Soluciones tecnológicas integrales para impulsar tu negocio hacia
              el futuro digital
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto rounded-full"></div>
          </div>

          {/* Main Services Grid - Uniform Layout */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-cyan-300 mb-8 flex items-center justify-center">
              <span className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full flex items-center justify-center mr-3 text-sm">
                💻
              </span>
              Desarrollo & Tecnología Core
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ServiceCard
                icon="🌐"
                title="Desarrollo Web Full-Stack"
                description="Aplicaciones web modernas con React, Node.js, Python y tecnologías de vanguardia. Desde landing pages hasta plataformas enterprise."
                onOpenModal={handleOpenServiceModal}
                id="desarrollo-web"
              />
              <ServiceCard
                icon="📱"
                title="Apps Móviles Nativas"
                description="Desarrollo nativo para iOS y Android, React Native y Flutter. Experiencias móviles que conquistan usuarios."
                onOpenModal={handleOpenServiceModal}
                id="apps-moviles"
              />
              <ServiceCard
                icon="☁️"
                title="Arquitectura Cloud"
                description="Infraestructura escalable en AWS, Azure y GCP. Microservicios, contenedores y despliegues automáticos."
                onOpenModal={handleOpenServiceModal}
                id="arquitectura-cloud"
              />
              <ServiceCard
                icon="🔗"
                title="APIs & Integración"
                description="APIs RESTful y GraphQL robustas. Integración con sistemas empresariales y servicios de terceros."
                onOpenModal={handleOpenServiceModal}
                id="apis-integracion"
              />
              <ServiceCard
                icon="🤖"
                title="Inteligencia Artificial"
                description="Machine Learning, NLP, Computer Vision. Automatización inteligente para tu negocio."
                onOpenModal={handleOpenServiceModal}
                id="inteligencia-artificial"
              />
              <ServiceCard
                icon="🔒"
                title="Ciberseguridad"
                description="Auditorías, pentesting, implementación de protocolos de seguridad y compliance."
                onOpenModal={handleOpenServiceModal}
                id="ciberseguridad"
              />
            </div>
          </div>

          {/* Design & Strategy Services */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-green-300 mb-8 flex items-center justify-center">
              <span className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mr-3 text-sm">
                🎨
              </span>
              Diseño & Estrategia Digital
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard
                icon="✨"
                title="UI/UX Design"
                description="Interfaces intuitivas y experiencias memorables. Diseño centrado en el usuario con metodologías ágiles."
                onOpenModal={handleOpenServiceModal}
                id="ui-ux-design"
              />
              <ServiceCard
                icon="🎯"
                title="Estrategia Digital"
                description="Consultoría tecnológica, roadmaps de producto y transformación digital empresarial."
                onOpenModal={handleOpenServiceModal}
                id="estrategia-digital"
              />
              <ServiceCard
                icon="📊"
                title="Data Analytics"
                description="Business Intelligence, dashboards interactivos y análisis predictivo para toma de decisiones."
                onOpenModal={handleOpenServiceModal}
                id="data-analytics"
              />
              <ServiceCard
                icon="🔄"
                title="DevOps & Automatización"
                description="CI/CD, monitoreo, testing automatizado y optimización de procesos de desarrollo."
                onOpenModal={handleOpenServiceModal}
                id="devops-automatizacion"
              />
            </div>
          </div>

          {/* Emerging Technologies */}
          <div className="bg-gradient-to-r from-slate-800/50 to-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-600/30">
            <h3 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 mb-8">
              🌟 Tecnologías Emergentes
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gray-800/40 rounded-xl border border-gray-600/20 hover:border-yellow-400/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-4xl mb-4">🔗</div>
                <h4 className="text-lg font-bold text-yellow-300 mb-2">
                  Blockchain & Web3
                </h4>
                <p className="text-gray-300 text-sm">
                  Smart contracts, DApps y soluciones descentralizadas
                </p>
              </div>
              <div className="text-center p-6 bg-gray-800/40 rounded-xl border border-gray-600/20 hover:border-purple-400/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-4xl mb-4">🥽</div>
                <h4 className="text-lg font-bold text-purple-300 mb-2">
                  AR/VR & Metaverse
                </h4>
                <p className="text-gray-300 text-sm">
                  Experiencias inmersivas y realidad extendida
                </p>
              </div>
              <div className="text-center p-6 bg-gray-800/40 rounded-xl border border-gray-600/20 hover:border-green-400/40 transition-all duration-300 hover:transform hover:scale-105">
                <div className="text-4xl mb-4">🌱</div>
                <h4 className="text-lg font-bold text-green-300 mb-2">
                  IoT & Edge Computing
                </h4>
                <p className="text-gray-300 text-sm">
                  Dispositivos conectados y computación distribuida
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <h3 className="text-2xl font-bold text-white mb-6">
              ¿Listo para transformar tu idea en realidad?
            </h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Nuestro equipo de expertos está preparado para llevar tu proyecto
              al siguiente nivel
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="bg-gradient-to-r from-green-600 to-cyan-600 hover:from-green-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Iniciar Proyecto
              </a>
              <a
                href="#technologies"
                className="bg-transparent border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-gray-900 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Ver Tecnologías
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section - Diseño Elegante y Compacto */}
      <section
        id="technologies"
        className="py-16 md:py-24 relative bg-gradient-to-br from-gray-900 via-slate-900 to-black overflow-hidden"
      >
        {/* Efectos de fondo minimalistas */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-900/10 to-transparent blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header Minimalista */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-gray-700/50">
              <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-300 text-sm font-medium">
                Tech Stack
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              Tecnologías que
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {" "}
                Dominamos
              </span>
            </h2>

            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Stack moderno para soluciones escalables y de alto rendimiento
            </p>
          </div>

          {/* Tech Grid Compacto y Elegante */}
          <div className="max-w-6xl mx-auto">
            {/* Primera fila - Frontend & Frameworks */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-blue-400 font-semibold text-sm uppercase tracking-wider">
                  Frontend & Frameworks
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-400/50 to-transparent ml-4"></div>
              </div>
              <div className="flex flex-wrap gap-3">
                {technologies
                  .filter((tech) =>
                    ["Frontend", "Programming"].includes(tech.category)
                  )
                  .map((tech) => (
                    <div
                      key={tech.name}
                      className="group flex items-center bg-gray-800/40 hover:bg-gray-700/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-700/30 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                    >
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">
                        {tech.icon}
                      </span>
                      <div>
                        <div className="text-white font-medium text-sm">
                          {tech.name}
                        </div>
                        <div
                          className={`text-xs ${
                            tech.level === "Expert"
                              ? "text-emerald-400"
                              : "text-blue-400"
                          }`}
                        >
                          {tech.level}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Segunda fila - Backend & APIs */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-emerald-400 font-semibold text-sm uppercase tracking-wider">
                  Backend & APIs
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-emerald-400/50 to-transparent ml-4"></div>
              </div>
              <div className="flex flex-wrap gap-3">
                {technologies
                  .filter((tech) => ["Backend", "API"].includes(tech.category))
                  .map((tech) => (
                    <div
                      key={tech.name}
                      className="group flex items-center bg-gray-800/40 hover:bg-gray-700/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-700/30 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105"
                    >
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">
                        {tech.icon}
                      </span>
                      <div>
                        <div className="text-white font-medium text-sm">
                          {tech.name}
                        </div>
                        <div
                          className={`text-xs ${
                            tech.level === "Expert"
                              ? "text-emerald-400"
                              : "text-blue-400"
                          }`}
                        >
                          {tech.level}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Tercera fila - Infrastructure */}
            <div className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-purple-400 font-semibold text-sm uppercase tracking-wider">
                  Infrastructure & Data
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-400/50 to-transparent ml-4"></div>
              </div>
              <div className="flex flex-wrap gap-3">
                {technologies
                  .filter((tech) =>
                    ["Cloud", "DevOps", "Database", "Cache", "IA/ML"].includes(
                      tech.category
                    )
                  )
                  .map((tech) => (
                    <div
                      key={tech.name}
                      className="group flex items-center bg-gray-800/40 hover:bg-gray-700/60 backdrop-blur-sm rounded-lg px-4 py-3 border border-gray-700/30 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                    >
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">
                        {tech.icon}
                      </span>
                      <div>
                        <div className="text-white font-medium text-sm">
                          {tech.name}
                        </div>
                        <div
                          className={`text-xs ${
                            tech.level === "Expert"
                              ? "text-emerald-400"
                              : "text-blue-400"
                          }`}
                        >
                          {tech.level}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Stats compactos y CTA */}
            <div className="flex flex-col md:flex-row items-center justify-between mt-12 pt-8 border-t border-gray-800/50">
              {/* Stats minimalistas */}
              <div className="flex items-center space-x-8 mb-6 md:mb-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">20+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Tecnologías
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-400">5+</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Años Exp
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">100%</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide">
                    Actualizados
                  </div>
                </div>
              </div>

              {/* CTA compacto */}
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowQuoteModal(true)}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 text-sm"
                >
                  Cotización
                </button>
                <button
                  onClick={() => setShowConsultationModal(true)}
                  className="bg-transparent border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 text-sm"
                >
                  Consulta
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section - Logros y Proyectos */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-gray-800 to-slate-800 relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-emerald-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-gray-700/30 backdrop-blur-sm rounded-full px-4 py-2 mb-4 border border-gray-600/30">
              <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></div>
              <span className="text-gray-300 text-sm font-medium">
                Nuestros Logros
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Proyectos que
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                {" "}
                Transforman
              </span>
            </h2>

            <p className="text-gray-400 max-w-2xl mx-auto">
              Cada número representa la confianza de nuestros clientes y nuestro
              compromiso con la excelencia
            </p>
          </div>

          {/* Contadores Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {/* Proyectos Completados */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 text-center group hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter endValue={150} suffix="+" duration={2500} />
              </div>
              <div className="text-gray-300 font-medium mb-1">Proyectos</div>
              <div className="text-xs text-gray-500">Completados</div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-3">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full w-4/5"></div>
              </div>
            </div>

            {/* Clientes Satisfechos */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 text-center group hover:border-emerald-500/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter endValue={120} suffix="+" duration={2200} />
              </div>
              <div className="text-gray-300 font-medium mb-1">Clientes</div>
              <div className="text-xs text-gray-500">Satisfechos</div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-3">
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 h-1.5 rounded-full w-full"></div>
              </div>
            </div>

            {/* Años de Experiencia */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 text-center group hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter endValue={5} suffix="+" duration={1800} />
              </div>
              <div className="text-gray-300 font-medium mb-1">Años</div>
              <div className="text-xs text-gray-500">Experiencia</div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full w-3/4"></div>
              </div>
            </div>

            {/* Uptime/Disponibilidad */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 text-center group hover:border-amber-500/50 transition-all duration-300 hover:scale-105">
              <div className="text-3xl md:text-4xl font-bold text-amber-400 mb-2 group-hover:scale-110 transition-transform duration-300">
                <AnimatedCounter
                  endValue={99.9}
                  suffix="%"
                  duration={3000}
                  decimals={1}
                />
              </div>
              <div className="text-gray-300 font-medium mb-1">Uptime</div>
              <div className="text-xs text-gray-500">Disponibilidad</div>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-3">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-1.5 rounded-full w-full"></div>
              </div>
            </div>
          </div>

          {/* Logros adicionales en formato horizontal */}
          <div className="mt-12 bg-gradient-to-r from-gray-800/30 to-gray-700/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">
                    Respuesta &lt; 24h
                  </div>
                  <div className="text-sm text-gray-400">Garantizada</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">
                    100% Seguro
                  </div>
                  <div className="text-sm text-gray-400">SSL & Cifrado</div>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">
                    Soporte 24/7
                  </div>
                  <div className="text-sm text-gray-400">Técnico Dedicado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
        {/* Efectos de fondo */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-emerald-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-gray-700/50">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 animate-pulse"></div>
              <span className="text-gray-300 font-medium">Testimonios</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Lo que Dicen Nuestros
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
                Clientes
              </span>
            </h2>

            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              La satisfacción de nuestros clientes es nuestra mejor carta de
              presentación. Descubre cómo hemos transformado sus negocios con
              soluciones tecnológicas innovadoras.
            </p>
          </div>

          {/* Testimonials Banner */}
          <TestimonialsBanner testimonials={testimonials} />

          {/* Stats Row */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">
                4.9/5
              </div>
              <div className="text-gray-400">Calificación Promedio</div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-yellow-400 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">
                100%
              </div>
              <div className="text-gray-400">Proyectos Exitosos</div>
              <div className="text-sm text-emerald-300 mt-1">
                Sin fallos en entrega
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">98%</div>
              <div className="text-gray-400">Clientes Recurrentes</div>
              <div className="text-sm text-blue-300 mt-1">
                Confían en nosotros
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-gray-400 mb-6 text-lg">
              ¿Quieres ser nuestro próximo caso de éxito?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowQuoteModal(true)}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-500/25"
              >
                Iniciar Mi Proyecto
              </button>
              <button
                onClick={() => setShowConsultationModal(true)}
                className="bg-transparent border-2 border-gray-500 text-gray-300 hover:border-gray-400 hover:text-white font-bold py-4 px-8 rounded-full transition-all duration-300"
              >
                Ver Más Casos
              </button>
            </div>
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
              <div className="flex items-center justify-center md:justify-start">
                <svg
                  className="w-6 h-6 mr-3 text-blue-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <a
                  href="mailto:axonapp.info@gmail.com"
                  className="text-blue-400 hover:text-blue-300 transition duration-200"
                >
                  axonapp.info@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center md:justify-start">
                <svg
                  className="w-6 h-6 mr-3 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span className="text-green-300">Respuesta en 24 horas</span>
              </div>
              <div className="flex items-center justify-center md:justify-start">
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
                Disponible globalmente
              </div>
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
          {/* Información de contacto */}
          <div className="mb-6">
            <h3 className="text-white text-lg font-semibold mb-3">
              Contáctanos
            </h3>
            <div className="flex justify-center items-center space-x-2 mb-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                ></path>
              </svg>
              <a
                href="mailto:axonapp.info@gmail.com"
                className="text-blue-400 hover:text-blue-300 transition duration-200"
              >
                axonapp.info@gmail.com
              </a>
            </div>
            <p className="text-gray-500 text-xs">
              Todas las consultas, cotizaciones y solicitudes de servicios
              llegan directamente a nuestro equipo
            </p>
          </div>

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
      {/* ServiceDetailModal temporalmente comentado para debug */}
      {selectedService && showServiceModal && (
        <ServiceDetailModal
          service={selectedService}
          isOpen={showServiceModal}
          onClose={handleCloseServiceModal}
          onOpenQuote={handleOpenQuoteModal}
          onOpenConsultation={handleOpenConsultationModal}
        />
      )}

      {/* Quote Request Modal */}
      <QuoteRequestModal
        isOpen={showQuoteModal}
        onClose={handleCloseQuoteModal}
        serviceName={selectedService?.title || "Servicio"}
      />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={showConsultationModal}
        onClose={handleCloseConsultationModal}
        serviceName={selectedService?.title || "Servicio"}
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
