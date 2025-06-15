import React, { useEffect, useRef, useMemo } from "react";
import { RECAPTCHA_CONFIG } from "../../services/recaptchaService";

/**
 * Componente para Google reCAPTCHA v2
 * Renderiza el widget visible de verificación
 */
export const ReCaptchaComponent = React.memo(
  ({ onVerify, onError, onExpired, className = "" }) => {
    const recaptchaRef = useRef(null);
    const widgetId = useRef(null);
    const isRendered = useRef(false);
    const componentId = useMemo(() => `recaptcha-${Date.now()}-${Math.random()}`, []);

    useEffect(() => {
      // Verificar configuración - ahora debe tener un fallback
      if (!RECAPTCHA_CONFIG.SITE_KEY || RECAPTCHA_CONFIG.SITE_KEY === 'undefined') {
        onError?.("Error: Configuración de reCAPTCHA no válida");
        return;
      }

      // Función para limpiar el widget existente
      const cleanupWidget = () => {
        if (widgetId.current !== null && window.grecaptcha) {
          try {
            window.grecaptcha.reset(widgetId.current);
          } catch {
            // Ignorar errores de reset
          }
        }
        if (recaptchaRef.current) {
          recaptchaRef.current.innerHTML = '';
        }
        widgetId.current = null;
        isRendered.current = false;
      };

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
      };      // Función para renderizar el widget
      const renderRecaptcha = () => {
        if (!recaptchaRef.current || !window.grecaptcha || isRendered.current) return;

        // Verificar si el elemento ya tiene un widget
        if (recaptchaRef.current.children.length > 0) {
          // Ya hay contenido, limpiar primero
          cleanupWidget();
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
            theme: "light",
            size: "normal",
          });
          isRendered.current = true;
        } catch (error) {
          // Si el error es sobre elemento ya renderizado, intentar limpiar y renderizar de nuevo
          if (error.message.includes('already been rendered')) {
            cleanupWidget();
            // Intentar renderizar de nuevo después de limpiar
            setTimeout(() => {
              if (recaptchaRef.current && !isRendered.current) {
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
                  isRendered.current = true;
                } catch (retryError) {
                  onError?.(`Error al inicializar reCAPTCHA: ${retryError.message}`);
                }
              }
            }, 100);
          } else {
            onError?.(`Error al inicializar reCAPTCHA: ${error.message}`);
          }
        }
      };

      loadRecaptcha();

      // Cleanup
      return () => {
        cleanupWidget();
      };
    }, [onVerify, onError, onExpired]);    return (
      <div
        ref={recaptchaRef}
        id={componentId}
        className={`recaptcha-container ${className}`.trim()}
        aria-label="reCAPTCHA"
      />
    );
  }
);

ReCaptchaComponent.displayName = "ReCaptchaComponent";
