import React, { useCallback, useEffect, useRef } from "react";
import { RECAPTCHA_CONFIG } from "../../services/recaptchaService";

/**
 * Componente para Google reCAPTCHA v2
 * Renderiza el widget visible de verificación
 */
export const ReCaptchaComponent = React.memo(
  ({ onVerify, onError, onExpired, className = "" }) => {
    const recaptchaRef = useRef(null);
    const widgetId = useRef(null);
    const [isLoaded, setIsLoaded] = React.useState(false);

    // Verificar si grecaptcha está disponible
    const checkRecaptchaLoaded = useCallback(() => {
      return (
        window.grecaptcha &&
        window.grecaptcha.render &&
        typeof window.grecaptcha.render === "function"
      );
    }, []); // Renderizar el widget de reCAPTCHA v2
    const renderRecaptcha = useCallback(() => {
      if (!checkRecaptchaLoaded() || !recaptchaRef.current) {
        return;
      }

      // Verificar que el contenedor esté vacío
      if (recaptchaRef.current.hasChildNodes()) {
        return;
      }

      try {
        widgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: RECAPTCHA_CONFIG.SITE_KEY,
          callback: (token) => {
            onVerify?.(token);
          },
          "expired-callback": () => {
            onExpired?.();
          },
          "error-callback": () => {
            onError?.("Error en la verificación de reCAPTCHA");
          },
          theme: RECAPTCHA_CONFIG.THEME,
          size: RECAPTCHA_CONFIG.SIZE,
        });
      } catch (error) {
        onError?.(`Error al cargar reCAPTCHA: ${error.message}`);
      }
    }, [checkRecaptchaLoaded, onVerify, onError, onExpired]);

    // Resetear el reCAPTCHA
    const resetRecaptcha = useCallback(() => {
      if (checkRecaptchaLoaded() && widgetId.current !== null) {
        try {
          window.grecaptcha.reset(widgetId.current);
        } catch {
          // Error silencioso al resetear
        }
      }
    }, [checkRecaptchaLoaded]);    // Verificar cuando se carga el script
    useEffect(() => {
      let attempts = 0;
      const maxAttempts = 30; // 3 segundos máximo para ser más rápido
      let timeoutId;

      const checkLoaded = () => {
        attempts++;

        if (checkRecaptchaLoaded()) {
          setIsLoaded(true);
          // Pequeña espera para asegurar el DOM está listo
          timeoutId = setTimeout(() => renderRecaptcha(), 100);
        } else if (attempts < maxAttempts) {
          timeoutId = setTimeout(checkLoaded, 100);        } else {
          // Timeout después de 3 segundos
          onError?.(
            "No se pudo cargar reCAPTCHA. Verifica tu conexión a internet."
          );
        }
      };

      // Verificar si ya está cargado
      if (window.grecaptcha && window.grecaptcha.ready) {
        window.grecaptcha.ready(() => {
          checkLoaded();
        });
      } else {
        checkLoaded();
      }

      return () => {
        // Limpiar timeouts
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        
        // Cleanup al desmontar
        if (widgetId.current !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(widgetId.current);
          } catch {
            // Error silencioso
          }
        }
      };
    }, [checkRecaptchaLoaded, renderRecaptcha, onError]);// Exponer funciones para el componente padre
    const componentRef = useRef({
      reset: resetRecaptcha,
      isLoaded,
    });

    // Actualizar la referencia cuando cambien los valores
    useEffect(() => {
      componentRef.current = {
        reset: resetRecaptcha,
        isLoaded,
      };
    }, [resetRecaptcha, isLoaded]);

    return (
      <div className={`recaptcha-v2-container ${className}`}>
        {!isLoaded && (
          <div className="text-sm text-gray-400 text-center mb-4">
            Cargando verificación de seguridad...
          </div>
        )}

        {/* Contenedor para el widget de reCAPTCHA v2 */}
        <div className="flex justify-center mb-4">
          <div ref={recaptchaRef}></div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Este sitio está protegido por reCAPTCHA y se aplican la{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Política de Privacidad
          </a>{" "}
          y los{" "}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            Términos de Servicio
          </a>{" "}
          de Google.
        </div>
      </div>
    );
  }
);

ReCaptchaComponent.displayName = "ReCaptchaComponent";
