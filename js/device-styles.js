/**
 * device-styles.js - Helper para gestionar estilos según dispositivo
 * Este script maneja la separación de estilos entre dispositivos móviles y desktop
 * para asegurar que los cambios en uno no afecten al otro.
 */

// Definir umbrales de ancho para diferentes dispositivos
const BREAKPOINTS = {
  mobile: 480,
  tablet: 768,
  desktop: 992
};

// Estado del dispositivo actual
let currentDevice = '';

/**
 * Detecta el tipo de dispositivo actual basado en el ancho de la ventana
 * @returns {string} - 'desktop', 'tablet' o 'mobile'
 */
function detectDevice() {
  const width = window.innerWidth;
  
  if (width > BREAKPOINTS.desktop) {
    return 'desktop';
  } else if (width > BREAKPOINTS.tablet) {
    return 'tablet';
  } else {
    return 'mobile';
  }
}

/**
 * Actualiza las clases en el elemento HTML basado en el dispositivo actual
 * Esto permite aplicar estilos específicos por dispositivo
 */
function updateDeviceClasses() {
  const htmlElement = document.documentElement;
  const device = detectDevice();
  
  // Solo actualizar si el dispositivo ha cambiado
  if (device !== currentDevice) {
    // Eliminar clases anteriores
    htmlElement.classList.remove('device-desktop', 'device-tablet', 'device-mobile');
    
    // Añadir la clase para el dispositivo actual
    htmlElement.classList.add(`device-${device}`);
    
    // Actualizar el estado actual
    currentDevice = device;
    
    // Opcional: emitir un evento personalizado que otras partes del código pueden escuchar
    document.dispatchEvent(new CustomEvent('deviceChanged', { detail: { device } }));
  }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', function() {
  updateDeviceClasses();
  
  // Actualizar cuando cambie el tamaño de la ventana
  window.addEventListener('resize', function() {
    updateDeviceClasses();
  });
});

// Exponer funciones útiles globalmente para permitir su uso por otros scripts
window.deviceUtils = {
  detectDevice,
  updateDeviceClasses,
  BREAKPOINTS
};
