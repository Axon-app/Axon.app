/**
 * Función para verificar el token de reCAPTCHA en el servidor
 * (Esta función debe implementarse en el backend)
 */
export const verifyRecaptchaToken = async (token) => {
  try {
    // En un entorno de producción, esto debe enviarse a tu backend
    // const response = await fetch('/api/verify-recaptcha', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ token }),
    // });
    //
    // const result = await response.json();
    // return result.success;

    // Para desarrollo/demo, simulamos una verificación exitosa
    if (token && token.length > 0) {
      return true;
    }
    return false;
  } catch {
    // En producción, aquí podrías registrar el error en un servicio de logging
    return false;
  }
};

/**
 * Configuración de reCAPTCHA v2 ÚNICAMENTE
 * Dominio autorizado: https://axon-app.github.io/Axon.app/
 */
export const RECAPTCHA_CONFIG = {
  // Clave pública de reCAPTCHA v2 (corregida)
  SITE_KEY: "6Le79WErAAAAALOzPy06SG8O8crutLTb9yW0EEXv",

  // Configuración específica para v2
  VERSION: "v2",
  LANGUAGE: "es",
  THEME: "light", // "light" o "dark"
  SIZE: "normal", // "normal", "compact" o "invisible"

  // Dominio autorizado
  DOMAIN: "https://axon-app.github.io/Axon.app/",
};

/**
 * Clave secreta para verificación en el servidor
 * (Solo para referencia - NO debe usarse en el frontend)
 * Esta clave corresponde a la nueva clave pública corregida
 */
