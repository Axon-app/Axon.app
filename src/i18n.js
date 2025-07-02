// i18n.js
// Configuración básica de internacionalización para React con i18next
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  es: {
    translation: {
      welcome: '¡Bienvenido a Axon.App!',
      loading: 'Cargando aplicación...',
    },
  },
  en: {
    translation: {
      welcome: 'Welcome to Axon.App!',
      loading: 'Loading application...',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'es', // Idioma por defecto
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
