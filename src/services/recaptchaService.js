/**
 * Configuración de Google reCAPTCHA v2
 * ⚠️ TEMPORALMENTE SUSPENDIDO ⚠️
 * 
 * El servicio de reCAPTCHA ha sido suspendido para evitar conflictos.
 * Las funciones devuelven valores simulados para mantener la funcionalidad.
 * 
 * TODO: Reactivar cuando se solucionen los problemas de integración
 */

// Configuración suspendida - valores simulados
export const RECAPTCHA_CONFIG = {
  SITE_KEY: "suspended-site-key",
  SECRET_KEY: "suspended-secret-key",
  THEME: "light",
  SIZE: "normal",
  MIN_SCORE: 0.5,
};

/**
 * Función simulada para verificar el token de reCAPTCHA
 * Siempre retorna true cuando está suspendido
 */
export const verifyRecaptchaToken = async (token) => {
  if (!token) {
    throw new Error("Token de reCAPTCHA no proporcionado");
  }

  // Simular verificación exitosa
  return Promise.resolve(true);
};

/**
 * Función simulada para resetear el widget de reCAPTCHA
 * No hace nada cuando está suspendido
 */
export const resetRecaptcha = (_widgetId) => {
  // No hacer nada en modo suspendido
};
