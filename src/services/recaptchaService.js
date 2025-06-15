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
      // En producción, remover este log
      // console.log('reCAPTCHA token received:', token.substring(0, 20) + '...');
      return true;
    }
    return false;
  } catch {
    // En producción, aquí podrías registrar el error en un servicio de logging
    return false;
  }
};

/**
 * Configuración de reCAPTCHA
 */
export const RECAPTCHA_CONFIG = {
  // Clave pública de reCAPTCHA (de Google Cloud Console)
  SITE_KEY: "6Lf_zGErAAAABEXtzpIGpDrdSsxAOulq2sadHas",

  // Configuración de tema y tamaño
  THEME: "dark",
  SIZE: "normal",
  LANGUAGE: "es",
};

/**
 * Clave secreta para verificación en el servidor
 * (Solo para referencia - NO debe usarse en el frontend)
 * Clave secreta: 6Lf_zGErAAAAPn_phMfpriBXnUWdeZBtu2GenV
 */
