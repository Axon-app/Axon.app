// @ts-nocheck
/**
 * AXON.APP - COMPONENTE PRINCIPAL DE LA APLICACIÓN
 * ================================================
 *
 * Este es el componente raíz de la aplicación Axon.app.
 * Maneja toda la lógica de estado global, navegación, modales y secciones.
 */

import { useEffect, useState } from 'react';

// === IMPORTACIONES DE COMPONENTES ===
import {
  BlogModal,
  BlogSection,
  EnhancedCookiesModal,
  EnhancedPrivacyModal,
  EnhancedTermsModal,
  FloatingBlogButton,
  ServiceDetailModal,
  TechCarousel,
} from './components/index';

import { ConsultationModal, ContactModal, QuoteModal } from './components/modals/UnifiedModals';

import ClientsSection from './components/sections/ClientsSection';
import { EmailLink } from './components/ui/EmailLink';

// === IMPORTACIONES DE DATOS Y HOOKS ===
import { technologies, testimonials } from './data/content';
import { servicesData } from './data/servicesData';
import { useModals } from './hooks/useModals';

// === IMPORTACIONES DE ASSETS ===
import logo1 from '/logo1.png';
import logo231 from '/logo231.png';

// ===================================================================
// COMPONENTE NAVLINK
// ===================================================================
const NavLink = ({ href, children, mobile, onClick, isActive, scrollToSection }) => {
  const baseClasses = mobile
    ? `block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 transform hover:translate-x-2 border-l-2 cursor-pointer ${
        isActive
          ? 'text-blue-400 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border-blue-400'
          : 'text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-600/20 hover:to-cyan-600/20 border-transparent hover:border-blue-400'
      }`
    : `relative text-sm font-semibold transition-all duration-300 group px-3 py-2 rounded-lg cursor-pointer ${
        isActive ? 'text-blue-400 bg-white/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
      }`;

  const desktopEffect = !mobile ? (
    <>
      <div
        className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 rounded-full ${
          isActive ? 'w-full' : 'w-0 group-hover:w-full'
        }`}
      />
      <div
        className={`absolute inset-0 bg-gradient-to-r rounded-lg transition-all duration-300 ${
          isActive
            ? 'from-blue-600/20 to-cyan-600/20'
            : 'from-blue-600/0 to-cyan-600/0 group-hover:from-blue-600/10 group-hover:to-cyan-600/10'
        }`}
      />
    </>
  ) : null;

  const handleClick = e => {
    e.preventDefault();
    const sectionId = href.replace('#', '');
    if (scrollToSection) {
      scrollToSection(sectionId);
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      onClick={handleClick}
      onKeyDown={e => e.key === 'Enter' && handleClick(e)}
      role="button"
      tabIndex={0}
      className={baseClasses}
    >
      {mobile ? (
        children
      ) : (
        <div className="relative">
          <span
            className={`relative z-10 transition-all duration-300 ${
              isActive ? 'text-blue-400 font-semibold' : 'text-gray-300 group-hover:text-white'
            }`}
          >
            {children}
          </span>
          {desktopEffect}
        </div>
      )}
    </div>
  );
};

// ===================================================================
// COMPONENTE TESTIMONIALS CAROUSEL
// ===================================================================
const TestimonialsCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const goToSlide = index => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of inactivity
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      {/* Main Carousel Container */}
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="w-full flex-shrink-0">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md p-8 lg:p-12 mx-4 rounded-2xl border border-gray-700/50 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>

                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="bg-blue-500/20 p-4 rounded-full">
                      <svg
                        className="w-8 h-8 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                      </svg>
                    </div>
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-lg lg:text-xl text-gray-200 text-center mb-8 leading-relaxed font-light">
                    "{testimonial.review}"
                  </blockquote>

                  {/* Rating Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>

                  {/* Client Info */}
                  <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between">
                    <div className="flex items-center space-x-4 mb-4 lg:mb-0">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full border-2 border-gray-600 shadow-lg"
                      />
                      <div className="text-center lg:text-left">
                        <h4 className="text-white font-semibold text-lg">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                        <p className="text-blue-400 text-sm font-medium">{testimonial.company}</p>
                      </div>
                    </div>

                    {/* Project Badge */}
                    <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 px-4 py-2 rounded-full border border-blue-500/30">
                      <span className="text-blue-300 text-sm font-medium">
                        {testimonial.project}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-gray-800/80 hover:bg-gray-700/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-gray-600/50 backdrop-blur-sm"
        aria-label="Testimonio anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-gray-800/80 hover:bg-gray-700/80 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 border border-gray-600/50 backdrop-blur-sm"
        aria-label="Siguiente testimonio"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-8 space-x-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50'
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            aria-label={`Ir al testimonio ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="mt-6 w-full bg-gray-700/50 rounded-full h-1 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300 ease-out"
          style={{
            width: `${((currentIndex + 1) / testimonials.length) * 100}%`,
          }}
        />
      </div>

      {/* Auto-play Indicator */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs transition-all duration-300 ${
            isAutoPlaying
              ? 'bg-green-500/20 text-green-400 border border-green-500/30'
              : 'bg-gray-600/20 text-gray-400 border border-gray-600/30'
          }`}
        >
          {isAutoPlaying ? (
            <>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Auto-reproduciendo</span>
            </>
          ) : (
            <>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>Pausado</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

/**
 * COMPONENTE PRINCIPAL APP
 */
const App = () => {
  // ===================================================================
  // ESTADOS PRINCIPALES DE LA APLICACIÓN
  // ===================================================================
  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCookiesModal, setShowCookiesModal] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [selectedBlogPost, setSelectedBlogPost] = useState(null);

  // Hook para modales unificados
  const {
    contactModalOpen,
    quoteModalOpen,
    consultationModalOpen,
    openContactModal,
    openQuoteModal,
    openConsultationModal,
    closeContactModal,
    closeQuoteModal,
    closeConsultationModal,
  } = useModals();

  // ===================================================================
  // EFECTOS Y MANEJADORES
  // ===================================================================

  // Efecto para detectar la sección activa al hacer scroll
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const sections = [
        'hero',
        'about',
        'services',
        'technologies',
        'testimonials',
        'blog',
        'contact',
      ];
      const scrollPosition = window.scrollY + 100;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efecto para mostrar el banner de cookies
  useEffect(() => {
    const cookiesAccepted = localStorage.getItem('axon-cookies-accepted');
    if (!cookiesAccepted) {
      const timer = setTimeout(() => {
        setShowCookieBanner(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Manejadores de eventos
  const handleCloseServiceModal = () => {
    setShowServiceModal(false);
    setSelectedService(null);
  };

  const handleOpenQuoteModal = () => {
    openQuoteModal();
  };

  const handleOpenConsultationModal = () => {
    openConsultationModal();
  };

  const handleOpenBlogModal = post => {
    setSelectedBlogPost(post);
    setShowBlogModal(true);
  };

  const handleCloseBlogModal = () => {
    setShowBlogModal(false);
    setSelectedBlogPost(null);
  };

  const scrollToBlog = () => {
    scrollToSection('blog');
  };

  const scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white font-sans overflow-x-hidden">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass-effect navbar-blur shadow-2xl border-b border-gray-800/50 nav-slide-in">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo Section */}
            <button
              onClick={() => scrollToSection('hero')}
              className="flex items-center group transition-transform duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={logo1}
                  alt="Axon Logo Original"
                  className="h-16 w-16 object-contain logo-rotate-1 rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/40 backdrop-blur-sm"
                  style={{
                    filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.6))',
                  }}
                  onError={e => {
                    e.target.style.display = 'none';
                  }}
                />
                <img
                  src={logo231}
                  alt="Axon.App Logo 3D"
                  className="h-20 w-auto object-contain logo-rotate-2 rounded-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/40 backdrop-blur-sm"
                  style={{
                    filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.7))',
                  }}
                  onError={e => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              <NavLink
                href="#hero"
                isActive={activeSection === 'hero'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Inicio</span>
                </span>
              </NavLink>
              <NavLink
                href="#about"
                isActive={activeSection === 'about'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Nosotros</span>
                </span>
              </NavLink>
              <NavLink
                href="#services"
                isActive={activeSection === 'services'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Servicios</span>
                </span>
              </NavLink>
              <NavLink
                href="#technologies"
                isActive={activeSection === 'technologies'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Tecnologías</span>
                </span>
              </NavLink>
              <NavLink
                href="#testimonials"
                isActive={activeSection === 'testimonials'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Testimonios</span>
                </span>
              </NavLink>
              <NavLink
                href="#blog"
                isActive={activeSection === 'blog'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Blog</span>
                </span>
              </NavLink>
              <NavLink
                href="#contact"
                isActive={activeSection === 'contact'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>Contacto</span>
                </span>
              </NavLink>
            </div>

            {/* CTA Button & Mobile Menu Toggle */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleOpenQuoteModal}
                className="hidden md:block bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold px-6 py-2.5 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 border border-blue-500/20"
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                  <span>Propuesta Personalizada</span>
                </span>
              </button>

              <button
                onClick={() => setShowMenu(!showMenu)}
                className="lg:hidden flex items-center space-x-2 p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${
                    showMenu ? 'rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {showMenu ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
                <span className="text-sm font-medium">{showMenu ? 'Cerrar' : 'Menú'}</span>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              showMenu ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="py-4 space-y-2 border-t border-gray-800/50 menu-slide">
              <NavLink
                href="#hero"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === 'hero'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  <span>Inicio</span>
                </span>
              </NavLink>
              <NavLink
                href="#about"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === 'about'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Nosotros</span>
                </span>
              </NavLink>
              <NavLink
                href="#services"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === 'services'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Servicios</span>
                </span>
              </NavLink>
              <NavLink
                href="#technologies"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === 'technologies'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Tecnologías</span>
                </span>
              </NavLink>
              <NavLink
                href="#testimonials"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === 'testimonials'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Testimonios</span>
                </span>
              </NavLink>
              <NavLink
                href="#blog"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === 'blog'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Blog</span>
                </span>
              </NavLink>
              <NavLink
                href="#contact"
                mobile
                onClick={() => setShowMenu(false)}
                isActive={activeSection === 'contact'}
                scrollToSection={scrollToSection}
              >
                <span className="flex items-center space-x-3">
                  <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span>Contacto</span>
                </span>
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      >
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-cyan-900/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center max-w-6xl mx-auto">
            {/* Main Headline */}
            <div className="mb-8">
              <h1 className="text-6xl lg:text-8xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                Axon.App
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-6"></div>
            </div>

            {/* Value Proposition */}
            <h2 className="text-2xl lg:text-4xl font-bold text-white mb-6 leading-tight">
              Transformamos <span className="text-cyan-400">ideas</span> en{' '}
              <span className="text-blue-400">soluciones digitales</span> que impulsan tu negocio
            </h2>

            <p className="text-lg lg:text-xl text-gray-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Somos expertos en <strong className="text-white">desarrollo web</strong>,{' '}
              <strong className="text-white">apps móviles</strong>,{' '}
              <strong className="text-white">inteligencia artificial</strong> y{' '}
              <strong className="text-white">marketing digital</strong>. Creamos experiencias
              digitales que conectan con tus usuarios y generan resultados reales.
            </p>

            {/* Key Services Pills */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              <span className="bg-blue-500/20 text-blue-400 px-4 py-2 rounded-full text-sm font-medium border border-blue-500/30">
                🌐 Desarrollo Web
              </span>
              <span className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium border border-cyan-500/30">
                📱 Apps Móviles
              </span>
              <span className="bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30">
                🤖 Inteligencia Artificial
              </span>
              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-500/30">
                📊 Marketing Digital
              </span>
              <span className="bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30">
                🎨 UI/UX Design
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                onClick={openContactModal}
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 relative overflow-hidden"
              >
                <span className="relative z-10">Comenzar Proyecto</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-cyan-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>

              <button
                onClick={openQuoteModal}
                className="group border-2 border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white font-bold px-10 py-4 rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 relative overflow-hidden"
              >
                <span className="relative z-10">Cotización Gratuita</span>
                <div className="absolute inset-0 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </div>

            {/* Stats or Trust Indicators */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">100+</div>
                <div className="text-gray-400 text-sm">Proyectos Exitosos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-gray-400 text-sm">Clientes Satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-gray-400 text-sm">Soporte Técnico</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">5⭐</div>
                <div className="text-gray-400 text-sm">Calificación Promedio</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Sobre Nosotros</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Somos expertos en desarrollo de software y soluciones tecnológicas innovadoras.
              Transformamos ideas en realidades digitales que impulsan el crecimiento de tu negocio.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <div className="text-center">
                <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Calidad Garantizada</h3>
                <p className="text-gray-300">
                  Código limpio, escalable y optimizado para el mejor rendimiento.
                </p>
              </div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <div className="text-center">
                <div className="bg-cyan-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-cyan-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Equipo Experto</h3>
                <p className="text-gray-300">
                  Profesionales con años de experiencia en tecnologías modernas.
                </p>
              </div>
            </div>
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50">
              <div className="text-center">
                <div className="bg-green-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Soporte 24/7</h3>
                <p className="text-gray-300">
                  Respuesta rápida y soporte continuo para todos nuestros proyectos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Nuestros Servicios</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Ofrecemos soluciones tecnológicas completas adaptadas a las necesidades de tu negocio
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.values(servicesData).map((service, index) => (
              <div
                key={index}
                className="bg-gray-800/50 p-6 rounded-xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
                onClick={() => {
                  setSelectedService(service);
                  setShowServiceModal(true);
                }}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    setSelectedService(service);
                    setShowServiceModal(true);
                  }
                }}
                role="button"
                tabIndex={0}
                aria-label={`Ver más detalles sobre ${service.title}`}
              >
                <div className="text-center">
                  <div className="bg-blue-500/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500/30 transition-all duration-300">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{service.description}</p>
                  <div className="text-blue-400 font-semibold group-hover:text-blue-300 transition-colors">
                    Ver más →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Tecnologías que Dominamos</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Trabajamos con las tecnologías más modernas y eficientes del mercado
            </p>
          </div>
          <TechCarousel technologies={technologies} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-white">Lo Que Dicen Nuestros Clientes</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              La confianza de nuestros clientes es nuestro mayor logro. Estas son sus experiencias
              trabajando con nosotros.
            </p>
          </div>

          {/* Testimonials Carousel */}
          <div className="relative max-w-6xl mx-auto">
            <TestimonialsCarousel testimonials={testimonials} />
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gray-900/50">
        <div className="container mx-auto px-4 lg:px-8">
          <BlogSection onOpenBlogModal={handleOpenBlogModal} />
        </div>
      </section>

      {/* Clients Section */}
      <ClientsSection />

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-gray-900/50 via-gray-800/30 to-gray-900/50 relative overflow-hidden"
      >
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">
              ¿Listo para{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Transformar
              </span>{' '}
              tu Negocio?
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full mb-6"></div>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Conversemos sobre tu proyecto. Nuestro equipo de expertos está listo para ayudarte a
              crear soluciones digitales que impulsen tu crecimiento.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left Side - Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Conecta con Nosotros</h3>
                <p className="text-gray-300 text-lg mb-8">
                  Estamos aquí para escucharte y crear juntos la solución perfecta para tu negocio.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {/* Email */}
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="bg-blue-500/20 p-4 rounded-xl group-hover:bg-blue-500/30 transition-all duration-300">
                      <svg
                        className="w-8 h-8 text-blue-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-1">Email Directo</h4>
                      <EmailLink className="text-blue-400 text-lg font-medium hover:text-blue-300 transition-colors">
                        contacto@axon.app
                      </EmailLink>
                      <p className="text-gray-400 text-sm">Respuesta garantizada en 24 horas</p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="bg-purple-500/20 p-4 rounded-xl group-hover:bg-purple-500/30 transition-all duration-300">
                      <svg
                        className="w-8 h-8 text-purple-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-1">Ubicación</h4>
                      <p className="text-purple-400 text-lg font-medium">Colombia</p>
                      <p className="text-gray-400 text-sm">Atendemos clientes globalmente</p>
                    </div>
                  </div>
                </div>

                {/* Support */}
                <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 group">
                  <div className="flex items-center space-x-4">
                    <div className="bg-green-500/20 p-4 rounded-xl group-hover:bg-green-500/30 transition-all duration-300">
                      <svg
                        className="w-8 h-8 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-1">Soporte 24/7</h4>
                      <p className="text-green-400 text-lg font-medium">Siempre disponibles</p>
                      <p className="text-gray-400 text-sm">Soporte continuo post-lanzamiento</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl border border-blue-500/20">
                  <div className="text-2xl font-bold text-white mb-1">100+</div>
                  <div className="text-blue-400 text-sm">Proyectos Completados</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                  <div className="text-2xl font-bold text-white mb-1">5⭐</div>
                  <div className="text-green-400 text-sm">Calificación Promedio</div>
                </div>
              </div>
            </div>

            {/* Right Side - CTA Actions */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">¿Cómo Podemos Ayudarte?</h3>
                <p className="text-gray-300 text-lg">
                  Elige la opción que mejor se adapte a tus necesidades y comencemos a trabajar
                  juntos.
                </p>
              </div>

              {/* CTA Cards */}
              <div className="space-y-6">
                {/* Project Consultation */}
                <div
                  className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-md p-8 rounded-2xl border border-blue-500/30 hover:border-blue-500/50 transition-all duration-300 group cursor-pointer"
                  onClick={openConsultationModal}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && openConsultationModal()}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-500/30 p-3 rounded-xl group-hover:bg-blue-500/40 transition-all duration-300">
                      <svg
                        className="w-6 h-6 text-blue-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-xl mb-2">Consultoría Estratégica</h4>
                      <p className="text-blue-200 mb-4">
                        Conversemos sobre tu visión y diseñemos juntos la estrategia perfecta para
                        tu proyecto.
                      </p>
                      <div className="flex items-center text-blue-300 font-semibold group-hover:text-blue-200 transition-colors">
                        <span>Agendar Consulta Gratuita</span>
                        <svg
                          className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quote Request */}
                <div
                  className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md p-8 rounded-2xl border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 group cursor-pointer"
                  onClick={openQuoteModal}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && openQuoteModal()}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-500/30 p-3 rounded-xl group-hover:bg-purple-500/40 transition-all duration-300">
                      <svg
                        className="w-6 h-6 text-purple-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-xl mb-2">
                        Cotización Personalizada
                      </h4>
                      <p className="text-purple-200 mb-4">
                        Recibe una propuesta detallada con costos, tiempos y especificaciones
                        técnicas.
                      </p>
                      <div className="flex items-center text-purple-300 font-semibold group-hover:text-purple-200 transition-colors">
                        <span>Solicitar Cotización</span>
                        <svg
                          className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Contact */}
                <div
                  className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-md p-8 rounded-2xl border border-green-500/30 hover:border-green-500/50 transition-all duration-300 group cursor-pointer"
                  onClick={openContactModal}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && openContactModal()}
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-500/30 p-3 rounded-xl group-hover:bg-green-500/40 transition-all duration-300">
                      <svg
                        className="w-6 h-6 text-green-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-xl mb-2">Contacto Directo</h4>
                      <p className="text-green-200 mb-4">
                        Envíanos un mensaje directo y te responderemos en menos de 24 horas.
                      </p>
                      <div className="flex items-center text-green-300 font-semibold group-hover:text-green-200 transition-colors">
                        <span>Enviar Mensaje</span>
                        <svg
                          className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-gradient-to-br from-orange-600/10 to-red-600/10 backdrop-blur-md p-6 rounded-2xl border border-orange-500/20">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="bg-orange-500/20 p-2 rounded-lg">
                    <svg
                      className="w-5 h-5 text-orange-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h4 className="text-orange-300 font-semibold">¿Proyecto Urgente?</h4>
                </div>
                <p className="text-gray-300 text-sm">
                  Para proyectos que requieren atención inmediata, contáctanos directamente por
                  email con el asunto "URGENTE".
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-cyan-500/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative z-10">
          <div className="container mx-auto px-4 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={logo1}
                    alt="Axon Logo"
                    className="h-12 w-12 object-contain rounded-lg"
                  />
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Axon.App
                  </h3>
                </div>
                <p className="text-gray-300 mb-6 max-w-md">
                  Soluciones tecnológicas innovadoras para impulsar tu negocio hacia el futuro
                  digital.
                </p>
              </div>

              {/* Services */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Servicios</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#services"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      Desarrollo Web
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      Apps Móviles
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      Consultoría TI
                    </a>
                  </li>
                  <li>
                    <a
                      href="#services"
                      className="text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      Automatización
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
                <ul className="space-y-2">
                  <li className="text-gray-300">
                    <EmailLink>contacto@axon.app</EmailLink>
                  </li>
                  <li className="text-gray-300">Colombia</li>
                  <li className="text-gray-300">Respuesta ≤ 24h</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-gray-400 text-sm">
                  © 2025 Axon.App. Todos los derechos reservados.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <button
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    Política de Privacidad
                  </button>
                  <button
                    onClick={() => setShowTermsModal(true)}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    Términos de Servicio
                  </button>
                  <button
                    onClick={() => setShowCookiesModal(true)}
                    className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                  >
                    Cookies
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto">
          <div className="bg-gray-900/95 backdrop-blur-md border border-gray-700/50 rounded-xl p-6 shadow-2xl">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-500/20 p-2 rounded-lg flex-shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-white font-semibold text-sm mb-2">🍪 Uso de Cookies</h4>
                <p className="text-gray-300 text-sm mb-4">
                  Utilizamos cookies para mejorar tu experiencia. Al continuar navegando, aceptas
                  nuestro uso de cookies.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => {
                      const allAccepted = {
                        necessary: true,
                        analytics: true,
                        marketing: true,
                        preferences: true,
                      };
                      localStorage.setItem('axon-cookie-preferences', JSON.stringify(allAccepted));
                      localStorage.setItem('axon-cookies-accepted', 'true');
                      setShowCookieBanner(false);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg transition-colors text-sm font-semibold"
                  >
                    Aceptar Todas
                  </button>
                  <button
                    onClick={() => setShowCookiesModal(true)}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Configurar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <EnhancedPrivacyModal isOpen={showPrivacyModal} onClose={() => setShowPrivacyModal(false)} />
      <EnhancedTermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} />
      <EnhancedCookiesModal isOpen={showCookiesModal} onClose={() => setShowCookiesModal(false)} />

      {selectedService && showServiceModal && (
        <ServiceDetailModal
          service={selectedService}
          isOpen={showServiceModal}
          onClose={handleCloseServiceModal}
          onOpenQuote={handleOpenQuoteModal}
          onOpenConsultation={handleOpenConsultationModal}
        />
      )}

      <ContactModal isOpen={contactModalOpen} onClose={closeContactModal} />
      <QuoteModal isOpen={quoteModalOpen} onClose={closeQuoteModal} />
      <ConsultationModal isOpen={consultationModalOpen} onClose={closeConsultationModal} />

      <BlogModal isOpen={showBlogModal} onClose={handleCloseBlogModal} post={selectedBlogPost} />

      <FloatingBlogButton onClick={scrollToBlog} isVisible={true} />
    </div>
  );
};

export default App;
