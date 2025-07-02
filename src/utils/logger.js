/**
 * logger.js - Sistema de logging profesional para Axon.app
 * ====================================================
 * Proporciona funciones de logging consistentes con diferentes niveles
 * y formatos según el entorno (desarrollo/producción)
 */

const isDevelopment = process.env.NODE_ENV === 'development';

class Logger {
  static info(message, ...args) {
    if (isDevelopment) {
      console.log(`ℹ️ [INFO] ${message}`, ...args);
    }
  }

  static success(message, ...args) {
    if (isDevelopment) {
      console.log(`✅ [SUCCESS] ${message}`, ...args);
    }
  }

  static warn(message, ...args) {
    console.warn(`⚠️ [WARNING] ${message}`, ...args);
  }

  static error(message, ...args) {
    console.error(`❌ [ERROR] ${message}`, ...args);
  }

  static debug(message, ...args) {
    if (isDevelopment) {
      console.debug(`🔍 [DEBUG] ${message}`, ...args);
    }
  }
}

export default Logger;
