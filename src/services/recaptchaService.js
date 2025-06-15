/**
 * Configuración de Google reCAPTCHA v2
 * Usa claves de prueba de Google como fallback si no hay variables de entorno
 */

// Función para obtener la clave del sitio con fallbacks
const getSiteKey = () => {
  const envKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  
  // Si tenemos una clave de entorno válida, usarla
  if (envKey && envKey !== 'undefined' && envKey.length > 10) {
    return envKey;
  }
  
  // Fallback a claves de prueba de Google reCAPTCHA
  // Estas claves están diseñadas para testing y siempre pasan la validación
  return "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
};

// Función para obtener la clave secreta con fallbacks
const getSecretKey = () => {
  const envKey = import.meta.env.VITE_RECAPTCHA_SECRET_KEY;
  
  if (envKey && envKey !== 'undefined' && envKey.length > 10) {
    return envKey;
  }
  
  return "6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe";
};

export const RECAPTCHA_CONFIG = {
  SITE_KEY: getSiteKey(),
  SECRET_KEY: getSecretKey(),
  THEME: "light",
  SIZE: "normal",
  MIN_SCORE: 0.5,
};

/**
 * Función para verificar el token de reCAPTCHA
 * @param {string} token - Token de reCAPTCHA a verificar
 * @returns {Promise<boolean>} - true si la verificación es exitosa
 */
export const verifyRecaptchaToken = async (token) => {
  if (!token) {
    throw new Error("Token de reCAPTCHA no proporcionado");
  }

  try {
    const response = await fetch(
      "https://www.google.com/recaptcha/api/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          secret: RECAPTCHA_CONFIG.SECRET_KEY,
          response: token,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Error en la verificación de reCAPTCHA");
    }

    const result = await response.json();

    if (!result.success) {
      return false;
    }

    return true;
  } catch {
    throw new Error("Error al verificar reCAPTCHA");
  }
};

/**
 * Función para resetear el widget de reCAPTCHA
 * @param {number} widgetId - ID del widget de reCAPTCHA
 */
export const resetRecaptcha = (widgetId) => {
  if (typeof window === "undefined" || !window.grecaptcha) {
    return;
  }

  try {
    window.grecaptcha.reset(widgetId);
  } catch {
    // Silently handle reset errors
  }
};
