/**
 * ARCHIVO DE EXPORTACIONES CENTRALIZADAS
 * ======================================
 *
 * Este archivo centraliza todas las exportaciones de componentes
 * para facilitar las importaciones y mantener un código limpio.
 *
 * Ventajas de esta estructura:
 * - Importaciones más limpias en otros archivos
 * - Fácil mantenimiento de dependencias
 * - Mejor organización del código
 * - Posibilidad de lazy loading futuro
 *
 * Estructura de exportaciones:
 * 1. Componentes básicos de UI
 * 2. Tarjetas y elementos interactivos
 * 3. Componentes de UI adicionales
 * 4. Secciones de la aplicación
 * 5. Modales del sistema
 *
 * @author Axon.app Team
 * @version 2.4.0
 */


// ===================================================================
// COMPONENTES BÁSICOS DE UI
// ===================================================================

/**
 * Componentes fundamentales de la interfaz de usuario
 * Incluye elementos como logos, botones y fondos animados
 */
export {
  AnimatedBackground, // Fondo animado con efectos visuales
  AxonLogo, // Componente del logo de Axon
  ScrollToTopButton
} from "./ui/BasicComponents";

// ===================================================================
// TARJETAS Y ELEMENTOS DE CONTENIDO
// ===================================================================

/**
 * Componentes de tarjetas para mostrar información
 * Servicios, testimonios y otros elementos de contenido
 */
export {
  ServiceCard, // Tarjeta individual de servicio
  TestimonialCard // Tarjeta de testimonio de cliente
} from "./ui/Cards";

// ===================================================================
// COMPONENTES INTERACTIVOS Y ANIMADOS
// ===================================================================

/**
 * Componentes con funcionalidades interactivas y animaciones
 * Contadores, carruseles y banners dinámicos
 */
export {
  AnimatedCounter, // Contador con animación
  AnimatedCounterWithProgress, // Contador con barra de progreso
  TechCarousel, // Carrusel de tecnologías
  TechItem, // Elemento individual de tecnología
  TestimonialsBanner
} from "./ui/Interactive";

// ===================================================================
// COMPONENTES DE UI ADICIONALES
// ===================================================================

/**
 * Componentes específicos de funcionalidades
 */
export { FloatingBlogButton } from "./ui/FloatingBlogButton"; // Botón flotante del blog

// ===================================================================
// SECCIONES DE LA APLICACIÓN
// ===================================================================

/**
 * Secciones completas de la página web
 */
export { BlogSection } from "./sections/BlogSection"; // Sección completa del blog

// ===================================================================
// MODALES DEL SISTEMA
// ===================================================================

/**
 * Modales para diferentes funcionalidades del sistema
 * Incluye modales de información, servicios y blog
 */
export { BlogModal } from "./modals/BlogModal"; // Modal del blog
export { ConsultationModal } from "./modals/ConsultationModal"; // Modal de consulta
export { EnhancedCookiesModal } from "./modals/CookiesModal"; // Modal de cookies mejorado
export { EnhancedPrivacyModal } from "./modals/PrivacyModal"; // Modal de privacidad mejorado
export { QuoteRequestModal } from "./modals/QuoteModal"; // Modal de solicitud de cotización
export { ServiceDetailModal } from "./modals/ServiceModal"; // Modal de detalles de servicio
export { EnhancedTermsModal } from "./modals/TermsModal"; // Modal de términos mejorado
