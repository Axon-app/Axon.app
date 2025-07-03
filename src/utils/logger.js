/**
 * logger.js - Sistema de logging profesional para Axon.app
 * ====================================================
 * Proporciona funciones de logging consistentes con diferentes niveles
 * y formatos según el entorno (desarrollo/producción)
 */

const isDevelopment = process.env.NODE_ENV === 'development';

class Logger {
  /**
   * Registra un mensaje informativo
   * @param {string} message - El mensaje a registrar
   * @param {...any} args - Argumentos adicionales
   */
  static info(message, ...args) {
    if (isDevelopment) {
      console.warn(`ℹ️ [INFO] ${message}`, ...args);
    }
  }

  /**
   * Registra un mensaje de éxito
   * @param {string} message - El mensaje a registrar
   * @param {...any} args - Argumentos adicionales
   */
  static success(message, ...args) {
    if (isDevelopment) {
      console.warn(`✅ [SUCCESS] ${message}`, ...args);
    }
  }

  /**
   * Registra un mensaje de advertencia
   * @param {string} message - El mensaje a registrar
   * @param {...any} args - Argumentos adicionales
   */
  static warn(message, ...args) {
    console.warn(`⚠️ [WARNING] ${message}`, ...args);
  }

  /**
   * Registra un mensaje de error
   * @param {string} message - El mensaje a registrar
   * @param {...any} args - Argumentos adicionales
   */
  static error(message, ...args) {
    console.error(`❌ [ERROR] ${message}`, ...args);
  }

  /**
   * Registra un mensaje de debug
   * @param {string} message - El mensaje a registrar
   * @param {...any} args - Argumentos adicionales
   */
  static debug(message, ...args) {
    if (isDevelopment) {
      console.warn(`🔍 [DEBUG] ${message}`, ...args);
    }
  }
}

export default Logger;
