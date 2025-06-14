// Exportaciones optimizadas con lazy loading para componentes pesados
import React from "react";

// Componentes básicos (carga inmediata)
export {
  AnimatedBackground,
  AxonLogo,
  ScrollToTopButton,
} from "./ui/BasicComponents";

export { ServiceCard, TestimonialCard } from "./ui/Cards";

export {
  AnimatedCounter,
  AnimatedCounterWithProgress,
  TechCarousel,
  TechItem,
  TestimonialsBanner,
} from "./ui/Interactive";

// Formularios (carga inmediata)
export { ContactForm } from "./forms/ContactForm";

// Modales (lazy loading para mejor rendimiento)
export const EnhancedPrivacyModal = React.lazy(() =>
  import("./modals/PrivacyModal").then((module) => ({
    default: module.EnhancedPrivacyModal,
  }))
);

export const EnhancedTermsModal = React.lazy(() =>
  import("./modals/TermsModal").then((module) => ({
    default: module.EnhancedTermsModal,
  }))
);

export const ServiceDetailModal = React.lazy(() =>
  import("./modals/ServiceModal").then((module) => ({
    default: module.ServiceDetailModal,
  }))
);

export const QuoteRequestModal = React.lazy(() =>
  import("./modals/QuoteModal").then((module) => ({
    default: module.QuoteRequestModal,
  }))
);

export const ConsultationModal = React.lazy(() =>
  import("./modals/ConsultationModal").then((module) => ({
    default: module.ConsultationModal,
  }))
);
