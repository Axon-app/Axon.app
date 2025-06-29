/**
 * ARCHIVO DE EXPORTACIONES CENTRALIZADAS
 * ======================================
 *
 * Centraliza todas las exportaciones de componentes para facilitar las importaciones y mantener un código limpio y profesional.
 *
 * Ventajas:
 * - Importaciones más limpias y consistentes
 * - Fácil mantenimiento y escalabilidad
 * - Mejor organización del código
 * - Permite futuras estrategias de lazy loading
 *
 * Estructura:
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
 * Componentes fundamentales de la interfaz de usuario.
 * Incluye elementos como logos, botones y fondos animados.
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
 * Componentes de tarjetas para mostrar información relevante.
 * Ejemplo: servicios, testimonios y otros elementos de contenido.
 */
export {
  ServiceCard, // Tarjeta individual de servicio
  TestimonialCard // Tarjeta de testimonio de cliente
} from "./ui/Cards";

// ===================================================================
// COMPONENTES INTERACTIVOS Y ANIMADOS
// ===================================================================
/**
 * Componentes con funcionalidades interactivas y animaciones.
 * Ejemplo: contadores, carruseles y banners dinámicos.
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
 * Componentes específicos de funcionalidades adicionales.
 */
export { FloatingBlogButton } from "./ui/FloatingBlogButton"; // Botón flotante del blog

// ===================================================================
// SECCIONES DE LA APLICACIÓN
// ===================================================================
/**
 * Secciones completas de la página web.
 */
export { BlogSection } from "./sections/BlogSection"; // Sección completa del blog

// ===================================================================
// MODALES DEL SISTEMA
// ===================================================================
/**
 * Modales para diferentes funcionalidades del sistema.
 * Incluye modales de información, servicios y blog.
 */
export { BlogModal } from "./modals/BlogModal"; // Modal del blog
export { ConsultationModal } from "./modals/ConsultationModal"; // Modal de consulta
export { EnhancedCookiesModal } from "./modals/CookiesModal"; // Modal de cookies mejorado
export { EnhancedPrivacyModal } from "./modals/PrivacyModal"; // Modal de privacidad mejorado
export { QuoteRequestModal } from "./modals/QuoteModal"; // Modal de solicitud de cotización
export { ServiceDetailModal } from "./modals/ServiceModal"; // Modal de detalles de servicio
export { EnhancedTermsModal } from "./modals/TermsModal"; // Modal de términos mejorado

// ===================================================================
// SUGERENCIAS DE MEJORA PROFESIONAL
// ===================================================================
/**
 * 1. Añadir validación de exportaciones con tests automáticos para evitar rupturas.
 * 2. Documentar ejemplos de uso de cada componente en Storybook o similar.
 * 3. Considerar el uso de index.ts para tipado estricto si se migra a TypeScript.
 * 4. Mantener la nomenclatura y estructura consistente para facilitar el mantenimiento.
 * 5. Si se agregan más secciones, agruparlas lógicamente y documentar su propósito.
 */
