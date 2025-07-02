// --- Validadores y utilidades de seguridad para el formulario de cotización ---
// Considera extraer este bloque a un archivo utilitario si se reutiliza en otros formularios

/**
 * @typedef {Object} SecurityValidators
 * @property {(input: string) => string} sanitizeInput
 * @property {(email: string) => boolean} validateEmail
 * @property {(phone: string) => boolean} validatePhone
 * @property {(name: string) => boolean} validateName
 * @property {(city: string) => boolean} validateCity
 * @property {(input: string) => boolean} detectSQLInjection
 * @property {(value: string, min?: number, max?: number) => boolean} validateLength
 */

const SecurityValidators = {
  /**
   * Sanitiza la entrada para prevenir XSS y otros ataques de inyección de scripts.
   * Elimina etiquetas <script>, HTML y atributos peligrosos.
   * @param {string} input
   * @returns {string}
   */
  sanitizeInput: input => {
    if (typeof input !== 'string') return '';
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)[^<]*)*<\/script>/gi, '')
      .replace(/<[^>]*>/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+\s*=/gi, '');
    // .trim() removido para permitir espacios normales
  },

  /**
   * Valida emails con una expresión regular robusta y longitud máxima estándar.
   * @param {string} email
   * @returns {boolean}
   */
  validateEmail: email => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
  },

  /**
   * Valida teléfonos internacionales (opcional).
   * @param {string} phone
   * @returns {boolean}
   */
  validatePhone: phone => {
    if (!phone) return true; // Campo opcional
    const phoneRegex = /^[+]?[0-9\s()-]{7,20}$/;
    return phoneRegex.test(phone);
  },

  /**
   * Valida nombres (letras, espacios, acentos, longitud razonable).
   * @param {string} name
   * @returns {boolean}
   */
  validateName: name => {
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{2,50}$/;
    return nameRegex.test(name);
  },

  /**
   * Valida ciudades (letras, espacios, signos básicos, longitud razonable).
   * @param {string} city
   * @returns {boolean}
   */
  validateCity: city => {
    const cityRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s,.-]{2,100}$/;
    return cityRegex.test(city);
  },

  /**
   * Detecta patrones básicos de inyección SQL (defensa en profundidad, poco común en frontend).
   * @param {string} input
   * @returns {boolean}
   */
  detectSQLInjection: input => {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|UNION|SCRIPT)\b)/gi,
      /((%27)|('))((%6F)|o|(%4F))((%72)|r|(%52))/gi,
      /(((%3D)|(=))[^\n]*((%27)|(')|((%3B)|(;))))/gi,
      /((%27)|('))((%4F)|o|(%6F))((%52)|r|(%72))/gi,
    ];
    return sqlPatterns.some(pattern => pattern.test(input));
  },

  /**
   * Valida la longitud de un campo entre un mínimo y máximo.
   * @param {string} value
   * @param {number} [min=0]
   * @param {number} [max=1000]
   * @returns {boolean}
   */
  validateLength: (value, min = 0, max = 1000) => {
    return value.length >= min && value.length <= max;
  },
};

export { SecurityValidators };
