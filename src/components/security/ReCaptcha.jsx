import React, { useCallback, useEffect } from "react";
import { RECAPTCHA_CONFIG } from "../../services/recaptchaService";

/**
 * Componente para Google reCAPTCHA v3
 * Funciona de forma invisible en segundo plano
 */
export const ReCaptchaComponent = React.memo(
  ({ onVerify, onError, action = "submit_form", className = "" }) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [isExecuting, setIsExecuting] = React.useState(false);

    // Verificar si grecaptcha está disponible
    const checkRecaptchaLoaded = useCallback(() => {
      return window.grecaptcha && window.grecaptcha.ready;
    }, []);

    // Ejecutar reCAPTCHA v3
    const executeRecaptcha = useCallback(async () => {
      if (!checkRecaptchaLoaded()) {
        onError?.("reCAPTCHA no está cargado");
        return null;
      }

      if (isExecuting) {
        return null;
      }

      setIsExecuting(true);

      try {
        const token = await new Promise((resolve, reject) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha
              .execute(RECAPTCHA_CONFIG.SITE_KEY, { action })
              .then(resolve)
              .catch(reject);
          });
        });

        onVerify?.(token);
        return token;
      } catch {
        // En producción, usar un servicio de logging apropiado
        onError?.("Error al verificar reCAPTCHA");
        return null;
      } finally {
        setIsExecuting(false);
      }
    }, [checkRecaptchaLoaded, onError, onVerify, action, isExecuting]);

    // Verificar cuando se carga el script
    useEffect(() => {
      const checkLoaded = () => {
        if (checkRecaptchaLoaded()) {
          setIsLoaded(true);
        } else {
          setTimeout(checkLoaded, 100);
        }
      };

      checkLoaded();
    }, [checkRecaptchaLoaded]); // Para que el componente padre pueda acceder a executeRecaptcha
    const componentRef = React.useRef({
      execute: executeRecaptcha,
      isLoaded,
      isExecuting,
    });

    // Actualizar la referencia cuando cambien los valores
    React.useEffect(() => {
      componentRef.current = {
        execute: executeRecaptcha,
        isLoaded,
        isExecuting,
      };
    }, [executeRecaptcha, isLoaded, isExecuting]);

    return (
      <div className={`recaptcha-v3-container ${className}`}>
        {!isLoaded && (
          <div className="text-sm text-gray-400 text-center">
            Cargando verificación de seguridad...
          </div>
        )}
        {isExecuting && (
          <div className="text-sm text-blue-400 text-center">
            Verificando seguridad...
          </div>
        )}
        <div className="text-xs text-gray-500 text-center mt-2">
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
