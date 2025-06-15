/**
 * Configuración de Google reCAPTCHA v2
 */
export const RECAPTCHA_CONFIG = {
  SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
  SECRET_KEY: import.meta.env.VITE_RECAPTCHA_SECRET_KEY,
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
