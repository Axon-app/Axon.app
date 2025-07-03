// @ts-nocheck
// performance.js
// =====================================================
// Utilidades para optimización de rendimiento de la aplicación
// Incluye lazy loading, cache de API, y utilidades de performance
// Autor: Axon.App Team | Última revisión: 01/07/2025

import { lazy, Suspense } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';

/**
 * HOC para lazy loading con error boundary y suspense
 * @param {Function} importCallback - Función que retorna la importación dinámica
 * @param {React.Component} LoadingComponent - Componente de carga opcional
 * @returns {React.Component} Componente envuelto con lazy loading
 */
export const withLazyLoading = (importCallback, LoadingComponent = null) => {
  const LazyComponent = lazy(importCallback);

  return props => (
    <ErrorBoundary>
      <Suspense fallback={LoadingComponent || <div>Loading...</div>}>
        <LazyComponent {...props} />
      </Suspense>
    </ErrorBoundary>
  );
};

/**
 * Cache para respuestas de API con TTL y manejo de errores
 */
export class APICache {
  static cache = new Map();
  static TTL = 5 * 60 * 1000; // 5 minutos

  /**
   * Obtiene datos del cache o ejecuta el callback si no existen o están expirados
   * @param {string} key - Clave del cache
   * @param {Function} fetchCallback - Función que obtiene los datos
   * @returns {Promise<any>} Los datos solicitados
   */
  static async get(key, fetchCallback) {
    try {
      const cached = this.cache.get(key);
      if (cached && Date.now() - cached.timestamp < this.TTL) {
        return cached.data;
      }

      const data = await fetchCallback();
      this.cache.set(key, {
        data,
        timestamp: Date.now(),
      });

      return data;
    } catch (error) {
      console.error(`Error fetching data for key "${key}":`, error);
      // Si hay datos en cache (aunque expirados), devolverlos como fallback
      const cached = this.cache.get(key);
      if (cached) {
        console.warn(`Using expired cache for key "${key}" due to fetch error`);
        return cached.data;
      }
      throw error;
    }
  }

  /**
   * Invalida una entrada específica del cache
   * @param {string} key - Clave a invalidar
   * @returns {boolean} true si se eliminó, false si no existía
   */
  static invalidate(key) {
    if (typeof key !== 'string') {
      console.warn('APICache.invalidate: key must be a string');
      return false;
    }
    return this.cache.delete(key);
  }

  /**
   * Limpia todo el cache
   */
  static clear() {
    this.cache.clear();
  }

  /**
   * Obtiene el tamaño actual del cache
   * @returns {number} Número de entradas en el cache
   */
  static getSize() {
    return this.cache.size;
  }

  /**
   * Obtiene todas las claves del cache
   * @returns {string[]} Array de claves
   */
  static getKeys() {
    return Array.from(this.cache.keys());
  }

  /**
   * Verifica si una clave existe en el cache
   * @param {string} key - Clave a verificar
   * @returns {boolean} true si existe
   */
  static has(key) {
    return this.cache.has(key);
  }

  /**
   * Establece un TTL personalizado
   * @param {number} ttl - Tiempo de vida en milisegundos
   */
  static setTTL(ttl) {
    this.TTL = ttl;
  }
}

/**
 * Debounce una función para evitar llamadas excesivas
 * @param {Function} func - Función a debounce
 * @param {number} wait - Tiempo de espera en ms
 * @returns {Function} Función con debounce
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle una función para limitar su ejecución
 * @param {Function} func - Función a throttle
 * @param {number} limit - Límite de tiempo en ms
 * @returns {Function} Función con throttle
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Mide el tiempo de ejecución de una función
 * @param {Function} func - Función a medir
 * @param {string} label - Etiqueta para el log
 * @returns {Function} Función envuelta con medición
 */
export const measurePerformance = (func, label = 'Function') => {
  return async function (...args) {
    const start = performance.now();
    const result = await func.apply(this, args);
    const end = performance.now();
    console.warn(`${label} executed in ${(end - start).toFixed(2)} milliseconds`);
    return result;
  };
};

/**
 * Utilidad para precargar recursos
 * @param {string[]} urls - URLs de recursos a precargar
 */
export const preloadResources = urls => {
  urls.forEach(url => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = url.endsWith('.css') ? 'style' : 'script';
    document.head.appendChild(link);
  });
};

/**
 * Observador de intersección para lazy loading de imágenes
 * @param {string} selector - Selector CSS de las imágenes
 */
export const lazyLoadImages = (selector = 'img[data-src]') => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver(_entries => {
      _entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll(selector).forEach(img => {
      imageObserver.observe(img);
    });
  }
};
