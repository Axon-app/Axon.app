import React, { useEffect, useRef } from "react";
import { RECAPTCHA_CONFIG } from "../../services/recaptchaService";

/**
 * Componente para Google reCAPTCHA v2
 * Renderiza el widget visible de verificación
 */
export const ReCaptchaComponent = React.memo(
  ({ onVerify, onError, onExpired, className = "" }) => {
    const recaptchaRef = useRef(null);
    const widgetId = useRef(null);

    useEffect(() => {
      // Verificar configuración
      if (!RECAPTCHA_CONFIG.SITE_KEY) {
        onError?.("Error: Falta la clave del sitio de reCAPTCHA");
        return;
      }

      // Función para cargar e inicializar reCAPTCHA
      const loadRecaptcha = () => {
        // Verificar si el script ya está cargado
        if (window.grecaptcha && window.grecaptcha.render) {
          renderRecaptcha();
          return;
        }

        // Cargar script si no existe
        const existingScript = document.getElementById("recaptcha-script");
        if (existingScript) return;

        const script = document.createElement("script");
        script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
        script.id = "recaptcha-script";
        script.async = true;
        script.defer = true;

        // Callback global para cuando se carga reCAPTCHA
        window.onRecaptchaLoad = () => {
          renderRecaptcha();
        };

        script.onerror = () => {
          onError?.("No se pudo cargar el script de reCAPTCHA");
        };

        document.head.appendChild(script);
      };

      // Función para renderizar el widget
      const renderRecaptcha = () => {
        if (!recaptchaRef.current || !window.grecaptcha) return;

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
            theme: "light",
            size: "normal",
          });
        } catch (error) {          onError?.(`Error al inicializar reCAPTCHA: ${error.message}`);
        }
      };

      loadRecaptcha();

      // Cleanup
      return () => {
        if (widgetId.current !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(widgetId.current);
          } catch {
            // Ignorar errores de cleanup
          }
        }
      };
    }, [onVerify, onError, onExpired]);

    return (
      <div
        ref={recaptchaRef}
        className={`recaptcha-container ${className}`.trim()}
        aria-label="reCAPTCHA"
      />
    );
  }
);

ReCaptchaComponent.displayName = "ReCaptchaComponent";
